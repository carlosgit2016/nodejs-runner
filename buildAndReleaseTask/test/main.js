const [arg1, arg2, arg3] = process.argv.slice(2);

console.log("Arguments", arg1, arg2, arg3)
testArgv(arg1, "test");
testArgv(arg2, "test.js");
testArgv(arg3, "4500");

function testArgv(argv, expected){
    if(argv !== expected) console.log("##vso[task.logissue type=error]Error testing arguments " + argv);
    else console.log("Argument OK " + argv);
}