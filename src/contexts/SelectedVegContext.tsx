import { createContext, ReactNode, useState } from 'react'

interface Veg {
  card: number
  name: string
}

interface ISelectedVegContext {
  selectedVeg: Veg | null
  changeSelectedVeg: (veg: Veg) => void
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

  function changeSelectedVeg(veg: Veg) {
    setSelectedVeg(veg)
  }

  return (
    <SelectedVegContext.Provider value={{ selectedVeg, changeSelectedVeg }}>
      {children}
    </SelectedVegContext.Provider>
  )
}
