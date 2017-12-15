const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
module.exports = {
	uploadFile: function(req, res, callback) {
		// console.log(req.body)
		// console.log(req.files)
			//接收前台POST过来的base64
			// var imgData = req.body.imgData;
			// //过滤data:URL
			// var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
			// var dataBuffer = new Buffer(base64Data, 'base64');
			// fs.writeFile("out.png", dataBuffer, function(err) {
			// 	if(err){
			// 	  res.send(err);
			// 	}else{
			// 	  res.send("保存成功！");
			// 	}

		// });
	},
	uploadFileByFormidable: function(req, res, callback) {
		// console.log(req);
		// console.log(req.body);
		// console.log("开始会话验证。。。。")
		// if (req.session.postOpt == null || req.session.postOpt == undefined) {
		// 	callback({
		// 		msg: '会话失效',
		// 		success: false
		// 	});
		// 	return;
		// }
		// console.log("开始读取存入。。。。")
		var param_Id = req.session.postOpt.postId;
		const form = new formidable.IncomingForm({
			encoding: 'utf-8', //上传编码
			uploadDir: path.join(__dirname, '../picture'), //上传目录，指的是服务器的路径，如果不存在将会报错。
			keepExtensions: true, //保留后缀
			maxFieldsSize: 2 * 1024 * 1024 //byte//最大可上传大小
		});
		// console.log("开始执行上传。。。。")
		// console.log(req.files[0]);
		form.parse(req, (err, fields, files) => {

			console.log(err);
			// console.log(fields);
			// console.log("重命名开始。。。。。");
			// console.log(files);
			if (err) {
				// req.flash('error', '文件上传失败');
				throw err;
			}
			// console.log("重命名。。。。")
			var currentFilePath = files.image.path;
			// console.log("当前文件存放路径:" + currentFilePath)
			//拿到扩展名
			var extname = path.extname(currentFilePath);
			var t = (new Date()).getTime();
			//生成随机数
			var ran = parseInt(Math.random() * 8999 + 10000);
			//新的路径
			let newfilename = t + '_' + ran + extname;
			//规范格式文件名
			var oldpath = path.normalize(currentFilePath);
			var baseUrl = path.join(__dirname, '../picture/' + param_Id);
			if (!fs.existsSync(baseUrl)) {
				fs.mkdirSync(baseUrl);
			}

			var tmpFileName = param_Id + '/' + newfilename;
			var newpath = path.join(__dirname, '../picture/' + param_Id + '/' + newfilename);
			// console.log("已有文件路径：" + oldpath)
			// console.log("即将存放路径：" + newpath)
			fs.rename(oldpath, newpath, function(err) {
				var result = {
					msg: '文件上传成功',
					success: true,
					picName: '/page/album/' + tmpFileName
				};
				if (err) {
					console.error("改名失败" + err);
					result = {
						msg: '改名失败',
						success: false
					};
				}
				callback(result);
			});
			// const title = fields.title;
			// const singer = fields.singer;
			// const music = path.basename(files.music.path);
			// const img = path.basename(files.img.path);
			// db.query('INSERT INTO music (title,singer,music,img) VALUES (?,?,?,?)', [
			//     title,
			//     singer,
			//     music,
			//     img
			// ], (err, rows) => {
			//     if (err) {
			//         throw err;
			//     }
			//     res.redirect('/');
			// })
			// 

			// console.log(files.thumbnail.path);
			// console.log('文件名:' + files.thumbnail.name);
			// var t = (new Date()).getTime();
			// //生成随机数
			// var ran = parseInt(Math.random() * 8999 + 10000);
			// //拿到扩展名
			// var extname = path.extname(files.thumbnail.name);

			// //path.normalize('./path//upload/data/../file/./123.jpg'); 规范格式文件名
			// var oldpath = path.normalize(files.thumbnail.path);

			// //新的路径
			// let newfilename = t + ran + extname;
			// var newpath = './public/images/' + newfilename;
			// console.warn('oldpath:' + oldpath + ' newpath:' + newpath);
			// fs.rename(oldpath, newpath, function(err) {
			// 	if (err) {
			// 		console.error("改名失败" + err);
			// 	}
			// 	res.render('index', {
			// 		title: '文件上传成功:',
			// 		imginfo: newfilename
			// 	});
			// 	callback(fields);
			// });

		})


	},


};