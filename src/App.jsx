import { useEffect, useState } from 'react'
import Hero from './components/Hero.jsx'
import Hotbar, { SLOTS } from './components/Hotbar.jsx'
import PixelIcon from './components/PixelIcon.jsx'
import Console from './components/Console.jsx'
import { About, Skills, Experience, Projects, Achievements, Contact, Footer } from './components/Sections.jsx'
import { MODES, skyAt, nowMinutes, fmt } from './sky.js'
import { play, setSound, soundOn } from './sound.js'

function initialMode() {
  try {
    const saved = localStorage.getItem('sky-mode')
    if (MODES.includes(saved)) return saved
  } catch {
    /* storage unavailable */
  }
  return 'auto'
}

const MODE_LABEL = { day: 'Day', night: 'Night' }

export default function App() {
  const [mode, setMode] = useState(initialMode)
  const [minutes, setMinutes] = useState(nowMinutes)
  const [sound, setSoundState] = useState(soundOn)
  const [groundKey, setGroundKey] = useState(0)
  const [active, setActive] = useState('home')

  const sky = skyAt(mode === 'auto' ? minutes : mode === 'day' ? 720 : 0)

  // Live clock: recompute the sky every minute
  useEffect(() => {
    const id = setInterval(() => setMinutes(nowMinutes()), 60_000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.dataset.theme = sky.night ? 'night' : 'day'
    root.style.setProperty('--sky-top', sky.top)
    root.style.setProperty('--sky-bottom', sky.bottom)
    root.style.setProperty('--sun-x', sky.sunX)
    root.style.setProperty('--sun-y', sky.sunY)
    root.style.setProperty('--stars', sky.stars)
  }, [sky.night, sky.top, sky.bottom, sky.sunX, sky.sunY, sky.stars])

  useEffect(() => {
    try {
      localStorage.setItem('sky-mode', mode)
    } catch {
      /* ignore */
    }
  }, [mode])

  const toggleSound = (v) => {
    setSound(v)
    setSoundState(v)
  }

  // Button clicks and hotbar changes get a soft tick (only when sound is on)
  useEffect(() => {
    const onClick = (e) => e.target.closest?.('.mc-btn') && play('click')
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])
  useEffect(() => play('click'), [active])

  // Highlight the hotbar slot for the section in view
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id))
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    SLOTS.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  // Number keys 1–7 jump to sections, like switching hotbar slots
  useEffect(() => {
    const onKey = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return
      const n = parseInt(e.key, 10)
      if (n >= 1 && n <= SLOTS.length) {
        document.getElementById(SLOTS[n - 1].id)?.scrollIntoView({ behavior: 'smooth' })
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const nextMode = MODES[(MODES.indexOf(mode) + 1) % MODES.length]
  const modeName = mode === 'auto' ? `Live ${fmt(minutes)}` : MODE_LABEL[mode]
  return (
    <>
      <a className="skip" href="#about">Skip to content</a>
      <div className="top-controls">
        <button
          className="mc-btn"
          onClick={() => toggleSound(!sound)}
          aria-pressed={sound}
          aria-label="Sound effects"
          title={sound ? 'Mute sound' : 'Turn sound on'}
        >
          <span aria-hidden="true" className={`note${sound ? '' : ' off'}`}>♪</span>
          <span className="theme-label">{sound ? 'Sound on' : 'Muted'}</span>
        </button>
        <button
          className="mc-btn"
          onClick={() => setMode(nextMode)}
          aria-label={`Sky: ${modeName}. Switch to ${nextMode === 'auto' ? 'live clock' : nextMode}`}
          title={`Switch to ${nextMode === 'auto' ? 'live clock' : nextMode}`}
        >
          <PixelIcon name={sky.sun ? 'sun' : 'moon'} size={22} />
          <span className="theme-label">{modeName}</span>
        </button>
      </div>

      <Hero sun={sky.sun} groundKey={groundKey} />
      <main className="world">
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Achievements />
        <Contact />
      </main>
      <Footer />
      <Console mode={mode} setMode={setMode} setSound={toggleSound} resetGround={() => setGroundKey((k) => k + 1)} />
      <Hotbar active={active} />
    </>
  )
}
