import styled from 'styled-components'

export const EditVegsContainer = styled.main`
  flex: 1;
  display: grid;
  gap: 1rem;

  /* grid-template: 'veglist' 'veginfo'; */
  grid-template-columns: 1fr 4fr;
  grid-template-rows: 1fr;

  grid-template-areas: 'veglist vegcontainer';

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;

    grid-template-areas: 'vegcontainer' 'veglist';
  }
`
