import api from "../utils/api";
import useFlashMessage from "./useFlashMessages";
import { useNavigate } from "react-router-dom";
import { useEffect, useCallback } from "react";

export default function useCandidato() {
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token-rh");
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }
  }, []);

  const consultarCandidatos = useCallback(async () => {
    try {
      return await api
        .get("/candidato")
        .then((response) => {
          return response.data.candidatos;
        })
        .catch((error) => {
          throw new Error(error);
        });
    } catch (error) {
      throw new Error(error);
    }
  }, []);

  const adicionarCandidato = useCallback((candidato) => {
    return api.post("candidato/add", candidato).then((response) => {
      setFlashMessage("Candidato cadastrado com sucesso!", "sucesso");
      navigate("/");
    });
  }, []);

  const removerCandidato = useCallback((idReview) => {
    return api.delete("candidato/" + idReview).then((response) => {
      setFlashMessage(
        response.data.message,
        response.status === 200 ? "sucesso" : "erro"
      );

      return response.status;
    });
  }, []);

  return { consultarCandidatos, adicionarCandidato, removerCandidato };
}
