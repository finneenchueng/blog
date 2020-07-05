import { createRouter, createWebHistory } from 'vue-router';
const routerHistory = createWebHistory()

const router = createRouter({
  history: routerHistory,
  routes: [
    {
        path: '/',
        component: () => import(/* webpackChunkName: "r_comment" */ '@/components/articleview/ArticleView.vue')
    },
    {
        path: '/archives',
        component: () => import(/* webpackChunkName: "r_about" */ '@/components/archive/Archive.vue')
    },
    {
        path: '/about',
        component: () => import(/* webpackChunkName: "r_about" */ '@/components/about/About.vue')
    }
  ]
})

export default router