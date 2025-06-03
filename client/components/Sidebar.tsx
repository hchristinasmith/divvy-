import { NavLink } from 'react-router-dom'
import {
  TrendingUpIcon,
  TargetIcon,
  TrophyIcon,
  SettingsIcon,
  Wand,
  Menu,
} from 'lucide-react'

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
    description: 'Keep tabs on what you want next',
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
    description: 'Make money habits stick',
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: SettingsIcon,
    description: 'App preferences',
  },
]

export default function Sidebar({
  isOpen,
  onClose,
  onToggle,
}: {
  isOpen: boolean
  onClose: () => void
  onToggle: () => void
}) {
  return (
    <>
      {/* Sidebar panel */}
      <div
        className={`
          fixed top-0 left-0 h-full w-[240px] bg-stone-50 p-6 shadow-md rounded-r-xl
          transform transition-transform duration-300 ease-in-out flex flex-col
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-stone-800">Divvy</h2>
          <p className="text-sm text-stone-500">Hold The Reins</p>
        </div>

        <nav className="space-y-4">
          {menuItems.map(({ title, url, icon: Icon, description }) => (
            <NavLink
              key={title}
              to={url}
              title={description}
              onClick={onClose}
              className="flex items-start space-x-3 text-stone-800 font-medium hover:text-stone-600"
            >
              <Icon className="w-5 h-5" />
              <div className="flex flex-col">
                <span className="font-medium">{title}</span>
                <span className="text-xs text-stone-500">{description}</span>
              </div>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Toggle button always visible on the left */}
      <button
        onClick={onToggle}
        className={`
  fixed top-4 left-0 h-full w-[70px] bg-stone-50 rounded-r-md
  flex items-start justify-center pt-2
  transition-all duration-300
  ${isOpen ? 'ml-[240px]' : 'ml-0'}
`}
        aria-label="Toggle sidebar"
      >
        <Menu size={24} />
      </button>
    </>
  )
}
