const jwt = require('jsonwebtoken');
const pool = require('../database/db.config');
const { secret } = require('../config/env.config');

const verifyToken = (req, res, next) => {
  const { jwtkey } = secret;
  if (req.headers && req.headers.authorization) {
    jwt.verify(
      req.headers.authorization.split(' ')[1],
      jwtkey,
      async function (err, decode) {
        if (err) {
          req.user = undefined;
          return res.status(401).json({
            message: 'Token is invalid!!',
          });
        }
        try {
          const user = await pool.query(
            `select * from users where personid = $1`,
            [decode?.user_id],
          );
          req.user = user.rows[0];
        } catch (err) {
          return res.status(500).send({
            message: err.message || 'Internal server error',
          });
        }
        next();
      },
    );
  } else {
    req.user = undefined;
    return res.status(401).json({
      message: 'Token is missing or invalid',
    });
  }
};
module.exports = verifyToken;
