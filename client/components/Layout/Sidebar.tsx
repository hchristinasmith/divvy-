import { NavLink } from 'react-router-dom'
import {
  TrendingUpIcon,
  TargetIcon,
  TrophyIcon,
  SettingsIcon,
  Wand,
  ArrowRightLeft,
  CalendarSearch,
  Menu,
} from 'lucide-react'
import clsx from 'clsx'

export const menuItems = [
  {
    title: 'Dashboard',
    url: '/',
    icon: TrendingUpIcon,
    description: 'See how your money flows',
  },
  {
    title: 'Transactions',
    url: '/transactions',
    icon: ArrowRightLeft,
    description: 'View & Manage Transactions',
  },

  {
    title: 'Targets',
    url: '/targets',
    icon: TargetIcon,
    description: 'Set and track your goals',
  },
  {
    title: 'Manage Subscriptions',
    url: '/subscriptions',
    icon: CalendarSearch,
    description: 'Manage your subscriptions',
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
      <div className="shadow-md">
        <div
          className={clsx(
            'fixed top-0 left-0 h-full w-[260px] p-6 z-40',
            'bg-[var(--card)] text-sidebar-foreground',
            'transition-transform duration-300 ease-in-out transform rounded-r-2xl flex flex-col',
            isOpen ? 'translate-x-0' : '-translate-x-full',
          )}
        >
          <div className="mb-6">
            <h2 className="text-2xl text-sidebar-primary">Divvy</h2>
            <p className="text-sm text-muted-foreground">hold the reins</p>
          </div>

          <nav className="space-y-6">
            {menuItems.map(({ title, url, icon: Icon, description }) => (
              <NavLink
                key={title}
                to={url}
                title={description}
                className={({ isActive }) =>
                  clsx(
                    'flex items-start gap-3 rounded-lg px-3 py-2 transition-colors group',
                    isActive
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-sm'
                      : 'hover:bg-sidebar-border hover:text-sidebar-foreground text-sidebar-foreground',
                  )
                }
              >
                <Icon className="w-5 h-5 mt-1 opacity-80 group-hover:opacity-100" />
                <div className="flex flex-col">
                  <span className="font-medium text-sm">{title}</span>
                  <span className="text-xs text-muted-foreground leading-tight">
                    {description}
                  </span>
                </div>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Toggle Button */}
        <button
          onClick={onToggle}
          aria-label="Toggle sidebar"
          className={clsx(
            'fixed top-4 left-0 z-50 h-10 w-10 bg-sidebar-primary text-sidebar-primary-foreground',
            'rounded-r-xl flex items-center justify-center transition-all duration-300',
            isOpen ? 'ml-[250px]' : 'ml-0',
          )}
        >
          <Menu size={25} />
        </button>
      </div>
    </>
  )
}
