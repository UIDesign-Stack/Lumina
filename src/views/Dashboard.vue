<script setup>
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import StatCard from '@/components/Dashboard/StatCard.vue'
import CashFlowChart from '@/components/Dashboard/CashFlowChart.vue'
import ExpenseCategoryChart from '@/components/Dashboard/ExpenseCategoryChart.vue'
import RecentTransactions from '@/components/Dashboard/RecentTransactions.vue'
import BudgetSummary from '@/components/Dashboard/BudgetSummary.vue'
import AccountsList from '@/components/Dashboard/AccountsList.vue'
import { useDashboardData } from '@/composables/useDashboardData'
import { useTheme } from '@/composables/useTheme'

const {
  statCards,
  cashFlow,
  expenseCategories,
  expenseTotal,
  recentTransactions,
  budgetSummary,
  accounts,
} = useDashboardData()

const { isDark } = useTheme()
</script>

<template>
  <DashboardLayout>

    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <h1 class="text-2xl font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">Dashboard</h1>
        <p class="text-sm text-gray-500 mt-1">Ringkasan keuangan perusahaan Anda hari ini.</p>
      </div>
      <button class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium shadow-lg shadow-purple-900/30 hover:opacity-90 transition self-start sm:self-auto">
        + Transaksi Baru
      </button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
      <StatCard v-for="card in statCards" :key="card.key" :card-key="card.key" v-bind="card" />
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
      <div class="xl:col-span-1">
        <CashFlowChart :labels="cashFlow.labels" :income="cashFlow.income" :expense="cashFlow.expense" />
      </div>
      <div class="xl:col-span-1">
        <ExpenseCategoryChart :categories="expenseCategories" :total="expenseTotal" />
      </div>
      <div class="xl:col-span-1">
        <RecentTransactions :transactions="recentTransactions" />
      </div>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-3 gap-4">
      <div class="xl:col-span-2">
        <BudgetSummary :items="budgetSummary" />
      </div>
      <div class="xl:col-span-1">
        <AccountsList :accounts="accounts" />
      </div>
    </div>
  </DashboardLayout>
</template>