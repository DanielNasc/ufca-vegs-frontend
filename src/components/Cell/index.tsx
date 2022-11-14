import { useState } from 'react'
import { CellContainer, CellLabel } from './styles'

interface CellProps {
  name: string
}

export function Cell({ name }: CellProps) {
  const [isActive, setIsActive] = useState(false)

  return (
    <CellContainer>
      <CellLabel
        htmlFor="din"
        className={isActive ? 'active' : ''}
        onClick={() => setIsActive((props) => !props)}
      />
      <input type="checkbox" name={name} id="din" />
    </CellContainer>
  )
}
