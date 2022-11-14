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

  display: inline-block;

  background-color: ${(props) => props.theme['gray-700']};

  &.active {
    background-color: ${(props) => props.theme['green-500']};
  }
`
