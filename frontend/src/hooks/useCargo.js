import api from "../utils/api";
import useFlashMessage from "./useFlashMessages";
import { useNavigate } from "react-router-dom";
import { useEffect, useCallback } from "react";

export default function useCargo() {
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token-rh");
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }
  }, []);

  const consultarCargos = useCallback(async () => {
    try {
      return await api
        .get("/cargo")
        .then((response) => {
          return response.data.cargos;
        })
        .catch((error) => {
          throw new Error(error);
        });
    } catch (error) {
      throw new Error(error);
    }
  }, []);

  const buscarItensCombo = useCallback(async () => {
    try {
      return await api
        .get("/cargo/combo")
        .then((response) => {
          return response.data.cargos;
        })
        .catch((error) => {
          throw new Error(error);
        });
    } catch (error) {
      throw new Error(error);
    }
  }, []);

  const adicionarCargo = useCallback(
    (cargo) => {
      return api.post("cargo/add", cargo).then((response) => {
        setFlashMessage(response.data.message, "success");
        navigate("/cargo");
      });
    },
    [setFlashMessage, navigate]
  );

  const removerCargo = useCallback(
    (idCargo) => {
      return api.delete("cargo/" + idCargo).then((response) => {
        setFlashMessage(
          response.data.message,
          response.status === 200 ? "success" : "error"
        );
        navigate("/cargo");
        return response.status;
      });
    },
    [setFlashMessage]
  );

  return { consultarCargos, adicionarCargo, removerCargo, buscarItensCombo };
}
