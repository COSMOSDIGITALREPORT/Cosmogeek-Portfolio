"""
Generate narration audio + synchronized timelines for the service explanation videos.

Reads every script in content/service-videos/<slug>.json and writes:

  public/service-videos/<slug>/narration.mp3   one continuous narration track
  public/service-videos/<slug>/timeline.json   scenes and cues with exact start/end times
  public/service-videos/<slug>/captions.hi.vtt Hinglish captions (WebVTT)
  public/service-videos/<slug>/captions.en.vtt English captions (WebVTT)

Each cue is synthesized separately, measured frame by frame and joined with
short silences, so subtitle and scene timings match the audio exactly and the
video length is whatever the script needs.

Providers
---------
  azure  Official Azure AI Speech (recommended for production). Needs
         AZURE_SPEECH_KEY and AZURE_SPEECH_REGION environment variables.
  edge   Microsoft Edge read-aloud voices via the open-source `edge-tts`
         package (pip install edge-tts). No key needed; intended for previews.

Both providers use the same Microsoft neural voices (default hi-IN-SwaraNeural).

Usage
-----
  python scripts/generate-service-videos.py --provider edge
  python scripts/generate-service-videos.py --provider azure --only web-development
"""

import argparse
import asyncio
import hashlib
import json
import os
import sys
import urllib.request
from datetime import datetime, timezone
from pathlib import Path
from xml.sax.saxutils import escape

ROOT = Path(__file__).resolve().parent.parent
SCRIPTS_DIR = ROOT / 'content' / 'service-videos'
OUTPUT_DIR = ROOT / 'public' / 'service-videos'
CACHE_DIR = ROOT / '.cache' / 'tts'

OUTPUT_FORMAT = 'audio-24khz-48kbitrate-mono-mp3'
LEAD_IN = 0.5      # silence before the first cue
CUE_GAP = 0.3      # silence between cues in the same scene
SCENE_GAP = 0.7    # silence between scenes
TAIL = 1.2         # silence after the last cue

# ---------------------------------------------------------------------------
# MP3 frame handling
# ---------------------------------------------------------------------------
BITRATES = {
    1: [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320],  # MPEG-1 Layer III
    2: [0, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160],      # MPEG-2/2.5 Layer III
}
SAMPLE_RATES = {3: [44100, 48000, 32000], 2: [22050, 24000, 16000], 0: [11025, 12000, 8000]}


def strip_id3(data):
    if data[:3] == b'ID3':
        size = (data[6] << 21) | (data[7] << 14) | (data[8] << 7) | data[9]
        data = data[10 + size:]
    if data[-128:-125] == b'TAG':
        data = data[:-128]
    return data


