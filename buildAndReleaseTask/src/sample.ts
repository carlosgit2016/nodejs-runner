const azTask = require("azure-pipelines-task-lib");

printInputs("ScriptSource", "ScriptPath", "InlineScript", "Arguments", "WorkingDirectory");


function printInputs(...inputsNames: string[]) {
    inputsNames.forEach(inputName => console.log(`${inputName}: ${azTask.getInput(inputName, false)}`));
}