import bus from "../utils/bus";
import { useCallback } from "react";

export default function useFlashMessage() {
  const setFlashMessage = useCallback((msg, type) => {
    bus.emit("flash", {
      mensagem: msg,
      tipo: type,
    });
  }, []);

  return { setFlashMessage };
}
