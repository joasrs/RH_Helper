import api from "../utils/api";
import useFlashMessage from "./useFlashMessages";
import { useNavigate } from "react-router-dom";
import { useEffect, useCallback } from "react";

export default function useStatus() {
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token-rh");
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }
  }, []);

  const consultarStatus = useCallback(async () => {
    try {
      return await api
        .get("/status")
        .then((response) => {
          return response.data.status;
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
        .get("/status/combo")
        .then((response) => {
          return response.data.status;
        })
        .catch((error) => {
          throw new Error(error);
        });
    } catch (error) {
      throw new Error(error);
    }
  }, []);

  const adicionarStatus = useCallback(
    (status) => {
      return api.post("status/add", status).then((response) => {
        setFlashMessage("Status cadastrado com sucesso!", "success");
        navigate("/");
      });
    },
    [setFlashMessage, navigate]
  );

  const removerStatus = useCallback(
    (idStatus) => {
      return api.delete("status/" + idStatus).then((response) => {
        setFlashMessage(
          response.data.message,
          response.status === 200 ? "success" : "error"
        );

        return response.status;
      });
    },
    [setFlashMessage]
  );

  return {
    consultarStatus,
    adicionarStatus,
    removerStatus,
    buscarItensCombo,
  };
}
