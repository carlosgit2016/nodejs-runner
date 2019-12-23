# Node JS Runner

Use this task on [AzureDevOps](https://azure.microsoft.com/pt-br/services/devops/) in a build or release pipeline to run a NodeJS script.

## Arguments

|Argument|Description  | Required | Condition |
|--|--|--|--|
|Script Source  | Target script type: FilePath or Inline  | Yes| No|
|Script path | Path of the file to execute| Yes | Script Source == FilePath|
|Inline Script | Source code to execute, task create a temp file to execute| Yes | Script Source == Inline|
| Arguments | Arguments passed to the script execution, more information see [How to Parse NodeJS Arguments](https://nodejs.org/en/knowledge/command-line/how-to-parse-command-line-arguments/)| No| No|
| Working directory | The path where the script file runs, if empty the default path is $(System.DefaultWorkingDirectory), see [Predefined Variables](https://docs.microsoft.com/en-us/azure/devops/pipelines/build/variables?view=azure-devops&tabs=yaml#system-variables)|No|No|

## Node
The task assumes the nodejs is available on the PATH, use the task [Node.js Tool Installer task](https://docs.microsoft.com/pt-br/azure/devops/pipelines/tasks/tool/node-js?view=azure-devops) to install a specific version of node before execution.

## Inline Execution
For inline execution the task create a temp folder with the prefix *taskrunner* followed by a random code and put the script inside a randomly generated file using [writeFileSync Method](https://nodejs.org/api/fs.html#fs_fs_writefilesync_file_data_options). The file name is identified by a [uuid](https://en.wikipedia.org/wiki/Universally_unique_identifier).

Temp directory is stored in [$(Agent.TempDirectory)](https://docs.microsoft.com/en-us/azure/devops/pipelines/build/variables?view=azure-devops&tabs=yaml#agent-variables) path.

## Latest Versions
[v0.4.2](https://github.com/carlosgit2016/nodejs-runner/releases/tag/v0.4.2) Change the working directory of the script by placing the path in the task field.

[v0.3.2](https://github.com/carlosgit2016/nodejs-runner/releases/tag/v0.3.2) Pass arguments to the script using the Arguments task field.
