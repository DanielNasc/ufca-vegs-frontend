import { SubmitHandler, useForm } from 'react-hook-form'
import { UserPlus } from 'phosphor-react'

import { db } from '../../services/firebase'
import { CreateVegContainer, FormContainer, Input } from './styles'
import { Cell } from '../../components/Cell'
import { SubmitFormButton } from '../../components/SubmitFormButton/styles'
import { toast } from 'react-toastify'
import { addDoc, collection } from 'firebase/firestore'

interface CreateVegFormData {
  card: number
  fri_dinner: boolean
  fri_lunch: boolean
  mon_dinner: boolean
  mon_lunch: boolean
  name: string
  thu_dinner: boolean
  thu_lunch: boolean
  tue_dinner: boolean
  tue_lunch: boolean
  wed_dinner: boolean
  wed_lunch: boolean
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
  scheduleTable: ScheduleTable
}

const DAYS = ['mon', 'tue', 'wed', 'thu', 'fri'] as const

const RESET_VALUES = {} as CreateVegFormData

for (const day of DAYS) {
  for (const meal of ['lunch', 'dinner'] as const) {
    RESET_VALUES[`${day}_${meal}`] = false
  }
}

RESET_VALUES.name = ''
RESET_VALUES.card = 0

export function CreateVeg() {
  // const { isAuthenticated } = useContext(AuthContext)
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<CreateVegFormData>()

  // if (!isAuthenticated) return <Navigate to="/" />

  const handleCreateVeg: SubmitHandler<CreateVegFormData> = async (values) => {
    const newVeg: Veg = {
      card: values.card,
      name: values.name,
      scheduleTable: {} as ScheduleTable,
      absences: 0,
      attendances: 0,
      suspended: false,
    }

    for (const day of DAYS) {
      for (const meal of ['lunch', 'dinner'] as const) {
        if (values[`${day}_${meal}`]) {
          // if the checkbox is checked
          if (!newVeg.scheduleTable[day]) {
            // if the day is not in the schedule table
            newVeg.scheduleTable[day] = {}
          }

          // add the meal to the day
          newVeg.scheduleTable[day][meal] = {
            is_permanent: true,
            will_come: true,
          }
        } else {
          // the veg will not come to the meal
          if (!newVeg.scheduleTable[day]) {
            // if the day is not in the schedule table
            newVeg.scheduleTable[day] = {}
          }

          newVeg.scheduleTable[day][meal] = {
            is_permanent: true,
            will_come: false,
          }
        }
      }
    }

    try {
      await addDoc(collection(db, 'vegs'), newVeg)

      toast.success('Vegetariano criado com sucesso')
    } catch (error) {
      toast.error('Erro ao criar vegetariano')
      console.error('Error adding document: ', error)
    }

    reset(RESET_VALUES)
  }

  return (
    <CreateVegContainer>
      <FormContainer onSubmit={handleSubmit(handleCreateVeg)}>
        <div className="inpt">
          <Input placeholder="Nome" {...register('name')} />
          <Input placeholder="Cartão" type="number" {...register('card')} />
        </div>

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
                const code = `${day}_lunch` as keyof CreateVegFormData
                return <Cell key={code} {...register(code)} />
              })}
            </tr>
            <tr>
              {DAYS.map((day) => {
                const code = `${day}_dinner` as keyof CreateVegFormData
                return <Cell key={code} {...register(code)} />
              })}
            </tr>
          </tbody>
        </table>

        <SubmitFormButton type="submit" disabled={isSubmitting}>
          <UserPlus size={24} />
          Criar
        </SubmitFormButton>
      </FormContainer>
    </CreateVegContainer>
  )
}
