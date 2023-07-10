require("dotenv").config();

const PORT = process.env.PORT;
const DB_CONN_STRING = process.env.DB_CONN_STRING;
const ACCESS_SECRECT_TOKEN = process.env.ACCESS_SECRECT_TOKEN;
const REFRESH_SECRECT_TOKEN = process.env.REFRESH_SECRECT_TOKEN;

module.exports = {
  PORT,
  DB_CONN_STRING,
  ACCESS_SECRECT_TOKEN,
  REFRESH_SECRECT_TOKEN,
};
