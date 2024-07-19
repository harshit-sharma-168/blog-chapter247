const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const ngrok = require("@ngrok/ngrok");

const db = require("./src/database/db.config");
const envConfig = require("./src/config/env.config");
const mainRoute = require("./src/routes/main.route");

const app = express();
const { port, url } = envConfig.server;

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/api", mainRoute);

app.listen(port, () => {
  console.log(`Server is running on the ${url}`);
});
