import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory('/2025-tarot_planning'),
  routes: [
    {
      path: '/',
      component: () => import('../views/FirstVisit.vue'),
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
          redirect: () => {
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
          path: '',
          name: 'today-draw',
          component: () => import('@/views/TodayDrawView.vue'),
        },
        {
          path: 'diary-zone',
          name: 'diary-zone',
          component: () => import('@/views/DiaryZoneView.vue'),
        },
        {
          path: 'diary/statistics',
          name: 'statistics',
          component: () => import('@/views/EasterEggView.vue'),
        },
        {
          path: 'diary/overview',
          name: 'overview',
          component: () => import('../views/DiaryOverviewView.vue'),
        },
        {
          path: 'profile',
          name: 'memberProfile',
          component: () => import('../views/ProfileView.vue'),
        },
      ],
    },
    {
      path: '/draw',
      name: 'Draw',
      component: () => import('../views/Draw.vue'),
    },
    {
      path: '/write-diary',
      name: 'WriteDiary',
      component: () => import('../views/WriteDiary.vue'),
    },
  ],
})

export default router
