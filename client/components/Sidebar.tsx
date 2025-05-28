import { NavLink } from 'react-router-dom'
import '../styles/App.scss'

export default function Sidebar() {
  return (
    <div className="sidebar">
      <NavLink to="/dashboard" className="divvy">
        Dashboard
      </NavLink>
      <NavLink
        to="/wishlist"
        className={({ isActive }) =>
          isActive ? 'nav-button active' : 'nav-button'
        }
      >
        Wishlist
      </NavLink>
      <hr className="full-width-divider" />
      <NavLink
        to="/challenges"
        className={({ isActive }) =>
          isActive ? 'nav-button active' : 'nav-button'
        }
      >
        Challenges
      </NavLink>
      <NavLink
        to="/settings"
        className={({ isActive }) =>
          isActive ? 'nav-button active' : 'nav-button'
        }
      >
        Settings
      </NavLink>
    </div>
  )
}
