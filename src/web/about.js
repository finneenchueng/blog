import Vue from 'vue';
import FastClick from 'fastclick';
import App from './app/aboutApp';
import 'font-awesome/css/font-awesome.css'; // get font-awesome
import './less/index.less';
import store from './aboutStore'; // get vuex -> store
// Vue.config.productionTip = false
FastClick.attach(document.body); // init fastclick
var vue_opt = {
    store,
    template: '<App/>',
    components: {// 组件指令初始化定义
        App
    },
    mounted: function () { // 创建完成后需要执行的代码块
        // console.log('主容器已加载');
    },

}
new Vue(vue_opt).$mount('#app_about');
