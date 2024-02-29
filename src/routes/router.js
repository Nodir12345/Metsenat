export default [
  {
    path: '/',
    component: () => import('@/pages/TheLogin.vue')
  },
  {
    path: '/table',
    component: () => import('@/pages/TheTable.vue')
  },
  {
    path: '/home',
    component: () => import('@/pages/TheHome.vue')
  }
]
