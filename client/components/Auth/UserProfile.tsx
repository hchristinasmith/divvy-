import { useAuth0 } from '@auth0/auth0-react'

export default function UserProfile() {
  const { user, isAuthenticated, isLoading, error } = useAuth0()

  if (isLoading) return <div>Loading user info...</div>
  if (error) return <div>Error: {error.message}</div>

  // Extract first name from full name string
  const firstName = user?.name ? user.name.split(' ')[0] : null

  return (
    <div>
      {isAuthenticated ? (
        <>
          <h2>Hey {firstName}!</h2>
        </>
      ) : (
        <p>Please log in to see your profile information.</p>
      )}
    </div>
  )
}
