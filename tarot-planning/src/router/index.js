import { createRouter, createWebHistory } from 'vue-router'
import FirstVisit from '@/views/FirstVisit.vue'
import { useAuthStore } from '@/stores/authStore'
import { useDiaryStore } from '@/stores/diaryStore'
import { useCardStore } from '@/stores/cardDataStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      // component: () => import('@/views/FirstVisit.vue'),
      component: FirstVisit,
    },
    {
      path: '/member',
      name: 'member',
      component: () => import('@/views/MemberView.vue'),
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('@/views/LoginView.vue'),
          meta: { guestOnly: true },
        },
        {
          path: 'login',
          name: 'forgetPassword',
          component: () => import('@/views/LoginView.vue'),
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
              component: () => import('@/views/register/RegisterView.vue'),
            },
            {
              path: 'confirmation',
              name: 'registerConfirmation',
              component: () => import('@/views/register/ConfirmationView.vue'),
            },
            {
              path: 'success',
              name: 'registerSuccess',
              component: () => import('@/views/register/RegisterSuccessView.vue'),
            },
            {
              path: 'google-update',
              name: 'registerGoogleUpdate',
              component: () => import('@/views/register/RegisterGoogleUpdateView.vue'),
            },
          ],
        },
        {
          path: '',
          name: 'today-draw',
          meta: { requiresAuth: true },
          component: () => import('@/views/TodayDrawView.vue'),
          beforeEnter: () => {
            const diaryStore = useDiaryStore()
            const cardStore = useCardStore()

            if (diaryStore.isDiaryValid || cardStore.isCardValid) {
              return { name: 'diary-zone' }
            } else {
              return true
            }
          },
        },
        {
          path: 'diary-zone',
          name: 'diary-zone',
          meta: { requiresAuth: true },
          component: () => import('@/views/DiaryZoneView.vue'),
          beforeEnter: () => {
            const diaryStore = useDiaryStore()
            const cardStore = useCardStore()

            if (diaryStore.isDiaryValid || cardStore.isCardValid) {
              return true
            } else {
              return { name: 'today-draw' }
            }
          },
        },
        {
          path: 'diary/statistics',
          name: 'statistics',
          meta: { requiresAuth: true },
          component: () => import('@/views/EasterEggView.vue'),
        },
        {
          path: 'diary/overview',
          name: 'overview',
          meta: { requiresAuth: true },
          component: () => import('@/views/DiaryOverviewView.vue'),
        },
        {
          path: 'profile',
          name: 'memberProfile',
          meta: { requiresAuth: true },
          component: () => import('@/views/ProfileView.vue'),
        },
      ],
    },
    {
      path: '/draw',
      name: 'Draw',
      component: () => import('@/views/Draw.vue'),
    },
    {
      path: '/write-diary',
      name: 'WriteDiary',
      component: () => import('@/views/WriteDiary.vue'),
    },
  ],
})

router.beforeEach(async (to) => {
  const authStore = useAuthStore()

  if (to.meta.guestOnly && authStore.isAuthenticated) {
    return { name: 'today-draw' }
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { name: 'login' }
  }
})

export default router
