import { CountdownConatiner, HomeContainer } from './styles'
import io from 'socket.io-client'
import { useEffect, useState } from 'react'

const socket = io(import.meta.env.VITE_SOCKET_URL)

export function Home() {
  const [counter, setCounter] = useState<null | number>(null)

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

    socket.on('one passed', () => {
      setCounter((old) => {
        if (old) {
          return old - 1
        }
        return old
      })
    })

    socket.on('created', () => {
      setCounter((old) => {
        if (old != null) {
          return old + 1
        }

        return old
      })
    })

    socket.on('counter initialized', () => {
      fetchCounter()
    })

    socket.on('counter cleaned', () => {
      setCounter(null)
    })
  }, [])

  return (
    <HomeContainer>
      <CountdownConatiner>
        {String(counter)
          .padStart(4, '0')
          .split('')
          .map((char, i) => (
            <span key={i}>{char}</span>
          ))}
      </CountdownConatiner>
    </HomeContainer>
  )
}
