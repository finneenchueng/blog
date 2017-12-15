var _model = require("../db/model");
module.exports = {
	doLogin: function(condition, callback) {
		_model("doc_demo", function(db, collection, assert) {
			collection.find({
				name: condition.uname,
				pwd: condition.upwd
			}).toArray(function(err, result) {
				try {
					// assert.equal(err, null);
				} catch (e) {
					// console.log(err);
					result = [];
				}
				callback(result);
				db.close();
			});

		});
	},


};