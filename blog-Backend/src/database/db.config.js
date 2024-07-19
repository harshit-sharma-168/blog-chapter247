const Pool = require('pg').Pool;
const envConfig = require('../config/env.config');
const { username, port, host, password, name } = envConfig.db;

const pool = new Pool({
  user: username,
  host: host,
  database: name,
  password: password,
  port: port,
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('DB has been connected');
  release();
});

module.exports = pool;
