const { execSync } = require("child_process");
import fs from 'fs';
import { uuid } from 'uuidv4';
import tmp from 'tmp';
import path from 'path';


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
    const dirPath: tmp.DirResult = tmp.dirSync({ prefix: "taskrunner" });
    const filePath: string = `${dirPath.name}/${uuid()}.js`;
    fs.writeFileSync(filePath, data, { encoding: "utf8" });
    return filePath;
}

function normalizeAndPreviousCheckPath(filePath: string): string {
    let pathNormalized = path.normalize(filePath);
    if (!fs.existsSync(pathNormalized)) throw "Path do not exists: " + pathNormalized;
    return pathNormalized;
}

export default {
    execSyncEncodingUtf8AndPrint,
    execSyncEncodingUtf8,
    createTemporaryFile,
    normalizeAndPreviousCheckPath
}
