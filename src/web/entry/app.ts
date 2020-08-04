import { createApp } from 'vue';
import '../assets/less/index.less';
import * as fastclick from 'fastclick';
import * as infiniteScroll from 'vue-infinite-scroll'
import AppVue from '@/page/app/App.vue';
import appRouter from './router/appRouter';

const InfiniteScroll = infiniteScroll.InfiniteScroll;
const FastClick = fastclick.FastClick;
const App = createApp(AppVue);
(FastClick || fastclick).attach(document.body);
App.use(appRouter);
App.use((InfiniteScroll || infiniteScroll));
App.mount('#app');
// console.log(navigator.language)
export const app = App;

//https://medium.com/javascript-in-plain-english/a-first-look-at-vue-router-in-vue3-253bc61b2cf5
// createApp(Demo).mount('#app');