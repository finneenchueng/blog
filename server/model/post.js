var util = require('util');
var dataModal = {
	post_id: '-1',
	title: '-1',
	content: '-1',
	type: '-1',
	visiable: 1,
	create_time: '-1',
	last_modified: '-1',
	comment_count: 0,
	view_count: 0,
	rss_count: 0,
	author: '-1',
	allow_comment: 1,
	forbid_anonymous_comment: 1,
	summary: '-1',
	tag_name: '-1',
	key_words: '-1',
	c_name: '-1'
};

var paramModal = {
	postId: '',
	title: '',
	content: '',
	type: '',
	enabled: '',
	createTime: '',
	lastModified: '',
	commentCount: '',
	viewCount: '',
	rssCount: '',
	author: '',
	allowComment: '',
	forbidAnonymousComment: '',
	summary: '',
	lblName: '',
	keyWords: '',
	cateName: ''
}
var relateModel = [
		["post_id", "postId"],
		["title", "title"],
		["content", "content"],
		["type", "type"],
		["visiable", "enabled"],
		["create_time", "createTime"],
		["last_modified", "lastModified"],
		["comment_count", "commentCount"],
		["view_count", "viewCount"],
		["rss_count", "rssCount"],
		["author", "author"],
		["allow_comment", "allowComment"],
		["forbid_anonymous_comment", "forbidAnonymousComment"],
		["summary", "summary"],
		["tag_name", "lblName"],
		["key_words", "keyWords"],
		["c_name", "cateName"]
	]
	//防止sql注入
	//http://blog.csdn.net/lqclh502/article/details/47775809
	//http://blog.csdn.net/liangxguo/article/details/46363647
