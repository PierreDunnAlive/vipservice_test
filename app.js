const express = require("express");
const app = express();

const api = require("./routes/api.js");

app.use("/api", api);

module.exports = app;