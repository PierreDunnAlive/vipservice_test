const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const logger = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const pug = require("pug");


const api = require("./routes/api.js");
const main = require("./routes/main.js");

app.set("views", "./views");
app.set("view engine", "pug");

app.use(logger("dev", {
    skip: function (req, res) {
        return res.statusCode < 400;
    }, stream: process.stderr
}));

app.use(logger("dev", {
    skip: function (req, res) {
        return res.statusCode >= 400;
    }, stream: process.stdout
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", main);
app.use("/api", api);

server.listen(3000);
server.on("error", (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }
});

module.exports = app;