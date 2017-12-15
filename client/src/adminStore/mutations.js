const mutations = {
  updateLoadingState(state, data) {
    state.isloadingComplete = data;
  },
  updateBusyState(state, data) {
    state.busy = data;
  },


  doSessionData(state,data){
		state.mngData.sessionOpt = data;
	},
	setMenu(state,_index){
		state.mngData.menuData.menuIndex = _index;
    if(_index==0){
      state.mngData.routeData.postDataList=[];
    }else if(_index==1){
      state.mngData.routeData.postData={};
    }else if(_index==2){

    }
	},
  doPostData(state,data){
    if(typeof data.success==='boolean'){
      state.mngData.resOpt = data;
    }else if(JSON.stringify(data)=='{}'){
      state.mngData.resOpt = data;
    }else{
      state.mngData.routeData.postData=data;
    }

	},
  doPostDataList(state,data){
		state.mngData.routeData.postDataList = data;
	},
  doResponseOption(state,data){
    if(typeof data.success==='boolean'){
      state.mngData.resOpt = data;
    }else if(typeof data.closeOpt==='boolean'){
      state.mngData.resOpt = {};
    }else{
      state.mngData.resOpt={};
      state.mngData.routeData.postDataList = data;
    }

	},
  doCheckReq(state,data){
    state.mngData.routeData.doReq = data;

	},
  doModData(state,data){
    var datalist=state.mngData.routeData.postDataList.data;
    datalist[data.index]=Object.assign({},datalist[data.index],data.postData);
    // console.log(datalist)
    state.mngData.routeData.postDataList.data = datalist;
	},


  addData(state, data) {
    state.cardData = state.cardData.concat(data);
  },
  refreshData(state, data) {
    state.cardData = data;
  },
  isShowAlert(state, data) {
    state.isShow = data;
  },
};
export default mutations
