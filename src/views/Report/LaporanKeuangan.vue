<script setup>
import { ref } from 'vue'
import { PlusIcon, ChevronDownIcon } from '@heroicons/vue/24/outline'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import BudgetSummaryCard from '@/components/Budget/BudgetSummaryCard.vue'
import ReportTabsBar from '@/components/Report/ReportTabsBar.vue'
import ReportFilterBar from '@/components/Report/ReportFilterBar.vue'
import FinancialTrendChart from '@/components/Report/FinancialTrendChart.vue'
import FinancialReportTable from '@/components/Report/FinancialReportTable.vue'
import RecentReportsList from '@/components/Report/RecentReportsList.vue'
import FinancialInsightCard from '@/components/Report/FinancialInsightCard.vue'
import CategoryDonutChart from '@/components/Transactions/CategoryDonutChart.vue'
import { useLaporanKeuanganData } from '@/composables/useLaporanKeuanganData'
import { useTheme } from '@/composables/useTheme'

const {
  summaryCards,
  tabs,
  period,
  compareOptions,
  trend,
  revenueBreakdown,
  revenueTotal,
  reportRows,
  recentReports,
  insights,
} = useLaporanKeuanganData()
const { isDark } = useTheme()

const activeTab = ref(tabs[0])
const compareValue = ref(compareOptions[0])
</script>

<template>
  <DashboardLayout :unread-notifications="0">

    <div class="flex flex-wrap items-start justify-between gap-4 mb-6">
      <div>
        <h1 class="text-2xl font-bold" :class="isDark ? 'text-white' : 'text-gray-900'">Laporan Keuangan</h1>
        <p class="text-sm mt-1" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Pantau dan analisis kondisi keuangan perusahaan secara menyeluruh.</p>
      </div>

      <button class="flex items-center gap-2 pl-4 pr-3 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-medium shadow-lg shadow-purple-900/30 transition">
        <PlusIcon class="w-4 h-4" />
        Buat Laporan Baru
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

    <div class="mb-6">
      <ReportTabsBar :tabs="tabs" v-model:active-tab="activeTab" />
    </div>

    <div class="mb-6">
      <ReportFilterBar :period="period" v-model:compare-value="compareValue" :compare-options="compareOptions" />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div class="lg:col-span-2 space-y-4">
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div class="lg:col-span-3 rounded-2xl border p-5" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
            <FinancialTrendChart :labels="trend.labels" :revenue="trend.revenue" :expense="trend.expense" :profit="trend.profit" />
          </div>
          <div class="lg:col-span-2 rounded-2xl border p-5" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
            <p class="text-base font-semibold mb-4" :class="isDark ? 'text-white' : 'text-gray-900'">Distribusi Pendapatan</p>
            <CategoryDonutChart :categories="revenueBreakdown" :total="revenueTotal" />
          </div>
        </div>

        <FinancialReportTable :rows="reportRows" />
      </div>

      <!-- Sidebar kanan -->
      <div class="space-y-4">
        <RecentReportsList :reports="recentReports" />
        <FinancialInsightCard :insights="insights" period="Mei 2024" />
      </div>
    </div>
  </DashboardLayout>
</template>