import { Routes, Route } from 'react-router-dom'
import Dashboard from '../Dashboard/Dashboard.tsx'
import Settings from './Settings.tsx'
import '../../styles/App.css'
import { useEffect } from 'react'
import Subscriptions from '../ManageSubscriptions/Subscriptions.tsx'
import Transactions from '../Transactions/TransactionsPage.tsx'
import Targets from '../Targets/Targets.tsx'
import LayoutWrapper from './LayoutWrapper.tsx'
export default function App() {
  
  // Initialize dark mode based on user preference
  useEffect(() => {
    // Check if user has a saved preference
    const savedTheme = localStorage.getItem('theme')
    
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else if (savedTheme === 'light') {
      document.documentElement.classList.remove('dark')
    } else {
      // If no saved preference, check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      if (prefersDark) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('theme', 'dark')
      }
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
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/transactions" element={<Transactions />} />
        </Routes>
      </LayoutWrapper>
    </div>
  )
}
