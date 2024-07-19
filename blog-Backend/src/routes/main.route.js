const express = require('express');
const app = express.Router();

const verifyToken = require('../middleware/user.middleware');
const authRoute = require('./authentication.route');
const blog = require('./blog.route');
const userRoute = require('./user.route');

app.use('/auth', authRoute);
app.use('/blog', blog);
app.use('/user', verifyToken, userRoute);

module.exports = app;
