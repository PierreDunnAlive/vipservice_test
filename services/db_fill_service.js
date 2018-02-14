const config = require("../config/config.json");
const exec = require("child_process").exec;

exec(`mysql --user=${config.username} --password='${config.password}' ${config.database} < ./orders.sql`, (error, stdout, stderr) => {
    if (error) {
        console.log("======================");
        console.log(error);
        console.log("======================");
    }
    if (stderr) console.log(stderr.toString());

    console.log(stdout.toString());
});
