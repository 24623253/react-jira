import React, { ReactNode, useState } from "react"
import * as auth from 'auth-provider'
import { User } from "screens/project-list/search-panel"

interface AuthForm {
  username: string,
  password: string
}

const AuthContext = React.createContext<{
  user: User | undefined | null,
  login: (data: AuthForm) => Promise<void>,
  register: (data: AuthForm) => Promise<void>,
  logout: () => Promise<void>
} | undefined>(undefined)

AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<User|undefined|null>(null)

  // (user: User) =>setUser(user) 可以写成 setUser 
  // point free
  const login = (form: AuthForm) => auth.login(form).then((user: User) =>setUser(user))
  const register = (form: AuthForm) => auth.register(form).then((user: User) =>setUser(user))
  const logout = () => auth.logout().then(() =>setUser(null))

  return <AuthContext.Provider children={children} value={{user, login, register, logout}} />
}

export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if(!context){
    throw new Error('useAuth 必须在AuthProvider中使用')
  }
  return context
}