import { createRouter, createWebHistory } from 'vue-router'
import { constantRouterMap, asyncRouterMap } from '@/config/router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRouterMap.concat(asyncRouterMap)
})

export default router
