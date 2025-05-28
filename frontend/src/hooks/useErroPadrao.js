import useFlashMessage from "../hooks/useFlashMessages";
import { useCallback } from "react";

export default function useErroPadrao() {
  const { setFlashMessage } = useFlashMessage();

  const setErroPadrao = useCallback(
    (erro) => {
      // const mensagem = erro.status ? erro.response.data.message : erro.message;
      let mensagem = "Problema encontrado na aplicação";
      console.log(erro);
      if (erro.status) {
        mensagem =
          erro.status < 500 ? erro.response.data.message : erro.message;
      }

      console.log(mensagem);
      setFlashMessage(mensagem, "error");
      return mensagem;
    },
    [setFlashMessage]
  );

  return { setErroPadrao };
}
