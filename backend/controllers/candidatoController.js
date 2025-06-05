const Candidato = require("../models/candidatoModel");
const Cargo = require("../models/cargoModel");
const Status = require("../models/statusModel");
const Usuario = require("../models/usuarioModel");

module.exports = class CandidatoController {
  // static async getCandidatos(req, res) {
  //   const candidatos = await buscarTodasCandidatos(
  //     req.usuario ? req.usuario.id : 0
  //   );

  //   res.status(200).json({
  //     message: `${candidatos.length} candidatos encontradas...`,
  //     candidatos,
  //   });
  // }

  static async adicionarCandidato(req, res) {
    try {
      const candidato = {
        id: req.body.id,
        nome: req.body.nome ? req.body.nome[0] : "",
        dataNascimento: req.body.dataNascimento
          ? req.body.dataNascimento[0]
          : "",
        email: req.body.email ? req.body.email[0] : "",
        cpf: req.body.cpf ? req.body.cpf[0] : "",
        telefone: req.body.telefone ? req.body.telefone[0] : "",
        cidadeNaturalidade: req.body.cidadeNaturalidade
          ? req.body.cidadeNaturalidade[0]
          : "",
        endereco: req.body.endereco ? req.body.endereco[0] : "",
        StatusId: req.body.status ? req.body.status[0] : undefined,
        CargoId: req.body.cargo ? req.body.cargo[0] : undefined,
        obsStatus: req.body.obsStatus ? req.body.obsStatus[0] : "",
        UsuarioId: req.usuario.id,
      };

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

  static async removerCandidato(req, res) {
    let status;
    let message;
    try {
      if (req.params.idCandidato) {
        const where = { id: req.params.idCandidato };

        if (!req.usuario.admin) {
          where.UsuarioId = req.usuario.id;
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
        order: [["updatedAt", "DESC"]],
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
