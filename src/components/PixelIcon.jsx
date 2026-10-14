// Tiny original pixel-art icons drawn as SVG rects. '.' = transparent.
const ICONS = {
  heart: {
    pal: { k: '#1a0000', r: '#e3262e', w: '#ffb3b3', d: '#9b1016' },
    map: ['.kk.kk..', 'krwkrrk.', 'krrrrrk.', 'krrrrdk.', '.krrdk..', '..kdk...', '...k....', '........'],
  },
  diamond: {
    pal: { k: '#0c3b3e', c: '#4fd6e0', w: '#d2fffb', d: '#1ea3ad' },
    map: ['..kkkk..', '.kwccck.', 'kwccccdk', 'kccccddk', '.kccddk.', '..kcdk..', '...kk...', '........'],
  },
  sun: {
    pal: { y: '#ffe14d', o: '#f5a623', w: '#fff8c4' },
    map: ['y..y..y.', '.y.y.y..', '..www...', 'yywwwoyy', '..woo...', '.y.y.y..', 'y..y..y.', '........'],
  },
  moon: {
    pal: { m: '#e6e8f2', s: '#b6bacb', k: '#7c8099' },
    map: ['..mmm...', '.mmsm...', 'mmm.....', 'mms.....', 'mmm.....', '.mmsmm..', '..mmm...', '........'],
  },
  book: {
    pal: { b: '#7a3b1d', l: '#a8552a', p: '#f1e6c8', k: '#2b1409' },
    map: ['.kkkkkk.', 'kbbbbbpk', 'kblllbpk', 'kbbbbbpk', 'kblllbpk', 'kbbbbbpk', '.kkkkkk.', '........'],
  },
  star: {
    pal: { y: '#ffe14d', o: '#d9a521', w: '#fffbe0' },
    map: ['...y....', '...y....', '..ywy...', 'yyywyyy.', '.yyoyy..', '.yo.oy..', 'yo...oy.', '........'],
  },
  gear: {
    pal: { g: '#a9a9a9', d: '#5e5e5e', w: '#e0e0e0' },
    map: ['..g.g...', '.gwggg..', 'gwd.dgg.', '.g...g..', 'ggd.dgg.', '.gggdg..', '..g.g...', '........'],
  },
  mail: {
    pal: { w: '#f4f1e6', s: '#c9c2a8', k: '#3a3528', r: '#e3262e' },
    map: ['kkkkkkkk', 'kwswwswk', 'kwwssswk', 'kwwwwwwk', 'kwwwwwrk', 'kkkkkkkk', '........', '........'],
  },
  pick: {
    pal: { c: '#4fd6e0', d: '#1ea3ad', s: '#7a5233', k: '#2b1409' },
    map: ['.cccc...', 'c...dc..', '....sd..', '...s.c..', '..s.....', '.s......', 's.......', '........'],
  },
  chest: {
    pal: { b: '#a0692f', d: '#6b4318', k: '#2b1409', g: '#c9c9c9' },
    map: ['kkkkkkkk', 'kbbbbbbk', 'kddddddk', 'kkkggkkk', 'kbbggbbk', 'kbbbbbbk', 'kkkkkkkk', '........'],
  },
  sword: {
    pal: { w: '#e8e8e8', g: '#9a9a9a', s: '#7a5233', y: '#f2c94c' },
    map: ['......ww', '.....wg.', '....wg..', '.y.wg...', '..yg....', '..sy....', '.s..y...', '........'],
  },
}

export default function PixelIcon({ name, size = 24, title }) {
  const icon = ICONS[name]
  if (!icon) return null
  const rects = []
  icon.map.forEach((row, y) =>
    [...row].forEach((ch, x) => {
      if (ch !== '.') rects.push(<rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={icon.pal[ch]} />)
    })
  )
  return (
    <svg
      className="pixel-icon"
      viewBox="0 0 8 8"
      width={size}
      height={size}
      shapeRendering="crispEdges"
      role={title ? 'img' : 'presentation'}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {rects}
    </svg>
  )
}
