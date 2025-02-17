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
      ],
    },
  ],
})

export default router
