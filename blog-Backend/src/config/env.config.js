require('dotenv').config();
const { TokenExpiredTime } = require('./contant.config');
const envVar = {
  db: {
    port: process.env.DB_PORT,
    name: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    username: process.env.DB_USERNAME,
  },
  server: {
    port: process.env.PORT,
    url: process.env.SERVER_URL,
  },
  secret: {
    jwtkey: process.env.JWT_SECRET,
    TokenExpiredTime: TokenExpiredTime,
  },
};

module.exports = envVar;
