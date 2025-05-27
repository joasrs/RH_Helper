import { Navigate } from "react-router-dom";

const RotaProtegida = ({ autenticado, children }) => {
  if (!autenticado) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RotaProtegida;