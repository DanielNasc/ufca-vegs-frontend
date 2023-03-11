import { createContext, useEffect, useState, ReactNode } from 'react'
import { api } from '../services/api'

interface User {
  name: string
  email: string
}

interface ICredentials {
  email: string
  password: string
}

interface IAuthContextData {
  signIn(credentials: ICredentials): Promise<void>
  signOut(): void
  user: User | null
  isAuthenticated: boolean
}

export const AuthContext = createContext({} as IAuthContextData)

interface IAuthContextProviderProps {
  children: ReactNode
}

interface IResponse {
  name: string
}

interface IVerifyResponse {
  admin: {
    name: string
    email: string
  }
}

export function AuthProvider({ children }: IAuthContextProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const isAuthenticated = !!user

  useEffect(() => {
    const storagedUser = localStorage.getItem('@App:user')

    if (!storagedUser) return
    ;(async () => {
      try {
        const response = await api.get<IVerifyResponse>('/admin/verify')

        if (response.status === 200) {
          // compare response.data with storagedUser
          const { name, email } = JSON.parse(storagedUser)

          if (
            response.data.admin.name === name &&
            response.data.admin.email === email
          ) {
            setUser({ name, email })
          } else {
            localStorage.removeItem('@App:user')
            setUser(null)
          }
        }
      } catch {
        localStorage.removeItem('@App:user')
        setUser(null)
      }
    })()
  }, [])

  async function signIn({ email, password }: ICredentials) {
    try {
      const {
        data: { name },
      } = await api.post<IResponse>('/admin/login', {
        email,
        password,
      })

      localStorage.setItem('@App:user', JSON.stringify({ name, email }))

      setUser({ name, email })
    } catch (err) {
      console.log(err)
    }
  }

  function signOut() {
    localStorage.removeItem('@App:user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
