import { useContext, useEffect, useState } from 'react'
import { SelectedVegContext } from '../../../contexts/SelectedVegContext'
import { api } from '../../../services/api'
import { ItemContainer } from './styles'

interface ItemProps {
  name: string
  card: number
  absences: number
  attendances: number
}

type ScheduleTable = {
  [key: string]: {
    [meal: string]: {
      is_permanent: boolean
      will_come: boolean
    } | null
  }
}

export function Item({ card, name, absences = 0, attendances = 0 }: ItemProps) {
  const [scheduleTable, setScheduleTable] = useState<ScheduleTable | null>(null)
  const { changeSelectedVeg } = useContext(SelectedVegContext)

  async function fetchVegs() {
    const schedule = await api.get(`/vegs/scheduletable/${card}`)

    setScheduleTable(schedule.data)
  }

  useEffect(() => {
    fetchVegs()
  }, [])

  if (!scheduleTable) {
    return <></>
  }

  return (
    <ItemContainer
      onClick={async () => {
        await fetchVegs()
        changeSelectedVeg({ card, name, scheduleTable, absences, attendances })
      }}
    >
      <h3>{name}</h3>
      <p>{card}</p>
    </ItemContainer>
  )
}
