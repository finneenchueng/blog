import Vue from 'vue'
import Router from 'vue-router'
// import article_view from '@/components/ArticleView'
const c_view=resolve => require.ensure([], () => resolve(require('@/components/asyn/ArticleView')), 'viewComponent');
const c_archives=resolve => require.ensure([], () => resolve(require('@/components/asyn/Archives')), 'archivesComponent');
const c_about=resolve => require.ensure([], () => resolve(require('@/components/asyn/About')), 'aboutComponent');
let routes_array=[
	{
		path: '/',
		name: 'viewComponent',
		component: c_view
	},
	{
		path: '/archives',
		name: 'archivesComponent',
		component: c_archives
	},
	{
		path: '/about',
		name: 'aboutComponent',
		component: c_about
	}
];

Vue.use(Router);

export default new Router({
	mode:'hash',
	routes:routes_array
})
