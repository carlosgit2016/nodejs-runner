# Node JS Runner

Use this task in a build or release pipeline to run a JS script.

## Arguments

|Argument|Description  | Required | Condition |
|--|--|--|--|
|Script Source  | Target script type: FilePath or Inline  | Yes| No|
|Script path | Path of the file to execute| Yes | Script Source == FilePath|
|Inline Script | Source code to execute, task create a temp file to execute| Yes | Script Source == Inline|
| Arguments | Arguments passed to the script execution, more information see [How to Parse NodeJS Arguments](https://nodejs.org/en/knowledge/command-line/how-to-parse-command-line-arguments/)| No| No|
| Working directory | The path where the script file runs, if empty the default path is $(System.DefaultWorkingDirectory), see [Predefined Variables](https://docs.microsoft.com/en-us/azure/devops/pipelines/build/variables?view=azure-devops&tabs=yaml#system-variables)|No|No|

## More Information
For more information see [Project on GitHub](https://github.com/carlosgit2016/nodejs-runner)