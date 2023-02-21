import styled from 'styled-components'

export const HomeContainer = styled.main`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 5rem 0;

    justify-content: flex-start;
  }
`

export const CountdownContainer = styled.div`
  font-family: 'Roboto Mono', monospace;
  font-size: 10rem;

  display: flex;
  gap: 1rem;

  span {
    background: ${(props) => props.theme['gray-700']};
    padding: 2rem 1rem;
    border-radius: 8px;
  }

  @media (max-width: 768px) {
    font-size: 5rem;

    span {
      padding: 1rem 0.5rem;
    }
  }
`

interface IStartStopButtonProps {
  isStarted: boolean
}

export const StopStartButton = styled.button<IStartStopButtonProps>`
  margin-top: 2rem;
  font-weight: 500;
  padding: 1rem 2rem;

  border-radius: 8px;
  border: 1px solid
    ${(props) =>
      props.isStarted ? props.theme['red-500'] : props.theme['green-500']};
  background-color: transparent;

  color: ${(props) => props.theme['gray-100']};

  cursor: pointer;

  transition: all 0.2s;

  &:hover {
    background-color: ${(props) =>
      props.isStarted ? props.theme['red-500'] : props.theme['green-500']};
  }
`
