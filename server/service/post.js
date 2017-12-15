var _model = require("../db/model");
var _postModel = require("../model/post");
module.exports = {
	addPostBlog: function(condition, callback) {
		_model("post", function(db, collection, assert) {
			// console.log(condition)
			var paramModal = _postModel.transParamModalToDbModal(condition);
			// console.log(paramModal)
			collection.insert(paramModal, {
				safe: true
			}, function(err, result) {
				// try {
				// 	// assert.equal(err, null);
				// } catch (e) {
				// 	// console.log(e);
				// 	result = 0;
				// }
				callback(result);
				db.close();
			});

		});
	},
	getDetailByPostId: function(condition, callback) {
		var queryParam = _postModel.setQueryParamToDbParam(condition);
		_model("post", function(db, collection, assert) {
			collection.findOne(queryParam, function(err, result) {
				try {
					var paramModals = _postModel.transDbModalToParamModal(result);
					callback(paramModals);
					db.close();
				} catch (e) {
					// console.log(e);
					callback(null);
					db.close();
				}

			});

		});
	},
	getDetailByParam: function(condition, callback) {
		var queryParam = _postModel.setQueryParamToDbParam(condition);
		_model("post", function(db, collection, assert) {
			collection.findOne(queryParam, {
				"_id": 0
			}, function(err, result) {
				// console.log('query code:')
				// console.log(result)
				try {
					if(result==null){
						callback(null);
					}else{
						var paramModals = _postModel.transDbModalToParamModal(result);
						callback(paramModals);
					}
					db.close();
				} catch (e) {
					// console.log(e);
					callback(null);
					db.close();
				}

			});

		});
	},
	updateByParams: function(condition, queryParam, callback) {
		var dbCondition = _postModel.transParamModalToDbModal(condition);
		queryParam = _postModel.setQueryParamToDbParam(queryParam);
		_model("post", function(db, collection, assert) {
			//upsert操作——如果没有查到，就在数据库里面新增一条，使用起来很简单，将update的第三个参数设为true即可		
			collection.update(queryParam, {
				$set: dbCondition
			}, {
				multi: true,
				upsert: false
			}, function(err, result) {
				try {
					// assert.equal(err, null);
				} catch (e) {
					// console.log(e);
					result = null;
				}
				callback(result);
				db.close();
			});
			// collection.update(condition).toArray(function(err, result) {
			// 	try {
			// 		// assert.equal(err, null);
			// 	} catch (e) {
			// 		console.log(err);
			// 		result = [];
			// 	}

			// 	callback(result);
			// 	db.close();
			// });

		});
	},
	delPostById: function(condition, callback) {
		var queryParam = _postModel.transParamModalToDbModalWithStrict(condition);
		var opt = {};
		for (var key in queryParam) {
			var arr = [];
			if (queryParam[key].indexOf(",") > -1) {
				arr = queryParam[key].split(",");
				opt[key] = {
					$in: arr
				}
			}
		}
		queryParam = Object.assign({}, queryParam, opt);
		if (JSON.stringify(queryParam) == '{}') {
			callback(null);
			return;
		}
		_model("post", function(db, collection, assert) {
			try {
				collection.deleteMany(queryParam, function(err, data) {
					// console.log(result)
					// if (!result.acknowledged) {
					// 	result = null;
					// }
					// console.log(result.result)
					if (data.result.ok) {
						callback(data.result);
					} else {
						callback(null);
					}
					db.close();
				});
			} catch (e) {
				// console.log('抛异常。。。。')
				// console.log(e)
				callback(null);
				db.close();
			}

		});
	},
	getPostListWithDetail: function(condition, callback) {
		_model("post", function(db, collection, assert) {
			collection.find(condition).toArray(function(err, result) {
				// console.log(err);
				try {
					// assert.equal(err, null);
				} catch (e) {
					// console.log(e);
					result = [];
				}
				var paramModals = _postModel.transDbModalToParamModalInArrays(result);
				callback(paramModals);
				db.close();
			});

		});
	},
	getCount: function(callback) {
		_model("post", function(db, collection, assert) {
			collection.find({
				visiable: 1
			}).count(function(err, result) {
				// console.log(err);
				callback(result);
				db.close();
			});

		});
	},
	getPostPreviewList: function(condition, callback) {
		_model("post", function(db, collection, assert) {
			condition = {
				visiable: 1
			}
			collection.find(condition, _postModel.getPreviewColumn()).toArray(function(err, result) {
				// console.log(err);
				try {
					// assert.equal(err, null);
				} catch (e) {
					// console.log(e);
					result = [];
				}
				var paramModals = _postModel.getPreviewParamModal(result);
				callback(paramModals);
				db.close();
			});

		});
	},
	getAllPostList: function(callback) {
		_model("post", function(db, collection, assert) {
			collection.find({}, _postModel.getPreviewColumn()).toArray(function(err, result) {
				// console.log(err);
				try {
					// assert.equal(err, null);
				} catch (e) {
					// console.log(e);
					result = [];
				}
				var paramModals = _postModel.getPreviewParamModal(result);
				callback(paramModals);
				db.close();
			});

		});
	},
	getPostPreviewListByPageNum: function(condition, callback) {
		_model("post", function(db, collection, assert) {
			var page_or_sort = {
				sort: {
					"create_time": -1
				},
				skip: (condition.pageNum - 1) * condition.pageSize,
				limit: condition.pageSize
			}
			collection.find({
				visiable: 1
			}, _postModel.getPreviewColumn(), page_or_sort).toArray(function(err, result) {
				// console.log(err);
				try {
					var paramModals = _postModel.getPreviewParamModal(result);
					callback(paramModals);
					db.close();
				} catch (e) {
					// console.log(e);
					callback(null);
					db.close();
				}

			});

		});
	},
	getArchiveList: function(callback) {
		_model("category", function(db, collection, assert) {

			// 联表查询
			/*var results = collection.aggregate(
				[{
					$lookup: {
						from: "orders", //需要关联的表【orders】
						localField: "_id", //【post】表需要关联的字段。
						foreignField: "post_id", //【orders】的matching key
						as: "inventory_docs" //对应的外键集合的数据
					}
				}, {
					$match: { //筛选，相当于where条件
						price: {
							$gt: 20
						}
					}
				}, {
					$project: { //查询字段，比如只挑选inventory_docs等等
						cusip: 1,
						date: 1,
						price: 1,
						_id: 0
					}
				}, {
					$sort: { //排序，多字段排序
						cusip: 1,
						date: 1
					}
				}], {
					allowDiskUse: false //写入临时文件。 设置为true时，聚合操作可以将数据写入到_tmp数据文件目录中的子目录的目录
				}
			);*/
			collection.aggregate(
				[{
					$lookup: {
						from: "post", //需要关联的表【post】
						localField: "c_id", //【post】表需要关联的字段。
						foreignField: "type", //【post】的matching key
						as: "inventory_docs" //对应的外键集合的数据
					}
				}, {
					$match: { //筛选，相当于where条件
						c_id: {
							$ne: 1
						}
					}
				}, {
					$project: { //查询字段，比如只挑选inventory_docs等等
						c_name: 1,
						_id: 0,
						inventory_docs: 1
					}
				}, {
					$sort: { //排序，多字段排序
						c_id: 1
					}
				}]
			).toArray(function(err, results) {
				// console.log(err)
				var paramModals = _postModel.transDbModalToParamModalWithComplex(results);
				// console.log(paramModals)
				// console.log('---------------------------')
				callback(paramModals);
				db.close();
			});

		});
	},
};