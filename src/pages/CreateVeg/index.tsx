// import { Cell } from '../../components/Cell'
import { CreateVegContainer, FormContainer, Input } from './styles'

export function Test() {
  return (
    <CreateVegContainer>
      <FormContainer>
        <div className="inpt">
          <Input placeholder="Nome" name="name" />
          <Input placeholder="Card" name="card" />
        </div>

        {/* <table>
          <tbody>
            <Cell name="pei" />
          </tbody>
        </table> */}
      </FormContainer>
    </CreateVegContainer>
  )
}
