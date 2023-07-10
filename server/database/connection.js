const mongoose = require("mongoose");
const { DB_CONN_STRING } = require("../config/index");

const dbConnection = async () => {
  try {
    const conn = await mongoose.connect(DB_CONN_STRING);
    console.log(`Database is connected! ${conn.connection.host}`);
  } catch (error) {
    console.log(`DATABASE ERROR ${error}`);
  }
};

module.exports = dbConnection;
