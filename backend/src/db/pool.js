const { pool } = require("pg");
const { env } = require("../config/env");


const pool = new pool({
  host: env.db.host,
  port: env.db.port,
  user: env.db.user,
  password: env.db.password,
  database: env.db.name,
});

module.exports = { pool };

