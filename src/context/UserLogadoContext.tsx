import { createContext, useContext } from 'react';
import { IUpdateUser } from '../interface/IUsers';

interface UserLogadoContextProps {
  usuarioLogado: IUpdateUser | null
  setUsuarioLogado: (user: IUpdateUser | null) => void
  logout: () => void
}

export const UsuarioLogadoContext = createContext<UserLogadoContextProps | undefined>(undefined)

export function useUsuarioLogado() {
  const context = useContext(UsuarioLogadoContext)
  if (!context) {
    throw new Error('useUsuarioLogado deve ser usado dentro de um UsuarioLogadoProvider')
  }
  return context
}