import { useEffect, useState } from 'react'
import { api } from '../../services/api'
import { Item } from './Item'
import { ListContainer } from './sytles'

interface Veg {
  name: string
  card: number
}

export function VegsList() {
  const [allVegs, setAllVegs] = useState<Veg[]>([] as Veg[])

  async function fetchVegs() {
    const vegs = await api.get('/vegs')
    setAllVegs(vegs.data)
  }

  useEffect(() => {
    fetchVegs()
  }, [])

  return (
    <ListContainer>
      {allVegs.map((veg) => (
        <Item key={veg.card} name={veg.name} card={veg.card} />
      ))}
    </ListContainer>
  )
}
