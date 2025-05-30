const express = require("express");
const router = express.Router();
const statusController = require("../controllers/statusController");
const tokenService = require("../services/tokenService");

router.get(
  "/combo",
  tokenService.verificarTokenThrow,
  statusController.buscarCombo
);
router.get(
  "/",
  tokenService.verificarTokenThrow,
  statusController.buscarStatus
);
router.post(
  "/add",
  tokenService.verificarTokenThrow,
  statusController.adicionarStatus
);

router.delete(
  "/:idStatus",
  tokenService.verificarTokenThrow,
  statusController.removerStatus
);

module.exports = router;
