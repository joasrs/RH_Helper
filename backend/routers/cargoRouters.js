const express = require("express");
const router = express.Router();
const CargoController = require("../controllers/cargoController");
const tokenService = require("../services/tokenService");

router.get(
  "/combo",
  tokenService.verificarTokenThrow,
  CargoController.buscarCombo
);
router.get("/", tokenService.verificarToken, CargoController.buscarCargos);
router.post(
  "/add",
  tokenService.verificarTokenThrow,
  CargoController.adicionarCargo
);

router.delete(
  "/:idCargo",
  tokenService.verificarTokenThrow,
  CargoController.removerCargo
);

module.exports = router;
