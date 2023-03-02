import styled from 'styled-components'

export const EditVegContainer = styled.div`
  flex: 1;
  /* gap: 2rem; */

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 2rem 1fr;
  grid-template-areas: 'vegname vegname' 'editvegform veginfo';
  /* grid-template-areas: 'vegname' 'editvegform veginfo'; */

  grid-area: vegcontainer;

  @media (max-width: 800px) {
    margin-bottom: 1rem;
  }

  h2 {
    grid-area: vegname;

    text-align: center;
  }
`

export const EditVegForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  grid-area: editvegform;

  gap: 1rem;
  padding: 0 3rem;
  margin-top: 2rem;
`
export const VegInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  grid-area: veginfo;

  margin-top: 2rem;

  gap: 0.25rem;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: 1rem;

    button {
      background: transparent;
      border: 1px solid ${(props) => props.theme['red-500']};
      border-radius: 8px;
      cursor: pointer;
      color: ${(props) => props.theme['gray-100']};
      padding: 0.5rem;
    }
  }
`
