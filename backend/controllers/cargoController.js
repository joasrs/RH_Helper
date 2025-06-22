const Cargo = require("../models/cargoModel");
const Usuario = require("../models/usuarioModel");

module.exports = class CargoController {
  static async buscarCombo(req, res) {
    try {
      let cargos = await Cargo.findAll({
        attributes: ["id", "descricao"],
        where: {
          UsuarioId: req.usuario.id,
        },
        order: [["createdAt", "DESC"]],
      });

      if (cargos.length > 0) {
        cargos = cargos.map((c) => c.get({ plain: true }));
      }

      res.status(200).json({
        message: `${cargos.length} cargos encontrados...`,
        cargos,
      });
    } catch (error) {
      console.log("erro ao consultar os cargos: " + error);
      res.status(500).json({ message: error });
    }
  }

  static async adicionarCargo(req, res) {
    try {
      const cargo = req.body;
      cargo.ativo = Date.now();
      cargo.UsuarioId = req.usuario.id;
      delete cargo.createdAt;

      if (!cargo.descricao || !cargo.mediaSalarial) {
        res.status(422).json({
          message: "Necessário informar todos os campos obrigatórios",
        });
        return;
      }

      const cargoCadastrado =
        cargo.id > 0
          ? await Cargo.update(cargo, { where: { id: cargo.id } })
          : await Cargo.create(cargo);

      res.status(201).json({
        message: `Cargo ${cargo.id ? "alterado" : "incluído"} com sucesso!`,
        cargo: cargoCadastrado,
      });
    } catch (error) {
      console.log("Erro ao cadastrar cargo: " + error);
      res.status(500).json({ message: error });
    }
  }

  //   static async buscarCandidatosDoUsuario(usuarioId, idUsuarioAutenticado) {
  //     return buscarCandidatosDoUsuario(usuarioId, idUsuarioAutenticado);
  //   }

  static async removerCargo(req, res) {
    let status;
    let message;
    try {
      if (req.params.idCargo) {
        const where = { id: req.params.idCargo };

        if (!req.usuario.admin) {
          where.UsuarioId = req.usuario.id;
        }

        const retorno = await Cargo.destroy({ where });

        if (retorno === 1) {
          status = 200;
          message = "Cargo removido com sucesso!";
        } else {
          status = 404;
          message =
            "Cargo não encotrado para exclusão ou o usuário não possui permissão para deletar.";
        }
      } else {
        status = 400;
        message = "Parametro id necessário para exclusao não informado.";
      }
    } catch (error) {
      console.log("erro no servidor ao remover cargo: " + error);
      status = 500;
      message = error;
    }

    return res.status(status).json({ message });
  }

  static async buscarCargos(req, res) {
    try {
      let cargos = await Cargo.findAll({
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
        group: ["Cargo.id", "Usuario.id"],
        order: [["updatedAt", "DESC"]],
      });

      if (cargos.length > 0) {
        cargos = cargos.map((c) => c.get({ plain: true }));
      }

      res.status(200).json({
        message: `${cargos.length} cargos encontrados...`,
        cargos,
      });
    } catch (error) {
      console.log("erro ao consultar os cargos: " + error);
      res.status(500).json({ message: error });
    }
  }
};
