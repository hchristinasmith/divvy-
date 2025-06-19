import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@/components/ui/button'

export default function AuthButtons() {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0()

  return (
    <div>
      {!isAuthenticated ? (
        <Button onClick={() => loginWithRedirect()} className="btn">
          Log In
        </Button>
      ) : (
        <Button
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
          className="btn"
        >
          Log Out
        </Button>
      )}
    </div>
  )
}
