import { createRouter, createWebHistory } from 'vue-router'
import AuthLayout from '@/layouts/AuthLayout.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'

const routes = [
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      { path: 'login', name: 'Login', component: () => import('@/views/LoginPage.vue') },
      { path: 'register', name: 'Register', component: () => import('@/views/RegisterPage.vue') },
    ],
  },
  {
    path: '/',
    component: DashboardLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '', name: 'Dashboard', component: () => import('@/views/DashboardPage.vue') },
      { path: 'tasks', name: 'TasksList', component: () => import('@/views/TasksListPage.vue') },
      { path: 'tasks/create', name: 'CreateTask', component: () => import('@/views/CreateTaskPage.vue') },
      { path: 'tasks/:id/edit', name: 'EditTask', component: () => import('@/views/EditTaskPage.vue') },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/auth/login',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('access')
  if (to.meta.requiresAuth && !token) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
