const jwt = require("jsonwebtoken");
const chaveToken = "1wish-you-were-here2";
const Usuario = require("../models/usuarioModel");

function assinarToken(dadosToken) {
  return jwt.sign(dadosToken, chaveToken, {
    expiresIn: "7d",
  });
}

function extrairInformacoesToken(req) {
  return jwt.decode(formatarToken(req));
}

async function validarToken(token, req, res) {
  try {
    return await jwt.verify(token, chaveToken, async (err, decoded) => {
      if (err) {
        console.log("erro ao validar o token: " + err);
        return false;
      }

      const tempoRestante = decoded.exp - Math.floor(Date.now() / 1000);
      const segundosPorDia = 60 * 60 * 24;

      if (tempoRestante <= 1 * segundosPorDia) {
        res.setHeader("Access-Control-Expose-Headers", "x-token-renovado");
        res.setHeader(
          "x-token-renovado",
          assinarToken({
            id: decoded.id,
          })
        );
      }

      req.usuario = (
        await Usuario.findOne({
          where: { id: decoded.id },
        })
      ).get({ plain: true });

      req.usuario.senha = undefined;

      return true;
    });
  } catch (error) {
    console.log("erro ao validar token: " + error);
    return false;
  }
}

async function verificarToken(req, res, next) {
  const token = formatarToken(req);
  if (token) {
    await validarToken(token, req, res);
  }

  next();
}

async function verificarTokenThrow(req, res, next) {
  const token = formatarToken(req);
  if (!token) {
    return res
      .status(401)
      .json({ message: "Acesso negado: Nenhum token fornecido." });
  }

  if (!(await validarToken(token, req, res))) {
    return res
      .status(401)
      .send({ message: "Acesso negado: Token Inválido throw." });
  }

  next();
}

function formatarToken(req) {
  return req.headers.authorization
    ? req.headers.authorization.split(" ")[1]
    : undefined;
}

module.exports = {
  assinarToken,
  verificarToken,
  verificarTokenThrow,
  extrairInformacoesToken,
};
