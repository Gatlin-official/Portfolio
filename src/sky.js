// Real-time sky: colours, sun/moon position and stars for any minute of the day.

export const MODES = ['auto', 'day', 'night']

// [minute of day, sky top, sky bottom]
const KEYS = [
  [0, '#05061a', '#1b2350'],
  [300, '#05061a', '#1b2350'],
  [360, '#3a3a7a', '#f29a6b'], // dawn
  [480, '#6f9dfa', '#bcd6ff'],
  [1020, '#6f9dfa', '#bcd6ff'],
  [1110, '#4b3b8a', '#f08a5d'], // dusk
  [1200, '#05061a', '#1b2350'],
  [1440, '#05061a', '#1b2350'],
]

const rgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16))
const mix = (a, b, t) => {
  const [x, y] = [rgb(a), rgb(b)]
  return '#' + x.map((v, i) => Math.round(v + (y[i] - v) * t).toString(16).padStart(2, '0')).join('')
}
const clamp = (v) => Math.min(1, Math.max(0, v))

export function skyAt(m) {
  m = ((m % 1440) + 1440) % 1440
  const i = KEYS.findIndex(([k]) => k > m) - 1
  const [k0, t0, b0] = KEYS[i]
  const [k1, t1, b1] = KEYS[i + 1]
  const t = (m - k0) / (k1 - k0)

  // Sun is up 06:00–19:00, moon the rest; both travel a left→right arc.
  const sun = m >= 360 && m < 1140
  const p = sun ? (m - 360) / 780 : ((m - 1140 + 1440) % 1440) / 660

  return {
    top: mix(t0, t1, t),
    bottom: mix(b0, b1, t),
    night: m < 390 || m >= 1170,
    sun,
    sunX: `${8 + p * 84}%`,
    sunY: `${62 - Math.sin(Math.PI * p) * 54}%`,
    stars: Math.max(clamp((390 - m) / 60), clamp((m - 1140) / 60)) * 0.85,
  }
}

export function nowMinutes() {
  // ?t=19:30 previews any time of day
  const t = new URLSearchParams(location.search).get('t')
  if (t) {
    const [h, mm = 0] = t.split(':').map(Number)
    if (!Number.isNaN(h)) return h * 60 + mm
  }
  const d = new Date()
  return d.getHours() * 60 + d.getMinutes()
}

export const fmt = (m) => `${String(Math.floor(m / 60) % 24).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`
