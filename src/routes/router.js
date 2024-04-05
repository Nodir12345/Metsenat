export default [
  {
    path: '/home',
    name: 'Home',
    redirect: '/home/apex',
    meta: {
      layout: 'default',
      requireAuth: true
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
        path: 'user/:id',
        name: 'User',
        component: () => import('@/components/TheChildTable.vue')
      },
      {
        path: 'student/:id',
        name: 'UserDemands',
        component: () => import('@/components/TheChildDemands.vue')
      },
      {
        path: 'demands/add',
        name: 'studentAdd',
        component: () => import('@/components/TheAddStudent.vue')
      }
    ]
  },
  {
    path: '/',
    name: 'Login',
    meta: {
      layout: 'auth',
      isAuth: true
    },
    component: () => import('@/pages/TheLogin.vue')
  },
]
