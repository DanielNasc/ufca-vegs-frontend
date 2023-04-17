import { useContext, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Veg } from '../../@types/vegs'

import { AuthContext } from '../../contexts/AuthContext'
import { api } from '../../services/api'

interface VegsThatHaveReservations extends Veg {
  didAttend: boolean
}

// admin's dashboard
export function Dashboard() {
  const { isAuthenticated, user } = useContext(AuthContext)
  // show vegs that have reservations for the current meal
  const [vegs, setVegs] = useState<VegsThatHaveReservations[]>([])

  async function fetchVegsThatHaveReservations() {
    const { data } = await api.get('/vegs/vegsthathavereservations')
    console.log(data)

    setVegs(data)
  }

  useEffect(() => {
    if (!isAuthenticated) return

    // get all vegs that have reservations for the current meal
    fetchVegsThatHaveReservations()
  }, [])

  if (!isAuthenticated || !user) return <Navigate to="/" />

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Reservas</h2>
      <ul>
        {vegs.map((veg) => (
          <li key={veg.card}>
            <p>{veg.name}</p>
            <p>{veg.didAttend ? 'Presente' : 'Ausente'}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
