const pool = require('../database/db.config');
const getUserDetails = async (req, res) => {
  try {
    const userDetails = await pool.query(
      `select first_name, email from users where personid = $1`,
      [req.user?.personid],
    );
    if (userDetails.rowCount == 0) {
      return res.status(200).json({
        message: 'User Details not found!!',
      });
    }

    return res.status(200).json({
      message: 'User Details Fetch Successfully!!',
      data: userDetails.rows[0],
    });
  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json({
      message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    });
  }
};

module.exports = {
  getUserDetails,
};
