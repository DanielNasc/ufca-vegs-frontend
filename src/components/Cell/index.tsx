import { Clock } from 'phosphor-react'
import { forwardRef } from 'react'
import { CellContainer, CellLabel } from './styles'

interface CellProps {
  name: string
  fromContext?: boolean
  isPermanent?: boolean
}

// type Days = 'mon' | 'tue' | 'wed' | 'thu' | 'fri'

const Base = (
  { name, fromContext, isPermanent, ...rest }: CellProps,
  ref: any,
) => {
  // const { selectedVeg } = useContext(SelectedVegContext)

  // useEffect(() => {
  //   if (fromContext && selectedVeg) {
  //     const [day, meal] = name.split('_')
  //     // setIsActive(
  //     //   selectedVeg.scheduleTable[day as Days][meal as 'lunch' | 'dinner'],
  //     // )
  //   }
  // }, [fromContext, selectedVeg, name])

  return (
    <CellContainer>
      <input
        type="checkbox"
        name={name}
        id={name}
        {...rest}
        ref={ref}
        // checked={isActive}
      />
      <CellLabel htmlFor={name}>
        {isPermanent !== undefined && !isPermanent && <Clock size={12} />}
      </CellLabel>
    </CellContainer>
  )
}

export const Cell = forwardRef(Base)
