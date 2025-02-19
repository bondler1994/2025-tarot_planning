import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
    },
    {
      path: '/member',
      name: 'member',
      component: () => import('../views/MemberView.vue'),
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('../views/LoginView.vue'),
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('../views/RegisterView.vue'),
        },
        {
          path: 'edit',
          name: 'member-edit',
          component: () => import('../views/EditView.vue'),
        },
        {
          path: 'diary/statistics',
          name: 'statistics',
          component: () => import('../views/EditView.vue'),
        },
        {
          path: 'diary/overview',
          name: 'overview',
          component: () => import('../views/DiaryOverviewView.vue'),
        },
      ],
    },
    {
      path: '/draw',
      name: 'Draw',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Draw.vue'),
    },
  ],
})

export default router
