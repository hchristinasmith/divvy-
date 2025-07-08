import { Routes, Route } from 'react-router-dom'
import Sidebar from './Sidebar'
import Dashboard from './Dashboard/Dashboard.tsx'
import Settings from './Settings.tsx'
import '../styles/App.css'
import { useState, useEffect } from 'react'
import Subscriptions from './ManageSubscriptions/Subscriptions.tsx'
import Transactions from './Transactions/TransactionsPage.tsx'
import AuthButtons from './Auth/AuthButtons.tsx'
import UserProfile from './Auth/UserProfile.tsx'
import DarkModeToggle from './DarkMode.tsx'
import Targets from './Targets/Targets.tsx'
export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
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
      <div className="flex flex-1">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />

        <main
          className={`flex-1 p-6 overflow-auto transition-all duration-300 ${
            sidebarOpen ? 'ml-[240px]' : 'ml-0'
          }`}
        >
          <div className="mb-4 flex justify-end items-center space-x-4">
            <UserProfile />
            <AuthButtons />
            <DarkModeToggle />
          </div>

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route
              path="/targets"
              element={
                <Targets
                  targets={[]}
                  onAddNewTarget={() => alert('Add new target functionality coming soon!')}
                />
              }
            />
            <Route path="/subscriptions" element={<Subscriptions />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/transactions" element={<Transactions />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
