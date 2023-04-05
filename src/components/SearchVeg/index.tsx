import { Check, MagnifyingGlass, Prohibit } from 'phosphor-react'
import { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { ScheduleTable, Veg } from '../../@types/vegs'
import { SelectedVegContext } from '../../contexts/SelectedVegContext'
import { VegsListContext } from '../../contexts/VegsListContext'
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

export function SearchVegs() {
  const { changeSelectedVeg } = useContext(SelectedVegContext)
  const {
    reset,
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<SearchVegFormData>()
  const { allVegs, fetchVegs, query } = useContext(VegsListContext)

  const handleSearchVegs = async (values: SearchVegFormData) => {
    await fetchVegs(values.name)
  }

  useEffect(() => {
    reset({ name: query })
  }, [])

  const handleSelectVeg = async (veg: Veg) => {
    const schedule = await api.get<ScheduleTable>(
      `/vegs/scheduletable/${veg.card}`,
    )
    const vegWithSchedule = { ...veg, scheduleTable: schedule.data }
    reset({ name: query })
    changeSelectedVeg(vegWithSchedule)
  }

  return (
    <SearchVegsContainer>
      <SearchVegsForm>
        <SearchVegsInput
          type="text"
          autoFocus
          {...register('name', {
            required: true,
          })}
        />
        <SearchVegsButton
          type="submit"
          disabled={isSubmitting}
          onClick={handleSubmit(handleSearchVegs)}
        >
          <MagnifyingGlass size={18} />
          <span>Buscar</span>
        </SearchVegsButton>
      </SearchVegsForm>

      <SearchVegsResults>
        {allVegs.map((veg) => (
          <SearchVegsResult suspended={veg.suspended} key={veg.card}>
            {veg.suspended ? <Prohibit size={24} /> : <Check size={24} />}
            <span>{veg.name}</span>
            <span>{veg.card}</span>
            <button onClick={() => handleSelectVeg(veg)}>Editar</button>
          </SearchVegsResult>
        ))}
      </SearchVegsResults>
    </SearchVegsContainer>
  )
}