var queryPreviewColumn = {
	"post_id": 1,
	"title": 1,
	"type": 1,
	"create_time": 1,
	"last_modified": 1,
	"summary": 1,
	"tag_name": 1,
	"_id": 0
};
var queryArchiveColumn = {
	"post_id": 1,
	"_id": 0
};
module.exports = {
	getPreviewColumn: function() {
		return queryPreviewColumn;
	},
	getArchiveColumn: function() {
		return queryArchiveColumn;
	},
	needToSetInt(key) {
		var list = ['type', 'visiable', 'comment_count', 'view_count', 'rss_count', 'allow_comment', 'forbid_anonymous_comment'];
		var flag = false;
		for (var i = 0; i < list.length; i++) {
			if (key == list[i]) {
				flag = true;
				break;
			}
		}
		return flag;
	},
	getParamKeyByDbKey: function(dataModalKey) {
		var relate_len = relateModel.length;
		for (var i = 0; i < relate_len; i++) {
			var itemCol = relateModel[i];
			var paramKey = itemCol[1];
			var dataKey = itemCol[0];
			if (dataKey == dataModalKey) {
				return paramKey;
			}

		}
	},
	setQueryParamToDbParam: function(conditionParam) {
		var relate_len = relateModel.length;
		var emptyOpt = {};
		for (var key in conditionParam) {
			for (var j = 0; j < relate_len; j++) {
				var item = relateModel[j];
				var conditionKey = item[1];
				var dbKey = item[0];
				if (key == conditionKey) {
					emptyOpt[dbKey] = conditionParam[key];
					break;
				}

			}
		}
		return emptyOpt;
	},
	getPreviewParamModal: function(queryDataModal) {
		var _self = this;
		var len = 0;
		var _arr = [];
		if (util.isArray(queryDataModal)) {
			len = queryDataModal.length;
			for (var k = 0; k < len; k++) {
				var cur_modal = queryDataModal[k];
				var tmp_len = relateModel.length;
				var _paramModal = {};
				var _dataModal = dataModal;
				// _dataModal = Object.assign({}, _dataModal, queryDataModal);
				for (var i = 0; i < tmp_len; i++) {
					var itemCol = relateModel[i];
					var paramKey = itemCol[1];
					var dataKey = itemCol[0];
					var flag=false;
					for(var key in cur_modal){
						if(key==dataKey){
							flag=true;
							break;
						}
					}
					if(flag){
						_paramModal[paramKey] = cur_modal[dataKey];
					}

				}
				_arr.push(_paramModal);

			}
		}
		return _arr
	},
	transParamModalToDbModalWithStrict: function(postModal) {
		var len = relateModel.length;
		var _paramModal = postModal;
		var _dataModal = {};
		for (var i = 0; i < len; i++) {
			var itemCol = relateModel[i];
			var paramKey = itemCol[1];
			var dataKey = itemCol[0];
			var paramValue = _paramModal[paramKey];
			var flag = false;
			for (var key in _paramModal) {
				if (paramKey == key) {
					flag = true;
				}
			}
			if (flag) {
				_dataModal[dataKey] = paramValue;
			}
		}
		return _dataModal;
	},
	transParamModalToDbModal: function(postModal, connection) {
		var _self = this;
		var len = relateModel.length;
		var _paramModal = paramModal;
		var _dataModal = {};
		_paramModal = Object.assign({}, _paramModal, postModal);
		for (var i = 0; i < len; i++) {
			var itemCol = relateModel[i];
			var paramKey = itemCol[1];
			var dataKey = itemCol[0];
			var paramValue = _paramModal[paramKey];
			// if (typeof paramValue === 'string' && paramValue != '') {
			// 	if (connection != undefined) {
			// 		// paramValue = connection.escape(paramValue);
			// 	}

			// }
			if(postModal[paramKey]!=undefined){
				if (paramValue != '-1') {
					_dataModal[dataKey] = paramValue;
					if (_self.needToSetInt(dataKey)) {
						if (typeof paramValue == 'string') {
							_dataModal[dataKey] = parseInt(paramValue);
						}
					}

				}
			}
			
		}
		return _dataModal;
	},
	transDbModalToParamModal: function(queryDataModal) {
		var len = relateModel.length;
		var _paramModal = {};
		var _dataModal = dataModal;
		// _dataModal = Object.assign({}, _dataModal, queryDataModal);
		for (var i = 0; i < len; i++) {
			var itemCol = relateModel[i];
			var paramKey = itemCol[1];
			var dataKey = itemCol[0];
			if (queryDataModal[dataKey] != undefined) {
				_paramModal[paramKey] = queryDataModal[dataKey];
			}

		}
		return _paramModal;
	},
	transDbModalToParamModalInArrays: function(queryDataModal) {
		var _self = this;
		var len = 0;
		var _arr = [];
		if (util.isArray(queryDataModal)) {
			len = queryDataModal.length;
			for (var k = 0; k < len; k++) {
				var cur_modal = queryDataModal[k];
				_arr.push(_self.transDbModalToParamModal(cur_modal));
			}
		}
		return _arr
	},
	transDbModalToParamModalWithComplex: function(queryDataModal) {
		var _self = this;
		var len = 0;
		var _arr = [];
		if (util.isArray(queryDataModal)) {
			len = queryDataModal.length;
			for (var k = 0; k < len; k++) {
				var cur_modal = queryDataModal[k];
				var _opt = {
					children: []
				};
				for (var key in cur_modal) {
					if (util.isArray(cur_modal[key])) {
						var arr_len = cur_modal[key].length;
						for (var j = 0; j < arr_len; j++) {
							var _item_data = cur_modal[key][j];
							var sub_item_data = {};
							for (var sub_key in _item_data) {
								var tmpSubParamKey = _self.getParamKeyByDbKey(sub_key);
								if (tmpSubParamKey) {
									// if (tmpSubParamKey != 'content' && tmpSubParamKey != 'summay') {
									// 	sub_item_data[tmpSubParamKey] = _item_data[sub_key];
									// }
									sub_item_data[tmpSubParamKey] = _item_data[sub_key];

								}

							}
							_opt.children.push(sub_item_data);
						}
					} else {
						var tmpParamKey = _self.getParamKeyByDbKey(key);
						if (tmpParamKey) {
							_opt[tmpParamKey] = cur_modal[key];
						}

					}


				}
				_arr.push(_opt);
			}
		}
		return _arr
	}
}