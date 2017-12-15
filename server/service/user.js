var _model = require("../db/model");
var _userModel = require("../model/user");
module.exports = {
	queryUserByUnameAndPwd: function(condition, callback) {
		var queryParam = _userModel.transParamModalToDbModal(condition);
		_model("user", function(db, collection, assert) {
			// console.log(queryParam)
			collection.find(queryParam, {
				"_id": 0
			}).toArray(function(err, result) {
				// console.log(err)
				var flag = false;
				try {
					if (result.length >= 1) {
						result = result[0];
						flag = true;
					}
					if (flag) {
						var queryDb = _userModel.transDbModalToParamModal(result);
						callback(queryDb);
					} else {
						callback(null);
					}

				} catch (e) {
					console.log(e);
					callback(null);
				}
				db.close();

			});

		});
	},


};