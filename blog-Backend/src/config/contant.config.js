const TokenExpiredTime = '1h';

const ERROR_MESSAGES = {
  INTERNAL_SERVER_ERROR: 'Internal server error',
  INVALID_EMAIL_PASSWORD: 'Invalid email or password!',
};

const SUCCESS_MESSAGES = {
  SUCCESSFULLY_LOGGED_IN: 'You have successfully logged in',
  ACCOUNT_CREATED_SUCCESSFULLY: 'User has been created successfully',
  ACCOUNT_CREATION_ERROR: 'An error occurred while creating the user',
};

module.exports = { TokenExpiredTime, ERROR_MESSAGES, SUCCESS_MESSAGES };
