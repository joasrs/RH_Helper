const Candidato = require("../models/candidatoModel");
const Cargo = require("../models/cargoModel");
const Status = require("../models/statusModel");
const Usuario = require("../models/usuarioModel");
const path = require("path");
const fs = require("fs");

const path_arquivo = (nomeArquivo) => {
  const path_formatado = path.join(
    process.cwd(),
    "resources",
    "curriculos",
    nomeArquivo ?? "arquivo_inexistente"
  );

  return fs.existsSync(path_formatado) ? path_formatado : false;
};
module.exports = class CandidatoController {
  static async adicionarCandidato(req, res) {
    try {
      const candidato = req.body;

      delete candidato.createdAt;
      candidato.UsuarioId = req.usuario.id;

      if (req.file?.filename) {
        candidato.curriculo = req.file.filename;
      }

      if (
        !candidato.nome ||
        !candidato.dataNascimento ||
        !candidato.email ||
        !candidato.telefone ||
        !candidato.cpf ||
        !candidato.endereco
      ) {
        res.status(422).json({
          message: "Necessário informar todos os campos obrigatórios",
        });
        return;
      }

      const candidatoIncluido =
        candidato.id > 0
          ? await Candidato.update(candidato, { where: { id: candidato.id } })
          : await Candidato.create(candidato);

      res.status(201).json({
        message: `Candidato ${
          candidato.id ? "alterado" : "incluído"
        } com sucesso!`,
        candidato: candidatoIncluido,
      });
    } catch (error) {
      console.log(`Erro ao adicionar o candidato: ${error}`);
      res.status(500).json({ message: error });
    }
  }

  static buscarCurriculo(req, res) {
    try {
      const pathArquivo = path_arquivo(req.params.nomeArquivo);

      if (!pathArquivo) {
        return res.status(404).send("Arquivo não encontrado");
      }

      res.setHeader("Content-Type", "application/pdf");
      res.sendFile(pathArquivo);
    } catch (error) {
      console.log("erro ao buscar o curriculo do candidato: " + error);
      res.status(500).json({ message: error });
    }
  }

  static async removerCandidato(req, res) {
    let status;
    let message;
    try {
      if (req.params.idCandidato) {
        const where = { id: req.params.idCandidato };

        if (!req.usuario.admin) {
          where.UsuarioId = req.usuario.id;
        }

        //remove o curriculo vinculado ao candidato caso tenha
        const candidato = await Candidato.findOne({
          attributes: ["curriculo"],
          where,
        });
        const pathArquivo = path_arquivo(candidato.curriculo);
        if (pathArquivo) {
          fs.unlinkSync(pathArquivo);
        }

        const retorno = await Candidato.destroy({ where });

        if (retorno === 1) {
          status = 200;
          message = "Candidato removido com sucesso!";
        } else {
          status = 404;
          message =
            "Candidato não encotrado para exclusão ou o usuário não possui permissão para deletar.";
        }
      } else {
        status = 400;
        message = "Parametro id necessário para exclusao não informado.";
      }
    } catch (error) {
      console.log("erro no servidor ao remover candidato: " + error);
      status = 500;
      message = error;
    }

    return res.status(status).json({ message });
  }

  static async buscarCandidatos(req, res) {
    try {
      let candidatos = await Candidato.findAll({
        //raw: true,
        include: [
          {
            model: Usuario,
            attributes: ["nome", "login", "id", "urlImagemPerfil"],
          },
          {
            model: Status,
          },
          {
            model: Cargo,
          },
        ],
        where: {
          UsuarioId: req.usuario.id,
        },
        group: ["Candidato.id", "Usuario.id", "Status.id", "Cargo.id"],
        order: [["createdAt", "DESC"]],
      });

      if (candidatos.length > 0) {
        candidatos = candidatos.map((c) => c.get({ plain: true }));
      }

      res.status(200).json({
        message: `${candidatos.length} reviews encontradas...`,
        candidatos,
      });
    } catch (error) {
      console.log("erro ao consultar os candidatos: " + error);
      res.status(500).json({ message: error });
    }
  }
};
