import Vue from 'vue';
import VueResource from 'vue-resource'; // get $http
import toolkit from '../tool';

Vue.use(VueResource);
const actions = {
    reqDetailData (context, param) {
        var condition = toolkit.getPostParamOption(param);
        Vue.http.post('/page/detail', condition).then((response) => {
            // console.log(response.body);
            // console.log(compiles.unCompileCode(response.body));
            // console.log(typeof response)
            // console.log(resultTxt);
            var json = toolkit.parseJsonResult(response.body);
            // if (isRefresh === true) {
            //   context.commit('refreshData', json);
            // } else {
            //   context.commit('addData', json);
            // }
            context.commit('doDetailData', json);
        }, () => {
            console.log('to be continue.');
        });
    }
};
export default actions;

