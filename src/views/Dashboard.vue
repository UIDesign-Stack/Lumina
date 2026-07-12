<script setup>
import { ref } from 'vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import StatCard from '@/components/Dashboard/StatCard.vue'
import CashFlowChart from '@/components/Dashboard/CashFlowChart.vue'
import ExpenseCategoryChart from '@/components/Dashboard/ExpenseCategoryChart.vue'
import RecentTransactions from '@/components/Dashboard/RecentTransactions.vue'
import BudgetSummary from '@/components/Dashboard/BudgetSummary.vue'
import AccountsList from '@/components/Dashboard/AccountsList.vue'
import ExpenseFormModal from '@/components/Transactions/ExpenseFormModal.vue'
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

const showNewExpenseModal = ref(false)
function handleExpenseSubmit(payload) {
  // TODO: kirim payload ke API / composable untuk disimpan
  console.log('Pengeluaran baru:', payload)
}
</script>

<template>
  <DashboardLayout>

    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <h1 class="text-2xl font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">Dashboard</h1>
        <p class="text-sm text-gray-500 mt-1">Ringkasan keuangan perusahaan Anda hari ini.</p>
      </div>
      <button
          class="flex items-center gap-2 pl-4 pr-3 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white text-sm font-medium shadow-lg shadow-rose-900/30 transition"
          @click="showNewExpenseModal = true"
        >
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

    <ExpenseFormModal
      :open="showNewExpenseModal"
      @close="showNewExpenseModal = false"
      @submit="handleExpenseSubmit"
    />
  </DashboardLayout>
</template>