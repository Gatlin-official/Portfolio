import { useEffect, useRef, useState } from 'react'
import { play } from '../sound.js'

const TILE = 64
const ORES = ['diamond', 'gold', 'emerald', 'lapis', 'redstone']
const NAMES = {
  grassSide: 'Grass',
  dirt: 'Dirt',
  stone: 'Stone',
  diamond: 'Diamond ore',
  gold: 'Gold ore',
  emerald: 'Emerald ore',
  lapis: 'Lapis ore',
  redstone: 'Redstone ore',
}
// What's left after breaking a block: grass → dirt → stone → ore → air
const next = (tex) =>
  tex === 'grassSide' ? 'dirt' : tex === 'dirt' ? 'stone' : tex === 'stone' ? ORES[Math.floor(Math.random() * ORES.length)] : null

const reduced = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

export default function Ground() {
  const [cols, setCols] = useState(() => Math.ceil(window.innerWidth / TILE))
  const [cells, setCells] = useState({})
  const [cracking, setCracking] = useState(null) // { key, stage }
  const [focus, setFocus] = useState('0-0')
  const [mined, setMined] = useState(0)
  const [bits, setBits] = useState([])
  const timer = useRef(null)
  const seq = useRef(0)

  useEffect(() => {
    const onResize = () => setCols(Math.ceil(window.innerWidth / TILE))
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      clearInterval(timer.current)
    }
  }, [])

  const texAt = (r, c) => {
    const k = `${r}-${c}`
    return k in cells ? cells[k] : r === 0 ? 'grassSide' : 'dirt'
  }

  const stop = () => {
    clearInterval(timer.current)
    setCracking(null)
  }

  const breakBlock = (r, c) => {
    stop()
    const tex = texAt(r, c)
    setCells((s) => ({ ...s, [`${r}-${c}`]: next(tex) }))
    setMined(mined + 1)
    play((mined + 1) % 10 === 0 ? 'levelup' : 'break')
    if (reduced()) return
    const fresh = Array.from({ length: 6 }, () => ({
      id: seq.current++,
      tex,
      x: c * TILE + 16 + Math.random() * 32,
      y: r * TILE + 16 + Math.random() * 32,
      dx: `${(Math.random() - 0.5) * 90}px`,
      dy: `${-30 - Math.random() * 50}px`,
    }))
    setBits((b) => [...b, ...fresh])
  }

  const place = (r, c) => {
    setCells((s) => ({ ...s, [`${r}-${c}`]: 'dirt' }))
    play('pop')
  }

  const startMining = (r, c) => {
    if (!texAt(r, c)) return place(r, c)
    if (reduced()) return breakBlock(r, c)
    let stage = 0
    setCracking({ key: `${r}-${c}`, stage })
    play('dig')
    clearInterval(timer.current)
    timer.current = setInterval(() => {
      stage++
      if (stage > 3) return breakBlock(r, c)
      setCracking({ key: `${r}-${c}`, stage })
      play('dig')
    }, 130)
  }

  // Roving tabindex: one tab stop for the whole ground, arrows move between blocks.
  const onKeyDown = (e, r, c) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      return texAt(r, c) ? breakBlock(r, c) : place(r, c)
    }
    const move = { ArrowLeft: [0, -1], ArrowRight: [0, 1], ArrowUp: [-1, 0], ArrowDown: [1, 0] }[e.key]
    if (!move) return
    e.preventDefault()
    const nr = Math.min(1, Math.max(0, r + move[0]))
    const nc = Math.min(cols - 1, Math.max(0, c + move[1]))
    setFocus(`${nr}-${nc}`)
    document.getElementById(`blk-${nr}-${nc}`)?.focus()
  }

  return (
    <div className="ground" style={{ '--cols': cols }} role="group" aria-label="Mineable ground. Hold a block to mine it.">
      {mined > 0 && <p className="mined">Blocks mined: {mined}</p>}
      {[0, 1].map((r) =>
        Array.from({ length: cols }, (_, c) => {
          const k = `${r}-${c}`
          const tex = texAt(r, c)
          const stage = cracking?.key === k ? cracking.stage : -1
          const layers = [stage >= 0 && `var(--tx-crack${stage})`, tex && `var(--tx-${tex})`].filter(Boolean)
          return (
            <button
              key={k}
              id={`blk-${k}`}
              className={`blk${tex ? '' : ' air'}`}
              style={{ backgroundImage: layers.join(', ') || 'none' }}
              tabIndex={focus === k ? 0 : -1}
              aria-label={tex ? `${NAMES[tex]} block, press to mine` : 'Empty, press to place dirt'}
              onPointerDown={(e) => {
                e.preventDefault()
                setFocus(k)
                startMining(r, c)
              }}
              onPointerUp={stop}
              onPointerLeave={stop}
              onPointerCancel={stop}
              onContextMenu={(e) => e.preventDefault()}
              onKeyDown={(e) => onKeyDown(e, r, c)}
            />
          )
        })
      )}
      {bits.map((b) => (
        <span
          key={b.id}
          className="bit"
          style={{ left: b.x, top: b.y, backgroundImage: `var(--tx-${b.tex})`, '--dx': b.dx, '--dy': b.dy }}
          onAnimationEnd={() => setBits((all) => all.filter((x) => x.id !== b.id))}
        />
      ))}
    </div>
  )
}
