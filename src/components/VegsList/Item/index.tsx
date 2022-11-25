import { ItemContainer } from './styles'

interface ItemProps {
  name: string
  card: number
}

export function Item({ card, name }: ItemProps) {
  return (
    <ItemContainer>
      <h3>{name}</h3>
      <p>{card}</p>
    </ItemContainer>
  )
}
