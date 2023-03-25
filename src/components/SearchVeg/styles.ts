import styled from 'styled-components'

export const SearchVegsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  width: 100%;
  height: 100%;
  gap: 1rem;

  padding: 0.5rem 3%;
`

export const SearchVegsForm = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 2.25rem;

  gap: 1rem;
`

export const SearchVegsInput = styled.input`
  flex: 1;
  height: 100%;
  padding: 0.5rem;

  border-radius: 8px;
  border: 1px solid ${(props) => props.theme['gray-800']};
  outline: none;

  color: ${(props) => props.theme['gray-100']};
  background-color: ${(props) => props.theme['gray-700']};

  transition: border 0.2s;

  &:focus {
    border: 3px solid ${(props) => props.theme['green-500']};
  }
`

export const SearchVegsButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 0.5rem;

  max-width: 7rem;
  height: 100%;
  padding: 0.5rem;

  border-radius: 8px;
  border: 1px solid ${(props) => props.theme['green-500']};
  outline: none;

  cursor: pointer;

  background-color: ${(props) => props.theme['green-500']};
  color: ${(props) => props.theme['gray-100']};

  &:hover {
    filter: brightness(0.9);
  }

  @media (max-width: 425px) {
    span {
      display: none;
    }
  }
`

export const SearchVegsResults = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  width: 100%;
  height: 100%;

  overflow-y: auto;
`

interface SearchVegsResultProps {
  suspended: boolean
}

export const SearchVegsResult = styled.div<SearchVegsResultProps>`
  display: grid;
  /* [icon(blocked|verified)] [name] [card] [select] */
  grid-template-columns: 1fr 8fr 5fr 2fr;
  grid-template-rows: 1fr;
  /* align */
  align-items: center;

  width: 100%;
  height: 3rem;

  padding: 0 0.5rem;

  border-radius: 8px;
  border: 1px solid ${(props) => props.theme['gray-800']};

  background-color: ${(props) => props.theme['gray-700']};

  gap: 0.5rem;

  svg {
    color: ${(props) =>
      props.suspended ? props.theme['red-500'] : props.theme['green-500']};
  }

  span {
    text-align: start;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    /* doesnt  */
  }

  button {
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;

    color: ${(props) => props.theme['gray-100']};
    background-color: ${(props) => props.theme['green-500']};

    padding: 0.5rem;
    border-radius: 8px;

    transition: color 0.2s;

    &:hover {
      filter: brightness(0.9);
    }
  }

  @media (max-width: 550px) {
    /* [icon(blocked|verified)] [name] [select] */
    grid-template-columns: 1fr 8fr 2fr;

    span:nth-child(3) {
      display: none;
    }
  }
`
