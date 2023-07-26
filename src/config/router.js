export const asyncRouterMap = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/layouts/index.vue'),
    meta: { title: '' },
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'Index',
        hidden: true,
        component: () => import('@/pages/home/index.vue'),
        meta: { title: '首页' }
      }
    ]
  }
  // {
  //   path: '/:pathMatch(.*)*',
  //   name: 'NotFound',
  //   redirect: '/404',
  //   hidden: true
  // }
]

/**
 * 基础路由
 *
 */
export const constantRouterMap = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/login/index.vue')
  },
  {
    path: '/404',
    component: () => import('@/pages/exception/404.vue')
  }
]
