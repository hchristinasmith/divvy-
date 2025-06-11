import { Routes, Route } from 'react-router-dom'
import Sidebar from './Sidebar.tsx'
import Dashboard from './Dashboard/Dashboard.tsx'
import Settings from './Settings.tsx'
import Wishlist from './Wishlist/WishlistDashboard.tsx'
import Challenges from './Challenges/ChallengesDashboard.tsx'
import '../styles/App.css'
import { useState } from 'react'
import { Target } from 'lucide-react'
import Subscriptions from './ManageSubscriptions/Subscriptions.tsx'
import Transactions from './Transactions.tsx'

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-gray-50 flex-col font-sans">
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
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/target" element={<Target />} />
            <Route path="/manage-subscriptions" element={<Subscriptions />} />
            <Route path="/challenges" element={<Challenges />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/transactions" element={<Transactions />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
