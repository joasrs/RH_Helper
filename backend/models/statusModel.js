const { DataTypes } = require("sequelize");
const conexao = require("../DB/conn");
const Usuario = require("./usuarioModel");
const modelService = require("../services/modelService");

const Status = conexao.define("Status", {
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  obs: {
    type: DataTypes.TEXT,
  },
  cor: {
    type: DataTypes.STRING,
  },
  ativo: {
    type: DataTypes.DATE,
    get() {
      return modelService.formataData(this.getDataValue("createdAt"));
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    get() {
      return modelService.formataData(this.getDataValue("createdAt"));
    },
  },
});

Usuario.hasMany(Status, {
  onDelete: "CASCADE",
});
Status.belongsTo(Usuario);

Status.sync()
  //.sync({ force: true })
  .then(() => console.log("Tabela Status Sincronizada com sucesso!"))
  .catch((err) => console.log("erro ao sincronizar a tabela Status: " + err));

module.exports = Status;
