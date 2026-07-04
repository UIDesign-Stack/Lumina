import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Auth/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Auth/Register.vue'),
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import('@/views/Auth/ForgotPassword.vue'),
  },
  {
    path: '/change-password',
    name: 'ChangePassword',
    component: () => import('@/views/Auth/ChangePassword.vue'),
  },

  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard.vue'),
  },
  {
    path: '/transactions/income',
    name: 'Pemasukan',
    component: () => import('@/views/Transactions/Pemasukan.vue'),
  },
  {
    path: '/transactions/expense',
    name: 'Pengeluaran',
    component: () => import('@/views/Transactions/Pengeluaran.vue'),
  },
  {
    path: '/transactions/transfer',
    name: 'Transfer',
    component: () => import('@/views/Transactions/Transfer.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router