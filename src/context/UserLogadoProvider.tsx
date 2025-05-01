import { ReactNode, useState } from "react";
import { IUpdateUser } from "../interface/IUsers";
import { UsuarioLogadoContext } from "./UserLogadoContext";

export function UsuarioLogadoProvider({ children }: { children: ReactNode }) {
  const [usuarioLogado, setUsuarioLogado] = useState<IUpdateUser | null>(() => {
    const storedUser = localStorage.getItem('userData')
    return storedUser ? JSON.parse(storedUser) : null
  });

  const logout = () => {
    localStorage.removeItem('userData')
    localStorage.removeItem('token')
    setUsuarioLogado(null)
  };

  const contextValue = {
    usuarioLogado,
    setUsuarioLogado: (user: IUpdateUser | null) => {
      if (user) {
        localStorage.setItem('userData', JSON.stringify(user))
      }
      setUsuarioLogado(user)
    },
    logout
  };

  return (
    <UsuarioLogadoContext.Provider value={contextValue}>
      {children}
    </UsuarioLogadoContext.Provider>
  );
}