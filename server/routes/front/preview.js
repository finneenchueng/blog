var postModal = require("../../service/post");
var msgTool = require("../../logicCheck/compile");
module.exports = function(req, res, next) {
	var param_key = req.body[msgTool.outerParamKey];
	param_key = param_key == undefined ? null : param_key;
	// console.log(param_key)
	param_key = msgTool.parseJsonResult(param_key);
	if (param_key == null) {
		next();
		return;
	}
	var previewParam = param_key;
	var isNeedChkCount = false;
	if (req.session.previewOpt != undefined) {
		if (req.session.previewOpt.count != undefined) {
			isNeedChkCount = true;
		}
	}
	// console.log(previewParam)
	postModal.getPostPreviewListByPageNum(previewParam, function(result) {
		// console.log(result)
		var outputOpt = {
			data: result
		};
		if (!isNeedChkCount) {
			postModal.getCount(function(count) {
				outputOpt.count = count;
				res.json(msgTool.outputJsonResultWithCompile(outputOpt))
			});
		} else {
			outputOpt.count = req.session.previewOpt.count;
			res.json(msgTool.outputJsonResultWithCompile(outputOpt))
		}

	});
};