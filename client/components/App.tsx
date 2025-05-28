import { Routes, Route } from 'react-router-dom'
import Sidebar from './Sidebar.tsx'
import Dashboard from './Dashboard.tsx/Dashboard.tsx'
import Settings from './Settings.tsx'
import Wishlist from './Wishlist/WishlistDashboard.tsx'
import Challenges from './Challenges/ChallengesDashboard.tsx'
import '../styles/App.scss'


export default function App() {
  return (
    <div className="App">
      <Sidebar />
      <main className="main-content">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </main>
    </div>
  )
}
