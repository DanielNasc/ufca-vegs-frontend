import styled from 'styled-components'

export const LayoutContainer = styled.div`
  height: calc(100vh - 5rem);

  margin: 2.5rem auto;
  padding: 2.5rem;
  border-radius: 16px;

  background-color: ${(props) => props.theme['gray-800']};

  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    height: calc(100vh - 5rem);
    margin: 2.5rem auto;
    padding: 1.25rem;
  }

  @media (min-width: 321px) {
    max-width: 90%;
  }

  @media (max-width: 320px) {
    height: 100vh;
    width: 100%;

    border-radius: 0;
    margin: 0;
  }
`
