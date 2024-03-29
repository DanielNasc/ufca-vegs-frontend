import { useContext, useEffect, useState } from 'react'
import { ScheduleTable } from '../../../@types/vegs'
import { SelectedVegContext } from '../../../contexts/SelectedVegContext'
import { api } from '../../../services/api'
import { ItemContainer } from './styles'

interface ItemProps {
  name: string
  card: number
  absences: number
  attendances: number
  suspended: boolean
}

export function Item({
  card,
  name,
  absences = 0,
  attendances = 0,
  suspended,
}: ItemProps) {
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
        changeSelectedVeg({
          card,
          name,
          scheduleTable,
          absences,
          attendances,
          suspended,
        })
      }}
    >
      <h3>{name}</h3>
      <p>{card}</p>
    </ItemContainer>
  )
}
