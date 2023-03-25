import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { SelectedVegContext } from '../../contexts/SelectedVegContext'
import { api } from '../../services/api'

interface SearchVegFormData {
  name: string
}

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
  absences: number
  attendances: number
  suspended: boolean
}

export function SearchVegs() {
  const { changeSelectedVeg } = useContext(SelectedVegContext)
  const { reset, handleSubmit, register } = useForm<SearchVegFormData>()
  const [vegs, setVegs] = useState<Veg[]>([])

  const handleSearchVegs = async (values: SearchVegFormData) => {
    console.log(values)
    const vegs = await api.get(`/vegs/search/${values.name}`)

    setVegs(vegs.data)
  }

  const handleSelectVeg = async (veg: Veg) => {
    const schedule = await api.get<ScheduleTable>(
      `/vegs/scheduletable/${veg.card}`,
    )
    const vegWithSchedule = { ...veg, scheduleTable: schedule.data }
    reset()
    changeSelectedVeg(vegWithSchedule)
  }

  return (
    <div>
      <form>
        <input type="text" {...register('name')} />
        <button type="submit" onClick={handleSubmit(handleSearchVegs)}>
          Search
        </button>
      </form>

      <ul>
        {vegs.map((veg) => (
          <li key={veg.card}>
            <button onClick={() => handleSelectVeg(veg)}>{veg.name}</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
