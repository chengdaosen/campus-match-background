import { createRouter, createWebHashHistory } from 'vue-router'

//默认路由，所有用户共享
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/home.vue'),
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录页',
    },
    component: () => import('@/pages/login.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/pages/404.vue'),
  },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
export default router
