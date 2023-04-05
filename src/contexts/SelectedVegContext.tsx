import { createContext, ReactNode, useState } from 'react'
import { ScheduleTable } from '../@types/vegs'

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
