import { Check, MagnifyingGlass, Prohibit } from 'phosphor-react'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { SelectedVegContext } from '../../contexts/SelectedVegContext'
import {
  SearchVegsButton,
  SearchVegsContainer,
  SearchVegsForm,
  SearchVegsInput,
  SearchVegsResult,
  SearchVegsResults,
} from './styles'
import { collection, getDocs, or, query, where } from 'firebase/firestore'
import { db } from '../../services/firebase'
// import { api } from '../../services/api'

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
  const [vegs, setVegs] = useState<Vegetarian[]>([])

  const handleSearchVegs = async (values: SearchVegFormData) => {
    const vegsRef = collection(db, 'vegs')
    // query NAME LIKE values.name
    const vegsQuery = query(
      vegsRef,
      or(where('name', '<=', values.name), where('name', '>=', values.name)),
    )

    // make the query
    const vegsSnapshot = await getDocs(vegsQuery)

    // get the data
    const vegsData = vegsSnapshot.docs.map((doc) => doc.data())

    setVegs(vegsData as Vegetarian[])
  }

  const handleSelectVeg = async (veg: Vegetarian) => {
    // const schedule = await api.get<ScheduleTable>(
    //   `/vegs/scheduletable/${veg.card}`,
    // )
    // const vegWithSchedule = { ...veg, scheduleTable: schedule.data }
    reset()
    changeSelectedVeg(veg)
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
        {vegs.map((veg) => (
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
