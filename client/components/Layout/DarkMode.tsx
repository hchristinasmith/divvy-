import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains('dark')
  )

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])
  
  return (
    <button
      aria-label="Toggle Dark Mode"
      onClick={() => setIsDark(!isDark)}
      className="flex items-center justify-center w-10 h-10 rounded-lg 
                 bg-[var(--card)] text-[var(--card-foreground)] 
                 hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] 
                 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  )
}
