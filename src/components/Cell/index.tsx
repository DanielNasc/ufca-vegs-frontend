import { forwardRef, useState } from 'react'
import { CellContainer, CellLabel } from './styles'

interface CellProps {
  name: string
}

const Base = ({ name, ...rest }: CellProps, ref: any) => {
  const [isActive, setIsActive] = useState(false)

  return (
    <CellContainer>
      <CellLabel
        htmlFor={name}
        className={isActive ? 'active' : ''}
        onClick={() => setIsActive((props) => !props)}
      />
      <input type="checkbox" name={name} id={name} {...rest} ref={ref} />
    </CellContainer>
  )
}

export const Cell = forwardRef(Base)
