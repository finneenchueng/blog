import { createApp, hydrate } from 'vue';
import { initLanguage } from '@/utils/locale';
initLanguage();
import '../assets/less/index.less';
import * as fastclick from 'fastclick';
import * as infiniteScroll from 'vue-infinite-scroll';
import AppVue from '@/page/app/App.vue';
import appRouter from './router/appRouter';
// hydrate: RootHydrateFunction
// (vnode: VNode<Node, Element>, container: Element) => void
const InfiniteScroll = infiniteScroll.InfiniteScroll;
const FastClick = fastclick.FastClick;
const App = createApp(AppVue);
(FastClick || fastclick).attach(document.body);
App.use(appRouter);
App.use((InfiniteScroll || infiniteScroll));
appRouter.isReady().then(()=>{
    App.mount('#app');
    console.log(appRouter.currentRoute)
    console.log(appRouter.currentRoute.value)
    console.log(appRouter.currentRoute.value.matched)
    // appRouter.currentRoute.value.matched.flatMap(record =>
    //     Object.values(record.components)
    // )
});

// export const app = App;

//https://medium.com/javascript-in-plain-english/a-first-look-at-vue-router-in-vue3-253bc61b2cf5
// createApp(Demo).mount('#app');

// appRouter.isReady();
