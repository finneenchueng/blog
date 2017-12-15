var dataModal = {
	user_id: '',
	user_name: '',
	password: '',
	email: '',
	create_time: ''
};

var paramModal = {
	uId: '',
	uName: '',
	uPwd: '',
	email: '',
	createTime: ''
}
var relateModel = [
	["user_id", "uId"],
	["user_name", "uName"],
	["password", "uPwd"],
	["email", "email"],
	["create_time", "createTime"]
]
module.exports = {
	getParamColumn: function() {
		return paramModal;
	},
	getDataColumn: function() {
		return dataModal;
	},
	transParamModalToDbModal: function(queryDataModal) {
		var _self = this;
		var len = relateModel.length;
		var _dbModal = {};
		for (var j = 0; j < len; j++) {
			var itemCol = relateModel[j];
			var paramKey = itemCol[1];
			var dataKey = itemCol[0];
			if (queryDataModal[paramKey] != undefined) {
				_dbModal[dataKey] = queryDataModal[paramKey];
			}

		}
		return _dbModal;
	},
	transDbModalToParamModal: function(dbModal) {
		var _self = this;
		var len = relateModel.length;
		var _paramModal = {};
		for (var j = 0; j < len; j++) {
			var itemCol = relateModel[j];
			var paramKey = itemCol[1];
			var dataKey = itemCol[0];
			if (dbModal[dataKey] != undefined) {
				_paramModal[paramKey] = dbModal[dataKey];
			}
		}
		return _paramModal;
	},

}