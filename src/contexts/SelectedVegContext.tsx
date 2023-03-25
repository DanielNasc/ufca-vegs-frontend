import { createContext, ReactNode, useState } from 'react'

type ScheduleTable = {
  [key: string]: {
    [meal: string]: {
      is_permanent: boolean
      will_come: boolean
    }
  }
}

interface Veg {
  card: number
  name: string
  scheduleTable: ScheduleTable
  absences: number
  attendances: number
  suspended: boolean
}

interface ISelectedVegContext {
  selectedVeg: Veg | null
  changeSelectedVeg: (veg: Veg | null) => void
}

export const SelectedVegContext = createContext<ISelectedVegContext>({
  selectedVeg: null,
  changeSelectedVeg: () => {},
})

interface SelectedVegContextProviderProps {
  children: ReactNode
}

export function SelectedVegContextProvider({
  children,
}: SelectedVegContextProviderProps) {
  const [selectedVeg, setSelectedVeg] = useState<Veg | null>(null)

  function changeSelectedVeg(veg: Veg | null) {
    setSelectedVeg(veg)
  }

  return (
    <SelectedVegContext.Provider value={{ selectedVeg, changeSelectedVeg }}>
      {children}
    </SelectedVegContext.Provider>
  )
}
