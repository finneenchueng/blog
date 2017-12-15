const path = require('path')
const pre_entry = require('./defined')
var fs = require('fs');
module.exports = {
	canvas_nest_effect:'<script type="text/javascript" color="133,66,104" opacity="0.6" zIndex="-32" count="98" src="//cdn.bootcss.com/canvas-nest.js/1.0.1/canvas-nest.min.js"></script>',
	modTemplate: function() {
		var _self=this;
    for(var key in pre_entry){
      var cur_path=path.resolve(__dirname, '../../server/public/dist/'+key+'.html');
      var htmlText = fs.readFileSync(cur_path, 'utf-8');
      initialIndex = htmlText.indexOf("<title>");
      var initalCamoIndex = htmlText.indexOf("</title>", initialIndex);
      // var middleTitle = htmlText.substring(initialIndex, initalCamoIndex);
      var middleTitle="<title>{{title}}";
      var search_lbl='<meta name="keywords" content="{{keywords}}" /><meta name="description" content="{{desc}}" />';
      middleTitle=search_lbl+middleTitle;
      var newTxt = htmlText.substring(0, initialIndex) + middleTitle + htmlText.substr(initalCamoIndex);
      newTxt=newTxt.replace("<body>","<body><script>window.clientSetting='{{body}}'</script>"+_self.canvas_nest_effect);
  		fs.writeFileSync(cur_path, newTxt);
      console.log("模板文件更新完成！")
			_self.moveTemplateFile(cur_path,key+'.html');
    }
		// _self.modConfig(true);
		// _self.archiverServerPkg();
	},
	modConfig: function(flag) {
		var cur_path=path.resolve(__dirname, '../../server/logicCheck/config.js');
		var jsonText = fs.readFileSync(cur_path, 'utf-8');
		var initialIndex = jsonText.indexOf("isProd");
		var initalCamoIndex = jsonText.indexOf(",", initialIndex);
		var middleTxt = jsonText.substring(initialIndex, initalCamoIndex);
		if(flag){
			middleTxt = middleTxt.replace("false", "true");
		}else{
			middleTxt = middleTxt.replace("true", "false");
		}
		var newTxt = jsonText.substring(0, initialIndex) + middleTxt + jsonText.substr(initalCamoIndex);
		var initialIndex2 = newTxt.indexOf("serverPort");
		var initalCamoIndex2 = newTxt.indexOf(",", initialIndex2);
		if(initalCamoIndex2<0){
			initalCamoIndex2 = newTxt.indexOf("}", initialIndex2);
		}
		var middleTxt2 = newTxt.substring(initialIndex2, initalCamoIndex2);
		if(flag){
			middleTxt2 = middleTxt2.replace("3000", "80");
		}else{
			middleTxt2 = middleTxt2.replace("80", "3000");
		}
		var newTxt2 = newTxt.substring(0, initialIndex2) + middleTxt2 + newTxt.substr(initalCamoIndex2);
		fs.writeFileSync(cur_path, newTxt2);
	},
	moveTemplateFile:function(sourceFile_path,fileName){
		var destPath = path.join(__dirname, '../../server/views/'+fileName);
		fs.rename(sourceFile_path, destPath, function (err) {
		  if (err) throw err;
		  fs.stat(destPath, function (err, stats) {
		    if (err) throw err;
		    console.log("模板文件转移成功！")
		  });
		});
	},

}
