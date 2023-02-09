import { createContext, useState } from "react";
import { api } from "../services/api";

interface User {
  name: string;
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

function signOut() { }

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user

  async function signIn({ email, password }: ICredentials) {
    try {
      const result = await api.post("/vegs/login", {
        email, password
      })

      console.log(result)
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
