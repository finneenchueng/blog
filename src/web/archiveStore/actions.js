import Vue from 'vue';
import VueResource from 'vue-resource'; // get $http
import toolkit from '../tool';

Vue.use(VueResource);
const actions = {
    reqArchiveListData (context, param) {
        var condition = toolkit.getPostParamOption(param);
        Vue.http.post('/page/archives', condition).then((response) => {
            // console.log(response.body);
            var json = toolkit.parseJsonResult(response.body);
            context.commit('doArchiveListData', json);
        }, () => {

        });
    }
};
export default actions;

