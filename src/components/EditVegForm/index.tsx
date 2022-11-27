import { UserPlus } from 'phosphor-react'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { SelectedVegContext } from '../../contexts/SelectedVegContext'
import { Cell } from '../Cell'
import { SubmitFormButton } from '../SubmitFormButton/styles'
import { EditVegFormContainer } from './styles'

const DAYS = ['mon', 'tue', 'wed', 'thu', 'fri'] as const

interface EditVegFormData {
  card: string
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

export function EditVegForm() {
  const { register } = useForm<EditVegFormData>()
  const { selectedVeg } = useContext(SelectedVegContext)

  // const handleCreateVeg: SubmitHandler<EditVegFormData> = async (values) => {
  //   const body = {
  //     card: values.card,
  //     name: values.name,
  //     schedule: [] as any[],
  //   }

  //   for (const day of DAYS) {
  //     for (const meal of ['lunch', 'dinner'] as const) {
  //       if (values[`${day}_${meal}`]) {
  //         body.schedule.push({
  //           day,
  //           meal,
  //         })
  //       }
  //     }
  //   }

  //   await api.post('/vegs/', body)
  // }

  if (!selectedVeg) {
    return <h1>null</h1>
  }

  return (
    <EditVegFormContainer>
      <h2>{selectedVeg.name}</h2>

      <form>
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
                return <Cell key={code} {...register(code)} />
              })}
            </tr>
            <tr>
              {DAYS.map((day) => {
                const code = `${day}_dinner` as keyof EditVegFormData
                return <Cell key={code} {...register(code)} />
              })}
            </tr>
          </tbody>
        </table>

        <SubmitFormButton>
          <UserPlus size={24} />
          Criar
        </SubmitFormButton>
      </form>
    </EditVegFormContainer>
  )
}
