import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
    },
    {
      path: '/first-visit',
      name: 'first-visit',
      component: () => import('../views/FirstVisit.vue'),
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
          path: 'login',
          name: 'forgetPassword',
          component: () => import('../views/LoginView.vue'),
        },
        {
          path: 'register',
          redirect: (to) => {
            return { name: 'register' }
          },
          children: [
            {
              path: '',
              name: 'register',
              component: () => import('../views/register/RegisterView.vue'),
            },
            {
              path: 'confirmation',
              name: 'registerConfirmation',
              component: () => import('../views/register/ConfirmationView.vue'),
            },
            {
              path: 'success',
              name: 'registerSuccess',
              component: () => import('../views/register/RegisterSuccessView.vue'),
            },
            {
              path: 'google-update',
              name: 'registerGoogleUpdate',
              component: () => import('../views/register/RegisterGoogleUpdateView.vue'),
            },
          ],
        },
        {
          path: 'profile',
          name: 'memberProfile',
          component: () => import('../views/ProfileView.vue'),
        },
        {
          path: 'diary/statistics',
          name: 'statistics',
          component: () => import('../views/ProfileView.vue'),
        },
        {
          path: 'diary/overview',
          name: 'overview',
          component: () => import('../views/DiaryOverviewView.vue'),
        },
        {
          path: 'today-draw',
          name: 'today-draw',
          component: () => import('@/views/TodayDrawView.vue'),
        },
        {
          path: 'diary-zone',
          name: 'diary-zone',
          component: () => import('@/views/DiaryZoneView.vue'),
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
    {
      path: '/write-diary',
      name: 'WriteDiary',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/WriteDiary.vue'),
    },
  ],
})

export default router
