import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { Brain, Cloud, Code2, Smartphone } from 'lucide-react'
import './HeroVisual.css'

/* ==========================================================================
   Scene geometry — everything is laid out on a fixed 1000 × 720 stage that is
   scaled to the container width, so proportions match the design at any size.
   ========================================================================== */
const STAGE_W = 1000
const STAGE_H = 720
// Extra canvas headroom so the globe glow is never clipped by the stage top
const CANVAS_PAD = 110

// Laptop corners measured from the design: [top-left, top-right, bottom-right, bottom-left]
const LID_SIZE = { w: 400, h: 274 }
const LID_QUAD = [[293, 193], [692, 256], [653, 542], [259, 456]]
const DECK_SIZE = { w: 400, h: 200 }
const DECK_QUAD = [[259, 456], [653, 542], [622, 642], [74, 508]]

const GLOBE = { x: 588, y: 206, r: 214 }

const RINGS = [
  { id: 'outer', cx: 458, cy: 462, rx: 452, ry: 205, rot: -13, faint: true, comet: 14 },
  { id: 'main', cx: 410, cy: 505, rx: 392, ry: 152, rot: 8, comet: 9 },
  { id: 'base', cx: 398, cy: 594, rx: 338, ry: 80, rot: 11, comet: 7 },
]

const SERVICE_CARDS = [
  { id: 'web', title: 'Web Development', sub: 'Modern & Scalable', Icon: Code2, x: 8, y: 146, w: 200, tilt: 'rotateX(6deg) rotateY(26deg) rotateZ(12deg)', depth: 26, float: 9, duration: 6.4, delay: 0.55 },
  { id: 'ai', title: 'AI & Automation', sub: 'Smarter Solutions', Icon: Brain, x: 178, y: 30, w: 202, tilt: 'rotateX(8deg) rotateY(16deg) rotateZ(11deg)', depth: 20, float: 8, duration: 5.8, delay: 0.7 },
  { id: 'mobile', title: 'Mobile Applications', sub: 'iOS & Android', Icon: Smartphone, x: 712, y: 120, w: 214, tilt: 'rotateX(6deg) rotateY(-20deg) rotateZ(-12deg)', depth: 24, float: 10, duration: 6.8, delay: 0.85 },
  { id: 'cloud', title: 'Cloud Solutions', sub: 'Secure & Scalable', Icon: Cloud, x: 708, y: 344, w: 210, tilt: 'rotateX(4deg) rotateY(-22deg) rotateZ(-13deg)', depth: 30, float: 8, duration: 6.1, delay: 1 },
]

const CRYSTALS = [
  { id: 'c1', x: 792, y: 26, size: 64, hue: 'blue', depth: 34, duration: 14 },
  { id: 'c2', x: 428, y: 146, size: 44, hue: 'blue', depth: 16, duration: 11 },
  { id: 'c3', x: 18, y: 432, size: 56, hue: 'violet', depth: 32, duration: 16 },
]

const SPARKLES = [
  { x: 120, y: 92, s: 14, d: 0 },
  { x: 470, y: 38, s: 10, d: 1.2 },
  { x: 948, y: 300, s: 12, d: 2.1 },
  { x: 690, y: 690, s: 9, d: 0.6 },
  { x: 60, y: 640, s: 11, d: 1.7 },
  { x: 905, y: 470, s: 8, d: 2.8 },
]

/* ---------- IDE content shown on the laptop display ---------- */
const CODE_SOURCE = [
  "import { createApp } from '@cosmo/core'",
  "import { ai, cloud } from '@cosmo/sdk'",
  '',
  'const app = createApp({',
  "  name: 'cosmogeek',",
  "  region: 'ap-south-1',",
  "  scale: 'auto',",
  '})',
  '',
  'export async function deploy(project) {',
  '  const build = await app.build(project)',
  '  await cloud.ship(build, { edge: true })',
  '  return ai.optimize(build.metrics)',
  '}',
  '',
  "app.route('/api/insights', async (req) => {",
  '  const data = await ai.analyze(req.body)',
  '  return { status: 200, data }',
  '})',
  '',
  '// ship faster, scale further',
  'app.listen(8080)',
]

const TOKEN_RE = /(\/\/.*$)|('[^']*')|\b(import|from|const|export|async|function|await|return)\b|(\b\w+(?=\())|(\b\w+(?=:))|(\b\d+\b)/g
const TOKEN_CLASSES = ['cm', 'st', 'kw', 'fn', 'pr', 'nu']

function highlight(line) {
  const parts = []
  let last = 0
  TOKEN_RE.lastIndex = 0
  for (let m = TOKEN_RE.exec(line); m; m = TOKEN_RE.exec(line)) {
    if (m.index > last) parts.push([null, line.slice(last, m.index)])
    parts.push([TOKEN_CLASSES[m.slice(1).findIndex(Boolean)], m[0]])
    last = m.index + m[0].length
  }
  if (last < line.length) parts.push([null, line.slice(last)])
  return parts
}

const CODE_LINES = CODE_SOURCE.map(highlight)

