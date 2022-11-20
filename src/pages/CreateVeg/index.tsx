// import { Cell } from '../../components/Cell'
import { UserPlus } from 'phosphor-react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Cell } from '../../components/Cell'
import {
  CreateVegContainer,
  FormContainer,
  Input,
  SubmitFormButton,
} from './styles'

interface CreateVegFormData {
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

const DAYS = ['mon', 'tue', 'wed', 'thu', 'fri'] as const

export function CreateVeg() {
  const { register, handleSubmit } = useForm<CreateVegFormData>()

  const handleCreateVeg: SubmitHandler<CreateVegFormData> = (values) => {
    console.log(values)
  }

  return (
    <CreateVegContainer>
      <FormContainer onSubmit={handleSubmit(handleCreateVeg)}>
        <div className="inpt">
          <Input placeholder="Nome" {...register('name')} />
          <Input placeholder="Card" type="number" {...register('card')} />
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

        <SubmitFormButton type="submit">
          <UserPlus size={24} />
          Criar
        </SubmitFormButton>
      </FormContainer>
    </CreateVegContainer>
  )
}
