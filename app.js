const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const logger = require("morgan");

const api = require("./routes/api.js");

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

app.use("/api", api);

server.listen(3000);
server.on("error", (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }
});

module.exports = app;