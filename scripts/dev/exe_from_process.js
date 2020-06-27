var exec = require('child_process').exec;
if(!process.env.CMD_STRING){
    return;
}
exec(process.env.CMD_STRING, function(err, stdout, stderr){
    console.log(err ? stderr : stdout);
});