def parse_frames(data):
    """Return (frames, sample_rate, samples_per_frame) for a Layer III stream."""
    frames = []
    i = 0
    sample_rate = samples = None
    while i + 4 <= len(data):
        h = data[i:i + 4]
        if h[0] != 0xFF or (h[1] & 0xE0) != 0xE0:
            raise ValueError(f'MP3 sync lost at byte {i}')
        version = (h[1] >> 3) & 3            # 3 = MPEG-1, 2 = MPEG-2, 0 = MPEG-2.5
        layer = (h[1] >> 1) & 3
        if layer != 1:
            raise ValueError('Only MPEG Layer III audio is supported')
        bitrate = BITRATES[1 if version == 3 else 2][(h[2] >> 4) & 15] * 1000
        rate = SAMPLE_RATES[version][(h[2] >> 2) & 3]
        padding = (h[2] >> 1) & 1
        per_frame = 1152 if version == 3 else 576
        size = (per_frame // 8) * bitrate // rate + padding
        if sample_rate is None:
            sample_rate, samples = rate, per_frame
        elif rate != sample_rate:
            raise ValueError('Mixed sample rates in narration')
        frames.append(data[i:i + size])
        i += size
    return frames, sample_rate, samples


def silent_frame(template):
    """A frame with the template's header and empty audio data decodes to silence."""
    header = bytearray(template[:4])
    header[2] &= ~0x02  # clear padding bit
    version = (header[1] >> 3) & 3
    bitrate = BITRATES[1 if version == 3 else 2][(header[2] >> 4) & 15] * 1000
    rate = SAMPLE_RATES[version][(header[2] >> 2) & 3]
    per_frame = 1152 if version == 3 else 576
    size = (per_frame // 8) * bitrate // rate
    return bytes(header) + bytes(size - 4)


# ---------------------------------------------------------------------------
# Providers
# ---------------------------------------------------------------------------
def synth_azure(text, voice, rate):
    key = os.environ.get('AZURE_SPEECH_KEY')
    region = os.environ.get('AZURE_SPEECH_REGION')
    if not key or not region:
        sys.exit('Azure provider needs AZURE_SPEECH_KEY and AZURE_SPEECH_REGION environment variables.')
    lang = '-'.join(voice.split('-')[:2])
    ssml = (
        f"<speak version='1.0' xml:lang='{lang}'><voice name='{voice}'>"
        f"<prosody rate='{rate}'>{escape(text)}</prosody></voice></speak>"
    )
    request = urllib.request.Request(
        f'https://{region}.tts.speech.microsoft.com/cognitiveservices/v1',
        data=ssml.encode('utf-8'),
        headers={
            'Ocp-Apim-Subscription-Key': key,
            'Content-Type': 'application/ssml+xml',
            'X-Microsoft-OutputFormat': OUTPUT_FORMAT,
            'User-Agent': 'cosmogeek-service-videos',
        },
    )
    with urllib.request.urlopen(request, timeout=60) as response:
        return response.read()


def synth_edge(text, voice, rate):
    try:
        import edge_tts
    except ImportError:
        sys.exit('The edge provider needs the edge-tts package: pip install edge-tts')

    async def run():
        audio = bytearray()
        async for chunk in edge_tts.Communicate(text, voice, rate=rate).stream():
            if chunk['type'] == 'audio':
                audio.extend(chunk['data'])
        return bytes(audio)

    return asyncio.run(run())


PROVIDERS = {'azure': synth_azure, 'edge': synth_edge}


def synthesize(provider, text, voice, rate):
    """Synthesize with an on-disk cache so unchanged cues are never re-generated."""
    key = hashlib.sha1(f'{voice}|{rate}|{text}'.encode('utf-8')).hexdigest()
    cached = CACHE_DIR / f'{key}.mp3'
    if cached.exists():
        return cached.read_bytes()
    for attempt in range(3):
        try:
            audio = PROVIDERS[provider](text, voice, rate)
            if audio:
                break
        except Exception as error:  # network hiccups: retry a couple of times
            if attempt == 2:
                raise
            print(f'    retrying after error: {error}')
    CACHE_DIR.mkdir(parents=True, exist_ok=True)
    cached.write_bytes(audio)
    return audio


# ---------------------------------------------------------------------------
# Build
# ---------------------------------------------------------------------------
def vtt_time(seconds):
    ms = round(seconds * 1000)
    h, ms = divmod(ms, 3_600_000)
    m, ms = divmod(ms, 60_000)
    s, ms = divmod(ms, 1000)
    return f'{h:02}:{m:02}:{s:02}.{ms:03}'


def write_vtt(path, cues, field):
    lines = ['WEBVTT', '']
    for index, cue in enumerate(cues, 1):
        lines += [str(index), f"{vtt_time(cue['start'])} --> {vtt_time(cue['end'])}", cue[field], '']
    path.write_text('\n'.join(lines), encoding='utf-8')


def build(script_path, provider, voice_override, rate):
    script = json.loads(script_path.read_text(encoding='utf-8'))
    slug = script['slug']
    voice = voice_override or script.get('voice', 'hi-IN-SwaraNeural')
    print(f'> {slug} ({voice}, {provider})')

    stream = []
    template = None
    sample_rate = samples_per_frame = None
    frame_count = 0

    def add_silence(seconds):
        nonlocal frame_count
        count = round(seconds * sample_rate / samples_per_frame)
        stream.extend([silent_frame(template)] * count)
        frame_count += count

    # Synthesize every cue first so we know the stream format for silences
    rendered = []
    for scene in script['scenes']:
        for cue in scene['cues']:
            audio = strip_id3(synthesize(provider, cue['hi'], voice, rate))
            frames, rate_hz, per_frame = parse_frames(audio)
            if template is None:
                template, sample_rate, samples_per_frame = frames[0], rate_hz, per_frame
            elif rate_hz != sample_rate:
                raise ValueError('Provider returned audio in a different format')
            rendered.append(frames)
            print(f'    {len(frames) * per_frame / rate_hz:5.1f}s  {cue["en"][:70]}')

    seconds = lambda: frame_count * samples_per_frame / sample_rate  # noqa: E731

    out_scenes = []
    all_cues = []
    cue_index = 0
    add_silence(LEAD_IN)
    for scene_index, scene in enumerate(script['scenes']):
        if scene_index:
            add_silence(SCENE_GAP)
        scene_start = seconds()
        out_cues = []
        for i, cue in enumerate(scene['cues']):
            if i:
                add_silence(CUE_GAP)
            frames = rendered[cue_index]
            cue_index += 1
            start = seconds()
            stream.extend(frames)
            frame_count += len(frames)
            timed = {**cue, 'start': round(start, 3), 'end': round(seconds(), 3)}
            out_cues.append(timed)
            all_cues.append(timed)
        out_scenes.append({**scene, 'cues': out_cues, 'start': round(scene_start, 3), 'end': round(seconds(), 3)})
    add_silence(TAIL)

    # Each scene runs until the next one starts, so visuals never go blank
    for current, following in zip(out_scenes, out_scenes[1:]):
        current['end'] = following['start']
    duration = round(seconds(), 3)
    out_scenes[-1]['end'] = duration

    target = OUTPUT_DIR / slug
    target.mkdir(parents=True, exist_ok=True)
    (target / 'narration.mp3').write_bytes(b''.join(stream))
    timeline = {
        'slug': slug,
        'title': script['title'],
        'language': script.get('language', 'hi-IN'),
        'voice': voice,
        'provider': provider,
        'generatedAt': datetime.now(timezone.utc).isoformat(timespec='seconds'),
        'duration': duration,
        'audio': 'narration.mp3',
        'scenes': out_scenes,
    }
    (target / 'timeline.json').write_text(json.dumps(timeline, ensure_ascii=False, indent=1), encoding='utf-8')
    write_vtt(target / 'captions.hi.vtt', all_cues, 'hi')
    write_vtt(target / 'captions.en.vtt', all_cues, 'en')
    minutes, secs = divmod(duration, 60)
    print(f'  = {int(minutes)}m {secs:04.1f}s, {len(all_cues)} cues -> {target.relative_to(ROOT)}')


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument('--provider', choices=PROVIDERS, default='azure')
    parser.add_argument('--voice', help='Override the voice set in each script, e.g. hi-IN-MadhurNeural')
    parser.add_argument('--rate', default='+0%', help='Speaking rate adjustment, e.g. -5%%')
    parser.add_argument('--only', nargs='*', help='Slugs to generate (default: all scripts)')
    args = parser.parse_args()

    scripts = sorted(SCRIPTS_DIR.glob('*.json'))
    if args.only:
        scripts = [p for p in scripts if p.stem in args.only]
    if not scripts:
        sys.exit(f'No scripts found in {SCRIPTS_DIR}')
    for path in scripts:
        build(path, args.provider, args.voice, args.rate)


if __name__ == '__main__':
    main()
