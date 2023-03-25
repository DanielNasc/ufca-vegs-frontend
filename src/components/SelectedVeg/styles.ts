import styled from 'styled-components'

export const EditVegContainer = styled.div`
  /* flex: 1; */
  /* gap: 2rem; */

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 100%;
  grid-template-areas: 'editvegform veginfo';

  grid-template-areas: 'editvegform veginfo';

  /* grid-area: vegcontainer; */
  flex: 1;

  @media (max-width: 800px) {
    margin-bottom: 1rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    grid-template-areas: 'editvegform' 'veginfo';

    gap: 1rem;
  }

  h1,
  h2 {
    grid-area: vegname;

    text-align: center;
  }
`

export const UnselectVeg = styled.button`
  position: absolute;

  border: none;
  background: transparent;
  cursor: pointer;

  color: ${(props) => props.theme['gray-100']};
`

export const EditVegForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  /* background-color: blue; */

  grid-area: editvegform;

  gap: 1rem;
  padding: 2rem 5%;
`
export const VegInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  background-color: ${(props) => props.theme['gray-700']};
  /* background-color: red; */

  padding: 2rem;
  gap: 0.25rem;

  grid-area: veginfo;

  border-radius: 8px;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: 1rem;
  }
`

export const ChangeCardInput = styled.input`
  height: 2.5rem;
  width: calc(1rem * 8);
  margin-right: 0.5rem;
  padding: 0.5rem;

  color: ${(props) => props.theme['gray-100']};
  background-color: ${(props) => props.theme['gray-700']};

  border: 1px solid ${(props) => props.theme['gray-500']};
  border-radius: 8px;
  outline: none;

  &:focus {
    border: 1px solid ${(props) => props.theme['red-500']};
  }
`

export const ChangeInfoButton = styled.button`
  border: 1px solid ${(props) => props.theme['red-500']};
  border-radius: 8px;
  padding: 0.5rem;
  height: 2.5rem;

  cursor: pointer;

  background: transparent;
  color: ${(props) => props.theme['gray-100']};

  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${(props) => props.theme['red-500']};
  }
`

export const NoVegSelectedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  svg {
    height: 25rem;
    width: 25rem;
  }

  h2 {
    font-size: 2rem;
    text-align: center;
  }

  @media (max-width: 500px) {
    svg {
      height: 15rem;
      width: 15rem;
    }
  }
`

// invisible button to delete veg
export const DeleteVegButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  color: ${(props) => props.theme['gray-100']};

  svg {
    transition: all 0.1s ease-in-out;
  }

  &:hover {
    color: ${(props) => props.theme['red-500']};
  }

  &:disabled {
    filter: brightness(0.5);
    cursor: not-allowed;
  }
`
