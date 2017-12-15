import Vue from 'vue';
import FastClick from 'fastclick';
import 'font-awesome/css/font-awesome.css'; // get font-awesome
import App from './app/adminApp';
import router from './router/adminRouter';
import '../less/index.less';
import store from './adminStore'; // get vuex -> store
// Vue.config.productionTip = false
FastClick.attach(document.body); // init fastclick

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
		console.log('后台主容器已加载');
  },

}).$mount('#app_box')
*/
var vue_opt={
	store,
	router,
	template: '<App/>',
	components: {// 组件指令初始化定义
		App
	},
	mounted: function(){ // 创建完成后需要执行的代码块
		// console.log('后台主容器已加载');
  }

}
new Vue(vue_opt).$mount('#app_box');
