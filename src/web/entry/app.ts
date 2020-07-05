import { createApp } from 'vue';
import AppVue from '@/page/app/App.vue';
import appRouter from './router/app';
// import Demo from '@/page/demo/Demo.vue';
const App = createApp(AppVue);
App.use(appRouter);
App.mount('#app');
export const app = App;

//https://medium.com/javascript-in-plain-english/a-first-look-at-vue-router-in-vue3-253bc61b2cf5
// createApp(Demo).mount('#app');