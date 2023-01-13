import { NotePencil } from 'phosphor-react'
import { useContext, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { SelectedVegContext } from '../../contexts/SelectedVegContext'
import { api } from '../../services/api'
import { Cell } from '../Cell'
import { SubmitFormButton } from '../SubmitFormButton/styles'
import { EditVegContainer, EditVegForm } from './styles'

const DAYS = ['mon', 'tue', 'wed', 'thu', 'fri'] as const

interface EditVegFormData {
  fri_dinner: boolean
  fri_lunch: boolean
  mon_dinner: boolean
  mon_lunch: boolean
  thu_dinner: boolean
  thu_lunch: boolean
  tue_dinner: boolean
  tue_lunch: boolean
  wed_dinner: boolean
  wed_lunch: boolean
}

interface UnusualReservation {
  card: number
  day: string
  meal: 'lunch' | 'dinner'
  will_come: boolean
}

export function SelectedVeg() {
  const { register, handleSubmit, reset } = useForm<EditVegFormData>()
  const { selectedVeg } = useContext(SelectedVegContext)

  useEffect(() => {
    const defaultValues = {} as any
    for (const day of DAYS) {
      for (const meal of ['lunch', 'dinner'] as const) {
        defaultValues[`${day}_${meal}`] = selectedVeg
          ? selectedVeg.scheduleTable[day][meal]
          : false
      }
    }
    reset({ ...defaultValues })
  }, [selectedVeg, reset])

  if (!selectedVeg) {
    return (
      <EditVegContainer>
        <h1>Selecione um vegetariano</h1>
      </EditVegContainer>
    )
  }

  const { changeSelectedVeg } = useContext(SelectedVegContext)

  const handleCreateVeg: SubmitHandler<EditVegFormData> = async (values) => {
    const body = {
      card: selectedVeg.card,
      unusualReservations: [] as UnusualReservation[],
    }

    for (const day of DAYS) {
      for (const meal of ['lunch', 'dinner'] as const) {
        if (values[`${day}_${meal}`] !== selectedVeg.scheduleTable[day][meal]) {
          body.unusualReservations.push({
            card: selectedVeg.card,
            day,
            meal,
            will_come: values[`${day}_${meal}`],
          })
        }
      }
    }

    const response = await api.post('/vegs/unusual', body)

    if (response.status === 201) {
      const newScheduleTable = structuredClone(selectedVeg.scheduleTable)
      
    for (const day of DAYS) {
      for (const meal of ['lunch', 'dinner'] as const) {
        newScheduleTable[day][meal] = values[`${day}_${meal}`] 

      }
    }
      changeSelectedVeg({
        card: selectedVeg.card,
        name: selectedVeg.name,
        scheduleTable: newScheduleTable
      })

      console.log("Nice")
    }
  }

  return (
    <EditVegContainer>
      <h2>{selectedVeg.name}</h2>

      <EditVegForm onSubmit={handleSubmit(handleCreateVeg)}>
        <table>
          <thead>
            <th>Seg</th>
            <th>Ter</th>
            <th>Qua</th>
            <th>Qui</th>
            <th>Sex</th>
          </thead>
          <tbody>
            <tr>
              {DAYS.map((day) => {
                const code = `${day}_lunch` as keyof EditVegFormData
                return <Cell key={code} fromContext {...register(code)} />
              })}
            </tr>
            <tr>
              {DAYS.map((day) => {
                const code = `${day}_dinner` as keyof EditVegFormData
                return <Cell key={code} fromContext {...register(code)} />
              })}
            </tr>
          </tbody>
        </table>

        <SubmitFormButton>
          <NotePencil size={24} />
          Salvar
        </SubmitFormButton>
      </EditVegForm>
    </EditVegContainer>
  )
}
