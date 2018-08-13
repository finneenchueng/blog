const mutations = {
    loadAndUpdatePreviewData (state, data) {
        var opt = state.postData.previewList;
        if (opt.data == undefined) {
            opt = {
                data: data.data,
                count: data.count
            };
        } else {
            opt.count = data.count;
            opt.data = opt.data.concat(data.data);
        }
        state.postData.previewList = opt;
        state.menuIndex = 0;
    },

    markMenuItem (state, _index) {
        state.menuIndex = _index;
    }
};
export default mutations;
