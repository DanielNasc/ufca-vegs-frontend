import { CellContainer } from './styles'

interface CellProps {
  name: string
}

export function Cell({ name }: CellProps) {
  return (
    <CellContainer>
      <label htmlFor="din" />
      <input type="checkbox" name={name} id="din" />
    </CellContainer>
  )
}
