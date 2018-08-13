import Vue from 'vue';
import Router from 'vue-router';
import c_comment from '@/components/asyn/Comment';

const routes_array = [
    {
        path: '/',
        name: 'comment',
        component: c_comment
    }
];

Vue.use(Router);

export default new Router({
    mode: 'hash',
    routes: routes_array
});
