import Vue from 'vue';
import VueResource from 'vue-resource'; // get $http
// import toolkit from '../tool';

Vue.use(VueResource);
const actions = {
    reqAboutData(context, param) {
        var json = param;
        context.commit('doAboutData', json);
    }
};
export default actions;

