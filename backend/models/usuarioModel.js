const { DataTypes } = require("sequelize");
const conexao = require("../DB/conn");

const Usuario = conexao.define("Usuario", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  login: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  urlImagemPerfil: {
    type: DataTypes.STRING,
    allowNull: true,
    get() {
      return (
        this.getDataValue("urlImagemPerfil") ??
        "https://i.ibb.co/yqMZctK/noprofileimage.jpg"
      );
    },
  },
  admin: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
});

Usuario.sync()
  //.sync({ force: true })
  .then(() => console.log("Tabela Usuario Sincronizada com sucesso!"))
  .catch((err) => console.log("erro ao sincronizar a tabela Usuario: " + err));

module.exports = Usuario;
