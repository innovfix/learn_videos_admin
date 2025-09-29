const { v4: uuidv4 } = require("uuid");
const mysql = require('mysql2/promise');
const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
module.exports = { db, uuidv4 };
