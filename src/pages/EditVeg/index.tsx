import { useContext, useEffect } from 'react'
import { SelectedVeg } from '../../components/EditVegForm'
import { VegsList } from '../../components/VegsList'
import { SelectedVegContext } from '../../contexts/SelectedVegContext'
import { EditVegsContainer } from './styles'

export function EditVeg() {
  const { changeSelectedVeg } = useContext(SelectedVegContext)

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
