import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';
Vue.use(Vuex);

const state = {
  cardData: [],
  isloadingComplete: false,
  busy: false,
  isShow: false,
  pageData:{

  },
  mngData:{
    sessionOpt:{},
    menuData:{
      menuIndex:0
    },
    routeData:{
      postData:{},
      postDataList:{},
      doReq:false
    },
    resOpt:{}
  }
};

const store = new Vuex.Store({
 state,
 getters,
 mutations,
 actions,
});

export default store;
