import styled from 'styled-components'

export const ListContainer = styled.aside`
  height: 1 fr;
  /* padding: 1rem; */

  overflow-x: hidden;
  overflow-y: scroll;

  /* grid-area: veglist; */

  border-radius: 16px 0 0 16px;
  background-color: ${(props) => props.theme['gray-700']};

  grid-area: veglist;
`
