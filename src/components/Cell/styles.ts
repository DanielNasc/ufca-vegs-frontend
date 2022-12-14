import styled from 'styled-components'

export const CellContainer = styled.td`
  height: 2rem;
  width: 4rem;

  input {
    display: none;
  }
`

export const CellLabel = styled.label`
  height: 100%;
  width: 100%;

  border-radius: 8px;

  display: inline-block;
  cursor: pointer;

  background-color: ${(props) => props.theme['gray-700']};

  input:checked + & {
    background-color: ${(props) => props.theme['green-500']};
  }
`
