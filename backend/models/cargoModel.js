const { DataTypes } = require("sequelize");
const conexao = require("../DB/conn");
const Usuario = require("./usuarioModel");
const modelService = require("../services/modelService");

const Cargo = conexao.define("Cargo", {
  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mediaSalarial: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  vagasAbertas: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  ativo: {
    type: DataTypes.DATE,
    allowNull: true,
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

Usuario.hasMany(Cargo, {
  onDelete: "CASCADE",
});
Cargo.belongsTo(Usuario);

Cargo.sync()
  //.sync({ force: true })
  .then(() => console.log("Tabela Cargo Sincronizada com sucesso!"))
  .catch((err) => console.log("erro ao sincronizar a tabela Cargo: " + err));

module.exports = Cargo;
