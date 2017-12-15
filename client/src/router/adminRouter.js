import Vue from 'vue'
import Router from 'vue-router'
// import article_view from '@/components/ArticleView'
const c_list=resolve => require.ensure([], () => resolve(require('@/components/admin/list')), 'list');
const c_post=resolve => require.ensure([], () => resolve(require('@/components/admin/post')), 'post');
// const c_preview=resolve => require.ensure([], () => resolve(require('@/components/admin/preview')), 'preview');
let routes_array=[
	{
		path: '/',
		name: 'list',
		component: c_list
	},
	{
		path: '/post',
		name: 'post',
		component: c_post
	},
	// {
	// 	path: '/preview',
	// 	name: 'preview',
	// 	component: c_preview
	// }
];

Vue.use(Router);

export default new Router({
	mode:'hash',
	routes:routes_array,
	// beforeRouteUpdate:function(to,from,next){
  //   console.log('beforeRouteUpdate');
  // }
})
