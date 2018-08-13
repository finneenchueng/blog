import Vue from 'vue';
import VueResource from 'vue-resource';// get $http
import toolkit from '../tool';

Vue.use(VueResource);
const actions = {
  reqLogin(context, param) {
    var condition=toolkit.getPostParamOption(param);
    if(typeof condition!=='object'){
      context.commit('doLoginResponse', {
        success:false,
        msg:param
      });
      return;
    }
    Vue.http.post('/mng/login',condition).then((response) => {
      // console.log(response.body);
      var json = toolkit.parseJsonResult(response.body);
      context.commit('doLoginResponse', json);
    }, () => {

    });

  }
};
export default actions
