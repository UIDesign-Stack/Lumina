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
  {
    path: '/transactions/reconciliation',
    name: 'Rekonsiliasi',
    component: () => import('@/views/Transactions/Rekonsiliasi.vue'),
  },
  {
    path: '/management/budget',
    name: 'Bugdet',
    component: () => import('@/views/Budget/Anggaran.vue'),
  },
  {
    path: '/management/category',
    name: 'Category',
    component: () => import('@/views/Category/Kategori.vue'),
  },
  {
    path: '/management/accounts',
    name: 'Akun',
    component: () => import('@/views/Account/Akun.vue'),
  },
  {
    path: '/management/projects',
    name: 'Proyek',
    component: () => import('@/views/Project/Proyek.vue'),
  },
  {
    path: '/management/parties',
    name: 'PihakKetiga',
    component: () => import('@/views/ThirdParty/PihakKetiga.vue'),
  },
  {
    path: '/reports/financial',
    name: 'LaporanKeuangan',
    component: () => import('@/views/Report/LaporanKeuangan.vue'),
  },
  {
    path: '/reports/cash-flow',
    name: 'ArusKas',
    component: () => import('@/views/CashFlow/ArusKas.vue'),
  },
  {
    path: '/reports/profit-loss',
    name: 'LabaRugi',
    component: () => import('@/views/ProfitLoss/LabaRugi.vue'),
  },
  {
    path: '/reports/balance-sheet',
    name: 'Neraca',
    component: () => import('@/views/BalanceSheet/Neraca.vue'),
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