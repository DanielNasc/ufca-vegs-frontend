import { useContext } from 'react'
import { SelectedVegContext } from '../../../contexts/SelectedVegContext'
import { ItemContainer } from './styles'

interface ItemProps {
  name: string
  card: number
}

export function Item({ card, name }: ItemProps) {
  const { changeSelectedVeg } = useContext(SelectedVegContext)

  return (
    <ItemContainer onClick={() => changeSelectedVeg({ card, name })}>
      <h3>{name}</h3>
      <p>{card}</p>
    </ItemContainer>
  )
}
