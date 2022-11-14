// import { Cell } from '../../components/Cell'
import { UserPlus } from 'phosphor-react'
import { Cell } from '../../components/Cell'
import {
  CreateVegContainer,
  FormContainer,
  Input,
  SubmitFormButton,
} from './styles'

export function CreateVeg() {
  return (
    <CreateVegContainer>
      <FormContainer>
        <div className="inpt">
          <Input placeholder="Nome" name="name" />
          <Input placeholder="Card" name="card" type="number" />
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
              <Cell name="pei" />
              <Cell name="pei" />
              <Cell name="pei" />
              <Cell name="pei" />
              <Cell name="pei" />
            </tr>
            <tr>
              <Cell name="pei" />
              <Cell name="pei" />
              <Cell name="pei" />
              <Cell name="pei" />
              <Cell name="pei" />
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
