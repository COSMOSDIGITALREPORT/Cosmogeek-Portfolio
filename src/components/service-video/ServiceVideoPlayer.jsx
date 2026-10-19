import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  Captions,
  CaptionsOff,
  Clapperboard,
  FileText,
  Gauge,
  Loader2,
  Maximize,
  Minimize,
  Pause,
  Play,
  RotateCcw,
  RotateCw,
  Volume1,
  Volume2,
  VolumeX,
} from 'lucide-react'
import VideoScene from './VideoScenes'
import './ServiceVideoPlayer.css'

const SPEEDS = [0.75, 1, 1.25, 1.5, 2]
const CAPTION_OPTIONS = [
  { id: 'hi', label: 'हिंदी / Hinglish' },
  { id: 'en', label: 'English' },
  { id: 'off', label: 'Off' },
]
// Source scripts double as the storyboard while narration is being generated
const NO_ITEMS = []
const SCRIPTS = import.meta.glob('/content/service-videos/*.json', { import: 'default' })

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const whole = Math.floor(seconds)
  const m = Math.floor(whole / 60)
  const s = String(whole % 60).padStart(2, '0')
  return m >= 60 ? `${Math.floor(m / 60)}:${String(m % 60).padStart(2, '0')}:${s}` : `${m}:${s}`
}

function readPreference(key, fallback) {
  try {
    return window.localStorage.getItem(key) ?? fallback
  } catch {
    return fallback
  }
}

function writePreference(key, value) {
  try {
    window.localStorage.setItem(key, value)
  } catch {
    // Private mode or blocked storage: preferences simply are not remembered
  }
}

/** Index of the last item whose start is <= time (items sorted by start). */
function indexAt(items, time) {
  let found = 0
  for (let i = 0; i < items.length; i++) {
    if (items[i].start <= time) found = i
    else break
  }
  return found
}

/**
 * Narrated explanation video for a service. The narration track is the master
 * clock: scenes, highlighted features and subtitles are derived from the audio's
 * current time using the generated timeline, so they always stay in sync.
 * Render it with key={slug} so switching services starts from a clean state.
 */
