import { Routes, Route } from 'react-router-dom'
import Sidebar from './Sidebar.tsx'
import Dashboard from './Dashboard/Dashboard.tsx'
import Settings from './Settings.tsx'
import '../styles/App.css'
import { useState } from 'react'
import Subscriptions from './ManageSubscriptions/Subscriptions.tsx'
import Transactions from './Transactions/TransactionsPage.tsx'
import AuthButtons from './Auth/AuthButtons.tsx'
import UserProfile from './Auth/UserProfile.tsx'
import DarkModeToggle from './DarkMode.tsx'
import Targets from './Targets/Targets.tsx'
export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col font-sans">
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
