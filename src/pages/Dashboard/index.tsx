import { useContext } from 'react'
import { Navigate } from 'react-router-dom'

import { AuthContext } from '../../contexts/AuthContext'

export function Dashboard() {
  const { isAuthenticated, user } = useContext(AuthContext)

  if (!isAuthenticated || !user) return <Navigate to="/" />

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  )
}
