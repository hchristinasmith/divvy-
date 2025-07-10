import PageHeader from './PageHeader';
import Sidebar from './Sidebar';
import { useState } from 'react';

const LayoutWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative min-h-screen">
      {/* PageHeader with lower z-index */}
      <div className="relative">
        <PageHeader className="z-10" sidebarOpen={sidebarOpen} />
      </div>
      
      {/* Sidebar with higher z-index to appear over PageHeader */}
      <div className="relative z-50">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />
      </div>
      
      {/* Main content */}
      <main
        className={`p-6 overflow-auto transition-all duration-300 pt-20 ${
          sidebarOpen ? 'ml-[240px]' : 'ml-0'
        }`}
      >
        <div className="px-4 max-w-7xl mx-auto space-y-6">
          {children}
        </div>
      </main>
    </div>
  )
}

export default LayoutWrapper
