import '../../styles/App.css'
import React, { useState, useEffect } from 'react'
import { Check, X, CreditCard, Bell, Shield, User, Mail, ExternalLink } from 'lucide-react'
import LayoutWrapper from './LayoutWrapper'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Switch } from '../ui/switch'
import { Label } from '../ui/label'

interface SettingsCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const SettingsCard: React.FC<SettingsCardProps> = ({ title, description, children }) => {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <CardDescription className="text-sm text-slate-500">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  )
}

const Settings: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [appNotifications, setAppNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(() => {
    // Check both the DOM class and localStorage to ensure consistency
    const isDarkMode = document.documentElement.classList.contains('dark')
    return isDarkMode
  })

  // Effect to keep dark mode toggle in sync with DOM changes
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const isDark = document.documentElement.classList.contains('dark')
          setDarkMode(isDark)
        }
      })
    })
    
    observer.observe(document.documentElement, { attributes: true })
    
    return () => observer.disconnect()
  }, [])

  const handleConnectAkahu = () => {
    // For now, just toggle connection status
    // Later, implement actual Akahu OAuth/API connection here
    setIsConnected(true)
  }

  return (
    <LayoutWrapper>
      <div className="space-y-8">
        
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bank Integration */}
          <SettingsCard 
            title="Bank Connection"
            description="Connect your bank account to import transactions automatically"
          >
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-slate-500" />
                  <span className="font-medium">Akahu Bank Account</span>
                </div>
                <div className="flex items-center gap-2">
                  {isConnected ? (
                    <span className="text-sm flex items-center gap-1 text-green-600">
                      <Check size={16} /> Connected
                    </span>
                  ) : (
                    <span className="text-sm flex items-center gap-1 text-red-500">
                      <X size={16} /> Not connected
                    </span>
                  )}
                </div>
              </div>
              
              {!isConnected ? (
                <Button 
                  className="bg-pink-600 hover:bg-pink-700 text-white w-full"
                  onClick={handleConnectAkahu}
                >
                  Connect Akahu Account
                </Button>
              ) : (
                <div className="bg-green-50 text-green-700 p-3 rounded-md text-sm">
                  Your bank account is connected and transactions are being imported automatically.
                </div>
              )}
            </div>
          </SettingsCard>
          
          {/* Notifications */}
          <SettingsCard 
            title="Notifications"
            description="Manage how you receive notifications"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-slate-500" />
                  <Label htmlFor="notifications" className="font-medium">Enable notifications</Label>
                </div>
                <Switch 
                  id="notifications" 
                  checked={notificationsEnabled} 
                  onCheckedChange={setNotificationsEnabled} 
                />
              </div>
              
              <div className="flex items-center justify-between pl-7">
                <Label htmlFor="email-notifications" className="text-sm">Email notifications</Label>
                <Switch 
                  id="email-notifications" 
                  checked={emailNotifications} 
                  onCheckedChange={setEmailNotifications}
                  disabled={!notificationsEnabled}
                />
              </div>
              
              <div className="flex items-center justify-between pl-7">
                <Label htmlFor="app-notifications" className="text-sm">In-app notifications</Label>
                <Switch 
                  id="app-notifications" 
                  checked={appNotifications} 
                  onCheckedChange={setAppNotifications}
                  disabled={!notificationsEnabled}
                />
              </div>
            </div>
          </SettingsCard>
          
          {/* Account */}
          <SettingsCard 
            title="Account"
            description="Manage your account settings"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-slate-500" />
                  <span className="font-medium">Hannah Smith</span>
                </div>
                <Button variant="outline" size="sm">
                  Edit Profile
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-slate-500" />
                  <span className="font-medium">hannah@example.com</span>
                </div>
                <Button variant="outline" size="sm">
                  Change Email
                </Button>
              </div>
              
              <Button variant="outline" className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700">
                Sign Out
              </Button>
            </div>
          </SettingsCard>
          
          {/* Appearance */}
          <SettingsCard 
            title="Appearance"
            description="Customize how the app looks"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="dark-mode" className="font-medium">Dark Mode</Label>
                <Switch 
                  id="dark-mode" 
                  checked={darkMode} 
                  onCheckedChange={(checked) => {
                    setDarkMode(checked);
                    if (checked) {
                      document.documentElement.classList.add('dark');
                    } else {
                      document.documentElement.classList.remove('dark');
                    }
                  }} 
                />
              </div>
            </div>
          </SettingsCard>
        </div>
      </div>
    </LayoutWrapper>
  )
}

export default Settings
