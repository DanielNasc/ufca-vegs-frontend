import styled from 'styled-components'

export const CellContainer = styled.td`
  height: 2rem;
  width: 5rem;

  input {
    display: none;
  }
`

export const CellLabel = styled.label`
  height: 100%;
  width: 100%;

  border-radius: 8px;

  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${(props) => props.theme['gray-700']};

  input:checked + & {
    background-color: ${(props) => props.theme['green-500']};
  }
`
