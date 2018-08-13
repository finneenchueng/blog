import Vue from 'vue';
import 'ratchet-npm/dist/css/ratchet.css'; // get ratchet 自定义滚动可用
import 'font-awesome/css/font-awesome.css'; // get font-awesome
import FastClick from 'fastclick';
// import VueProgressBar from 'vue-progressbar'; // get vue-progressbar
import InfiniteScroll from 'vue-infinite-scroll'; // get vue-infinite-scroll
import IndexApp from './app/indexApp';
import router from './router/indexRouter';
import './less/index.less';
import store from './store'; // get vuex -> store
// import 'animate.css/animate.css'; // get animate.css
// Vue.config.productionTip = false
FastClick.attach(document.body); // init fastclick
const options = {
    color: '#fff',
    failedColor: '#874b4b',
    thickness: '3px',
    transition: {
        speed: '0.2s',
        opacity: '0.6s'
    },
    autoRevert: true,
    location: 'top',
    inverse: false
};
// Vue.use(VueProgressBar, options);
Vue.use(InfiniteScroll);
/* eslint-disable no-new */
/*
new Vue({
	// el: '#app',
	store,
	router,
	template: '<App/>',
	components: {// 组件指令初始化定义
		App
	},
	mounted: function(){ // 创建完成后需要执行的代码块
		console.log('主容器已加载');
  },

}).$mount('#app_view')
*/
var vueOpt = {
    store,
    router,
    template: '<IndexApp/>',
    components: {// 组件指令初始化定义
        IndexApp
    },
    mounted: function () { // 创建完成后需要执行的代码块
        // console.log('主容器已加载');
    }

};
new Vue(vueOpt).$mount('#app_view');
