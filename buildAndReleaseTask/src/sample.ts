import { TypeFieldTask } from "./model/TypeFieldTask";
import util from './util/util';
import "dotenv/config";
//import tl from 'azure-pipelines-task-lib/task';
const tl = require("azure-pipelines-task-lib/task");

async function run() {
    printStartingMessage();
    const scriptSource = <string>getVariableValue("ScriptSource", true, TypeFieldTask.RADIO);

    try {
        const pathFileToExecute = definePathFileToExecute(scriptSource);
        const pathFileToExecuteNormalized = util.normalizeAndPreviousCheckPath(pathFileToExecute);
        let execResult: string = util.execSyncEncodingUtf8(`node ${pathFileToExecuteNormalized}`);
        console.log(execResult);
        success("Finishing JS Script");
    } catch (error) {
        fail("Problem running command, Error: \n" + error);
    }
}

run();

function printStartingMessage() {
    console.log("========================== Starting Command Output ===========================");
}

function definePathFileToExecute(scriptSource: string): string {
    if (scriptSource === "FilePath") {
        const input_scriptPath = getVariableValue("ScriptPath", true, TypeFieldTask.FILE_PATH);
        return (<string>input_scriptPath);
    }
    else if (scriptSource === "Inline") {
        const input_inlineScript = getVariableValue("InlineScript", true, TypeFieldTask.MULTI_LINE);
        const pathFileToExecute = util.createTemporaryFile(<string>process.env.AGENT_TEMPDIRECTORY, input_inlineScript);
        console.log(`Created temp file: ${pathFileToExecute}`);
        return pathFileToExecute;
    } else throw "Problem to define a file path to execute";
}

function success(message: string, done?: boolean | undefined) {
    tl.setResult(tl.TaskResult.Succeeded, message, done);
}

function fail(message: string, done?: boolean | undefined) {
    tl.logIssue(tl.IssueType.Error, message, done);
}

function getVariableValue(name: string, required?: boolean, type?: TypeFieldTask): string | undefined {
    if (process.env.NODE_ENV === 'DEV') {
        return process.env[name];
    } else if (type === TypeFieldTask.ENVIRONMENT_VARIABLE) {
        return tl.getVariable(name);
    } else {
        return tl.getInput(name, required);
    }
} 
