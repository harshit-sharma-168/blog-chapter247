const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const envConfig = require('../config/env.config');
const pool = require('../database/db.config');
const {
  SUCCESS_MESSAGES,
  ERROR_MESSAGES,
} = require('../config/contant.config');

const login = async (req, res) => {
  const { email, user_password } = req.body;
  const { jwtkey, TokenExpiredTime } = envConfig.secret;

  try {
    const userDetails = await pool.query(
      `select * from users where email = $1`,
      [email],
    );

    if (userDetails.rowCount === 0) {
      return res.status(401).json({
        message: ERROR_MESSAGES.INVALID_EMAIL_PASSWORD,
      });
    }

    const { password, personid, first_name } = userDetails.rows[0];
    const isPasswordValid = await bcrypt.compare(user_password, password);

    if (isPasswordValid) {
      const jwt_data = jwt.sign(
        { user_id: personid, name: first_name },
        jwtkey,
        {
          expiresIn: TokenExpiredTime,
        },
      );
      return res.status(200).json({
        message: SUCCESS_MESSAGES.SUCCESSFULLY_LOGGED_IN,
        token: jwt_data,
      });
    } else {
      return res.status(401).json({
        message: ERROR_MESSAGES.INVALID_EMAIL_PASSWORD,
      });
    }
  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json({
      message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    });
  }
};

const signup = async (req, res) => {
  const { first_name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userDetails = await pool.query(
      `INSERT INTO "users" ("first_name", "email", "password") VALUES ($1, $2, $3) RETURNING *`,
      [first_name, email, hashedPassword],
    );

    if (userDetails.rowCount == 1) {
      return res.status(201).json({
        message: SUCCESS_MESSAGES.ACCOUNT_CREATED_SUCCESSFULLY,
      });
    } else {
      return res.status(400).json({
        message: SUCCESS_MESSAGES.ACCOUNT_CREATION_ERROR,
      });
    }
  } catch (err) {
    console.error(`Error: ${err.message}`);
    return res.status(500).json({
      message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      error: err.message,
    });
  }
};

module.exports = {
  login: login,
  signup: signup,
};
