import azTask from "azure-pipelines-task-lib";

const sampleInput = azTask.getInput("SampleInput", true);

azTask.logIssue(azTask.IssueType.Warning, "Printing the sampleInput: ", sampleInput);