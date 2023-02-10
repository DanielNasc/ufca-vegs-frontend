import styled from "styled-components";

export const FormContainer = styled.div`
  flex: 1;

  display: flex;
  align-items: center;
  justify-content: center;
`

export const LoginForm = styled.form`
  display: flex;

  flex-direction: column;
  gap: 1rem;
`

export const LoginInput = styled.input`
  height: 2.5rem;
  border: 0;
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
