import styled from 'styled-components'

export const EditVegContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 2rem;

  grid-area: veginfo;

  @media (max-width: 800px) {
    margin-bottom: 1rem;
  }
`

export const EditVegForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 1rem;
`
