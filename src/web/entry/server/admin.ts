import { createApp } from 'vue';
// import AppVue from '@/page/app/App.vue';
import Demo from '@/page/demo/Demo.vue';
export const app = createApp(Demo);
app.mount('#app');


//https://medium.com/javascript-in-plain-english/a-first-look-at-vue-router-in-vue3-253bc61b2cf5
// createApp(Demo).mount('#app');