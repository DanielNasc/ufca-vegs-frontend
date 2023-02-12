import styled from 'styled-components'

export const CreateVegContainer = styled.div`
  flex: 1;

  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    align-items: flex-start;
    padding-top: 2rem;
  }
`

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .inpt {
    display: flex;
    gap: 1rem;

    @media (max-width: 768px) {
      flex-direction: column;
    }
  }
`

export const Input = styled.input`
  height: 2.5rem;
  border: 0;
  border-bottom: 2px solid ${(props) => props.theme['gray-500']};
  /* box-shadow: 0 0 20px rgba(0, 0, 0, 0.2); */
  border-radius: 8px;
  padding: 0.5rem;

  font-weight: bold;
  font-size: 1.125rem;

  background: ${(props) => props.theme['gray-700']};
  color: ${(props) => props.theme['gray-100']};
  outline: none;

  &:focus {
    border-color: ${(props) => props.theme['green-500']};
  }
`
