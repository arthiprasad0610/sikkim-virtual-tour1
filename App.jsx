import { useEffect, useMemo, useState } from 'react'
import { fetchArtifacts } from './api'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import Gallery from './components/Gallery'
import Tour360 from './components/Tour360'
import Planner from './components/Planner'

export default function App() {
  const [query, setQuery] = useState('')
  const [artifacts, setArtifacts] = useState([])
  const [loading, setLoading] = useState(false)
  const [view, setView] = useState('archive')

  useEffect(() => {
    let active = true
    const run = async () => {
      setLoading(true)
      try {
        const data = await fetchArtifacts(query)
        if (active) setArtifacts(data)
      } finally {
        if (active) setLoading(false)
      }
    }
    run()
    return () => {
      active = false
    }
  }, [query])

  const content = useMemo(() => {
    if (view === 'archive') return <Gallery items={artifacts} loading={loading} />
    if (view === 'tour') return <Tour360 />
    if (view === 'planner') return <Planner />
    return null
  }, [view, artifacts, loading])

  return (
    <div className="app">
      <Header onNavigate={setView} active={view} />
      {view === 'archive' && (
        <div className="toolbar">
          <SearchBar value={query} onChange={setQuery} />
        </div>
      )}
      <div className="content">{content}</div>
    </div>
  )
}
