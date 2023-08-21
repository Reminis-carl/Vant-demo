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
      },
      {
        path: '/navigationalData',
        name: 'NavigationalData',
        hidden: false,
        component: () => import('@/pages/navigationalData/index.vue'),
        meta: { title: '航行资料' }
      },
      {
        path: '/controlProvision',
        name: 'ControlProvision',
        hidden: false,
        component: () => import('@/pages/controlProvision/index.vue'),
        meta: { title: '管制规定' }
      },
      {
        path: '/pictureChart',
        name: 'PictureChart',
        hidden: false,
        component: () => import('@/pages/pictureChart/index.vue'),
        meta: { title: '图片类导航' }
      },
      {
        path: '/assistTool',
        name: 'AssistTool',
        hidden: false,
        component: () => import('@/pages/assistTool/index.vue'),
        meta: { title: '辅助工具' }
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
