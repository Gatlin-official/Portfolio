import { useState } from 'react'
import { profile, splashes } from '../data.js'
import PixelIcon from './PixelIcon.jsx'
import Ground from './Ground.jsx'

export default function Hero({ sun, groundKey }) {
  const [splash, setSplash] = useState(0)
  return (
    <header id="home" className="hero">
      <div className="sky" aria-hidden="true">
        <div className="celestial">
          <PixelIcon name={sun ? 'sun' : 'moon'} size={72} />
        </div>
        <div className="stars" />
        <div className="cloud c1" />
        <div className="cloud c2" />
        <div className="cloud c3" />
      </div>

      <div className="hero-inner">
        <p className="edition">— PORTFOLIO EDITION —</p>
        <div className="title-wrap">
          <h1 className="title" aria-label={profile.name}>
            {profile.name.toUpperCase()}
          </h1>
          <button
            className="splash"
            onClick={() => setSplash((splash + 1) % splashes.length)}
            title="Click me!"
          >
            {splashes[splash]}
          </button>
        </div>
        <p className="subtitle">{profile.role}</p>

        <nav className="menu" aria-label="Main menu">
          <a className="mc-btn wide" href="#projects">Projects</a>
          <div className="menu-row">
            <a className="mc-btn" href="#skills">Skills</a>
            <a className="mc-btn" href="#contact">Contact</a>
          </div>
          <a className="mc-btn wide" href={profile.resume} download>
            Download Resume
          </a>
        </nav>
      </div>

      <Ground key={groundKey} />
    </header>
  )
}
