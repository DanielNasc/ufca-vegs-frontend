import { useEffect, useState } from 'react'
import { api } from '../../services/api'
import { Item } from './Item'
import { ListContainer } from './sytles'

export function VegsList() {
  const [allVegs, setAllVegs] = useState<Vegetarian[]>([] as Vegetarian[])

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
        <Item
          key={veg.card}
          name={veg.name}
          card={veg.card}
          absences={veg.absences}
          attendances={veg.attendances}
          suspended={veg.suspended}
        />
      ))}
    </ListContainer>
  )
}
