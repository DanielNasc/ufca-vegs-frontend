import { forwardRef } from 'react'
import { CellContainer, CellLabel } from './styles'

interface CellProps {
  name: string
  fromContext?: boolean
}

// type Days = 'mon' | 'tue' | 'wed' | 'thu' | 'fri'

const Base = ({ name, fromContext, ...rest }: CellProps, ref: any) => {
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
      <CellLabel htmlFor={name} />
    </CellContainer>
  )
}

export const Cell = forwardRef(Base)
