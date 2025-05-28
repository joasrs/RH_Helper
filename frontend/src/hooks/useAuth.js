import api from "../utils/api";
import useFlashMessage from "./useFlashMessages";
//import useErroPadrao from "./useErroPadrao";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
  const { setFlashMessage } = useFlashMessage();
  //const { setErroPadrao } = useErroPadrao();
  const [usuario, setUsuario] = useState({
    autenticado: false,
    iconeUsuario: "",
  });
  const navigate = useNavigate();

  const logout = useCallback(
    (ocultarMensagem) => {
      setUsuario({ autenticado: false });
      localStorage.removeItem("token-rh");
      api.defaults.headers.Authorization = undefined;

      if (!ocultarMensagem)
        setFlashMessage(`Até logo ${usuario.nome}!`, "success");

      navigate("/login");
    },
    [setFlashMessage, navigate, usuario.nome]
  );

  const autenticarUsuario = useCallback(
    (usuario) => {
      localStorage.setItem("token-rh", usuario.token);
      setarHeaderAPiToken(usuario.token);
      setarUsuarioContexto(usuario);
      console.log("teste");
      navigate("/");
    },
    [navigate]
  );

  useEffect(() => {
    const token = localStorage.getItem("token-rh");
    if (token) {
      setarHeaderAPiToken(token);
      buscarInformacoesToken()
        .then((usuario) => {
          if (usuario) {
            setarUsuarioContexto(usuario);
          }
        })
        .catch((error) => {
          if (error.status === 401) {
            logout(true);
            setFlashMessage(
              `Faça o login novamente para continuar utilizando nossos serviços`,
              "error"
            );
            navigate("/login");
          }
        });
    }
  }, [setFlashMessage, navigate, logout]);

  async function buscarInformacoesToken() {
    return await api.get("/usuario/token/informacoes").then((response) => {
      const tokenRenovado = response.headers.get("x-token-renovado");
      if (tokenRenovado) {
        localStorage.setItem("token-rh", tokenRenovado);
      }
      return response.data.usuario;
    });
    // .catch((error) => {
    //   console.log(error);
    //   return error;
    // });
  }

  const autenticar = useCallback(
    (rota, usuario) => {
      return api.post("/usuario/" + rota, usuario).then((response) => {
        setarHeaderAPiToken(response.data.usuario.token);
        setarUsuarioContexto(response.data.usuario);

        setFlashMessage(
          `Bem vindo(a) de volta ${response.data.usuario.nome}!`,
          "success"
        );
        autenticarUsuario(response.data.usuario);
      });
    },
    [autenticarUsuario, setFlashMessage]
  );

  function setarUsuarioContexto(usuario) {
    setUsuario({ ...usuario, autenticado: true });
  }

  function setarHeaderAPiToken(token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }

  return { usuario, logout, autenticar };
}
