import { useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { SelectedVeg } from '../../components/EditVegForm'
import { VegsList } from '../../components/VegsList'
import { AuthContext } from '../../contexts/AuthContext'
import { SelectedVegContext } from '../../contexts/SelectedVegContext'
import { EditVegsContainer } from './styles'

export function EditVeg() {
  const { changeSelectedVeg } = useContext(SelectedVegContext)
  const { isAuthenticated } = useContext(AuthContext)

  if (!isAuthenticated) return <Navigate to="/" />

  useEffect(() => {
    changeSelectedVeg(null)
  }, [])

  return (
    <EditVegsContainer>
      <VegsList />
      <SelectedVeg />
    </EditVegsContainer>
  )
}
