import { createContext, ReactNode, useState } from 'react'

interface ISelectedVegContext {
  selectedVeg: Vegetarian | null
  changeSelectedVeg: (veg: Vegetarian | null) => void
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
  const [selectedVeg, setSelectedVeg] = useState<Vegetarian | null>(null)

  function changeSelectedVeg(veg: Vegetarian | null) {
    setSelectedVeg(veg)
  }

  return (
    <SelectedVegContext.Provider value={{ selectedVeg, changeSelectedVeg }}>
      {children}
    </SelectedVegContext.Provider>
  )
}
