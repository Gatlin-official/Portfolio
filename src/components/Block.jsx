// A small isometric 3D block. `top` / `side` are texture names from textures.js.
export default function Block({ top, side, size = 56 }) {
  const t = `var(--tx-${top})`
  const s = `var(--tx-${side ?? top})`
  return (
    <div className="block-wrap" style={{ '--s': `${size}px` }} aria-hidden="true">
      <div className="block">
        <div className="face top" style={{ backgroundImage: t }} />
        <div className="face front" style={{ backgroundImage: s }} />
        <div className="face right" style={{ backgroundImage: s }} />
      </div>
    </div>
  )
}
