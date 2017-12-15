var _model = require("../db/model");
var _categoryModel = require("../model/category");
module.exports = {
	getCategoryList: function(condition, callback) {
		_model("category", function(db, collection, assert) {
			collection.find(condition, {
				"_id": 0
			}).toArray(function(err, result) {
				var paramModals = _categoryModel.transDbModalToParamModalWithArrays(result);
				callback(paramModals);
				db.close();
			});

		});
	},
};