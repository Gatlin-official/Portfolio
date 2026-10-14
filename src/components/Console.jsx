import { useEffect, useRef, useState } from 'react'
import { profile } from '../data.js'
import { MODES, nowMinutes, fmt } from '../sky.js'
import { play } from '../sound.js'
import { SLOTS } from './Hotbar.jsx'

const SECTIONS = SLOTS.map((s) => s.id)
const COMMANDS = ['help', 'tp', 'time', 'sound', 'resume', 'email', 'github', 'clear', ...SECTIONS]
const HELP = [
  'Commands: /tp <section>, /time set <auto|day|night>, /time query,',
  '/sound <on|off>, /resume, /email, /github, /clear',
  `Sections: ${SECTIONS.join(', ')} (or just /projects)`,
]

// Minecraft-style chat bar. Press / or T to open.
export default function Console({ mode, setMode, setSound, resetGround }) {
  const [open, setOpen] = useState(false)
  const [text, setText] = useState('')
  const [lines, setLines] = useState([])
  const last = useRef('')
  const seq = useRef(0)

  useEffect(() => {
    const onKey = (e) => {
      if (open || e.ctrlKey || e.metaKey || e.altKey) return
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return
      if (e.key === '/' || e.key === 't' || e.key === 'T') {
        e.preventDefault()
        setText(e.key === '/' ? '/' : '')
        setOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const say = (...msgs) =>
    msgs.forEach((t) => {
      const id = seq.current++
      setLines((l) => [...l.slice(-7), { id, t }])
      setTimeout(() => setLines((l) => l.filter((x) => x.id !== id)), 8000)
    })

  const tp = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    say(`Teleported to ${id}`)
  }

  const run = (raw) => {
    const [cmd, ...args] = raw.replace(/^\//, '').trim().toLowerCase().split(/\s+/)
    if (!cmd) return
    play('pop')
    switch (cmd) {
      case 'help':
        return say(...HELP)
      case 'tp':
        return SECTIONS.includes(args[0]) ? tp(args[0]) : say(`Usage: /tp <${SECTIONS.join('|')}>`)
      case 'time':
        if (args[0] === 'set' && MODES.includes(args[1])) {
          setMode(args[1])
          return say(`Set the time to ${args[1]}`)
        }
        if (args[0] === 'query') return say(`Sky: ${mode} · local time ${fmt(nowMinutes())}`)
        return say('Usage: /time set <auto|day|night> or /time query')
      case 'sound':
        if (args[0] !== 'on' && args[0] !== 'off') return say('Usage: /sound <on|off>')
        setSound(args[0] === 'on')
        return say(`Sound ${args[0]}`)
      case 'resume': {
        const a = document.createElement('a')
        a.href = profile.resume
        a.download = ''
        a.click()
        return say('Downloading resume')
      }
      case 'email':
        return navigator.clipboard.writeText(profile.email).then(
          () => say(`Copied ${profile.email} to clipboard`),
          () => say(`Email: ${profile.email}`)
        )
      case 'github':
        window.open(profile.github, '_blank', 'noopener')
        return say('Opening GitHub')
      case 'clear':
        resetGround()
        return say('Ground restored')
      default:
        return SECTIONS.includes(cmd) ? tp(cmd) : say('Unknown command. Type /help for a list.')
    }
  }

  const onKeyDown = (e) => {
    if (e.key === 'Escape') setOpen(false)
    else if (e.key === 'Enter') {
      last.current = text
      run(text)
      setOpen(false)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setText(last.current)
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const partial = text.replace(/^\//, '')
      const hit = /^\w*$/.test(partial) && COMMANDS.find((c) => c.startsWith(partial))
      if (hit) setText(`/${hit} `)
    }
  }

  return (
    <div className="chat">
      <div aria-live="polite">
        {lines.map((l) => (
          <p key={l.id} className="chat-line">
            {l.t}
          </p>
        ))}
      </div>
      {open && (
        <input
          autoFocus
          className="chat-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={onKeyDown}
          onBlur={() => setOpen(false)}
          aria-label="Command. Type /help for a list."
          spellCheck={false}
          autoComplete="off"
        />
      )}
    </div>
  )
}
