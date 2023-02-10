import { createContext, useEffect, useState } from "react";
import { redirect } from "react-router-dom";
import { api } from "../services/api";

interface User {
  name: string;
  email: string;
}

interface ICredentials {
  email: string;
  password: string;
}

interface IAuthContextData {
  signIn(credentials: ICredentials): Promise<void>;
  signOut(): void;
  user: User | null;
  isAuthenticated: boolean;
}

export const AuthContext = createContext({} as IAuthContextData);

interface IAuthContextProviderProps {
  children: React.ReactNode;
}

interface IResponse {
  name: string
}

export function AuthProvider({ children }: IAuthContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user

  useEffect(() => {
    const storagedUser = sessionStorage.getItem("@App:user")

    if (storagedUser) {
      const { email, name } = JSON.parse(storagedUser) as User
      setUser({ email, name })
    }
  }, [])

  async function signIn({ email, password }: ICredentials) {
    try {
      const { data: { name } } = await api.post<IResponse>("/admin/login", {
        email, password
      })

      sessionStorage.setItem("@App:user", JSON.stringify({ name, email }))

      setUser({ name, email })
    } catch (err) {
      console.log(err);
    }
  }

  function signOut() {
    sessionStorage.removeItem("@App:user")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
