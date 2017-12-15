var path = require('path');
//图片请求路径
module.exports = function(req, res, next) {
	/*
	// console.log(req.session)
	// console.log(req.params)
	// console.log(req.originalUrl)
	var splitskey = '/page/album/';
	var new_path = req.originalUrl;
	new_path = new_path.replace(splitskey, '');
	// console.log(new_path)
	// var id = req.session.user.uID;
	// var pic_name = req.params.picName;
	var pic_name = new_path;
	*/
// http://localhost/page/album/3fbdb1744be1103/1513249372023_11091.png 
	var pic_id= req.params.id;
	var pic_name = req.params.picName;
	res.sendFile(path.join(__dirname, '../../picture/' + pic_id+'/'+pic_name));
};
// http://localhost:3000/page/album/:test/01.jpg