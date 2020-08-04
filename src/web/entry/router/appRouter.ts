import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
/*
  ref: https://www.cnblogs.com/sunyang-001/p/11191416.html
  createWebHistory,  createWebHashHistory,   createMemoryHistory
  browserHistory,    hashHistory,            memoryHistory
  1、browserRouter: Browser routing is the most commonly used routing method in dev mode

  2、hashRouter: Adding an '#' before the path becomes a hash value. the advantage of hash mode is that we will never find our corresponding path because we refresh it

  3、memoryRouter: Without the history stored, all routing processes are stored in memory and cannot be moved forward or backward, because there is no change in the address bar
*/

const appRouter = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
        path: '/',
        component: () => import(/* webpackChunkName: "r_comment" */ '@/components/articleview/ArticleView.vue')
    },
    {
        path: '/archives',
        component: () => import(/* webpackChunkName: "r_archive" */ '@/components/archive/Archive.vue')
    },
    {
        path: '/about',
        component: () => import(/* webpackChunkName: "r_about" */ '@/components/about/About.vue')
    }
  ]
})

export default appRouter