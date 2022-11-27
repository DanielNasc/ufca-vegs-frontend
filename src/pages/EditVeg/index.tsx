import { EditVegForm } from '../../components/EditVegForm'
import { VegsList } from '../../components/VegsList'
import { EditVegsContainer } from './styles'

export function EditVeg() {
  return (
    <EditVegsContainer>
      <VegsList />
      <EditVegForm />
    </EditVegsContainer>
  )
}
