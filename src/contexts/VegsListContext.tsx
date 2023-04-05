import { createContext, ReactNode, useState } from 'react'
import { Veg } from '../@types/vegs'
import { api } from '../services/api'

interface IVegsListContextData {
  allVegs: Veg[]
  query: string
  fetchVegs: (query: string) => Promise<void>
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

  return (
    <VegsListContext.Provider value={{ allVegs, query, fetchVegs }}>
      {children}
    </VegsListContext.Provider>
  )
}
