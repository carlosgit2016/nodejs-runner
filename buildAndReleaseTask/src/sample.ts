import { TypeFieldTask } from "./model/TypeFieldTask";
import util from './util/util';
import "dotenv/config";
import tl from 'azure-pipelines-task-lib/task';
//const tl = require("azure-pipelines-task-lib/task");

//printInputs("ScriptSource", "ScriptPath", "InlineScript", "Arguments", "WorkingDirectory");


async function run() {
    console.log("========================== Starting Command Output ===========================");
    const input_scriptPath = getVariableValue("ScriptPath", true, TypeFieldTask.FILE_PATH);

    try {
        //Execute Javascript File
        let execResult: string = util.execSyncEncodingUtf8(`node ${input_scriptPath}`);
        console.log(execResult);
        success("Finishing JS Script");
    } catch (error) {
        tl.logIssue(tl.IssueType.Error, "Problem running file: " + input_scriptPath + "Error: \n" + error)
    }
}

/* function printInputs(...inputsNames: string[]) {
    inputsNames.forEach(inputName => console.log(`${inputName}: ${getVariableValue(inputName, false)}`));
} */

run();

function success(message: string, done?: boolean | undefined) {
    tl.setResult(tl.TaskResult.Succeeded, message, done);
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
