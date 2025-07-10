import { useLocation } from 'react-router-dom';
import { menuItems } from './Sidebar';
import UserProfile from '../Layout/Auth/UserProfile';
import AuthButtons from '../Layout/Auth/AuthButtons';
import DarkModeToggle from './DarkMode';
import { useEffect } from 'react';

interface PageHeaderProps {
  className?: string;
  sidebarOpen?: boolean;
}

const PageHeader = ({ className = '', sidebarOpen = false }: PageHeaderProps) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const currentRoute = menuItems.find(item => {
    if (currentPath === '/' && item.url === '/') return true;
    return currentPath !== '/' && item.url !== '/' && currentPath.startsWith(item.url);
  });

  const title = currentRoute?.title || 'Page';
  useEffect(() => {
    console.log('PageHeader mounted');
    const buttons = document.querySelectorAll('[aria-label="Toggle sidebar"]');
    console.log('Header buttons:', buttons.length);
  }, []);
  
  return (
<header
  className={`fixed top-0 z-10 bg-[var(--card)] bg-opacity-90 backdrop-blur-md  transition-all duration-300 ${
    sidebarOpen ? 'left-[240px] w-[calc(100%-240px)]' : 'left-0 w-full'
  } ${className}`}
>      <div className="relative max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Absolute centered title */}
        <h1 className="absolute left-1/2 -translate-x-1/2 text-xl text-shadow-white">
          {title}
        </h1>

        {/* Left slot (you can leave this empty or put a logo etc.) */}
        <div className="flex items-center space-x-4" />

        {/* Right slot */}
        <div className="flex items-center space-x-4">
          <UserProfile />
          <AuthButtons />
          <DarkModeToggle />
        </div>
      </div>
    </header>
  );
  
};

export default PageHeader;
