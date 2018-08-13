// var util = require('util');
var dataModal = {
    c_id: '',
    c_name: '',
    en_name: ''
};

var paramModal = {
    cateId: '',
    cateName: '',
    enCateName: ''
};
var relateModel = [
    ['c_id', 'cateId'],
    ['c_name', 'cateName'],
    ['en_name', 'enCateName']
];
module.exports = {
    getParamColumn: function () {
        return paramModal;
    },
    getDataColumn: function () {
        return dataModal;
    },
    transDbModalToParamModal: function (queryDataModal) {
        var _self = this;
        var len = relateModel.length;
        // var _paramModal = _self.getParamColumn();
        var _dataModal = _self.getDataColumn();
        _dataModal = Object.assign({}, _dataModal, queryDataModal);
        var _paramModal = {};
        for (var j = 0; j < len; j++) {
            var itemCol = relateModel[j];
            var paramKey = itemCol[1];
            var dataKey = itemCol[0];
            _paramModal[paramKey] = _dataModal[dataKey];
        }
        return _paramModal;
    },
    transDbModalToParamModalWithArrays: function (queryDataModals) {
        const _self = this;
        let modal_arr = [];
        var query_len = queryDataModals.length;
        if (query_len > 0) {
            modal_arr = [];
            for (var i = 0; i < query_len; i++) {
                var cur_item = queryDataModals[i];
                var new_modal = _self.transDbModalToParamModal(cur_item);
                modal_arr.push(new_modal);
            }
        }
        return modal_arr;
    }
};
