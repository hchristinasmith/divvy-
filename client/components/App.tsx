import { Routes, Route } from 'react-router-dom'
import Sidebar from './Sidebar.tsx'
import Dashboard from './Dashboard/Dashboard.tsx'
import Settings from './Settings.tsx'
import Wishlist from './Wishlist/WishlistDashboard.tsx'
import Challenges from './Challenges/ChallengesDashboard.tsx'
import '../styles/App.css'

export default function App() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 border-r border-gray-200">
        <Sidebar />
      </aside>

      <main className="flex-1 p-6 overflow-auto">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </main>
    </div>
  )
}
