const { Sequelize } = require("sequelize");
const pg = require("pg");

const conexao = new Sequelize({
  dialect: "sqlite",
  storage: ":memory:",
  logging: false,
});

try {
  conexao.authenticate();
  console.log("conexao estabelecida");
} catch (error) {
  console.log("erro ao testar a conexão:" + error);
}

module.exports = conexao;
