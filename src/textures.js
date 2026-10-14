// Procedurally paints original 16×16 pixel textures on a canvas and exposes them
// as CSS custom properties (e.g. var(--tx-dirt)). No external image assets needed.

function rng(seed) {
  let s = seed >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
}

const pick = (r, arr) => arr[Math.floor(r() * arr.length)]

function paint(seed, fn, size = 16) {
  const c = document.createElement('canvas')
  c.width = c.height = size
  const ctx = c.getContext('2d')
  const r = rng(seed)
  const px = (x, y, col) => {
    ctx.fillStyle = col
    ctx.fillRect(x, y, 1, 1)
  }
  fn(px, r, size)
  return c.toDataURL()
}

const noise = (palette) => (px, r, n) => {
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) px(x, y, pick(r, palette))
}

const DIRT = ['#866043', '#79553a', '#966c4a', '#6b4a30', '#8b6446', '#5f4229']
const GRASS = ['#5ea83a', '#6bb944', '#559a33', '#79c24f', '#4e8f2e']
const STONE = ['#7f7f7f', '#8a8a8a', '#747474', '#6a6a6a', '#959595']
const DEEP = ['#3c3c44', '#47474f', '#33333a', '#2c2c33', '#505058']

function ore(base, colors) {
  return (px, r, n) => {
    noise(base)(px, r, n)
    const clusters = 4
    for (let i = 0; i < clusters; i++) {
      const cx = 2 + Math.floor(r() * (n - 4))
      const cy = 2 + Math.floor(r() * (n - 4))
      const shape = [[0, 0], [1, 0], [0, 1], [1, 1], [-1, 0], [0, -1]]
      shape.forEach(([dx, dy], k) => {
        if (k < 4 || r() > 0.5) px(cx + dx, cy + dy, pick(r, colors))
      })
      px(cx, cy, colors[0])
    }
  }
}

// Mining crack overlay; same seed every stage so cracks grow instead of jumping.
const crack = (stage) => (px) => {
  const r = rng(42)
  ;[[1, 1], [-1, 1], [1, -1], [-1, -1]].forEach(([dx, dy]) => {
    let x = 8
    let y = 8
    for (let s = 0; s < 10; s++) {
      if (r() < 0.5) x += dx
      else y += dy
      if (s < (stage + 1) * 2.5) px(x, y, 'rgba(0, 0, 0, 0.7)')
    }
  })
}

const recipes = {
  dirt: noise(DIRT),
  stone: noise(STONE),
  deepslate: (px, r, n) => {
    noise(DEEP)(px, r, n)
    for (let y = 3; y < n; y += 5) for (let x = 0; x < n; x++) if (r() > 0.3) px(x, y, '#26262c')
  },
  grass: noise(GRASS),
  grassSide: (px, r, n) => {
    noise(DIRT)(px, r, n)
    for (let x = 0; x < n; x++) {
      const depth = 3 + Math.floor(r() * 3)
      for (let y = 0; y < depth; y++) px(x, y, pick(r, GRASS))
    }
  },
  planks: (px, r, n) => {
    const P = ['#b8945f', '#a8864f', '#c29d66', '#9c7b47']
    noise(P)(px, r, n)
    for (let x = 0; x < n; x++) {
      px(x, 3, '#7d6236')
      px(x, 7, '#7d6236')
      px(x, 11, '#7d6236')
      px(x, 15, '#7d6236')
    }
    ;[[5, 0], [12, 4], [2, 8], [9, 12]].forEach(([x, y]) => {
      for (let k = 0; k < 3; k++) px(x, y + k, '#7d6236')
    })
  },
  darkPlanks: (px, r, n) => {
    const P = ['#4a3220', '#553a26', '#3f2a1a', '#5d412b']
    noise(P)(px, r, n)
    for (let x = 0; x < n; x++) [3, 7, 11, 15].forEach((y) => px(x, y, '#2b1c10'))
    ;[[5, 0], [12, 4], [2, 8], [9, 12]].forEach(([x, y]) => {
      for (let k = 0; k < 3; k++) px(x, y + k, '#2b1c10')
    })
  },
  obsidian: (px, r, n) => {
    noise(['#14101f', '#1c1530', '#100c18', '#271d40', '#0b0910'])(px, r, n)
    for (let i = 0; i < 6; i++) px(Math.floor(r() * n), Math.floor(r() * n), '#4b3a7a')
  },
  diamond: ore(STONE, ['#7ff0e8', '#4fd6e0', '#1ea3ad', '#d2fffb']),
  redstone: ore(STONE, ['#ff2a2a', '#c40d0d', '#8e0505', '#ff7b7b']),
  lapis: ore(STONE, ['#3e6ef7', '#1f45c2', '#16308a', '#7ea0ff']),
  emerald: ore(STONE, ['#41f38a', '#17c95c', '#0b8a3d', '#a6ffc8']),
  gold: ore(STONE, ['#fff36b', '#f2c94c', '#c98f1e', '#fffbd0']),
  crack0: crack(0),
  crack1: crack(1),
  crack2: crack(2),
  crack3: crack(3),
}

export function installTextures() {
  const root = document.documentElement.style
  Object.entries(recipes).forEach(([name, fn], i) => {
    root.setProperty(`--tx-${name}`, `url(${paint(1000 + i * 97, fn)})`)
  })
}
