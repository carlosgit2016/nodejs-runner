const { execSync } = require("child_process");
import fs from 'fs';
import { uuid } from 'uuidv4';
import { fileURLToPath } from 'url';

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

function createTemporaryFile(path: string, data: any) {
    const filePath = `${path}/${uuid()}/${uuid()}.js`;
    fs.writeFileSync(filePath, data, { encoding: "utf8" });
    return filePath;
}

export default {
    execSyncEncodingUtf8AndPrint,
    execSyncEncodingUtf8,
    createTemporaryFile
}
