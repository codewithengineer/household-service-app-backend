require("dotenv").config();
const DEVELOPMENT = process.env.NODE_ENV === "DEVELOPMENT";

// URL CREDS
const URL = DEVELOPMENT ? "/#" : "/";

// REDIS CREDS
const REDIS_HOST = process.env.REDISHOST;
const REDIS_PASSWORD = process.env.REDISPASSWORD;
const REDIS_PORT = process.env.REDISPORT;
const REDIS_USER = process.env.REDISUSER;

// MYSQL CREDS
const MYSQLHOST = DEVELOPMENT
  ? process.env.MYSQLHOST
  : process.env.PROD_MYSQLHOST;
const MYSQLUSER = DEVELOPMENT
  ? process.env.MYSQLUSER
  : process.env.PROD_MYSQLUSER;
const MYSQLPASSWORD = DEVELOPMENT
  ? process.env.MYSQLPASSWORD
  : process.env.PROD_MYSQLPASSWORD;
const MYSQLDB = DEVELOPMENT ? process.env.MYSQLDB : process.env.PROD_MYSQLDB;

//  MAILS CREDS
const MAILUSER = DEVELOPMENT ? process.env.MAILUSER : process.env.PROD_MAILUSER;
const MAILPASSWORD = DEVELOPMENT
  ? process.env.MAILPASSWORD
  : process.env.PROD_MAILPASSWORD;

// SECRET KEY CREDS
const SECRET_KEY = DEVELOPMENT
  ? process.env.SECRET_KEY
  : process.env.PROD_SECRET_KEY;

module.exports = {
  REDIS_HOST,
  REDIS_PASSWORD,
  REDIS_PORT,
  REDIS_USER,
  MYSQLHOST,
  MYSQLUSER,
  MYSQLPASSWORD,
  MYSQLDB,
  URL,
  MAILUSER,
  MAILPASSWORD,
  SECRET_KEY,
};
