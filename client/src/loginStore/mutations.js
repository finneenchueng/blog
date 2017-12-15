const mutations = {
  doLoginData(state,data){
    state.loginOpt=data;
	},
  doLoginResponse(state,data){
    state.resOpt=data;
	}
};
export default mutations
