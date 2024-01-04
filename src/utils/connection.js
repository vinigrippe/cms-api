const mysql = require("mysql2");

require("dotenv").config();

const connect = mysql.createConnection(process.env.DATABASE_URL);

module.exports = connect;
