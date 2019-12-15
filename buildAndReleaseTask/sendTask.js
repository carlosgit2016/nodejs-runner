const { execSync } = require('child_process');
const fs = require("fs");
require('dotenv/config');

function execSyncEncodingUtf8AndPrint(command) {
    return console.log(execSync(command, { encoding: "utf8" }));
}

(() => {

    const taskJSON = JSON.parse(fs.readFileSync("./task.json", {encoding:"utf8"})); 
    const taskId = taskJSON.id;
    const pathProject = __dirname;
    const token = process.env.TOKEN;
    const service_url = process.env.SERVICE_URL;


    try {
        console.log("Logging on service");
        execSyncEncodingUtf8AndPrint('tfx login -t ' + token + ' -u ' + service_url);
        console.log('Executing tsc build' + __dirname);
        execSyncEncodingUtf8AndPrint('tsc');
        console.log('Deleting Task ' + taskId);
        execSyncEncodingUtf8AndPrint('tfx build tasks delete --task-id ' + taskId);
        console.log('Uploading Task ' + pathProject);
        execSyncEncodingUtf8AndPrint('tfx build tasks upload --task-path ' + pathProject);
    } catch (error) {
        throw error;
    }

})();