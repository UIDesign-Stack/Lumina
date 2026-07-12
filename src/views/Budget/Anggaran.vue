<script setup>
import { ref } from 'vue'
import { PlusIcon, ArrowUpTrayIcon, ChevronDownIcon } from '@heroicons/vue/24/outline'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import BudgetSummaryCard from '@/components/Budget/BudgetSummaryCard.vue'
import BudgetFilterBar from '@/components/Budget/BudgetFilterBar.vue'
import BudgetRealizationChart from '@/components/Budget/BudgetRealizationChart.vue'
import BudgetTable from '@/components/Budget/BudgetTable.vue'
import DepartmentBudgetList from '@/components/Budget/DepartmentBudgetList.vue'
import BudgetAlertList from '@/components/Budget/BudgetAlertList.vue'
import CategoryDonutChart from '@/components/Transactions/CategoryDonutChart.vue'
import ReconciliationTabs from '@/components/Reconciliation/ReconciliationTabs.vue'
import InsightCard from '@/components/Transactions/InsightCard.vue'
import BudgetFormModal from '@/components/Budget/BudgetFormModal.vue'
import { useAnggaranData } from '@/composables/useAnggaranData'
import { useTheme } from '@/composables/useTheme'

const {
  summaryCards,
  tabs,
  realizationChart,
  categoryBreakdown,
  categoryTotal,
  budgetRows,
  departmentBreakdown,
  budgetAlerts,
  insight,
} = useAnggaranData()
const { isDark } = useTheme()

const activeTab = ref(tabs[0])
const showNewBudgetModal = ref(false)

function handleBudgetSubmit(payload) {
  // TODO: kirim payload ke API / composable untuk menyimpan anggaran baru
  console.log('Anggaran baru:', payload)
}
</script>

<template>
  <DashboardLayout :unread-notifications="8">

    <div class="flex flex-wrap items-start justify-between gap-4 mb-6">
      <div>
        <h1 class="text-2xl font-bold" :class="isDark ? 'text-white' : 'text-gray-900'">Anggaran</h1>
        <p class="text-sm mt-1" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Rencanakan dan kelola anggaran perusahaan dengan lebih efektif.</p>
      </div>

      <div class="flex items-center gap-2.5">
        <button
          class="flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition"
          :class="isDark ? 'border-white/10 text-gray-300 hover:bg-white/5' : 'border-gray-300 text-gray-700 hover:bg-gray-50'"
        >
          <ArrowUpTrayIcon class="w-4 h-4" />
          Import Anggaran
        </button>
        <button
          class="flex items-center gap-2 pl-4 pr-3 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-medium shadow-lg shadow-purple-900/30 transition"
          @click="showNewBudgetModal = true"
        >
          <PlusIcon class="w-4 h-4" />
          Buat Anggaran Baru
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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

    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
      <ReconciliationTabs :tabs="tabs" v-model:active-tab="activeTab" />
      <BudgetFilterBar year="2024" />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div class="lg:col-span-2 space-y-4">
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div class="lg:col-span-3 rounded-2xl border p-5" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
            <BudgetRealizationChart :labels="realizationChart.labels" :budget="realizationChart.budget" :realization="realizationChart.realization" />
          </div>
          <div class="lg:col-span-2 rounded-2xl border p-5" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
            <div class="flex items-center justify-between mb-4">
              <p class="text-base font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">Realisasi per Kategori</p>
              <button
                class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium whitespace-nowrap flex-shrink-0 transition"
                :class="isDark ? 'border-white/10 text-gray-300 hover:bg-white/5' : 'border-gray-300 text-gray-600 hover:bg-gray-50'"
              >
                Tahun Ini
                <ChevronDownIcon class="w-3.5 h-3.5" />
              </button>
            </div>
            <CategoryDonutChart :categories="categoryBreakdown" :total="categoryTotal" />
          </div>
        </div>

        <BudgetTable :rows="budgetRows" />
      </div>

      <div class="space-y-4">
        <DepartmentBudgetList :departments="departmentBreakdown" />
        <BudgetAlertList :alerts="budgetAlerts" />
        <InsightCard
          heading="Insight Anggaran"
          :title="insight.title"
          :description="insight.description"
          link-text="Lihat Analisis Lengkap"
          color="purple"
        />
      </div>
    </div>

    <BudgetFormModal
      :open="showNewBudgetModal"
      @close="showNewBudgetModal = false"
      @submit="handleBudgetSubmit"
    />
  </DashboardLayout>
</template>