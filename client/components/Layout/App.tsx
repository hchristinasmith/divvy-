import { Routes, Route } from 'react-router-dom'
import Dashboard from '../Dashboard/Dashboard.tsx'
import Settings from './Settings.tsx'
import '../../styles/App.css'
import { useEffect } from 'react'
import { Subscriptions as SubscriptionsTracker } from '../Subscriptions/Subscriptions.tsx'
import Transactions from '../Transactions/TransactionsPage.tsx'
import Targets from '../Targets/Targets.tsx'
import LayoutWrapper from './LayoutWrapper.tsx'
export default function App() {
  
  // Initialize dark mode and theme based on user preference
  useEffect(() => {
    // Check if user has a saved dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode')
    
    if (savedDarkMode === 'true') {
      document.documentElement.classList.add('dark')
    } else if (savedDarkMode === 'false') {
      document.documentElement.classList.remove('dark')
    } else {
      // If no saved preference, check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      if (prefersDark) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('darkMode', 'true')
      }
    }
    
    // Check if user has a saved theme preference
    const savedTheme = localStorage.getItem('theme')
    
    if (savedTheme && ['pink', 'blue', 'green'].includes(savedTheme)) {
      document.documentElement.setAttribute('data-theme', savedTheme)
    } else {
      // Default to pink theme if no preference is saved
      document.documentElement.setAttribute('data-theme', 'pink')
      localStorage.setItem('theme', 'pink')
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col font-sans bg-[var(--background)] text-[var(--foreground)] transition-colors duration-200">
      <LayoutWrapper>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/targets"
            element={<Targets />}
          />
          <Route path="/subscriptions" element={<SubscriptionsTracker />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/transactions" element={<Transactions />} />
        </Routes>
      </LayoutWrapper>
    </div>
  )
}
