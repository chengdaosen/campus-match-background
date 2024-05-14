import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'
import { usePermissStore } from '../store/permiss'
import 'nprogress/nprogress.css'
//默认路由，所有用户共享
const routes = [
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/home.vue'),
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        meta: {
          title: '系统首页',
          permiss: '1',
        },
        component: () => import('@/pages/dashboard.vue'),
      },
      {
        path: '/user',
        name: 'user',
        meta: {
          title: '个人中心',
        },
        component: () => import('@/pages/user.vue'),
      },
      {
        path: '/userManage',
        name: 'userManage',
        meta: {
          title: '用户管理',
        },
        component: () => import('@/pages/userManage.vue'),
      },
      {
        path: '/complain',
        name: 'complain',
        meta: {
          title: '举报管理',
        },
        component: () => import('@/pages/complain.vue'),
      },
      {
        path: '/post',
        name: 'post',
        meta: {
          title: '帖子管理',
        },
        component: () => import('@/pages/post.vue'),
      },
      {
        path: '/notice',
        name: 'notice',
        meta: {
          title: '公告管理',
        },
        component: () => import('@/pages/notice.vue'),
      },
      {
        path: '/blacklist',
        name: 'blacklist',
        meta: {
          title: '黑名单管理',
        },
        component: () => import('@/pages/blacklist.vue'),
      },
    ],
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

router.beforeEach((to, from, next) => {
  NProgress.start()
  const role = localStorage.getItem('token')
  const permiss = usePermissStore()
  if (!role && to.path !== '/login') {
    next('/login')
  } else if (to.meta.permiss && !permiss.key.includes(to.meta.permiss)) {
    // 如果没有权限，则进入403
    next('/403')
  } else {
    next()
  }
})
router.afterEach(() => {
  NProgress.done()
})
export default router