export default function ServiceVideoPlayer({ slug, title, icon }) {
  const reduceMotion = useReducedMotion()
  const base = `${import.meta.env.BASE_URL}service-videos/${slug}/`

  const rootRef = useRef(null)
  const audioRef = useRef(null)
  const transcriptRef = useRef(null)
  const hideTimer = useRef(null)

  const [timeline, setTimeline] = useState(null)
  const [storyboard, setStoryboard] = useState(null)
  const [status, setStatus] = useState('loading') // loading | ready | unavailable
  const [audioError, setAudioError] = useState(false)
  const [buffering, setBuffering] = useState(false)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [started, setStarted] = useState(false)
  const [ended, setEnded] = useState(false)
  const [volume, setVolume] = useState(() => Number(readPreference('cg-video-volume', '1')) || 1)
  const [muted, setMuted] = useState(false)
  const [rate, setRate] = useState(1)
  const [captions, setCaptions] = useState(() => readPreference('cg-video-captions', 'hi'))
  const [menu, setMenu] = useState(null) // 'speed' | 'captions' | null
  const [fullscreen, setFullscreen] = useState(false)
  const [showTranscript, setShowTranscript] = useState(false)
  const [controlsVisible, setControlsVisible] = useState(true)

  // ---------- Load the generated timeline (or the storyboard as fallback) ----------
  useEffect(() => {
    let cancelled = false
    fetch(`${base}timeline.json`)
      .then((response) => {
        const type = response.headers.get('content-type') || ''
        if (!response.ok || !type.includes('json')) throw new Error('missing')
        return response.json()
      })
      .then((data) => {
        if (cancelled) return
        setTimeline(data)
        setDuration(data.duration)
        setStatus('ready')
      })
      .catch(async () => {
        if (cancelled) return
        const loader = SCRIPTS[`/content/service-videos/${slug}.json`]
        setStoryboard(loader ? await loader() : null)
        if (!cancelled) setStatus('unavailable')
      })

    return () => {
      cancelled = true
    }
  }, [base, slug])

  // ---------- Audio clock ----------
  useEffect(() => {
    if (!playing) return undefined
    let frame
    const tick = () => {
      const audio = audioRef.current
      if (audio) setTime(audio.currentTime)
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [playing])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = volume
    audio.muted = muted
  }, [volume, muted, status])

  useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = rate
  }, [rate, status])

  const togglePlay = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      if (audio.ended || ended) audio.currentTime = 0
      setStarted(true)
      setEnded(false)
      audio.play().catch(() => setAudioError(true))
    } else {
      audio.pause()
    }
  }, [ended])

  const seek = useCallback(
    (seconds) => {
      const audio = audioRef.current
      if (!audio) return
      const total = audio.duration || duration
      const target = Math.max(0, Math.min(total - 0.05, seconds))
      audio.currentTime = target
      setTime(target)
      setEnded(false)
      setStarted(true)
    },
    [duration],
  )

  const changeVolume = (value) => {
    setVolume(value)
    setMuted(value === 0)
    writePreference('cg-video-volume', String(value))
  }

  const chooseCaptions = (id) => {
    setCaptions(id)
    setMenu(null)
    writePreference('cg-video-captions', id)
  }

  // ---------- Fullscreen (with a CSS fallback for browsers without the API) ----------
  const toggleFullscreen = useCallback(() => {
    const root = rootRef.current
    if (!root) return
    const doc = document
    const active = doc.fullscreenElement || doc.webkitFullscreenElement
    if (active) {
      ;(doc.exitFullscreen || doc.webkitExitFullscreen)?.call(doc)
    } else if (root.requestFullscreen || root.webkitRequestFullscreen) {
      ;(root.requestFullscreen || root.webkitRequestFullscreen).call(root)
    } else {
      setFullscreen((value) => !value)
    }
  }, [])

  useEffect(() => {
    const onChange = () => setFullscreen(Boolean(document.fullscreenElement || document.webkitFullscreenElement))
    document.addEventListener('fullscreenchange', onChange)
    document.addEventListener('webkitfullscreenchange', onChange)
    return () => {
      document.removeEventListener('fullscreenchange', onChange)
      document.removeEventListener('webkitfullscreenchange', onChange)
    }
  }, [])

  // ---------- Auto-hide controls while playing ----------
  const revealControls = useCallback(() => {
    setControlsVisible(true)
    clearTimeout(hideTimer.current)
    hideTimer.current = setTimeout(() => setControlsVisible(false), 2800)
  }, [])

  useEffect(() => () => clearTimeout(hideTimer.current), [])

  const showControls = !playing || controlsVisible || menu !== null

  // ---------- Keyboard shortcuts ----------
  const onKeyDown = (event) => {
    if (status !== 'ready') return
    const tag = event.target.tagName
    const onSlider = tag === 'INPUT'
    switch (event.key) {
      case ' ':
      case 'k':
      case 'K':
        if (tag === 'BUTTON' && event.key === ' ') return
        event.preventDefault()
        togglePlay()
        break
      case 'ArrowLeft':
        if (onSlider) return
        event.preventDefault()
        seek(time - 5)
        break
      case 'ArrowRight':
        if (onSlider) return
        event.preventDefault()
        seek(time + 5)
        break
      case 'j':
      case 'J':
        seek(time - 10)
        break
      case 'l':
      case 'L':
        seek(time + 10)
        break
      case 'm':
      case 'M':
        setMuted((value) => !value)
        break
      case 'f':
      case 'F':
        toggleFullscreen()
        break
      case 'c':
      case 'C':
        chooseCaptions(captions === 'off' ? 'hi' : captions === 'hi' ? 'en' : 'off')
        break
      case 'Escape':
        setMenu(null)
        break
      default:
        return
    }
    revealControls()
  }

  // ---------- Derived playback state ----------
  const scenes = timeline?.scenes ?? NO_ITEMS
  const sceneIndex = scenes.length ? indexAt(scenes, time) : 0
  const scene = scenes[sceneIndex]
  const sceneCues = scene?.cues ?? NO_ITEMS
  const cueIndex = sceneCues.length ? indexAt(sceneCues, time) : 0
  const activeCue = sceneCues[cueIndex]
  const cueIsSpoken = activeCue && time >= activeCue.start && time <= activeCue.end + 0.35
  const highlight = useMemo(() => {
    let value = -1
    for (const cue of sceneCues) {
      if (cue.start > time) break
      if (typeof cue.highlight === 'number') value = cue.highlight
    }
    return value
  }, [sceneCues, time])

  const allCues = useMemo(() => scenes.flatMap((s, si) => s.cues.map((cue, ci) => ({ ...cue, key: `${si}-${ci}`, scene: s }))), [scenes])
  const activeCueKey = activeCue && started ? `${sceneIndex}-${cueIndex}` : null

  // Keep the active transcript line in view without scrolling the page
  useEffect(() => {
    const panel = transcriptRef.current
    if (!panel || !activeCueKey) return
    const line = panel.querySelector(`[data-cue="${activeCueKey}"]`)
    if (!line) return
    const top = line.offsetTop - panel.clientHeight / 2 + line.clientHeight / 2
    panel.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' })
  }, [activeCueKey, reduceMotion, showTranscript])

  const progress = duration ? Math.min(100, (time / duration) * 100) : 0
  const VolumeIcon = muted || volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2

  // ---------- Render ----------
  if (status === 'unavailable') {
    return <PreparingState title={title} storyboard={storyboard} />
  }

  return (
    <div className="vp-wrap">
      <div
        ref={rootRef}
        className={`vp-root${fullscreen ? ' is-fullscreen' : ''}${showControls ? '' : ' is-idle'}`}
        tabIndex={0}
        role="region"
        aria-label={`${title} explanation video player`}
        onKeyDown={onKeyDown}
        onPointerMove={revealControls}
        onFocus={revealControls}
      >
        {status === 'ready' && (
          <audio
            ref={audioRef}
            src={`${base}${timeline.audio}`}
            preload="metadata"
            onLoadedMetadata={(event) => Number.isFinite(event.currentTarget.duration) && setDuration(event.currentTarget.duration)}
            onPlay={() => {
              setPlaying(true)
              revealControls()
            }}
            onPause={() => {
              setPlaying(false)
              setTime(audioRef.current?.currentTime ?? 0)
            }}
            onEnded={() => {
              setPlaying(false)
              setEnded(true)
            }}
            onSeeked={(event) => setTime(event.currentTarget.currentTime)}
            onWaiting={() => setBuffering(true)}
            onPlaying={() => setBuffering(false)}
            onCanPlay={() => setBuffering(false)}
            onError={() => setAudioError(true)}
          />
        )}

        <div className={`vp-stage${playing ? '' : ' is-paused'}`} onClick={() => status === 'ready' && (setMenu(null), togglePlay())}>
          {status === 'loading' && (
            <div className="vp-center">
              <Loader2 className="vp-spin" aria-hidden="true" />
              <span>Loading explanation video…</span>
            </div>
          )}

          {status === 'ready' && scene && (
            <AnimatePresence mode="wait">
              <motion.div
                key={scene.id}
                className="vp-scene-layer"
                initial={{ opacity: 0, scale: reduceMotion ? 1 : 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.98 }}
                transition={{ duration: reduceMotion ? 0.1 : 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <VideoScene scene={scene} highlight={highlight} icon={icon} serviceTitle={title} />
              </motion.div>
            </AnimatePresence>
          )}

          {status === 'ready' && (!started || ended) && (
            <button
              type="button"
              className="vp-big-play"
              onClick={(event) => {
                event.stopPropagation()
                togglePlay()
              }}
              aria-label={ended ? 'Replay video' : 'Play video'}
            >
              <span className="vp-big-play-icon">{ended ? <RotateCcw aria-hidden="true" /> : <Play aria-hidden="true" />}</span>
              <span className="vp-big-play-label">
                {ended ? 'Watch again' : 'Play full explanation'}
                <small>{formatTime(duration)} · Hindi / Hinglish narration</small>
              </span>
            </button>
          )}

          {buffering && playing && (
            <div className="vp-center vp-center--overlay" aria-hidden="true">
              <Loader2 className="vp-spin" />
            </div>
          )}

          {audioError && (
            <div className="vp-center vp-center--overlay" role="alert">
              <span>The narration could not be loaded. Please check your connection.</span>
              <button
                type="button"
                className="vp-retry"
                onClick={(event) => {
                  event.stopPropagation()
                  setAudioError(false)
                  audioRef.current?.load()
                }}
              >
                Retry
              </button>
            </div>
          )}
        </div>

        {/* Overlaid on larger screens; a dedicated strip below the controls on phones */}
        {status === 'ready' && captions !== 'off' && (
          <div className="vp-caption" aria-hidden="true">
            {cueIsSpoken && started && <span lang={captions === 'hi' ? 'hi' : 'en'}>{activeCue[captions]}</span>}
          </div>
        )}

        {/* Screen-reader live captions */}
        <p className="vp-sr-only" aria-live="polite">
          {playing && cueIsSpoken ? activeCue.en : ''}
        </p>

        {status === 'ready' && (
          <div className={`vp-controls${showControls ? '' : ' is-hidden'}`} onClick={(event) => event.stopPropagation()}>
            <div className="vp-seek">
              <div className="vp-seek-track" aria-hidden="true">
                <span className="vp-seek-fill" style={{ width: `${progress}%` }} />
                {scenes.slice(1).map((s) => (
                  <span key={s.id} className="vp-seek-marker" style={{ left: `${(s.start / duration) * 100}%` }} />
                ))}
              </div>
              <input
                type="range"
                min={0}
                max={duration || 0}
                step={0.1}
                value={Math.min(time, duration || 0)}
                onChange={(event) => seek(Number(event.target.value))}
                aria-label="Seek"
                aria-valuetext={`${formatTime(time)} of ${formatTime(duration)}${scene ? `, ${scene.chapter}` : ''}`}
              />
            </div>

            <div className="vp-bar">
              <div className="vp-bar-group">
                <button type="button" className="vp-btn" onClick={togglePlay} aria-label={playing ? 'Pause' : 'Play'}>
                  {playing ? <Pause /> : <Play />}
                </button>
                <button type="button" className="vp-btn vp-hide-xs" onClick={() => seek(time - 10)} aria-label="Back 10 seconds">
                  <RotateCcw />
                </button>
                <button type="button" className="vp-btn vp-hide-xs" onClick={() => seek(time + 10)} aria-label="Forward 10 seconds">
                  <RotateCw />
                </button>

                <div className="vp-volume">
                  <button type="button" className="vp-btn" onClick={() => setMuted((value) => !value)} aria-label={muted ? 'Unmute' : 'Mute'}>
                    <VolumeIcon />
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={muted ? 0 : volume}
                    onChange={(event) => changeVolume(Number(event.target.value))}
                    aria-label="Volume"
                    aria-valuetext={`${Math.round((muted ? 0 : volume) * 100)}%`}
                    style={{ '--vp-vol': `${(muted ? 0 : volume) * 100}%` }}
                  />
                </div>

                <span className="vp-time" aria-live="off">
                  <span>{formatTime(time)}</span> / <span>{formatTime(duration)}</span>
                </span>
              </div>

              <div className="vp-bar-group">
                <span className="vp-chapter-label">{scene?.chapter}</span>

                <div className="vp-menu-wrap">
                  <button
                    type="button"
                    className="vp-btn vp-btn--text"
                    onClick={() => setMenu(menu === 'speed' ? null : 'speed')}
                    aria-label={`Playback speed ${rate}x`}
                    aria-haspopup="true"
                    aria-expanded={menu === 'speed'}
                  >
                    <Gauge />
                    <span>{rate}x</span>
                  </button>
                  {menu === 'speed' && (
                    <div className="vp-menu" role="group" aria-label="Playback speed">
                      {SPEEDS.map((value) => (
                        <button
                          key={value}
                          type="button"
                          className={value === rate ? 'is-active' : ''}
                          aria-pressed={value === rate}
                          onClick={() => {
                            setRate(value)
                            setMenu(null)
                          }}
                        >
                          {value === 1 ? 'Normal' : `${value}x`}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="vp-menu-wrap">
                  <button
                    type="button"
                    className={`vp-btn${captions !== 'off' ? ' is-on' : ''}`}
                    onClick={() => setMenu(menu === 'captions' ? null : 'captions')}
                    aria-label="Subtitles"
                    aria-haspopup="true"
                    aria-expanded={menu === 'captions'}
                  >
                    {captions === 'off' ? <CaptionsOff /> : <Captions />}
                  </button>
                  {menu === 'captions' && (
                    <div className="vp-menu" role="group" aria-label="Subtitles">
                      {CAPTION_OPTIONS.map((option) => (
                        <button
                          key={option.id}
                          type="button"
                          className={option.id === captions ? 'is-active' : ''}
                          aria-pressed={option.id === captions}
                          onClick={() => chooseCaptions(option.id)}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  className={`vp-btn${showTranscript ? ' is-on' : ''}`}
                  onClick={() => setShowTranscript((value) => !value)}
                  aria-label={showTranscript ? 'Hide transcript' : 'Show transcript'}
                  aria-pressed={showTranscript}
                >
                  <FileText />
                </button>

                <button type="button" className="vp-btn" onClick={toggleFullscreen} aria-label={fullscreen ? 'Exit fullscreen' : 'Fullscreen'}>
                  {fullscreen ? <Minimize /> : <Maximize />}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {status === 'ready' && (
        <>
          <ol className="vp-chapters" aria-label="Video chapters">
            {scenes.map((s, index) => (
              <li key={s.id}>
                <button
                  type="button"
                  className={index === sceneIndex && started ? 'is-active' : index < sceneIndex ? 'is-done' : ''}
                  onClick={() => {
                    seek(s.start)
                    if (audioRef.current?.paused) togglePlay()
                  }}
                >
                  <span className="vp-chapter-num">{String(index + 1).padStart(2, '0')}</span>
                  <span className="vp-chapter-title">{s.chapter}</span>
                  <span className="vp-chapter-time">{formatTime(s.start)}</span>
                </button>
              </li>
            ))}
          </ol>

          <AnimatePresence initial={false}>
            {showTranscript && (
              <motion.section
                className="vp-transcript"
                aria-label="Transcript"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="vp-transcript-head">
                  <strong>Transcript</strong>
                  <span>Select a line to jump to it</span>
                </div>
                <div className="vp-transcript-body" ref={transcriptRef}>
                  {allCues.map((cue) => (
                    <button
                      key={cue.key}
                      type="button"
                      data-cue={cue.key}
                      className={`vp-line${cue.key === activeCueKey ? ' is-active' : ''}`}
                      onClick={() => seek(cue.start)}
                    >
                      <span className="vp-line-time">{formatTime(cue.start)}</span>
                      <span className="vp-line-text">
                        <span lang="hi">{cue.hi}</span>
                        <span lang="en">{cue.en}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  )
}

/** Shown when narration has not been generated yet: honest status plus the storyboard. */
function PreparingState({ title, storyboard }) {
  return (
    <div className="vp-wrap">
      <div className="vp-preparing">
        <span className="vp-preparing-icon">
          <Clapperboard aria-hidden="true" />
        </span>
        <h3>The {title} explanation video is being prepared</h3>
        <p>
          The narrated video will appear here once its Hindi / Hinglish narration has been generated.
          {storyboard ? ' Here is the storyboard it will follow:' : ''}
        </p>
        {storyboard && (
          <ol className="vp-storyboard">
            {storyboard.scenes.map((scene, index) => (
              <li key={scene.id}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <strong>{scene.chapter}</strong>
                  <p>{scene.cues[0]?.en}</p>
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  )
}
