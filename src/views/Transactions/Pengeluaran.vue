<script setup>
import { PlusIcon, ArrowUpTrayIcon, ChevronDownIcon } from '@heroicons/vue/24/outline'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import ExpenseSummaryCard from '@/components/Transactions/ExpenseSummaryCard.vue'
import ExpenseTrendChart from '@/components/Transactions/ExpenseTrendChart.vue'
import CategoryDonutChart from '@/components/Transactions/CategoryDonutChart.vue'
import TopExpensesList from '@/components/Transactions/TopExpensesList.vue'
import ExpenseSummaryList from '@/components/Transactions/ExpenseSummaryList.vue'
import InsightCard from '@/components/Transactions/InsightCard.vue'
import ExpenseTable from '@/components/Transactions/ExpenseTable.vue'
import { usePengeluaranData } from '@/composables/usePengeluaranData'
import { useTheme } from '@/composables/useTheme'

const {
  summaryCards,
  trend,
  categoryBreakdown,
  categoryTotal,
  biggestExpenses,
  budgetSummary,
  insight,
  tableRows,
} = usePengeluaranData()
const { isDark } = useTheme()
</script>

<template>
  <DashboardLayout :unread-notifications="8">

    <div class="flex flex-wrap items-start justify-between gap-4 mb-6">
      <div>
        <h1 class="text-2xl font-bold" :class="isDark ? 'text-white' : 'text-gray-900'">Pengeluaran</h1>
        <p class="text-sm mt-1" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Kelola semua pengeluaran perusahaan.</p>
      </div>

      <div class="flex items-center gap-2.5">
        <button
          class="flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition"
          :class="isDark ? 'border-white/10 text-gray-300 hover:bg-white/5' : 'border-gray-300 text-gray-700 hover:bg-gray-50'"
        >
          <ArrowUpTrayIcon class="w-4 h-4" />
          Import Data
        </button>
        <button class="flex items-center gap-2 pl-4 pr-3 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white text-sm font-medium shadow-lg shadow-rose-900/30 transition">
          <PlusIcon class="w-4 h-4" />
          Pengeluaran Baru
          <ChevronDownIcon class="w-4 h-4 opacity-80" />
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <ExpenseSummaryCard
        v-for="card in summaryCards"
        :key="card.key"
        :label="card.label"
        :value="card.value"
        :change="card.change"
        :change-label="card.changeLabel"
        :trend="card.trend"
        :icon="card.icon"
        :color="card.color"
        :highlight="card.highlight"
      />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">

      <div class="lg:col-span-2 space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-5 gap-4">
          <div class="sm:col-span-3 rounded-2xl border p-5" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
            <ExpenseTrendChart :labels="trend.labels" :data="trend.data" :average="trend.average" />
          </div>
          <div class="sm:col-span-2 rounded-2xl border p-5" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
            <p class="font-semibold mb-4 uppercase tracking-wide text-sm" :class="isDark ? 'text-white' : 'text-gray-900'">Pengeluaran per Kategori</p>
            <CategoryDonutChart :categories="categoryBreakdown" :total="categoryTotal" />
          </div>
        </div>

        <ExpenseTable :rows="tableRows" />
      </div>

      <div class="space-y-4">
        <TopExpensesList :expenses="biggestExpenses" />
        <ExpenseSummaryList :items="budgetSummary" />
        <InsightCard
          heading="Insight Pengeluaran"
          :title="insight.title"
          :description="insight.description"
          link-text="Lihat Analisis Lengkap"
          color="rose"
        />
      </div>
    </div>
  </DashboardLayout>
</template>