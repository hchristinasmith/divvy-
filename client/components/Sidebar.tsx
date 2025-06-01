import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  TrendingUpIcon,
  Heart,
  TargetIcon,
  TrophyIcon,
  SettingsIcon,
  Icon,
  WandSparkles,
  Wand,
} from 'lucide-react'
import { title } from 'process'

// Menu configuration
const menuItems = [
  {
    title: 'Dashboard',
    url: '/',
    icon: TrendingUpIcon,
    description: 'See how your money flows',
  },
  {
    title: 'Wishlist',
    url: '/wishlist',
    icon: Wand,
    description: 'Know what you want, and how to get it',
  },
  {
    title: 'Targets',
    url: '/targets',
    icon: TargetIcon,
    description: 'Set and track your goals',
  },
  {
    title: 'Challenges',
    url: '/challenges',
    icon: TrophyIcon,
    description: 'Personal finance challenges',
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: SettingsIcon,
    description: 'App preferences',
  },
]

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="relative z-50">
      {/* Panel wrapper: slides left/right */}
      <div
        className={`
          fixed top-0 left-0 h-full w-[240px] flex items-start
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-[200px]'}
        `}
      >
        {/* Sidebar */}
        <div className="w-[240px] bg-stone-50 h-full p-6 shadow-md rounded-r-xl">
          {menuItems.map(({ title, url, icon: Icon, description }) => (
            <NavLink
              key={title}
              to={url}
              title={description}
              className="flex items-center space-x-3 mb-4 text-stone-800 font-medium hover:text-stone-600 transition-colors"
            >
              <Icon className="w-5 h-5" />
              <span>{title}</span>
            </NavLink>
          ))}
        </div>

        {/* Hamburger (always visible, slides with panel) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            absolute top-4 -right-10 w-8 h-8 flex flex-col justify-center items-center space-y-1
            bg-stone-100 rounded-md shadow
            transition-transform duration-300 ease-in-out
          `}
          aria-label="Toggle sidebar"
        >
          <span className="block w-6 h-0.5 bg-stone-700 rounded" />
          <span className="block w-6 h-0.5 bg-stone-700 rounded" />
          <span className="block w-6 h-0.5 bg-stone-700 rounded" />
        </button>
      </div>
    </div>
  )
}
