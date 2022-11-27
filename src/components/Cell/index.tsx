import { forwardRef, useContext, useEffect, useState } from 'react'
import { SelectedVegContext } from '../../contexts/SelectedVegContext'
import { CellContainer, CellLabel } from './styles'

interface CellProps {
  name: string
  fromContext?: boolean
}

type Days = 'mon' | 'tue' | 'wed' | 'thu' | 'fri'

const Base = ({ name, fromContext, ...rest }: CellProps, ref: any) => {
  const [isActive, setIsActive] = useState(false)
  const { selectedVeg } = useContext(SelectedVegContext)

  useEffect(() => {
    if (fromContext && selectedVeg) {
      const [day, meal] = name.split('_')
      setIsActive(
        selectedVeg.scheduleTable[day as Days][meal as 'lunch' | 'dinner'],
      )
    }
  }, [fromContext, selectedVeg, name])

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
