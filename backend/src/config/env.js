const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(__dirname, "../../.env"), quiet: true });

function required(key) {
  const value = process.env[key];
  if (value === undefined || value === null || value.trim() === "") {
    throw new Error(`Environment variable not found: ${key}`);
  }
  return value;
}

function number(key, fallback) {
  const rawValue = process.env[key];
  if (rawValue === undefined || rawValue === null || rawValue.trim() === "") {
    if (fallback !== undefined) {
      return fallback;
    }
  }

  const value = Number(rawValue);
  if (!Number.isInteger(value) || isNaN(value)) {
    throw new Error(`Environment variable is not a valid integer: ${key}`);
  }

  return value;
}


const nodeEnv = process.env.NODE_ENV || "development";
const  port = number("PORT", 3000);

if (port < 0 || port > 65535) {
  throw new Error(`Environment variable PORT is out of range: ${port}`);
}

const env = Object.freeze({
  nodeEnv,
  port,
  isProduction: nodeEnv === "production",
  clientOrigin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  db: Object.freeze({
    host: required("DB_HOST"),
    port: number("DB_PORT", 5432),
    user: required("DB_USER"),
    password: required("DB_PASSWORD"),
    name: required("DB_NAME"),
  }),
});


module.exports = { env };