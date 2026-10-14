import { useState } from 'react'
import { profile, education, skills, experience, projects, certifications } from '../data.js'
import PixelIcon from './PixelIcon.jsx'
import Block from './Block.jsx'

function SectionTitle({ kicker, children }) {
  return (
    <div className="section-title">
      <span className="kicker">{kicker}</span>
      <h2>{children}</h2>
    </div>
  )
}

// Degree progress → "level" + XP bar (4-year B.Tech starting Aug 2024)
function degreeProgress() {
  const start = new Date(2024, 7, 1).getTime()
  const end = new Date(2028, 4, 31).getTime()
  const p = Math.min(1, Math.max(0, (Date.now() - start) / (end - start)))
  return { level: Math.min(4, Math.floor(p * 4) + 1), pct: Math.round(p * 100) }
}

export function About() {
  const { level, pct } = degreeProgress()
  return (
    <section id="about" className="section">
      <SectionTitle kicker="Player Stats">About Me</SectionTitle>
      <div className="panel stats-panel">
        <div className="player-card">
          <div className="avatar" aria-hidden="true">
            <Block top="grass" side="grassSide" size={72} />
          </div>
          <div className="player-meta">
            <h3>{profile.name}</h3>
            <p className="muted">{profile.role}</p>
            <p className="muted">{profile.location}</p>
            <div className="hearts" aria-label="Health: full">
              {Array.from({ length: 10 }).map((_, i) => (
                <PixelIcon key={i} name="heart" size={18} />
              ))}
            </div>
          </div>
        </div>

        <p className="summary">{profile.summary}</p>

        <div className="xp" aria-label={`B.Tech progress ${pct} percent`}>
          <div className="xp-label">
            <span className="xp-level">{level}</span> Year {level} of 4 · B.Tech CSE
          </div>
          <div className="xp-bar">
            <div className="xp-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>

        <div className="edu">
          {education.map((e) => (
            <div className="edu-item" key={e.school}>
              <PixelIcon name="book" size={28} />
              <div>
                <h4>{e.school}</h4>
                <p>{e.degree}</p>
                <p className="muted">{e.period}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Skills() {
  const [hover, setHover] = useState(null)
  return (
    <section id="skills" className="section">
      <SectionTitle kicker="Inventory">Skills</SectionTitle>
      <div className="inventory" role="list">
        {skills.map((row) => (
          <div className="inv-row" key={row.category} role="listitem">
            <h3 className="inv-label">{row.category}</h3>
            <div className="inv-slots">
              {row.items.map((item) => {
                const id = `${row.category}-${item}`
                return (
                  <button
                    key={item}
                    className="inv-slot"
                    style={{ '--gem': row.color }}
                    onMouseEnter={() => setHover(id)}
                    onMouseLeave={() => setHover(null)}
                    onFocus={() => setHover(id)}
                    onBlur={() => setHover(null)}
                    aria-label={`${item} (${row.category})`}
                  >
                    <span className="gem" aria-hidden="true" />
                    <span className="inv-name">{item}</span>
                    {hover === id && (
                      <span className="tooltip" role="tooltip">
                        <span className="tt-title">{item}</span>
                        <span className="tt-sub">{row.category}</span>
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function Experience() {
  return (
    <section id="experience" className="section">
      <SectionTitle kicker="Quest Log">Experience</SectionTitle>
      {experience.map((x) => (
        <article className="book" key={x.title}>
          <div className="book-head">
            <PixelIcon name="sword" size={32} />
            <div>
              <h3>{x.title}</h3>
              <p className="book-org">
                {x.org} · {x.period}
              </p>
            </div>
            <span className="quest-done">Quest Complete</span>
          </div>
          <ul>
            {x.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </article>
      ))}
    </section>
  )
}

export function Projects() {
  return (
    <section id="projects" className="section">
      <SectionTitle kicker="Loot Chest">Projects</SectionTitle>
      <div className="projects-grid">
        {projects.map((p) => (
          <article className="project" key={p.name}>
            <div className="project-head" style={{ backgroundImage: 'var(--tx-darkPlanks)' }}>
              <Block top={p.block === 'grass' ? 'grass' : p.block} side={p.block === 'grass' ? 'grassSide' : p.block} />
              <div>
                <h3>{p.name}</h3>
                <p className="tagline">{p.tagline}</p>
              </div>
            </div>
            <div className="project-body">
              <ul>
                {p.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
              {p.stats && (
                <div className="durability">
                  {p.stats.map((s) => (
                    <div className="dur-row" key={s.label}>
                      <span className="dur-label">{s.label}</span>
                      <div className="dur-bar">
                        <div className="dur-fill" style={{ width: `${s.value * 100}%` }} />
                      </div>
                      <span className="dur-val">{s.value.toFixed(3)}</span>
                    </div>
                  ))}
                </div>
              )}
              <div className="tags">
                {p.tech.map((t) => (
                  <span className="tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
              <a className="mc-btn small" href={p.repo || profile.github} target="_blank" rel="noreferrer">
                View on GitHub
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export function Achievements() {
  return (
    <section id="achievements" className="section">
      <SectionTitle kicker="Advancements">Certifications</SectionTitle>
      <div className="toasts">
        {certifications.map((c, i) => (
          <div className="toast" key={c.title} style={{ '--d': `${i * 120}ms` }}>
            <div className="toast-icon">
              <PixelIcon name={c.icon} size={32} />
            </div>
            <div>
              <p className="toast-head">Advancement Made!</p>
              <p className="toast-title">{c.title}</p>
              <p className="toast-sub">
                {c.issuer}
                {c.date ? ` · ${c.date}` : ''}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }
  return (
    <section id="contact" className="section">
      <SectionTitle kicker="Multiplayer">Contact</SectionTitle>
      <div className="sign">
        <p className="sign-lead">Looking for an AI / ML or backend intern? Let&apos;s build something.</p>
        <ul className="contact-list">
          <li>
            <PixelIcon name="mail" size={24} />
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <button className="mc-btn tiny" onClick={copy}>
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </li>
          <li>
            <PixelIcon name="chest" size={24} />
            <a href={profile.github} target="_blank" rel="noreferrer">
              github.com/{profile.githubHandle}
            </a>
          </li>
          <li>
            <PixelIcon name="book" size={24} />
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              linkedin.com/in/{profile.linkedinHandle}
            </a>
          </li>
          <li>
            <PixelIcon name="heart" size={24} />
            <a href={`tel:${profile.phone.replace(/\s/g, '')}`}>{profile.phone}</a>
          </li>
        </ul>
        <div className="sign-actions">
          <a className="mc-btn" href={`mailto:${profile.email}`}>
            Send Message
          </a>
          <a className="mc-btn" href={profile.resume} download>
            Download Resume
          </a>
        </div>
      </div>
      {copied && <div className="chat-msg" role="status">&lt;Server&gt; Email copied to clipboard</div>}
    </section>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} {profile.name} · Built with React + Vite</p>
      <p className="muted">Press / to open the command console.</p>
      <p className="muted">Blocky art is original. Not affiliated with Mojang or Microsoft.</p>
    </footer>
  )
}
