import { useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { SelectedVeg } from '../../components/SelectedVeg'
import { VegsList } from '../../components/VegsList'
import { AuthContext } from '../../contexts/AuthContext'
import { SelectedVegContext } from '../../contexts/SelectedVegContext'
import { EditVegsContainer } from './styles'

export function EditVeg() {
  const { changeSelectedVeg } = useContext(SelectedVegContext)
  const { isAuthenticated } = useContext(AuthContext)

  useEffect(() => {
    changeSelectedVeg(null)
  }, [])

  if (!isAuthenticated) return <Navigate to="/" />

  return (
    <EditVegsContainer>
      <VegsList />
      <SelectedVeg />
    </EditVegsContainer>
  )
}
