<script setup>
import { ref } from 'vue'
import { PlusIcon, ChevronDownIcon, ArrowUpTrayIcon } from '@heroicons/vue/24/outline'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import BudgetSummaryCard from '@/components/Budget/BudgetSummaryCard.vue'
import ReportFilterBar from '@/components/Report/ReportFilterBar.vue'
import FinancialTrendChart from '@/components/Report/FinancialTrendChart.vue'
import CategoryDonutChart from '@/components/Transactions/CategoryDonutChart.vue'
import DepartmentBudgetList from '@/components/Budget/DepartmentBudgetList.vue'
import ProfitLossTable from '@/components/ProfitLoss/ProfitLossTable.vue'
import CategoryTipCard from '@/components/Category/CategoryTipCard.vue'
import ProfitLossReportModal from '@/components/ProfitLoss/ProfitLossReportModal.vue'
import ProfitLossExportModal from '@/components/ProfitLoss/ProfitLossExportModal.vue'
import { useLabaRugiData } from '@/composables/useLabaRugiData'
import { useTheme } from '@/composables/useTheme'

const {
  summaryCards,
  period,
  compareOptions,
  trend,
  summaryBreakdown,
  summaryTotal,
  expenseStructure,
  sections,
  subtotals,
  netProfit,
  tip,
} = useLabaRugiData()
const { isDark } = useTheme()

const compareValue = ref(compareOptions[0])

const showReportModal = ref(false)
const showExportModal = ref(false)

function handleReportSubmit(payload) {
  // TODO: kirim payload ke API / composable untuk membuat laporan laba rugi baru
  console.log('Laporan laba rugi baru:', payload)
}

function handleExportSubmit(payload) {
  // TODO: kirim payload ke API / composable untuk export laporan laba rugi saat ini
  console.log('Export laporan laba rugi:', payload)
}
</script>

<template>
  <DashboardLayout :unread-notifications="1">

    <div class="flex flex-wrap items-start justify-between gap-4 mb-6">
      <div>
        <h1 class="text-2xl font-bold" :class="isDark ? 'text-white' : 'text-gray-900'">Laporan Laba Rugi</h1>
        <p class="text-sm mt-1" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Pantau kinerja profitabilitas perusahaan dalam periode tertentu.</p>
      </div>

      <button
        @click="showReportModal = true"
        class="flex items-center gap-2 pl-4 pr-3 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-medium shadow-lg shadow-purple-900/30 transition"
      >
        <PlusIcon class="w-4 h-4" />
        Buat Laporan Laba Rugi
        <ChevronDownIcon class="w-4 h-4 opacity-80" />
      </button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      <BudgetSummaryCard
        v-for="card in summaryCards"
        :key="card.key"
        :label="card.label"
        :value="card.value"
        :note="card.note"
        :icon="card.icon"
        :color="card.color"
      />
    </div>

    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-6">
      <ReportFilterBar :period="period" v-model:compare-value="compareValue" :compare-options="compareOptions" />
      <button
        @click="showExportModal = true"
        class="flex items-center gap-2 px-3.5 py-2 rounded-xl border text-sm whitespace-nowrap flex-shrink-0 transition"
        :class="isDark ? 'border-white/10 text-gray-300 hover:bg-white/5' : 'border-gray-300 text-gray-700 hover:bg-gray-50'"
      >
        <ArrowUpTrayIcon class="w-4 h-4" />
        Export Laporan
        <ChevronDownIcon class="w-3.5 h-3.5 opacity-70" />
      </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div class="lg:col-span-2 space-y-4">
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div class="lg:col-span-3 rounded-2xl border p-5" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
            <FinancialTrendChart
              title="Tren Laba Rugi"
              :labels="trend.labels"
              :filled="true"
              :series="[
                { label: 'Pendapatan', data: trend.revenue, color: '#a855f7' },
                { label: 'Beban', data: trend.expense, color: '#f43f5e' },
                { label: 'Laba Bersih', data: trend.profit, color: '#3b82f6' },
              ]"
            />
          </div>
          <div class="lg:col-span-2 rounded-2xl border p-5" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
            <p class="text-base font-semibold mb-4" :class="isDark ? 'text-white' : 'text-gray-900'">Ringkasan Laba Rugi</p>
            <CategoryDonutChart :categories="summaryBreakdown" :total="summaryTotal" />
          </div>
        </div>

        <ProfitLossTable
          period-label="Mei 2024"
          compare-label="April 2024"
          :sections="sections"
          :subtotals="subtotals"
          :net-profit="netProfit"
        />
      </div>

      <div class="space-y-4">
        <DepartmentBudgetList :departments="expenseStructure" title="Struktur Beban" link-text="Lihat Detail" />

        <CategoryTipCard heading="Insight Laba Rugi" :tip="tip" />
      </div>
    </div>

    <ProfitLossReportModal
      :open="showReportModal"
      @close="showReportModal = false"
      @submit="handleReportSubmit"
    />

    <ProfitLossExportModal
      :open="showExportModal"
      :period-label="compareValue"
      @close="showExportModal = false"
      @submit="handleExportSubmit"
    />
  </DashboardLayout>
</template>