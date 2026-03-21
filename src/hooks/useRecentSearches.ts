import { useState, useCallback } from 'react'

const KEY = 'recent-searches'
const MAX = 5

function load(): string[] {
  try { return JSON.parse(localStorage.getItem(KEY) ?? '[]') } catch { return [] }
}
function save(list: string[]) {
  localStorage.setItem(KEY, JSON.stringify(list))
}

export function useRecentSearches() {
  const [recents, setRecents] = useState<string[]>(load)

  const add = useCallback((term: string) => {
    const t = term.trim()
    if (!t) return
    setRecents(prev => {
      const next = [t, ...prev.filter(x => x !== t)].slice(0, MAX)
      save(next)
      return next
    })
  }, [])

  const remove = useCallback((term: string) => {
    setRecents(prev => {
      const next = prev.filter(x => x !== term)
      save(next)
      return next
    })
  }, [])

  const clear = useCallback(() => {
    localStorage.removeItem(KEY)
    setRecents([])
  }, [])

  return { recents, add, remove, clear }
}
