"""
Generate themed concept preview images for the portfolio project cards.

Writes public/images/projects/<slug>.svg (800 x 450) in the Deep Forest + Mint
theme. Each image is a mockup of the kind of product the project is (dashboard,
website, mobile app, ...), labelled with that project's own name and modules.
Replace any file with a real screenshot of the same name to use it instead.

Usage: python scripts/generate-project-images.py
"""

from pathlib import Path
from xml.sax.saxutils import escape

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'public' / 'images' / 'projects'

FOREST, SURFACE, CARD = '#071B17', '#102D26', '#163B32'
MINT, MINT2, PALE, MUTED, LINE = '#45D6A0', '#83F0C2', '#DFF8EF', '#9CB8AE', '#24483E'
FONT = "font-family=\"Inter, 'Segoe UI', system-ui, sans-serif\""


def t(x, y, text, size=12, fill=PALE, weight=500, anchor='start', opacity=1):
    return (f'<text x="{x}" y="{y}" {FONT} font-size="{size}" font-weight="{weight}" '
            f'fill="{fill}" text-anchor="{anchor}" opacity="{opacity}">{escape(text)}</text>')


def rect(x, y, w, h, r=8, fill=CARD, stroke=None, opacity=1, extra=''):
    s = f' stroke="{stroke}" stroke-width="1"' if stroke else ''
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{fill}"{s} opacity="{opacity}" {extra}/>'


def bar(x, y, w, h=6, fill=MUTED, opacity=0.35):
    return rect(x, y, w, h, r=h / 2, fill=fill, opacity=opacity)


def frame(body):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0D2A23"/><stop offset="1" stop-color="{FOREST}"/></linearGradient>
  <radialGradient id="glow" cx="0.8" cy="0.1" r="0.7"><stop offset="0" stop-color="{MINT}" stop-opacity="0.28"/><stop offset="1" stop-color="{MINT}" stop-opacity="0"/></radialGradient>
  <linearGradient id="mint" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="{MINT2}"/><stop offset="1" stop-color="#2BB983"/></linearGradient>
  <linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{MINT}" stop-opacity="0.45"/><stop offset="1" stop-color="{MINT}" stop-opacity="0"/></linearGradient>
  <linearGradient id="win" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#123A30"/><stop offset="1" stop-color="#0A231C"/></linearGradient>
  <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0V32" fill="none" stroke="{PALE}" stroke-opacity="0.035"/></pattern>
  <filter id="shadow" x="-10%" y="-10%" width="120%" height="130%"><feDropShadow dx="0" dy="14" stdDeviation="16" flood-color="#000" flood-opacity="0.55"/></filter>
