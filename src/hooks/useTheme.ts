import { useEffect } from 'react'

export function useTheme() {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light')
    localStorage.removeItem('theme')
  }, [])
}
