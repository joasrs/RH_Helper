const express = require("express");
const router = express.Router();
const candidatoController = require("../controllers/candidatoController");
const tokenService = require("../services/tokenService");
const { fileUpload } = require("../services/uploadService");

router.get(
  "/",
  tokenService.verificarToken,
  candidatoController.buscarCandidatos
);

router.get(
  "/curriculo/:nomeArquivo",
  tokenService.verificarTokenThrow,
  candidatoController.buscarCurriculo
);

router.post(
  "/add",
  tokenService.verificarTokenThrow,
  fileUpload.single("curriculo"),
  candidatoController.adicionarCandidato
);

router.delete(
  "/:idCandidato",
  tokenService.verificarTokenThrow,
  candidatoController.removerCandidato
);

module.exports = router;
