const Status = require("../models/statusModel");
const Usuario = require("../models/usuarioModel");

module.exports = class StatusController {
  // static async getStatuss(req, res) {
  //   const statuss = await buscarTodasStatuss(
  //     req.usuario ? req.usuario.id : 0
  //   );

  //   res.status(200).json({
  //     message: `${statuss.length} statuss encontradas...`,
  //     statuss,
  //   });
  // }
  static async buscarCombo(req, res) {
    try {
      let todosStatus = await Status.findAll({
        attributes: ["id", "descricao"],
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
      const status = {
        descricao: req.body.descricao ? req.body.descricao[0] : "",
        obs: req.body.obs ? req.body.obs[0] : "",
        cor: req.body.cor ? req.body.cor[0] : "",
        ativo: req.body.ativo ? req.body.ativo[0] : Date.now(),
        UsuarioId: req.usuario.id,
      };

      console.log(status);
      if (!status.descricao) {
        res.status(422).json({
          message: "Necessário informar todos os campos obrigatórios",
        });
        return;
      }

      const statusCadastrado = await Status.create(status);
      res.status(201).json({
        message: "Status cadastrado com sucesso!",
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
