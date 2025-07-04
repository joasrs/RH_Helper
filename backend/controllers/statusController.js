const Status = require("../models/statusModel");
const Candidato = require("../models/candidatoModel");
const Usuario = require("../models/usuarioModel");

module.exports = class StatusController {
  static async alterarStatus(req, res) {
    try {
      const { idNovoStatus, idCandidato } = req.body;

      if (idNovoStatus && idCandidato) {
        const resultado = await Candidato.update(
          { StatusId: parseInt(idNovoStatus) },
          {
            where: { id: idCandidato },
          }
        );

        if (resultado) {
          return res.status(200).json({
            message: `Status do candidato alterado com sucesso!`,
          });
        }
      }
      res.status(422).json({
        message: `Não foi possível alterar o status do candidato`,
      });
    } catch (error) {
      console.log("erro ao alterar o status: " + error);
      res.status(500).json({ message: error });
    }
  }

  static async buscarCombo(req, res) {
    try {
      let todosStatus = await Status.findAll({
        attributes: ["id", "descricao", "cor"],
        where: {
          UsuarioId: req.usuario.id,
        },
        order: [["createdAt", "DESC"]],
      });

      if (todosStatus.length > 0) {
        todosStatus = todosStatus.map((c) => c.get({ plain: true }));
      }

      res.status(200).json({
        message: `${todosStatus.length} reviews encontradas...`,
        status: todosStatus,
      });
    } catch (error) {
      console.log("erro ao consultar os status: " + error);
      res.status(500).json({ message: error });
    }
  }

  static async adicionarStatus(req, res) {
    try {
      const status = req.body;
      status.ativo = Date.now();
      status.UsuarioId = req.usuario.id;
      delete status.createdAt;

      if (!status.descricao) {
        res.status(422).json({
          message: "Necessário informar todos os campos obrigatórios",
        });
        return;
      }

      const statusCadastrado =
        status.id > 0
          ? await Status.update(status, { where: { id: status.id } })
          : await Status.create(status);

      res.status(201).json({
        message: `Status ${status.id ? "alterado" : "incluído"} com sucesso!`,
        status: statusCadastrado,
      });
    } catch (error) {
      console.log("Erro ao cadastrar o status: " + error);
      res.status(500).json({ message: error });
    }
  }

  // static async buscarStatussDoUsuario(usuarioId, idUsuarioAutenticado) {
  //   return buscarStatussDoUsuario(usuarioId, idUsuarioAutenticado);
  // }

  static async removerStatus(req, res) {
    let status;
    let message;
    try {
      if (req.params.idStatus) {
        const where = { id: req.params.idStatus };

        if (!req.usuario.admin) {
          where.UsuarioId = req.usuario.id;
        }

        const retorno = await Status.destroy({ where });

        if (retorno === 1) {
          status = 200;
          message = "Status removido com sucesso!";
        } else {
          status = 404;
          message =
            "Status não encotrado para exclusão ou o usuário não possui permissão para deletar.";
        }
      } else {
        status = 400;
        message = "Parametro id necessário para exclusao não informado.";
      }
    } catch (error) {
      console.log("erro no servidor ao remover status: " + error);
      status = 500;
      message = error;
    }

    return res.status(status).json({ message });
  }

  static async buscarStatus(req, res) {
    try {
      let todosStatus = await Status.findAll({
        //raw: true,
        include: [
          {
            model: Usuario,
            attributes: ["nome", "login", "id", "urlImagemPerfil"],
          },
        ],
        where: {
          UsuarioId: req.usuario.id,
        },
        group: ["Status.id", "Usuario.id"],
        order: [["updatedAt", "DESC"]],
      });

      if (todosStatus.length > 0) {
        todosStatus = todosStatus.map((c) => c.get({ plain: true }));
      }

      res.status(200).json({
        message: `${todosStatus.length} reviews encontradas...`,
        status: todosStatus,
      });
    } catch (error) {
      console.log("erro ao consultar os status: " + error);
      res.status(500).json({ message: error });
    }
  }
};
