var uploadModal = require("../../service/upload");
//上传路径
module.exports = function(req, res, next) {
	// console.log("进入上传逻辑块。。。。。")
	var dataResult = {
		ok: true
	};
	// console.log(dataResult)
	uploadModal.uploadFileByFormidable(req, res, function(result) {
		dataResult.ok = result.success;
		if (result.success) {
			dataResult.data = result.picName;
		} else {
			dataResult.msg = result.msg;
		}
		res.send(JSON.stringify(dataResult));
	});

	// res.send('this is a upload api!');
};