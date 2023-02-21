import { CountdownContainer, HomeContainer, StopStartButton } from './styles'
import io from 'socket.io-client'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

const socket = io(import.meta.env.VITE_SOCKET_URL)

export function Home() {
  const [counter, setCounter] = useState<null | number>(null)
  const { isAuthenticated } = useContext(AuthContext)

  function fetchCounter() {
    fetch(`${import.meta.env.VITE_SOCKET_URL}/vegs/count`).then((res) =>
      res.json().then((data) => {
        let { activeVegs } = data

        activeVegs = activeVegs != null ? Number(activeVegs) : null

        setCounter(activeVegs)
      }),
    )
  }

  useEffect(() => {
    fetchCounter()

    socket.on('decrement', () => {
      setCounter((old) => {
        if (old) {
          return old - 1
        }
        return old
      })
    })

    socket.on('increment', () => {
      setCounter((old) => {
        if (old != null) {
          return old + 1
        }

        return old
      })
    })

    socket.on('initialized', (data: { counter: number }) => {
      setCounter(data.counter)
    })

    socket.on('terminated', () => {
      setCounter(null)
    })
  }, [])

  function handleEmitToggleCounter() {
    if (counter != null) {
      socket.emit('terminate')
    } else {
      socket.emit('init')
    }
  }

  return (
    <HomeContainer>
      <CountdownContainer>
        {String(counter)
          .padStart(4, '0')
          .split('')
          .map((char, i) => (
            <span key={i}>{char}</span>
          ))}
      </CountdownContainer>

      {isAuthenticated && (
        <StopStartButton
          type="button"
          isStarted={counter != null}
          onClick={handleEmitToggleCounter}
        >
          {counter != null ? (
            <span>Parar contador</span>
          ) : (
            <span>Iniciar contador</span>
          )}
        </StopStartButton>
      )}
    </HomeContainer>
  )
}
