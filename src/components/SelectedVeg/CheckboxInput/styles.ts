import styled from 'styled-components'

export const CheckboxInputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 1rem;
`

export const CheckboxInputBaseInput = styled.input`
  appearance: none;

  background-color: ${(props) => props.theme['gray-600']};

  cursor: pointer;

  width: 1.15rem;
  height: 1.15rem;

  border: none;
  border-radius: 0.15em;

  display: grid;
  place-content: center;

  &::before {
    content: '';
    width: 0.8rem;
    height: 0.8rem;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em ${(props) => props.theme['red-500']};
  }

  &:checked::before {
    transform: scale(1);
  }
`
