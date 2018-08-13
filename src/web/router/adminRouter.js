import Vue from 'vue';
import Router from 'vue-router';
// import article_view from '@/components/ArticleView';
const cList = resolve => require.ensure([], () => resolve(require('@/components/admin/list')), 'list');
const cPost = resolve => require.ensure([], () => resolve(require('@/components/admin/post')), 'post');
// const c_preview=resolve => require.ensure([], () => resolve(require('@/components/admin/preview')), 'preview');
const routesArray = [
    {
        path: '/',
        name: 'list',
        component: cList
    },
    {
        path: '/post',
        name: 'post',
        component: cPost
    }
    // {
    // 	path: '/preview',
    // 	name: 'preview',
    // 	component: c_preview
    // }
];

Vue.use(Router);

export default new Router({
    mode: 'hash',
    routes: routesArray
    // beforeRouteUpdate:function(to,from,next){
    //   console.log('beforeRouteUpdate');
    // }
});
