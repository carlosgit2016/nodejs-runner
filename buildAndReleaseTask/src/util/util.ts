const { execSync } = require("child_process");

function execSyncEncodingUtf8AndPrint(command: string): void {
    return console.log(execSyncEncodingUtf8(command));
}

function execSyncEncodingUtf8(command: string): string {
    try {
        return execSync(command, { encoding: "utf8" });   
    } finally {
        console.log("End of exec command");
    }
}

export default {
    execSyncEncodingUtf8AndPrint,
    execSyncEncodingUtf8
}