const EXPLORER = [
  { name: 'cosmogeek', type: 'root' },
  { name: 'src', type: 'folder', depth: 1 },
  { name: 'components', type: 'folder', depth: 2 },
  { name: 'App.jsx', type: 'react', depth: 3 },
  { name: 'Hero.jsx', type: 'react', depth: 3, active: true },
  { name: 'services', type: 'folder', depth: 2 },
  { name: 'ai.ts', type: 'ts', depth: 3 },
  { name: 'cloud.ts', type: 'ts', depth: 3 },
  { name: 'index.css', type: 'css', depth: 2 },
  { name: 'package.json', type: 'json', depth: 1 },
  { name: 'vite.config.js', type: 'js', depth: 1 },
  { name: 'README.md', type: 'md', depth: 1 },
]

const CHART_BARS = [34, 48, 40, 62, 55, 74, 68, 88, 100]

// Keyboard layout as relative key widths per row
const KEY_ROWS = [
  Array(14).fill(1),
  [...Array(13).fill(1), 1.5],
  [1.5, ...Array(12).fill(1), 1],
  [1.8, ...Array(11).fill(1), 1.8],
  [2.3, ...Array(10).fill(1), 2.3],
  [1, 1, 1, 1.3, 5.6, 1.3, 1, 1, 1],
]

/* ==========================================================================
   Math helpers
   ========================================================================== */

/** CSS matrix3d that maps a w×h box (origin 0 0) onto an arbitrary quad. */
function quadMatrix(w, h, [[x0, y0], [x1, y1], [x2, y2], [x3, y3]]) {
  const dx1 = x1 - x2
  const dx2 = x3 - x2
  const dx3 = x0 - x1 + x2 - x3
  const dy1 = y1 - y2
  const dy2 = y3 - y2
  const dy3 = y0 - y1 + y2 - y3
  const den = dx1 * dy2 - dx2 * dy1
  const g = (dx3 * dy2 - dx2 * dy3) / den
  const k = (dx1 * dy3 - dx3 * dy1) / den
  const a = x1 - x0 + g * x1
  const b = x3 - x0 + k * x3
  const d = y1 - y0 + g * y1
  const e = y3 - y0 + k * y3
  const m = [a / w, d / w, 0, g / w, b / h, e / h, 0, k / h, 0, 0, 1, 0, x0, y0, 0, 1]
  return `matrix3d(${m.map((v) => +v.toFixed(6)).join(',')})`
}

const LID_TRANSFORM = quadMatrix(LID_SIZE.w, LID_SIZE.h, LID_QUAD)
const DECK_TRANSFORM = quadMatrix(DECK_SIZE.w, DECK_SIZE.h, DECK_QUAD)

