import { createContext } from "react";
import useAuth from "../hooks/useAuth";

const Context = createContext();

function UsuarioProvider({ children }) {
  const { usuario, logout, login, autenticar } = useAuth();

  return (
    <Context.Provider value={{ usuario, logout, autenticar }}>
      {children}
    </Context.Provider>
  );
}

export { Context, UsuarioProvider };
