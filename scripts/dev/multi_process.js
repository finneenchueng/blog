// const exec = require('child_process').exec;
// if(!process.env.CMD_STRING){
//     return;
// }
// for(let i = 0; i < 15; i++) {
//     const workerProcess = exec(process.env.CMD_STRING + ' ' + i, function(err, stdout, stderr){
//         console.log(err ? stderr : stdout);
//     });
//     workerProcess.on('exit', function (code) {
//         console.log('子进程已退出，退出码 ' + code);
//     });
// }


const fs = require('fs');
const child_process = require('child_process');
 
for(let i = 0; i < 30; i++) {
    let workerProcess = child_process.fork("dest/util/generateIPFiles.js", [i]); 
    workerProcess.on('close', function (code) {
        console.log('子进程已退出，退出码 ' + code);
    });
    // let workerProcess = child_process.exec('node dest/util/generateIPFiles.js ' + i, function (error, stdout, stderr) {
    //     console.log('stack index:', i);
    //     if (error) {
    //         console.log(error.stack);
    //         console.log('Error code: ' + error.code);
    //         console.log('Signal received: ' + error.signal);
    //     }
    //     console.log('stdout: ' + stdout);
    //     console.log('stderr: ' + stderr);
    // });
 
    // workerProcess.on('exit', function (code) {
    //     console.log('子进程已退出，退出码 '+ code);
    // });
}