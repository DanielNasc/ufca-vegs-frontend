import styled from 'styled-components'

export const ItemContainer = styled.div`
  background-color: ${(props) => props.theme['gray-700']};
  padding: 1rem;

  border-bottom: 1px solid ${(props) => props.theme['gray-600']};

  line-height: 1.5rem;

  &:hover {
    filter: brightness(1.2);
  }
`
