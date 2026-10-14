// Tiny synthesized sound effects (Web Audio, no files). Muted unless turned on.

let ctx
let on = false
try {
  on = localStorage.getItem('sound') === 'on'
} catch {
  /* storage unavailable */
}

export const soundOn = () => on

export function setSound(v) {
  on = v
  try {
    localStorage.setItem('sound', v ? 'on' : 'off')
  } catch {
    /* ignore */
  }
  play('pop')
}

function tone(freq, dur, { type = 'square', vol = 0.05, to, at = 0 } = {}) {
  const t = ctx.currentTime + at
  const o = ctx.createOscillator()
  const g = ctx.createGain()
  o.type = type
  o.frequency.setValueAtTime(freq, t)
  if (to) o.frequency.exponentialRampToValueAtTime(to, t + dur)
  g.gain.setValueAtTime(vol, t)
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
  o.connect(g).connect(ctx.destination)
  o.start(t)
  o.stop(t + dur)
}

function noise(dur, vol, cutoff) {
  const buf = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * dur), ctx.sampleRate)
  const data = buf.getChannelData(0)
  for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length)
  const src = ctx.createBufferSource()
  const f = ctx.createBiquadFilter()
  const g = ctx.createGain()
  src.buffer = buf
  f.type = 'lowpass'
  f.frequency.value = cutoff
  g.gain.value = vol
  src.connect(f).connect(g).connect(ctx.destination)
  src.start()
}

export function play(name) {
  if (!on) return
  ctx ??= new (window.AudioContext || window.webkitAudioContext)()
  if (ctx.state === 'suspended') ctx.resume()
  switch (name) {
    case 'click':
      tone(700, 0.05, { vol: 0.03 })
      break
    case 'dig':
      noise(0.06, 0.2, 700)
      break
    case 'break':
      noise(0.2, 0.35, 1400)
      tone(140, 0.12, { type: 'triangle', vol: 0.1, to: 60 })
      break
    case 'pop':
      tone(420, 0.08, { type: 'sine', vol: 0.12, to: 900 })
      break
    case 'levelup':
      ;[523, 659, 784, 1046].forEach((f, i) => tone(f, 0.14, { vol: 0.04, at: i * 0.09 }))
      break
  }
}
