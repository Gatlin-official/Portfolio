import PixelIcon from './PixelIcon.jsx'

export const SLOTS = [
  { id: 'home', label: 'Home', icon: 'heart' },
  { id: 'about', label: 'About', icon: 'book' },
  { id: 'skills', label: 'Skills', icon: 'pick' },
  { id: 'experience', label: 'Experience', icon: 'sword' },
  { id: 'projects', label: 'Projects', icon: 'chest' },
  { id: 'achievements', label: 'Achievements', icon: 'star' },
  { id: 'contact', label: 'Contact', icon: 'mail' },
]

export default function Hotbar({ active }) {
  return (
    <nav className="hotbar" aria-label="Sections">
      {SLOTS.map((s, i) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className={`slot${active === s.id ? ' selected' : ''}`}
          aria-current={active === s.id ? 'true' : undefined}
          title={`${s.label} [${i + 1}]`}
        >
          <PixelIcon name={s.icon} size={26} />
          <span className="slot-key">{i + 1}</span>
          <span className="sr-only">{s.label}</span>
        </a>
      ))}
    </nav>
  )
}
