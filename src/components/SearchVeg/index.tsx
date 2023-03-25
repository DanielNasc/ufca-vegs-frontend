import { Check, MagnifyingGlass, Prohibit } from 'phosphor-react'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { SelectedVegContext } from '../../contexts/SelectedVegContext'
import { api } from '../../services/api'
import {
  SearchVegsButton,
  SearchVegsContainer,
  SearchVegsForm,
  SearchVegsInput,
  SearchVegsResult,
  SearchVegsResults,
} from './styles'

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
    <SearchVegsContainer>
      <SearchVegsForm>
        <SearchVegsInput type="text" {...register('name')} />
        <SearchVegsButton
          type="submit"
          onClick={handleSubmit(handleSearchVegs)}
        >
          <MagnifyingGlass size={18} />
          Search
        </SearchVegsButton>
      </SearchVegsForm>

      <SearchVegsResults>
        {vegs.map((veg) => (
          <SearchVegsResult suspended={veg.suspended} key={veg.card}>
            {veg.suspended ? <Prohibit size={24} /> : <Check size={24} />}
            <span>{veg.name}</span>
            <span>{veg.card}</span>
            <button onClick={() => handleSelectVeg(veg)}>Select</button>
          </SearchVegsResult>
        ))}
      </SearchVegsResults>
    </SearchVegsContainer>
  )
}
