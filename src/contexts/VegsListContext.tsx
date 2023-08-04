import { createContext, ReactNode, useState } from 'react'
import { Veg } from '../@types/vegs'
import { api } from '../services/api'

interface IVegsListContextData {
  allVegs: Veg[]
  query: string
  fetchVegs: (query: string) => Promise<void>
  removeVegFromList: (vegId: number) => void
}

interface IVegsListProviderProps {
  children: ReactNode
}

export const VegsListContext = createContext<IVegsListContextData>(
  {} as IVegsListContextData,
)

export function VegsListContextProvider({ children }: IVegsListProviderProps) {
  const [allVegs, setAllVegs] = useState<Veg[]>([] as Veg[])
  const [query, setQuery] = useState('')

  async function fetchVegs(query: string) {
    const vegs = await api.get(`/vegs/search/${query}`)

    setAllVegs(vegs.data)
    setQuery(query)
  }

  const removeVegFromList = (vegId: number) => {
    const updatedVegs = allVegs.filter((veg) => veg.card !== vegId)

    setAllVegs(updatedVegs)
  }

  return (
    <VegsListContext.Provider
      value={{ allVegs, query, fetchVegs, removeVegFromList }}
    >
      {children}
    </VegsListContext.Provider>
  )
}