function mulberry32(seed) {
  let t = seed >>> 0
  return () => {
    t = (t + 0x6d2b79f5) >>> 0
    let r = Math.imul(t ^ (t >>> 15), 1 | t)
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

const pts = (list) => list.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ')

const ellipsePath = (rx, ry) => `M ${-rx} 0 A ${rx} ${ry} 0 1 0 ${rx} 0 A ${rx} ${ry} 0 1 0 ${-rx} 0`
const frontArcPath = (rx, ry) => `M ${-rx} 0 A ${rx} ${ry} 0 0 0 ${rx} 0`

/* ---------- Low-poly floating rock beneath the laptop ---------- */
function buildRock() {
  const rand = mulberry32(11)
  const cx = 398
  const cy = 590
  const rx = 352
  const ry = 84
  const rot = (11 * Math.PI) / 180
  const cosR = Math.cos(rot)
  const sinR = Math.sin(rot)
  const place = (x, y) => [cx + x * cosR - y * sinR, cy + x * sinR + y * cosR]

  const cols = 18
  const drops = [0, 34, 78, 128, 196]
  const grid = drops.map((drop, r) =>
    Array.from({ length: cols + 1 }, (_, c) => {
      const a = Math.PI - (c / cols) * Math.PI
      const taper = 1 - r * 0.045
      const jx = r === 0 ? (rand() - 0.5) * 10 : (rand() - 0.5) * 34
      const jy = r === 0 ? (rand() - 0.5) * 12 : (rand() - 0.5) * 26
      const [x, y] = place(Math.cos(a) * rx * taper + jx, Math.sin(a) * ry)
      return [x, y + drop + jy]
    })
  )

  const facets = []
  for (let r = 0; r < drops.length - 1; r++) {
    for (let c = 0; c < cols; c++) {
      const tl = grid[r][c]
      const tr = grid[r][c + 1]
      const bl = grid[r + 1][c]
      const br = grid[r + 1][c + 1]
      const hue = 150 + (c / cols) * 22
      for (const [tri, bias] of [[[tl, tr, bl], 2], [[tr, br, bl], -2]]) {
        const light = Math.max(6, 27 - r * 4.5 + bias + (rand() - 0.5) * 10)
        const edge = r === 0 ? `hsl(${hue.toFixed(0)} 70% 50% / 0.55)` : `hsl(${hue.toFixed(0)} 50% 32% / 0.25)`
        facets.push({ points: pts(tri), fill: `hsl(${hue.toFixed(0)} ${r === 0 ? 50 : 38}% ${light.toFixed(1)}%)`, edge })
      }
    }
  }

  // Top plateau: a fan of facets from a point near its centre
  const plateauRim = Array.from({ length: 24 }, (_, i) => {
    const a = (i / 24) * Math.PI * 2
    return place(Math.cos(a) * rx * (0.98 + rand() * 0.04), Math.sin(a) * ry * (0.95 + rand() * 0.08))
  })
  const hub = place(-20, -8)
  const plateau = plateauRim.map((p, i) => ({
    points: pts([hub, p, plateauRim[(i + 1) % plateauRim.length]]),
    fill: `hsl(${(152 + rand() * 16).toFixed(0)} 42% ${(12 + rand() * 8).toFixed(1)}%)`,
  }))

  const rimEdge = grid[0]
  return { facets, plateau, rimEdge: pts(rimEdge) }
}

const ROCK = buildRock()

/* ==========================================================================
   Canvas renderer: dotted particle globe, network arcs, stars and bokeh
   ========================================================================== */
const CONTINENTS = [
  [48, -100, 22, 32], [64, -150, 9, 22], [22, -102, 10, 12], [72, -42, 9, 16],
  [-12, -60, 22, 15], [-38, -66, 14, 7], [52, 14, 11, 20], [64, 20, 7, 12],
  [8, 18, 20, 20], [-18, 26, 15, 12], [26, 45, 10, 12], [52, 92, 18, 46],
  [22, 79, 11, 9], [32, 112, 14, 14], [12, 104, 8, 8], [-2, 115, 6, 14],
  [-25, 134, 11, 17], [36, 138, 6, 4],
]

function isLand(lat, lon) {
  const wobble = 0.22 * Math.sin(lat * 0.21 + lon * 0.13) * Math.cos(lon * 0.17)
  return CONTINENTS.some(([la, lo, rla, rlo]) => {
    let dLon = Math.abs(lon - lo)
    if (dLon > 180) dLon = 360 - dLon
    const dLat = lat - la
    return (dLat / rla) ** 2 + (dLon / rlo) ** 2 < 1 + wobble
  })
}

function buildGlobe() {
  const rand = mulberry32(3)
  const count = 5200
  const golden = Math.PI * (3 - Math.sqrt(5))
  const land = []
  const ocean = []
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const theta = golden * i
    const x = Math.cos(theta) * r
    const z = Math.sin(theta) * r
    const lat = (Math.asin(y) * 180) / Math.PI
    const lon = (Math.atan2(z, x) * 180) / Math.PI
    if (isLand(lat, lon)) land.push({ x, y, z, spark: rand() < 0.035, phase: rand() * 6.28 })
    else if (i % 3 === 0) ocean.push({ x, y, z })
  }
  const arcs = Array.from({ length: 9 }, () => {
    const a = land[Math.floor(rand() * land.length)]
    const b = land[Math.floor(rand() * land.length)]
    return { a, b, offset: rand(), speed: 0.12 + rand() * 0.12 }
  })
  return { land, ocean, arcs }
}

function slerp(a, b, t) {
  const dot = Math.min(1, Math.max(-1, a.x * b.x + a.y * b.y + a.z * b.z))
  const omega = Math.acos(dot)
  if (omega < 1e-4) return { x: a.x, y: a.y, z: a.z }
  const s = Math.sin(omega)
  const wa = Math.sin((1 - t) * omega) / s
  const wb = Math.sin(t * omega) / s
  return { x: a.x * wa + b.x * wb, y: a.y * wa + b.y * wb, z: a.z * wa + b.z * wb }
}

function makeGlowSprite(rgb, size = 64) {
  const c = document.createElement('canvas')
  c.width = c.height = size
  const g = c.getContext('2d')
  const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  grad.addColorStop(0, `rgba(${rgb},1)`)
  grad.addColorStop(0.25, `rgba(${rgb},0.45)`)
  grad.addColorStop(1, `rgba(${rgb},0)`)
  g.fillStyle = grad
  g.fillRect(0, 0, size, size)
  return c
}

function createSceneRenderer(canvas, pointer) {
  const ctx = canvas.getContext('2d')
  const rand = mulberry32(21)
  const globe = buildGlobe()
  const sprites = {
    cyan: makeGlowSprite('126,232,192'),
    violet: makeGlowSprite('131,240,194'),
    white: makeGlowSprite('223,248,239'),
  }
  const stars = Array.from({ length: 170 }, () => ({
    x: rand() * STAGE_W,
    y: rand() * (STAGE_H + CANVAS_PAD) - CANVAS_PAD,
    r: 0.35 + rand() * 1.15,
    depth: 0.2 + rand() * 0.8,
    phase: rand() * 6.28,
    speed: 0.6 + rand() * 1.8,
    tint: rand() < 0.25 ? '223,248,239' : rand() < 0.5 ? '126,232,192' : '214,240,230',
  }))
  const bokeh = Array.from({ length: 22 }, () => ({
    x: rand() * STAGE_W,
    y: rand() * STAGE_H,
    size: 6 + rand() * 18,
    vy: 4 + rand() * 10,
    vx: (rand() - 0.5) * 6,
    alpha: 0.18 + rand() * 0.4,
    sprite: rand() < 0.5 ? 'cyan' : 'violet',
    phase: rand() * 6.28,
  }))

  let scale = 1
  let dpr = 1
  let atmosphere = null
  let raf = 0
  let running = false
  let last = 0
  let time = 8

  function renderAtmosphere() {
    const R = GLOBE.r
    const size = Math.ceil(R * 2.8)
    const px = Math.ceil(size * scale * dpr)
    const c = document.createElement('canvas')
    c.width = c.height = px
    const g = c.getContext('2d')
    g.scale((scale * dpr), (scale * dpr))
    const m = size / 2

    const halo = g.createRadialGradient(m, m, R * 0.85, m, m, R * 1.38)
    halo.addColorStop(0, 'rgba(126, 232, 192,0)')
    halo.addColorStop(0.12, 'rgba(126, 232, 192,0.2)')
    halo.addColorStop(0.35, 'rgba(56, 200, 146,0.08)')
    halo.addColorStop(1, 'rgba(56, 200, 146,0)')
    g.fillStyle = halo
    g.fillRect(0, 0, size, size)

    const body = g.createRadialGradient(m - R * 0.35, m - R * 0.4, R * 0.1, m, m, R)
    body.addColorStop(0, 'rgba(31,157,110,0.22)')
    body.addColorStop(0.75, 'rgba(7,27,23,0.35)')
    body.addColorStop(1, 'rgba(31, 157, 110,0.22)')
    g.fillStyle = body
    g.beginPath()
    g.arc(m, m, R, 0, Math.PI * 2)
    g.fill()

    // Bright atmospheric rim along the upper limb
    const rim = g.createLinearGradient(m - R, m - R, m + R, m)
    rim.addColorStop(0, 'rgba(126, 232, 192,0)')
    rim.addColorStop(0.3, 'rgba(131,240,194,0.95)')
    rim.addColorStop(0.7, 'rgba(95, 220, 170,0.75)')
    rim.addColorStop(1, 'rgba(95, 220, 170,0)')
    g.strokeStyle = rim
    g.lineCap = 'round'
    g.shadowColor = 'rgba(126, 232, 192,0.95)'
    g.shadowBlur = 22
    g.lineWidth = 2.6
    g.beginPath()
    g.arc(m, m, R + 1, Math.PI * 0.95, Math.PI * 1.95)
    g.stroke()
    g.lineWidth = 1.2
    g.stroke()
    atmosphere = { canvas: c, size }
  }

  function project(p, k, rot) {
    const x1 = p.x * rot.cosY - p.z * rot.sinY
    const z1 = p.x * rot.sinY + p.z * rot.cosY
    const y2 = p.y * rot.cosX - z1 * rot.sinX
    const z2 = p.y * rot.sinX + z1 * rot.cosX
    return [x1 * k, y2 * k, z2]
  }

  function draw(t) {
    const mx = pointer.x.get()
    const my = pointer.y.get()
    const w = canvas.width
    const h = canvas.height
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.clearRect(0, 0, w, h)
    ctx.setTransform(scale * dpr, 0, 0, scale * dpr, 0, CANVAS_PAD * scale * dpr)
    ctx.globalCompositeOperation = 'lighter'

    // Stars
    for (const s of stars) {
      const x = (((s.x - t * 3 * s.depth + mx * 10 * s.depth) % STAGE_W) + STAGE_W) % STAGE_W
      const y = s.y + my * 8 * s.depth
      ctx.globalAlpha = 0.25 + 0.55 * (0.5 + 0.5 * Math.sin(t * s.speed + s.phase))
      ctx.fillStyle = `rgb(${s.tint})`
      ctx.fillRect(x, y, s.r, s.r)
    }

    // Globe
    const gx = GLOBE.x + mx * 8
    const gy = GLOBE.y + my * 6
    const R = GLOBE.r
    ctx.globalCompositeOperation = 'source-over'
    ctx.globalAlpha = 1
    if (atmosphere) {
      ctx.drawImage(atmosphere.canvas, gx - atmosphere.size / 2, gy - atmosphere.size / 2, atmosphere.size, atmosphere.size)
    }
    ctx.globalCompositeOperation = 'lighter'

    const yaw = t * 0.11 + mx * 0.35
    const pitch = 0.42 + my * 0.12
    const rot = { cosY: Math.cos(yaw), sinY: Math.sin(yaw), cosX: Math.cos(pitch), sinX: Math.sin(pitch) }

    ctx.fillStyle = 'rgb(69, 214, 160)'
    for (const p of globe.ocean) {
      const [x, y, z] = project(p, R, rot)
      if (z < 0) continue
      ctx.globalAlpha = 0.1 + 0.22 * z
      ctx.fillRect(gx + x - 0.6, gy - y - 0.6, 1.2, 1.2)
    }

    ctx.fillStyle = 'rgb(110,224,180)'
    const sparks = []
    for (const p of globe.land) {
      const [x, y, z] = project(p, R, rot)
      if (z < -0.05) continue
      const nx = x / R
      const ny = y / R
      const lightness = Math.max(0, -0.5 * nx + 0.62 * ny + 0.6 * z)
      const size = 1.3 + 1.5 * Math.max(0, z)
      ctx.globalAlpha = Math.min(1, (0.25 + 0.75 * Math.max(0, z)) * (0.7 + 1.1 * lightness))
      ctx.fillRect(gx + x - size / 2, gy - y - size / 2, size, size)
      if (p.spark && z > 0.2) sparks.push([gx + x, gy - y, p.phase])
    }

    for (const [x, y, phase] of sparks) {
      const pulse = 0.5 + 0.5 * Math.sin(t * 2.2 + phase)
      const s = 6 + pulse * 8
      ctx.globalAlpha = 0.35 + pulse * 0.6
      ctx.drawImage(sprites.white, x - s / 2, y - s / 2, s, s)
    }

    // Network arcs with travelling data pulses
    ctx.lineWidth = 0.8
    for (const arc of globe.arcs) {
      let prev = null
      const steps = 26
      for (let i = 0; i <= steps; i++) {
        const u = i / steps
        const p = slerp(arc.a, arc.b, u)
        const lift = 1 + 0.2 * Math.sin(Math.PI * u)
        const [x, y, z] = project(p, R * lift, rot)
        const cur = [gx + x, gy - y, z]
        if (prev && prev[2] > 0 && z > 0) {
          ctx.globalAlpha = 0.18 + 0.4 * z
          ctx.strokeStyle = 'rgb(131,240,194)'
          ctx.beginPath()
          ctx.moveTo(prev[0], prev[1])
          ctx.lineTo(cur[0], cur[1])
          ctx.stroke()
        }
        prev = cur
      }
      const u = (t * arc.speed + arc.offset) % 1
      const p = slerp(arc.a, arc.b, u)
      const [x, y, z] = project(p, R * (1 + 0.2 * Math.sin(Math.PI * u)), rot)
      if (z > 0) {
        ctx.globalAlpha = 0.9 * z
        ctx.drawImage(sprites.cyan, gx + x - 7, gy - y - 7, 14, 14)
      }
    }

    // Soft drifting bokeh particles
    for (const b of bokeh) {
      const y = (((b.y - t * b.vy) % (STAGE_H + 40)) + STAGE_H + 40) % (STAGE_H + 40) - 20
      const x = b.x + Math.sin(t * 0.4 + b.phase) * 14 + t * b.vx * 0.2 + mx * 18
      ctx.globalAlpha = b.alpha * (0.6 + 0.4 * Math.sin(t * 0.9 + b.phase))
      ctx.drawImage(sprites[b.sprite], ((x % STAGE_W) + STAGE_W) % STAGE_W - b.size / 2, y + my * 12 - b.size / 2, b.size, b.size)
    }

    ctx.globalAlpha = 1
    ctx.globalCompositeOperation = 'source-over'
  }

  function frame(now) {
    if (!running) return
    time += Math.min(0.05, (now - last) / 1000)
    last = now
    draw(time)
    raf = requestAnimationFrame(frame)
  }

  return {
    resize(width, height) {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      scale = width / STAGE_W
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round((height + CANVAS_PAD * scale) * dpr)
      renderAtmosphere()
      draw(time)
    },
    start() {
      if (running) return
      running = true
      last = performance.now()
      raf = requestAnimationFrame(frame)
    },
    stop() {
      running = false
      cancelAnimationFrame(raf)
    },
  }
}

/* ==========================================================================
   Sub-components
   ========================================================================== */

/** Layer that drifts with the pointer; larger depth = closer to the viewer. */
function ParallaxLayer({ pointer, depth, className = 'cv-layer', style, children }) {
  const x = useTransform(pointer.x, (v) => v * depth)
  const y = useTransform(pointer.y, (v) => v * depth * 0.7)
  return (
    <motion.div className={className} style={{ ...style, x, y }}>
      {children}
    </motion.div>
  )
}

function RingDefs() {
  return (
    <defs>
      <linearGradient id="cv-ring-grad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#83F0C2" />
        <stop offset="0.35" stopColor="#31c48d" />
        <stop offset="0.7" stopColor="#2bb983" />
        <stop offset="1" stopColor="#7ee8c0" />
      </linearGradient>
      <linearGradient id="cv-ring-grad-front" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#83F0C2" />
        <stop offset="0.45" stopColor="#35c18e" />
        <stop offset="0.8" stopColor="#45D6A0" />
        <stop offset="1" stopColor="#c9f5e3" />
      </linearGradient>
    </defs>
  )
}

function RingStrokes({ ring, d, gradient, front }) {
  const faint = ring.faint
  return (
    <g transform={`translate(${ring.cx} ${ring.cy}) rotate(${ring.rot})`}>
      <g className={`cv-ring-sway cv-ring-sway--${ring.id}`}>
        <path d={d} stroke={gradient} strokeWidth={faint ? 8 : 28} opacity={faint ? 0.06 : 0.1} />
        <path d={d} stroke={gradient} strokeWidth={faint ? 3 : 10} opacity={faint ? 0.18 : 0.28} />
        <path
          d={d}
          stroke={gradient}
          strokeWidth={faint ? 1 : 3.2}
          opacity={faint ? 0.6 : 1}
          strokeDasharray={faint ? '2 7' : undefined}
        />
        {!faint && <path d={d} stroke="#effcf7" strokeWidth="1.2" opacity="0.75" />}
        <path
          d={d}
          pathLength="100"
          className={front ? 'cv-comet cv-comet--front' : 'cv-comet'}
          style={{ animationDuration: `${ring.comet}s` }}
          stroke="#dff8ef"
          strokeWidth={faint ? 2 : 3.5}
        />
        <path
          d={d}
          pathLength="100"
          className={front ? 'cv-comet cv-comet--front cv-comet--glow' : 'cv-comet cv-comet--glow'}
          style={{ animationDuration: `${ring.comet}s` }}
          stroke="#83F0C2"
          strokeWidth={faint ? 8 : 14}
        />
      </g>
    </g>
  )
}

function Crystal({ hue }) {
  const isBlue = hue === 'blue'
  const light = isBlue ? '#9cefcb' : '#72DDB3'
  const mid = isBlue ? '#31c48d' : '#2bb983'
  const dark = isBlue ? '#0D2822' : '#14503e'
  const c = [54, 44]
  const rim = [[50, 4], [90, 27], [88, 72], [50, 96], [12, 73], [10, 28]]
  const fills = [light, mid, dark, dark, mid, light]
  const opac = [0.95, 0.8, 0.75, 0.9, 0.7, 0.85]
  return (
    <svg viewBox="0 0 100 100" className="cv-crystal-svg" aria-hidden="true">
      {rim.map((p, i) => (
        <polygon
          key={i}
          points={pts([c, p, rim[(i + 1) % rim.length]])}
          fill={fills[i]}
          fillOpacity={opac[i]}
          stroke={light}
          strokeOpacity="0.85"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      ))}
      <polygon points={pts([[50, 4], [64, 16], c, [36, 18]])} fill="#fff" fillOpacity="0.35" />
    </svg>
  )
}

function Rocket() {
  return (
    <svg viewBox="0 0 100 150" className="cv-rocket-svg" aria-hidden="true">
      <defs>
        <linearGradient id="cv-rocket-body" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#9CB8AE" />
          <stop offset="0.45" stopColor="#ffffff" />
          <stop offset="1" stopColor="#9CB8AE" />
        </linearGradient>
        <linearGradient id="cv-rocket-fin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8BE8C1" />
          <stop offset="1" stopColor="#14503e" />
        </linearGradient>
        <radialGradient id="cv-rocket-window" cx="0.4" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#dff8ef" />
          <stop offset="0.4" stopColor="#83F0C2" />
          <stop offset="1" stopColor="#0D2822" />
        </radialGradient>
        <linearGradient id="cv-rocket-flame" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.25" stopColor="#c9f5e3" />
          <stop offset="0.6" stopColor="#2bb983" stopOpacity="0.8" />
          <stop offset="1" stopColor="#35c18e" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g className="cv-rocket-flame">
        <path d="M40 86 Q50 150 60 86 Z" fill="url(#cv-rocket-flame)" />
        <path d="M45 86 Q50 118 55 86 Z" fill="#fff" opacity="0.85" />
      </g>
      <path d="M36 58 L20 84 L22 90 L38 80 Z" fill="url(#cv-rocket-fin)" />
      <path d="M64 58 L80 84 L78 90 L62 80 Z" fill="url(#cv-rocket-fin)" />
      <path d="M50 4 C66 18 70 46 64 82 L36 82 C30 46 34 18 50 4 Z" fill="url(#cv-rocket-body)" />
      <path d="M50 4 C58 11 63 20 65 30 L35 30 C37 20 42 11 50 4 Z" fill="url(#cv-rocket-fin)" />
      <path d="M47 60 L53 60 L53 90 L47 90 Z" fill="url(#cv-rocket-fin)" />
      <circle cx="50" cy="44" r="8.5" fill="url(#cv-rocket-window)" stroke="#DFF8EF" strokeWidth="2.5" />
      <rect x="39" y="82" width="22" height="6" rx="2" fill="#31594D" />
    </svg>
  )
}

function LaptopScreen() {
  return (
    <div className="cv-lid" style={{ width: LID_SIZE.w, height: LID_SIZE.h, transform: LID_TRANSFORM }}>
      <div className="cv-bezel">
        <span className="cv-camera" />
        <div className="cv-display">
          <div className="cv-topbar">
            <span className="cv-dots"><i /><i /><i /></span>
            <span className="cv-tab cv-tab--active">Hero.jsx</span>
            <span className="cv-tab">deploy.ts</span>
            <span className="cv-topbar-search" />
            <span className="cv-topbar-icons"><i /><i /><i /></span>
          </div>

          <div className="cv-ide">
            <div className="cv-rail">
              {Array.from({ length: 6 }, (_, i) => <i key={i} className={i === 0 ? 'is-active' : undefined} />)}
            </div>

            <div className="cv-explorer">
              {EXPLORER.map((item) => (
                <div
                  key={item.name}
                  className={`cv-file cv-file--${item.type}${item.active ? ' is-active' : ''}`}
                  style={{ paddingLeft: 3 + (item.depth ?? 0) * 4 }}
                >
                  <i />
                  <span>{item.name}</span>
                </div>
              ))}
            </div>

            <div className="cv-code">
              <div className="cv-code-scroll">
                {[0, 1].map((copy) => (
                  <div key={copy} aria-hidden={copy === 1 || undefined}>
                    {CODE_LINES.map((parts, i) => (
                      <div key={i} className="cv-code-line">
                        <span className="cv-ln">{i + 1}</span>
                        {parts.map(([cls, text], j) => (
                          <span key={j} className={cls ? `cv-tk-${cls}` : undefined}>{text}</span>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <span className="cv-code-highlight" />
            </div>

            <div className="cv-panel">
              <div className="cv-panel-hero">
                <span>Build</span>
                <span>Innovate</span>
                <span>Scale</span>
                <i className="cv-panel-orb" />
              </div>
              <div className="cv-chart">
                <div className="cv-chart-head"><span>Growth</span><b>+248%</b></div>
                <div className="cv-chart-bars">
                  {CHART_BARS.map((height, i) => (
                    <span key={i} style={{ height: `${height}%`, animationDelay: `${i * -0.35}s` }} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="cv-statusbar"><span>main</span><span>Ln 12, Col 4</span><span>UTF-8</span></div>
          <span className="cv-glare" />
        </div>
      </div>
    </div>
  )
}

function LaptopDeck() {
  return (
    <div className="cv-deck" style={{ width: DECK_SIZE.w, height: DECK_SIZE.h, transform: DECK_TRANSFORM }}>
      <span className="cv-hinge" />
      <div className="cv-keyboard">
        {KEY_ROWS.map((row, r) => (
          <div key={r} className="cv-key-row">
            {row.map((w, k) => <span key={k} className="cv-key" style={{ flexGrow: w }} />)}
          </div>
        ))}
      </div>
      <div className="cv-trackpad" />
      <span className="cv-deck-sheen" />
    </div>
  )
}

/* ==========================================================================
   Main component
   ========================================================================== */
export default function HeroVisual() {
  const reduceMotion = useReducedMotion()
  const rootRef = useRef(null)
  const canvasRef = useRef(null)
  const [scale, setScale] = useState(0.6)
  const [inView, setInView] = useState(true)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const pointerX = useSpring(rawX, { stiffness: 55, damping: 18, mass: 0.7 })
  const pointerY = useSpring(rawY, { stiffness: 55, damping: 18, mass: 0.7 })
  const pointer = { x: pointerX, y: pointerY }

  const tiltY = useTransform(pointerX, (v) => v * 6)
  const tiltX = useTransform(pointerY, (v) => v * -4)

  // Canvas renderer + responsive stage scale
  useEffect(() => {
    const root = rootRef.current
    const canvas = canvasRef.current
    if (!root || !canvas) return undefined

    const renderer = createSceneRenderer(canvas, { x: pointerX, y: pointerY })
    let visible = true

    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      if (!width || !height) return
      setScale(width / STAGE_W)
      renderer.resize(width, height)
    })
    ro.observe(root)

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      setInView(visible)
      if (visible && !reduceMotion && !document.hidden) renderer.start()
      else renderer.stop()
    })
    io.observe(root)

    const onVisibility = () => {
      if (document.hidden || !visible || reduceMotion) renderer.stop()
      else renderer.start()
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      renderer.stop()
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [pointerX, pointerY, reduceMotion])

  // Pointer tracking across the whole viewport so the scene reacts even while
  // the visitor reads the headline on the left
  useEffect(() => {
    if (reduceMotion) return undefined
    const onMove = (event) => {
      if (event.pointerType && event.pointerType !== 'mouse') return
      const rect = rootRef.current?.getBoundingClientRect()
      if (!rect) return
      const nx = (event.clientX - (rect.left + rect.width / 2)) / (window.innerWidth / 2)
      const ny = (event.clientY - (rect.top + rect.height / 2)) / (window.innerHeight / 2)
      rawX.set(Math.max(-1, Math.min(1, nx)))
      rawY.set(Math.max(-1, Math.min(1, ny)))
    }
    const onLeave = () => {
      rawX.set(0)
      rawY.set(0)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [rawX, rawY, reduceMotion])

  const compact = scale < 0.62
  const enter = (delay) => ({
    initial: reduceMotion ? false : { opacity: 0, scale: 0.85 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
  })

  return (
    <motion.div
      ref={rootRef}
      className={`cv-root${inView ? '' : ' is-paused'}${compact ? ' is-compact' : ''}`}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="cv-canvas"
        style={{ top: `${(-CANVAS_PAD / STAGE_H) * 100}%`, height: `${((STAGE_H + CANVAS_PAD) / STAGE_H) * 100}%` }}
      />

      <div className="cv-scaler" style={{ transform: `scale(${scale})` }}>
        {/* Ambient light pools */}
        <div className="cv-layer">
          <span className="cv-glow cv-glow--core" />
          <span className="cv-glow cv-glow--violet" />
          <span className="cv-glow cv-glow--floor" />
        </div>

        {/* Back halves of the orbital rings */}
        <ParallaxLayer pointer={pointer} depth={10}>
          <svg className="cv-svg" viewBox={`0 0 ${STAGE_W} ${STAGE_H}`} fill="none">
            <RingDefs />
            {RINGS.map((ring) => (
              <RingStrokes key={ring.id} ring={ring} d={ellipsePath(ring.rx, ring.ry)} gradient="url(#cv-ring-grad)" />
            ))}
          </svg>
        </ParallaxLayer>

        {/* Floating rock pedestal */}
        <ParallaxLayer pointer={pointer} depth={12}>
          <svg className="cv-svg cv-rock" viewBox={`0 0 ${STAGE_W} ${STAGE_H}`}>
            <defs>
              <linearGradient id="cv-rock-rim" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#83F0C2" />
                <stop offset="0.5" stopColor="#35c18e" />
                <stop offset="1" stopColor="#8BE8C1" />
              </linearGradient>
            </defs>
            {ROCK.facets.map((f, i) => (
              <polygon key={i} points={f.points} fill={f.fill} stroke={f.edge} strokeWidth="0.8" strokeLinejoin="round" />
            ))}
            {ROCK.plateau.map((f, i) => (
              <polygon key={`p${i}`} points={f.points} fill={f.fill} stroke={f.fill} strokeWidth="0.6" />
            ))}
            <polyline points={ROCK.rimEdge} fill="none" stroke="url(#cv-rock-rim)" strokeWidth="2" opacity="0.85" className="cv-rock-rim" />
          </svg>
        </ParallaxLayer>

        {/* Laptop */}
        <ParallaxLayer pointer={pointer} depth={14}>
          <motion.div
            className="cv-layer cv-laptop"
            style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 1600 }}
          >
            <svg className="cv-svg" viewBox={`0 0 ${STAGE_W} ${STAGE_H}`}>
              <defs>
                <linearGradient id="cv-edge" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#9CB8AE" />
                  <stop offset="0.5" stopColor="#DFF8EF" />
                  <stop offset="1" stopColor="#6F9184" />
                </linearGradient>
                <filter id="cv-shadow-blur" x="-20%" y="-50%" width="140%" height="200%">
                  <feGaussianBlur stdDeviation="14" />
                </filter>
              </defs>
              <polygon points={pts([[54, 524], [636, 668], [690, 560], [270, 466]])} fill="#000" opacity="0.7" filter="url(#cv-shadow-blur)" />
              <polygon points={pts([[74, 508], [622, 642], [623, 654], [76, 518]])} fill="url(#cv-edge)" />
              <polygon points={pts([[622, 642], [653, 542], [654, 550], [623, 654]])} fill="#6F9184" />
            </svg>
            <LaptopDeck />
            <span className="cv-screen-spill" />
            <LaptopScreen />
          </motion.div>
        </ParallaxLayer>

        {/* Front halves of the orbital rings pass in front of the laptop */}
        <ParallaxLayer pointer={pointer} depth={16}>
          <svg className="cv-svg" viewBox={`0 0 ${STAGE_W} ${STAGE_H}`} fill="none">
            <RingDefs />
            {RINGS.filter((r) => !r.faint).map((ring) => (
              <RingStrokes
                key={ring.id}
                ring={ring}
                d={frontArcPath(ring.rx, ring.ry)}
                gradient="url(#cv-ring-grad-front)"
                front
              />
            ))}
            <path className="cv-swirl" d="M 560 676 C 700 668 790 610 812 560" stroke="#c9f5e3" strokeWidth="3" strokeLinecap="round" />
            <path className="cv-swirl cv-swirl--glow" d="M 560 676 C 700 668 790 610 812 560" stroke="#8BE8C1" strokeWidth="14" strokeLinecap="round" />
          </svg>
        </ParallaxLayer>

        {/* Crystals */}
        {CRYSTALS.map((c) => (
          <ParallaxLayer
            key={c.id}
            pointer={pointer}
            depth={c.depth}
            className="cv-crystal"
            style={{ left: c.x, top: c.y, width: c.size, height: c.size }}
          >
            <div className="cv-crystal-spin" style={{ animationDuration: `${c.duration}s` }}>
              <Crystal hue={c.hue} />
            </div>
          </ParallaxLayer>
        ))}

        {/* Glassmorphism service cards */}
        {SERVICE_CARDS.map((card) => {
          const { Icon } = card
          return (
            <ParallaxLayer
              key={card.id}
              pointer={pointer}
              depth={card.depth}
              className="cv-card-anchor"
              style={{ left: card.x, top: card.y, width: card.w }}
            >
              <motion.div {...enter(card.delay)}>
                <motion.div
                  animate={reduceMotion ? undefined : { y: [0, -card.float, 0] }}
                  transition={{ duration: card.duration, repeat: Infinity, ease: 'easeInOut', delay: card.delay }}
                >
                  <div className={`cv-card cv-card--${card.id}`} style={{ transform: `perspective(900px) ${card.tilt}` }}>
                    <span className="cv-card-shine" />
                    <Icon className="cv-card-icon" strokeWidth={1.6} />
                    <h3 className="cv-card-title">{card.title}</h3>
                    <p className="cv-card-sub">{card.sub}</p>
                  </div>
                </motion.div>
              </motion.div>
            </ParallaxLayer>
          )
        })}

        {/* Rocket */}
        <ParallaxLayer pointer={pointer} depth={36} className="cv-rocket" style={{ left: 836, top: 470 }}>
          <span className="cv-rocket-trail" />
          <div className="cv-rocket-body">
            <Rocket />
          </div>
        </ParallaxLayer>

        {/* Twinkling sparkles */}
        {SPARKLES.map((s, i) => (
          <span
            key={i}
            className="cv-sparkle"
            style={{ left: s.x, top: s.y, width: s.s, height: s.s, animationDelay: `${s.d}s` }}
          />
        ))}
      </div>
    </motion.div>
  )
}
