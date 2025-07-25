
const { Sequelize } = require("sequelize");
const pg = require("pg");

const conexao = new Sequelize({
  dialect: "sqlite",
  storage: ":memory:",
  logging: false,
});

// esse é so pra quando tiver postgres instalado

// const conexao = new Sequelize(process.env.DATABASE_URL, {
//   host: "localhost",
//   dialect: "postgres",
//   timezone: "-03:00", // Fuso horário de Brasília (sem horário de verão)
//   dialectOptions: {
//     useUTC: false, // Evita usar UTC no PostgreSQL
//     dateStrings: true, // Garante que os timestamps sejam tratados como strings, preservando o fuso horário
//   },
//   logging: false,
//   dialectModule: pg,
// });

try {
  conexao.authenticate();
  console.log("conexao estabelecida");
} catch (error) {
  console.log("erro ao testar a conexão:" + error);
}

module.exports = conexao;


