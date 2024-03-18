export default [
  {
    path: '/home',
    name: 'Home',
    redirect: '/home/apex',
    meta: {
      layout: 'default'
    },
    component: () => import('@/pages/TheHome.vue'),
    children: [
      {
        path: 'sponsors',
        name: 'sponsors',
        component: () => import('@/components/TheSponsors.vue')
      },
      {
        path: 'apex',
        name: 'apex',
        component: () => import('@/components/TheApex.vue')
      },
      {
        path: 'demands',
        name: 'demands',
        component: () => import('@/components/TheDemands.vue')
      },
      {
        path: 'filter',
        name: 'filter',
        component: () => import('@/components/TheFilterModal.vue')
      }
    ]
  },
  {
    path: '/',
    name: 'Login',
    meta: {
      layout: 'auth'
    },
    component: () => import('@/pages/TheLogin.vue')
  }
]
