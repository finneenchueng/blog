// how to use? eg: CMD_STRING='yarn add koa2' proxychains4 node scripts/dev/exe_from_process.js 
var exec = require('child_process').exec;
if(!process.env.CMD_STRING){
    return;
}
exec(process.env.CMD_STRING, function(err, stdout, stderr){
    console.log(err ? stderr : stdout);
});