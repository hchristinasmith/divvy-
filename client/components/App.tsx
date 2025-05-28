import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar.tsx'
import Dashboard from './Dashboard.tsx'
import Budgets from './components/Budgets.tsx'
import IncomeAndExpenses from './components/IncomeAndExpenses.tsx'
import WealthProjection from './components/WealthProjection.tsx'
import Challenges from './components/Challenges.tsx'
import Settings from './components/Settings.tsx'
import Wishlist from './components/Wishlist.tsx'

export default function App() {
  return (
    <div className="App">
      <Sidebar />
      <main className="main-content">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/income-and-expenses" element={<IncomeAndExpenses />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </main>
    </div>
  )
}
