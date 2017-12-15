import Vue from 'vue';
import FastClick from 'fastclick';
import 'font-awesome/css/font-awesome.css';
import App from './app/loginApp';
import '../less/index.less';
import store from './loginStore'; // get vuex -> store
// Vue.config.productionTip = false
FastClick.attach(document.body); // init fastclick

/* eslint-disable no-new */
var vue_opt={
	store,
	template: '<App/>',
	components: {// 组件指令初始化定义
		App
	},
	mounted: function(){ // 创建完成后需要执行的代码块

  }

}
new Vue(vue_opt).$mount('#login_box');
