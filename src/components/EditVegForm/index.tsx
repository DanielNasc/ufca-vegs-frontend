import { UserPlus } from 'phosphor-react'
import { useContext } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { SelectedVegContext } from '../../contexts/SelectedVegContext'
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

export function SelectedVeg() {
  const { register, handleSubmit } = useForm<EditVegFormData>()
  const { selectedVeg } = useContext(SelectedVegContext)

  if (!selectedVeg) {
    return (
      <EditVegContainer>
        <h1>Selecione um vegetariano</h1>
      </EditVegContainer>
    )
  }

  const handleCreateVeg: SubmitHandler<EditVegFormData> = async (values) => {
    // const body = {
    //   card: selectedVeg.card,
    //   name: selectedVeg.name,
    //   schedule: [] as any[],
    // }

    // for (const day of DAYS) {
    //   for (const meal of ['lunch', 'dinner'] as const) {
    //     if (values[`${day}_${meal}`]) {
    //       body.schedule.push({
    //         day,
    //         meal,
    //       })
    //     }
    //   }
    // }

    console.log(values)

    // await api.post('/vegs/', body)
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
          <UserPlus size={24} />
          Criar
        </SubmitFormButton>
      </EditVegForm>
    </EditVegContainer>
  )
}