</defs>
<rect width="800" height="450" fill="url(#bg)"/>
<rect width="800" height="450" fill="url(#grid)"/>
<rect width="800" height="450" fill="url(#glow)"/>
{body}
</svg>'''


def window(x, y, w, h, url=None):
    parts = [rect(x, y, w, h, r=14, fill='url(#win)', stroke='rgba(69,214,160,0.35)', extra='filter="url(#shadow)"')]
    parts.append(f'<path d="M{x} {y + 14} a14 14 0 0 1 14 -14 h{w - 28} a14 14 0 0 1 14 14 v16 h-{w} z" fill="#0A231C"/>')
    for i, c in enumerate([MINT, MUTED, MUTED]):
        parts.append(f'<circle cx="{x + 18 + i * 13}" cy="{y + 15}" r="4" fill="{c}" opacity="{1 if i == 0 else 0.45}"/>')
    if url:
        parts.append(rect(x + 70, y + 7, 220, 16, r=8, fill=SURFACE))
        parts.append(t(x + 82, y + 19, url, 10, MUTED))
    return ''.join(parts)


def sparkline(x, y, w, h, points, stroke=MINT):
    step = w / (len(points) - 1)
    coords = [(x + i * step, y + h - p * h) for i, p in enumerate(points)]
    line = ' '.join(f'{a:.1f},{b:.1f}' for a, b in coords)
    area = f'M{coords[0][0]:.1f},{y + h} L' + ' L'.join(f'{a:.1f},{b:.1f}' for a, b in coords) + f' L{coords[-1][0]:.1f},{y + h} Z'
    return f'<path d="{area}" fill="url(#area)"/><polyline points="{line}" fill="none" stroke="{stroke}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>'


def bars(x, y, w, h, values, gap=8):
    bw = (w - gap * (len(values) - 1)) / len(values)
    out = []
    for i, v in enumerate(values):
        bh = h * v
        out.append(rect(x + i * (bw + gap), y + h - bh, bw, bh, r=3, fill='url(#mint)', opacity=0.55 + 0.45 * v))
    return ''.join(out)


def pill(x, y, text, fill='rgba(69,214,160,0.15)', color=MINT2, w=None):
    w = w or (len(text) * 6.2 + 16)
    return rect(x, y, w, 18, r=9, fill=fill) + t(x + w / 2, y + 12.5, text, 9.5, color, 700, 'middle')


# ---------------------------------------------------------------------------
# Templates
# ---------------------------------------------------------------------------
def dashboard(p):
    x, y, w, h = 50, 34, 700, 384
    out = [window(x, y, w, h)]
    # sidebar
    out.append(rect(x + 1, y + 30, 150, h - 31, r=0, fill='#081D18'))
    out.append(f'<circle cx="{x + 24}" cy="{y + 54}" r="9" fill="url(#mint)"/>')
    out.append(t(x + 40, y + 58, p['title'], 12, PALE, 800))
    for i, item in enumerate(p['nav']):
        yy = y + 86 + i * 30
        if i == 0:
            out.append(rect(x + 10, yy - 14, 130, 24, r=7, fill='rgba(69,214,160,0.16)'))
        out.append(rect(x + 20, yy - 6, 8, 8, r=2, fill=MINT if i == 0 else MUTED, opacity=1 if i == 0 else 0.5))
        out.append(t(x + 36, yy + 2, item, 10.5, PALE if i == 0 else MUTED, 600 if i == 0 else 500))
    cx = x + 168
    out.append(t(cx, y + 60, p['heading'], 15, '#FFFFFF', 800))
    out.append(rect(x + w - 190, y + 44, 120, 22, r=11, fill=SURFACE))
    out.append(t(x + w - 178, y + 59, 'Search…', 10, MUTED))
    out.append(f'<circle cx="{x + w - 40}" cy="{y + 55}" r="11" fill="{CARD}" stroke="{MINT}" stroke-opacity="0.5"/>')
    # KPI cards
    kw = (w - 168 - 18 - 2 * 12) / 3
    for i, label in enumerate(p['kpis']):
        kx = cx + i * (kw + 12)
        out.append(rect(kx, y + 78, kw, 64, r=10, fill=CARD, stroke='rgba(69,214,160,0.15)'))
        out.append(t(kx + 12, y + 98, label, 10, MUTED, 600))
        out.append(bar(kx + 12, y + 110, kw * 0.45, 9, PALE, 0.8))
        out.append(sparkline(kx + kw * 0.58, y + 102, kw * 0.34, 26, [0.2, 0.45, 0.35, 0.6, 0.55, 0.85][i:] + [0.7, 0.9][: i + 1]))
    # chart + list
    cy = y + 156
    chart_w = (w - 168 - 18) * 0.56
    out.append(rect(cx, cy, chart_w, h - 170, r=10, fill=CARD, stroke='rgba(69,214,160,0.15)'))
    out.append(t(cx + 14, cy + 22, p['chart'], 11, PALE, 700))
    if p.get('chart_type') == 'line':
        out.append(sparkline(cx + 14, cy + 40, chart_w - 28, h - 230, [0.15, 0.3, 0.25, 0.45, 0.4, 0.62, 0.58, 0.8, 0.9]))
    else:
        out.append(bars(cx + 14, cy + 40, chart_w - 28, h - 230, [0.35, 0.55, 0.42, 0.7, 0.6, 0.82, 0.74, 0.95]))
    lx = cx + chart_w + 12
    lw = w - 168 - 18 - chart_w - 12
    out.append(rect(lx, cy, lw, h - 170, r=10, fill=CARD, stroke='rgba(69,214,160,0.15)'))
    out.append(t(lx + 14, cy + 22, p['list'], 11, PALE, 700))
    for i, (label, status) in enumerate(p['rows']):
        ry = cy + 40 + i * 34
        out.append(rect(lx + 10, ry, lw - 20, 28, r=7, fill='#0D2822'))
        out.append(t(lx + 20, ry + 18, label, 10, PALE, 600))
        out.append(pill(lx + lw - 20 - (len(status) * 6.2 + 16), ry + 5, status))
    return frame(''.join(out))


def website(p):
    x, y, w, h = 70, 30, 660, 392
    out = [window(x, y, w, h, p['url'])]
    # site nav
    out.append(f'<circle cx="{x + 30}" cy="{y + 54}" r="8" fill="url(#mint)"/>')
    out.append(t(x + 44, y + 58, p['title'], 12, PALE, 800))
    for i, item in enumerate(p['nav']):
        out.append(t(x + w - 300 + i * 66, y + 58, item, 10, MUTED, 600))
    out.append(rect(x + 24, y + 76, w - 48, 170, r=12, fill='rgba(69,214,160,0.08)', stroke='rgba(69,214,160,0.2)'))
    out.append(pill(x + 44, y + 96, p['eyebrow']))
    for i, line in enumerate(p['headline']):
        out.append(t(x + 44, y + 140 + i * 28, line, 22, '#FFFFFF' if i == 0 else MINT2, 800))
    out.append(bar(x + 44, y + 186, 220, 7, MUTED, 0.4))
    out.append(bar(x + 44, y + 200, 170, 7, MUTED, 0.3))
    out.append(rect(x + 44, y + 216, 104, 24, r=12, fill='url(#mint)'))
    out.append(t(x + 96, y + 232, p['cta'], 10, FOREST, 800, 'middle'))
    out.append(p['art'](x + w - 270, y + 90))
    # cards row
    cw = (w - 48 - 2 * 12) / 3
    for i, label in enumerate(p['cards']):
        cx = x + 24 + i * (cw + 12)
        out.append(rect(cx, y + 262, cw, 110, r=10, fill=CARD, stroke='rgba(69,214,160,0.15)'))
        out.append(rect(cx + 12, y + 276, cw - 24, 46, r=7, fill='#0D2822'))
        out.append(f'<path d="M{cx + 12} {y + 322} l{(cw - 24) * 0.35:.0f} -26 l{(cw - 24) * 0.25:.0f} 16 l{(cw - 24) * 0.4:.0f} -22 v32 z" fill="{MINT}" opacity="0.35"/>')
        out.append(t(cx + 12, y + 342, label, 11, PALE, 700))
        out.append(bar(cx + 12, y + 352, cw * 0.55, 6, MUTED, 0.35))
    return frame(''.join(out))


def solar_art(x, y):
    out = [f'<circle cx="{x + 210}" cy="{y + 18}" r="22" fill="#F5D78E" opacity="0.85"/>']
    for r in range(2):
        for c in range(4):
            px, py = x + 20 + c * 52 + r * 18, y + 60 + r * 46
            out.append(f'<path d="M{px} {py} h44 l-10 38 h-44 z" fill="#0F3D31" stroke="{MINT}" stroke-opacity="0.6"/>')
            out.append(f'<path d="M{px + 22} {py} l-10 38 M{px - 5} {py + 19} h44" stroke="{MINT}" stroke-opacity="0.4"/>')
    return ''.join(out)


def shop_art(x, y):
    out = []
    for i in range(4):
        px, py = x + 20 + (i % 2) * 118, y + (i // 2) * 76
        out.append(rect(px, py, 108, 68, r=9, fill=CARD, stroke='rgba(69,214,160,0.2)'))
        out.append(rect(px + 8, py + 8, 36, 36, r=6, fill='rgba(69,214,160,0.25)'))
        out.append(bar(px + 52, py + 14, 46, 6, PALE, 0.7))
        out.append(bar(px + 52, py + 28, 30, 6, MUTED, 0.4))
        out.append(pill(px + 52, py + 42, 'Add', w=38))
    return ''.join(out)


def estate_art(x, y):
    out = [rect(x + 10, y, 236, 140, r=10, fill='#0D2822', stroke='rgba(69,214,160,0.2)')]
    out.append(f'<path d="M{x + 10} {y + 90} C {x + 80} {y + 60}, {x + 140} {y + 120}, {x + 246} {y + 70}" stroke="{LINE}" stroke-width="10" fill="none"/>')
    for px, py in [(60, 40), (150, 52), (200, 100), (100, 108)]:
        out.append(f'<path d="M{x + px} {y + py + 18} c0 -10 -12 -14 -12 -26 a12 12 0 0 1 24 0 c0 12 -12 16 -12 26z" fill="url(#mint)"/>')
        out.append(f'<circle cx="{x + px}" cy="{y + py - 8}" r="4" fill="{FOREST}"/>')
    return ''.join(out)


def banquet_art(x, y):
    out = [rect(x + 10, y, 236, 140, r=10, fill='#0D2822', stroke='rgba(69,214,160,0.2)')]
    out.append(f'<path d="M{x + 38} {y + 130} A 80 75 0 0 1 {x + 218} {y + 130}" stroke="{MINT}" stroke-width="2.5" fill="none" opacity="0.8"/>')
    out.append(f'<path d="M{x + 58} {y + 130} A 60 55 0 0 1 {x + 198} {y + 130}" stroke="{MINT2}" stroke-width="1.5" stroke-dasharray="4 4" fill="none" opacity="0.6"/>')
    out.append(f'<line x1="{x + 128}" y1="{y + 12}" x2="{x + 128}" y2="{y + 40}" stroke="{PALE}" stroke-width="2"/>')
    out.append(f'<polygon points="{x + 110},{y + 40} {x + 146},{y + 40} {x + 128},{y + 64}" fill="url(#mint)" opacity="0.85"/>')
    out.append(f'<circle cx="{x + 128}" cy="{y + 72}" r="5" fill="#F5D78E"/>')
    for lx in [60, 96, 160, 196]:
        out.append(f'<circle cx="{x + lx}" cy="{y + 36}" r="3.5" fill="#F5D78E" opacity="0.9"/>')
    out.append(rect(x + 40, y + 108, 176, 22, r=4, fill='#163B32', stroke='rgba(69,214,160,0.4)'))
    out.append(t(x + 128, y + 123, 'RESERVATION STAGE', 9, PALE, 700, 'middle'))
    return ''.join(out)


def driving_art(x, y):
    out = [rect(x + 10, y, 236, 140, r=10, fill='#0D2822', stroke='rgba(69,214,160,0.2)')]
    out.append(f'<path d="M{x + 30} {y + 140} C {x + 70} {y + 80}, {x + 110} {y + 90}, {x + 160} {y + 20}" stroke="{LINE}" stroke-width="36" fill="none" stroke-linecap="round"/>')
    out.append(f'<path d="M{x + 30} {y + 140} C {x + 70} {y + 80}, {x + 110} {y + 90}, {x + 160} {y + 20}" stroke="{MINT}" stroke-width="2.5" fill="none" stroke-dasharray="8 6"/>')
    cx, cy = x + 100, y + 74
    out.append(rect(cx - 24, cy - 14, 48, 28, r=8, fill='url(#mint)', stroke='#FFFFFF'))
    out.append(f'<circle cx="{cx - 14}" cy="{cy + 14}" r="5" fill="{FOREST}"/>')
    out.append(f'<circle cx="{cx + 14}" cy="{cy + 14}" r="5" fill="{FOREST}"/>')
    out.append(t(cx, cy + 3, 'L', 14, FOREST, 800, 'middle'))
    out.append(rect(x + 162, y + 85, 74, 45, r=6, fill='#163B32', stroke='rgba(69,214,160,0.4)'))
    out.append(t(x + 199, y + 103, 'RTO PASS', 8.5, PALE, 700, 'middle'))
    out.append(f'<circle cx="{x + 199}" cy="{y + 118}" r="6" fill="{MINT}"/>')
    return ''.join(out)


def trust_art(x, y):
    out = [rect(x + 10, y, 236, 140, r=10, fill='#0D2822', stroke='rgba(69,214,160,0.2)')]
    out.append(f'<circle cx="{x + 128}" cy="{y + 60}" r="38" fill="rgba(69,214,160,0.12)" stroke="{MINT}" stroke-width="2"/>')
    out.append(f'<circle cx="{x + 128}" cy="{y + 60}" r="28" fill="url(#win)" stroke="{MINT2}" stroke-width="1.5" stroke-dasharray="3 3"/>')
    out.append(f'<polygon points="{x + 128},{y + 44} {x + 152},{y + 55} {x + 128},{y + 66} {x + 104},{y + 55}" fill="url(#mint)"/>')
    out.append(f'<path d="M{x + 112} {y + 60} v10 c0 6 32 6 32 0 v-10" fill="url(#mint)" opacity="0.8"/>')
    out.append(f'<line x1="{x + 150}" y1="{y + 56}" x2="{x + 154}" y2="{y + 72}" stroke="#F5D78E" stroke-width="2"/>')
    out.append(rect(x + 36, y + 108, 80, 20, r=10, fill='#163B32', stroke='rgba(69,214,160,0.3)'))
    out.append(t(x + 76, y + 122, 'SKILL DEV', 8.5, PALE, 700, 'middle'))
    out.append(rect(x + 138, y + 108, 80, 20, r=10, fill='#163B32', stroke='rgba(69,214,160,0.3)'))
    out.append(t(x + 178, y + 122, 'COMMUNITY', 8.5, MINT2, 700, 'middle'))
    return ''.join(out)


def lighting_art(x, y):
    out = [rect(x + 10, y, 236, 140, r=10, fill='#0D2822', stroke='rgba(69,214,160,0.2)')]
    out.append(rect(x + 20, y + 16, 216, 8, r=3, fill='#163B32', stroke='rgba(69,214,160,0.5)'))
    spots = [(46, '#45D6A0'), (92, '#F5D78E'), (138, '#83F0C2'), (184, '#45D6A0')]
    for sx, col in spots:
        out.append(f'<polygon points="{x + sx - 5},{y + 24} {x + sx + 5},{y + 24} {x + sx + 25},{y + 134} {x + sx - 25},{y + 134}" fill="{col}" opacity="0.18"/>')
        out.append(f'<circle cx="{x + sx}" cy="{y + 24}" r="5" fill="{col}"/>')
    out.append(rect(x + 35, y + 106, 186, 24, r=6, fill='#0A231C', stroke='rgba(69,214,160,0.3)'))
    out.append(t(x + 128, y + 122, 'EVENT LIGHT & SOUND', 9, PALE, 700, 'middle'))
    return ''.join(out)


def college_art(x, y):
    out = [rect(x + 10, y, 236, 140, r=10, fill='#0D2822', stroke='rgba(69,214,160,0.2)')]
    out.append(f'<polygon points="{x + 128},{y + 16} {x + 40},{y + 44} {x + 216},{y + 44}" fill="url(#mint)" opacity="0.8"/>')
    out.append(rect(x + 46, y + 44, 164, 8, r=2, fill='#163B32', stroke='rgba(69,214,160,0.4)'))
    for px in [60, 100, 152, 192]:
        out.append(rect(x + px - 4, y + 52, 10, 52, r=2, fill='url(#win)', stroke='rgba(69,214,160,0.3)'))
    out.append(rect(x + 40, y + 104, 176, 8, r=2, fill='#163B32', stroke='rgba(69,214,160,0.4)'))
    out.append(rect(x + 60, y + 116, 136, 18, r=9, fill='rgba(69,214,160,0.18)'))
    out.append(t(x + 128, y + 128.5, 'ACADEMIC CAMPUS', 8.5, PALE, 700, 'middle'))
    return ''.join(out)


def mobile(p):
    out = []
    for i, screen in enumerate(p['screens']):
        px, py = 230 + i * 210, 40 + i * 18
        rot = -6 if i == 0 else 6
        out.append(f'<g transform="rotate({rot} {px + 85} {py + 185})" filter="url(#shadow)">')
        out.append(rect(px, py, 170, 350, r=26, fill='#0A231C', stroke='rgba(156,184,174,0.45)'))
        out.append(rect(px + 8, py + 8, 154, 334, r=20, fill='url(#win)'))
        out.append(rect(px + 62, py + 14, 46, 8, r=4, fill=FOREST))
        out.append(t(px + 20, py + 46, screen['title'], 13, '#FFFFFF', 800))
        out.append(screen['body'](px + 18, py + 60))
        out.append('</g>')
    out.append(rect(48, 70, 160, 64, r=12, fill=CARD, stroke='rgba(69,214,160,0.35)', extra='filter="url(#shadow)"'))
    out.append(t(64, 96, p['title'], 13, '#FFFFFF', 800))
    out.append(t(64, 116, p['tagline'], 10, MINT2, 600))
    out.append(rect(600, 330, 150, 52, r=12, fill=CARD, stroke='rgba(69,214,160,0.35)', extra='filter="url(#shadow)"'))
    out.append(f'<circle cx="622" cy="356" r="10" fill="url(#mint)"/>')
    out.append(t(640, 352, p['toast'][0], 10.5, PALE, 700))
    out.append(t(640, 367, p['toast'][1], 9, MUTED, 500))
    return frame(''.join(out))


def list_body(items):
    def draw(x, y):
        out = []
        for i, item in enumerate(items):
            yy = y + i * 46
            out.append(rect(x, yy, 134, 38, r=9, fill=CARD))
            out.append(rect(x + 8, yy + 8, 22, 22, r=6, fill='rgba(69,214,160,0.3)'))
            out.append(t(x + 38, yy + 18, item, 9.5, PALE, 700))
            out.append(bar(x + 38, yy + 25, 50, 5, MUTED, 0.35))
        out.append(rect(x, y + len(items) * 46 + 6, 134, 30, r=15, fill='url(#mint)'))
        out.append(t(x + 67, y + len(items) * 46 + 25, 'Continue', 10, FOREST, 800, 'middle'))
        return ''.join(out)
    return draw


def map_body(label):
    def draw(x, y):
        out = [rect(x, y, 134, 200, r=12, fill='#0D2822')]
        out.append(f'<path d="M{x + 10} {y + 190} C {x + 40} {y + 140}, {x + 20} {y + 110}, {x + 70} {y + 96} S {x + 120} {y + 40}, {x + 124} {y + 14}" stroke="{LINE}" stroke-width="10" fill="none" stroke-linecap="round"/>')
        out.append(f'<path d="M{x + 10} {y + 190} C {x + 40} {y + 140}, {x + 20} {y + 110}, {x + 70} {y + 96}" stroke="{MINT}" stroke-width="3" fill="none" stroke-dasharray="5 4"/>')
        out.append(f'<circle cx="{x + 70}" cy="{y + 96}" r="7" fill="{PALE}" stroke="{MINT}" stroke-width="3"/>')
        out.append(f'<circle cx="{x + 124}" cy="{y + 14}" r="6" fill="#F5D78E"/>')
        out.append(rect(x, y + 212, 134, 46, r=10, fill=CARD))
        out.append(t(x + 12, y + 232, label, 10, PALE, 700))
        out.append(bar(x + 12, y + 242, 80, 5, MINT, 0.6))
        return ''.join(out)
    return draw


def tasks_body(items):
    def draw(x, y):
        out = []
        for i, item in enumerate(items):
            yy = y + i * 40
            done = i < 2
            out.append(rect(x, yy, 134, 32, r=8, fill=CARD))
            out.append(f'<circle cx="{x + 16}" cy="{yy + 16}" r="7" fill="{MINT if done else "none"}" stroke="{MINT}" stroke-width="1.5"/>')
            out.append(t(x + 30, yy + 20, item, 9.5, PALE if not done else MUTED, 600))
        out.append(rect(x, y + len(items) * 40 + 8, 134, 60, r=10, fill='#0D2822', stroke='rgba(69,214,160,0.25)'))
        out.append(t(x + 10, y + len(items) * 40 + 28, 'Site photo', 9.5, MUTED, 600))
        out.append(f'<path d="M{x + 10} {y + len(items) * 40 + 60} l30 -18 l20 10 l30 -20 l34 28 z" fill="{MINT}" opacity="0.4"/>')
        return ''.join(out)
    return draw


def agro(p):
    x, y, w, h = 50, 34, 700, 384
    out = [window(x, y, w, h, 'digital-agro / farm-overview')]
    out.append(t(x + 22, y + 60, p['title'] + ' · Farm overview', 15, '#FFFFFF', 800))
    out.append(pill(x + w - 120, y + 46, 'Live sensors'))
    # field map
    out.append(rect(x + 20, y + 76, 380, 290, r=12, fill='#0D2822', stroke='rgba(69,214,160,0.2)'))
    plots = [((30, 90), (180, 80), (200, 190), (40, 200)), ((190, 82), (370, 96), (360, 180), (206, 188)),
             ((44, 210), (198, 200), (190, 280), (50, 280)), ((208, 196), (358, 188), (366, 280), (200, 282))]
    shades = ['#1F7A5C', '#2BB983', '#14503E', '#45D6A0']
    for i, pts in enumerate(plots):
        d = ' '.join(f'{x + a},{y + b}' for a, b in pts)
        out.append(f'<polygon points="{d}" fill="{shades[i]}" opacity="0.55" stroke="{MINT2}" stroke-opacity="0.5"/>')
    for (a, b, label) in [(110, 140, 'Plot A'), (285, 140, 'Plot B'), (120, 245, 'Plot C'), (285, 240, 'Plot D')]:
        out.append(t(x + a, y + b, label, 11, '#FFFFFF', 700, 'middle'))
        out.append(f'<circle cx="{x + a}" cy="{y + b + 14}" r="4" fill="{PALE}"/>')
    # sensor cards
    for i, label in enumerate(['Soil moisture', 'Temperature', 'Rainfall']):
        cy = y + 76 + i * 76
        out.append(rect(x + 414, cy, 266, 66, r=10, fill=CARD, stroke='rgba(69,214,160,0.15)'))
        out.append(f'<circle cx="{x + 446}" cy="{cy + 33}" r="18" fill="none" stroke="{LINE}" stroke-width="5"/>')
        out.append(f'<circle cx="{x + 446}" cy="{cy + 33}" r="18" fill="none" stroke="{MINT}" stroke-width="5" stroke-dasharray="{60 + i * 15} 200" transform="rotate(-90 {x + 446} {cy + 33})"/>')
        out.append(t(x + 476, cy + 28, label, 11, PALE, 700))
        out.append(sparkline(x + 476, cy + 34, 180, 22, [0.3, 0.5, 0.4, 0.65, 0.55, 0.75 - i * 0.1, 0.7]))
    out.append(rect(x + 414, y + 304, 266, 62, r=10, fill=CARD, stroke='rgba(69,214,160,0.15)'))
    out.append(t(x + 428, y + 324, 'Crop cycle', 11, PALE, 700))
    for i, stage in enumerate(['Sowing', 'Growth', 'Harvest']):
        sx = x + 430 + i * 82
        out.append(rect(sx, y + 334, 74, 18, r=9, fill='url(#mint)' if i < 2 else SURFACE, opacity=1 if i < 2 else 0.9))
        out.append(t(sx + 37, y + 347, stage, 9.5, FOREST if i < 2 else MUTED, 700, 'middle'))
    return frame(''.join(out))


def marketing(p):
    x, y, w, h = 50, 34, 700, 384
    out = [window(x, y, w, h, 'analytics / campaign-performance')]
    out.append(t(x + 22, y + 60, p['title'], 15, '#FFFFFF', 800))
    out.append(pill(x + w - 140, y + 46, 'Monthly report'))
    out.append(rect(x + 20, y + 76, 420, 180, r=12, fill=CARD, stroke='rgba(69,214,160,0.15)'))
    out.append(t(x + 34, y + 98, 'Organic traffic & leads', 11, PALE, 700))
    out.append(sparkline(x + 34, y + 110, 392, 130, [0.12, 0.2, 0.18, 0.32, 0.3, 0.45, 0.5, 0.62, 0.7, 0.86]))
    out.append(rect(x + 452, y + 76, 228, 180, r=12, fill=CARD, stroke='rgba(69,214,160,0.15)'))
    out.append(t(x + 466, y + 98, 'Leads by channel', 11, PALE, 700))
    for i, (label, v) in enumerate([('Search', 0.85), ('Google Ads', 0.66), ('Social', 0.5), ('Referral', 0.32)]):
        yy = y + 116 + i * 32
        out.append(t(x + 466, yy + 10, label, 10, MUTED, 600))
        out.append(rect(x + 540, yy, 126 * v, 14, r=4, fill='url(#mint)'))
    out.append(rect(x + 20, y + 268, 330, 98, r=12, fill=CARD, stroke='rgba(69,214,160,0.15)'))
    out.append(t(x + 34, y + 290, 'Conversion funnel', 11, PALE, 700))
    for i, (label, wv) in enumerate([('Visitors', 300), ('Engaged', 220), ('Leads', 140)]):
        out.append(rect(x + 34 + (300 - wv) / 2, y + 300 + i * 20, wv, 15, r=4, fill=MINT, opacity=0.35 + i * 0.25))
        out.append(t(x + 184, y + 311 + i * 20, label, 9.5, PALE, 700, 'middle'))
    out.append(rect(x + 362, y + 268, 318, 98, r=12, fill=CARD, stroke='rgba(69,214,160,0.15)'))
    out.append(t(x + 376, y + 290, 'Keyword rankings', 11, PALE, 700))
    for i, kw in enumerate(['software company wardha', 'erp software maharashtra', 'website development']):
        yy = y + 300 + i * 20
        out.append(t(x + 376, yy + 11, kw, 9.5, MUTED, 600))
        out.append(f'<path d="M{x + 650} {yy + 12} l6 -8 l6 8" stroke="{MINT}" stroke-width="2" fill="none"/>')
    return frame(''.join(out))


PROJECTS = {
    'pyb': (dashboard, dict(title='PYB', heading='Billing workspace', nav=['Dashboard', 'Invoices', 'Clients', 'Ledger', 'Reports'],
            kpis=['Invoices', 'Collections', 'Outstanding'], chart='Monthly billing', list='Recent invoices',
            rows=[('INV-1024', 'Paid'), ('INV-1023', 'Due'), ('INV-1022', 'Paid'), ('INV-1021', 'Sent')])),
    'one-touch-app': (dashboard, dict(title='One Touch App', heading='Distribution overview', nav=['Overview', 'Orders', 'Dealers', 'Inventory', 'Dispatch'],
            kpis=['Orders', 'Dispatched', 'Stock alerts'], chart='Dealer orders', list='Dispatch queue',
            rows=[('Dealer — North', 'Packed'), ('Dealer — East', 'In transit'), ('Dealer — West', 'Delivered'), ('Dealer — City', 'Packed')])),
    'healthcare-management': (dashboard, dict(title='CareDesk', heading='Clinic dashboard', nav=['Overview', 'Patients', 'Appointments', 'Billing', 'Pharmacy'],
            kpis=['Appointments', 'Admissions', 'Pharmacy'], chart='Patient visits', chart_type='line', list="Today's schedule",
            rows=[('OPD — 10:00', 'Checked in'), ('Lab — 11:30', 'Pending'), ('OPD — 12:15', 'Booked'), ('Review — 15:00', 'Booked')])),
    'manufacturing-erp': (dashboard, dict(title='MfgERP', heading='Production pipeline', nav=['Production', 'Materials', 'Work orders', 'Quality', 'Reports'],
            kpis=['Work orders', 'Output', 'QC checks'], chart='Daily output', list='Work orders',
            rows=[('WO-311 Assembly', 'Running'), ('WO-310 Cutting', 'Done'), ('WO-309 Painting', 'QC'), ('WO-308 Packing', 'Done')])),
    'sunplus-energy': (website, dict(title='Sunplus Energy', url='sunplusenergy.in', nav=['Solutions', 'Projects', 'About', 'Contact'],
            eyebrow='SOLAR SOLUTIONS', headline=['Clean energy for', 'homes & business'], cta='Get a quote', art=solar_art,
            cards=['Rooftop solar', 'Commercial plants', 'Maintenance'])),
    'ecommerce-platform': (website, dict(title='ShopNow', url='store.example.in', nav=['Shop', 'Categories', 'Offers', 'Cart'],
            eyebrow='NEW ARRIVALS', headline=['Shop smarter,', 'delivered fast'], cta='Shop now', art=shop_art,
            cards=['Secure checkout', 'Order tracking', 'Easy returns'])),
    'real-estate-portal': (website, dict(title='HomeFinder', url='homefinder.example.in', nav=['Buy', 'Rent', 'Projects', 'Contact'],
            eyebrow='PROPERTY SEARCH', headline=['Find your next', 'home on the map'], cta='Search', art=estate_art,
            cards=['Verified listings', 'Map search', 'Site visits'])),
    'pineapple-app': (mobile, dict(title='Pineapple App', tagline='Mobile app concept', toast=('Order confirmed', 'Push notification'),
            screens=[dict(title='Discover', body=list_body(['Fresh picks', 'Daily deals', 'Combos', 'Favourites'])),
                     dict(title='Your order', body=map_body('On the way'))])),
    'contractor-app': (mobile, dict(title='Contractor App', tagline='Field operations app', toast=('Synced', 'Offline updates uploaded'),
            screens=[dict(title='Site tasks', body=tasks_body(['Check materials', 'Log attendance', 'Upload progress', 'Safety audit', 'Sign-off'])),
                     dict(title='Site route', body=map_body('Site 12 · Today'))])),
    'food-delivery-app': (mobile, dict(title='Food Delivery App', tagline='Live GPS tracking', toast=('Rider nearby', 'Arriving in a few minutes'),
            screens=[dict(title='Restaurants', body=list_body(['Thali house', 'Pizza corner', 'Biryani hub', 'Cafe & bakes'])),
                     dict(title='Track order', body=map_body('Rider on the way'))])),
    'digital-agro': (agro, dict(title='Digital Agro')),
    'digital-marketing-campaign': (marketing, dict(title='Digital Growth Campaign')),
    # New Client Projects
    'banquit-hall-sbm': (website, dict(title='Banquit Hall SBM', url='banquithall.sbm.in', nav=['Halls', 'Catering', 'Dates', 'Inquiry'],
            eyebrow='VENUE RESERVATIONS', headline=['Celebrations built', 'with grandeur & elegance'], cta='Book dates', art=banquet_art,
            cards=['AC Banquet Halls', 'Custom Menus', 'Event Ledgers'])),
    'mauli-driver-school': (website, dict(title='Mauli Driver School', url='maulidriverschool.in', nav=['Courses', 'Batches', 'RTO License', 'Contact'],
            eyebrow='DRIVING ACADEMY', headline=['Drive with confidence,', 'certified RTO training'], cta='Enroll now', art=driving_art,
            cards=['Learner License', 'Dual-Control Cars', 'Test Scheduling'])),
    'big-days-cellabration-app': (mobile, dict(title='Big Days CEllabration', tagline='Event planning app', toast=('Booking confirmed', 'Vendor allocated'),
            screens=[dict(title='Vendors', body=list_body(['Grand Banquet', 'Royal Catering', 'HD Photography', 'Floral Decor'])),
                     dict(title='Celebration', body=map_body('Venue: Main Hall'))])),
    'sarvoday-coushali-trust': (website, dict(title='Sarvoday Coushali', url='sarvodaytrust.org.in', nav=['Programs', 'Admissions', 'Impact', 'Donate'],
            eyebrow='VOCATIONAL TRUST', headline=['Empowering youth with', 'practical vocational skills'], cta='Apply online', art=trust_art,
            cards=['Certified Courses', 'Placement Cell', 'Audit Reports'])),
    'merki-expert-cold-storage': (dashboard, dict(title='Merki Cold ERP', heading='Cold storage control', nav=['Chambers', 'Produce Lots', 'Rent Billing', 'Sensors', 'Reports'],
            kpis=['Occupancy', 'Chamber Temp', 'Due Invoices'], chart='Produce intake', list='Lot queue',
            rows=[('Lot #842 Potatoes', '-2.4°C'), ('Lot #841 Onions', '3.1°C'), ('Lot #840 Apples', '-0.8°C'), ('Lot #839 Spices', '12.0°C')])),
    'merrki-expert-cold-storage': (dashboard, dict(title='Merrki Cold ERP', heading='Cold storage control', nav=['Chambers', 'Produce Lots', 'Rent Billing', 'Sensors', 'Reports'],
            kpis=['Occupancy', 'Chamber Temp', 'Due Invoices'], chart='Produce intake', list='Lot queue',
            rows=[('Lot #842 Potatoes', '-2.4°C'), ('Lot #841 Onions', '3.1°C'), ('Lot #840 Apples', '-0.8°C'), ('Lot #839 Spices', '12.0°C')])),
    'dobi-light-vondh': (website, dict(title='Dobi light Vondh', url='dobilightvondh.in', nav=['Lights', 'Sound', 'Events', 'Rentals'],
            eyebrow='ILLUMINATION & SOUND', headline=['Dazzling lighting for', 'weddings & festivals'], cta='Get quotation', art=lighting_art,
            cards=['Stage Lighting', 'Concert Sound', 'Festival Trusses'])),
    'swavlambi-collage': (website, dict(title='Swavlambi Collage', url='swavlambicollage.edu.in', nav=['Courses', 'Admissions', 'Faculty', 'Notices'],
            eyebrow='HIGHER EDUCATION', headline=['Shaping futures with', 'academic excellence'], cta='Admissions open', art=college_art,
            cards=['Degree Programs', 'Online Notices', 'Digital Syllabus'])),
    'shri-sai-solar': (website, dict(title='Shri Sai Solar', url='shrisaisolar.in', nav=['Rooftop', 'Agricultural', 'Subsidy', 'Survey'],
            eyebrow='SOLAR SOLUTIONS', headline=['Harness clean solar,', 'cut electricity bills'], cta='Calculate savings', art=solar_art,
            cards=['PM Surya Ghar', 'Net Metering', 'Free Site Survey'])),
    'i-need-Gharghuti': (mobile, dict(title='I Need Gharghuti', tagline='Agri & pasture commerce', toast=('Order dispatched', 'Fodder truck arriving'),
            screens=[dict(title='Feed Market', body=list_body(['Green Napier Grass', 'Dry Wheat Straw', 'Nutrient Silage', 'Cattle Minerals'])),
                     dict(title='Pasture Lease', body=map_body('Gharghuti Plot #18'))])),
    'i-need-gharghuti': (mobile, dict(title='I Need Gharghuti', tagline='Agri & pasture commerce', toast=('Order dispatched', 'Fodder truck arriving'),
            screens=[dict(title='Feed Market', body=list_body(['Green Napier Grass', 'Dry Wheat Straw', 'Nutrient Silage', 'Cattle Minerals'])),
                     dict(title='Pasture Lease', body=map_body('Gharghuti Plot #18'))])),
    'i-need-charghuti': (mobile, dict(title='I Need Charghuti', tagline='Agri & pasture commerce', toast=('Order dispatched', 'Fodder truck arriving'),
            screens=[dict(title='Feed Market', body=list_body(['Green Napier Grass', 'Dry Wheat Straw', 'Nutrient Silage', 'Cattle Minerals'])),
                     dict(title='Pasture Lease', body=map_body('Charghuti Plot #18'))])),
    'e-commers-need-charghah': (mobile, dict(title='I Need Gharghuti', tagline='Agri & pasture commerce', toast=('Order dispatched', 'Fodder truck arriving'),
            screens=[dict(title='Feed Market', body=list_body(['Green Napier Grass', 'Dry Wheat Straw', 'Nutrient Silage', 'Cattle Minerals'])),
                     dict(title='Pasture Lease', body=map_body('Gharghuti Plot #18'))])),
}


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    for slug, (template, config) in PROJECTS.items():
        (OUT / f'{slug}.svg').write_text(template(config), encoding='utf-8')
        print('wrote', (OUT / f'{slug}.svg').relative_to(ROOT))


if __name__ == '__main__':
    main()
