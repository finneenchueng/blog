import Vue from 'vue';
import VueResource from 'vue-resource';// get $http
import toolkit from '../tool';
Vue.use(VueResource);
const actions = {
  getPreviewDataList(context, param) {
    var condition=toolkit.getPostParamOption(param);
    /**
     * use vue-resource
     */
    Vue.http.post('/page/preview',condition).then((response) => {
      // console.log(response)
      // console.log(response.body)
      // console.log(typeof response)
      var json = toolkit.parseJsonResult(response.body);
      // context.commit('updateLoadingState', true);
      // context.commit('updateBusyState', false);
      // console.log(json)
      context.commit('loadAndUpdatePreviewData', json);
      // progress.$Progress.finish();
    }, () => {
      // context.commit('updateBusyState', false);
      // progress.$Progress.fail();
    });

  }


};
export default actions
