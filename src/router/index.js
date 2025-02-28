import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/clubinfo',
      name: 'clubinfo',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ClubView.vue')
    },
    {
      path: '/equipmentinfo',
      name: 'equipmentinfo',
      component: () => import('../views/EquipmentInfoView.vue')
    },
    {
      path: '/lessoninfo',
      name: 'lessoninfo',
      component: () => import('../views/LessonInfoView.vue')
    },
    {
      path: '/bagics',
      name: 'bagics',
      component: () => import('../views/BagicsView.vue')
    },
  ]
})

export default router
