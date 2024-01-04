const mysql = require("mysql2");

require("dotenv").config();

const connect = mysql.createConnection({
  host: "35.197.207.164",
  user: "vini",
  password: "anode2012",
  database: "python",
});

module.exports = connect;
