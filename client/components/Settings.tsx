import '../styles/App.css'
import { useState } from 'react'
import LayoutWrapper from './LayoutWrapper'
export default function Settings() {
  const [isConnected, setIsConnected] = useState(false)

  const handleConnectAkahu = () => {
    // For now, just toggle connection status
    // Later, implement actual Akahu OAuth/API connection here
    setIsConnected(true)
  }

  return (
    <LayoutWrapper>
      <div className="settings">
        <h1>Integration Settings</h1>
        <section>
          <h2>Akahu Bank Account</h2>
          <p>Status: {isConnected ? 'Connected ✅' : 'Not connected ❌'}</p>
          {!isConnected && (
            <button
              style={{
                backgroundColor: '#bb1e38',
                color: 'white',
                padding: '0.5rem 1rem',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontFamily: "'Spicy Rice', cursive",
                fontSize: '1.1rem',
              }}
              onClick={handleConnectAkahu}
            >
              Connect Akahu Account
            </button>
          )}
          {isConnected && <p>You are now connected to Akahu!</p>}
        </section>
      </div>
    </LayoutWrapper>
  )
}
