export default function Header({ onNavigate, active }) {
  return (
    <header className="header">
      <div className="brand">Sikkim Heritage 360</div>
      <nav className="nav">
        <button className={active==='archive'?'active':''} onClick={() => onNavigate('archive')}>Digital Archive</button>
        <button className={active==='tour'?'active':''} onClick={() => onNavigate('tour')}>360° Tours</button>
        <button className={active==='planner'?'active':''} onClick={() => onNavigate('planner')}>Circuit Planner</button>
      </nav>
    </header>
  )
}
