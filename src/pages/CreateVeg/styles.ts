import styled from 'styled-components'

export const CreateVegContainer = styled.div`
  flex: 1;

  display: flex;
  align-items: center;
  justify-content: center;
`

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .inpt {
    display: flex;
    gap: 1rem;
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

export const SubmitFormButton = styled.button`
  width: 100%;
  border: 0;
  padding: 1rem;
  border-radius: 8px;

  display: flex;
  justify-content: center;
  align-items: center;

  gap: 0.5rem;

  background: ${(props) => props.theme['green-500']};
  color: ${(props) => props.theme['gray-100']};

  &:hover {
    background: ${(props) => props.theme['green-700']};
  }
`
