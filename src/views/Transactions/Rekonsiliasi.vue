<script setup>
import { ref } from 'vue'
import { PlusIcon, ArrowUpTrayIcon } from '@heroicons/vue/24/outline'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import BalanceCard from '@/components/Reconciliation/BalanceCard.vue'
import MatchStatusCard from '@/components/Reconciliation/MatchStatusCard.vue'
import ReconciliationFilterBar from '@/components/Reconciliation/ReconciliationFilterBar.vue'
import ReconciliationTabs from '@/components/Reconciliation/ReconciliationTabs.vue'
import UnmatchedTransactionsTable from '@/components/Reconciliation/UnmatchedTransactionsTable.vue'
import SelisihTrendChart from '@/components/Reconciliation/SelisihTrendChart.vue'
import ReconciliationProgressCard from '@/components/Reconciliation/ReconciliationProgressCard.vue'
import ReconciliationTasksCard from '@/components/Reconciliation/ReconciliationTasksCard.vue'
import RecentActivityCard from '@/components/Reconciliation/RecentActivityCard.vue'
import ReconciliationTipCard from '@/components/Reconciliation/ReconciliationTipCard.vue'
import ReconciliationFormModal from '@/components/Reconciliation/ReconciliationFormModal.vue'
import { useRekonsiliasiData } from '@/composables/useRekonsiliasiData'
import { useTheme } from '@/composables/useTheme'

const {
  summaryCards,
  matchStatus,
  tabs,
  unmatchedRows,
  filterCounts,
  trend,
  trendStats,
  progress,
  tasks,
  activities,
  tip,
} = useRekonsiliasiData()
const { isDark } = useTheme()

const activeTab = ref(tabs[0])
const showNewReconciliationModal = ref(false)

function handleReconciliationSubmit(payload) {
  // TODO: kirim payload ke API / composable untuk memulai sesi rekonsiliasi baru
  console.log('Rekonsiliasi baru:', payload)
}
</script>

<template>
  <DashboardLayout :unread-notifications="8">

    <div class="flex flex-wrap items-start justify-between gap-4 mb-6">
      <div>
        <h1 class="text-2xl font-bold" :class="isDark ? 'text-white' : 'text-gray-900'">Rekonsiliasi</h1>
        <p class="text-sm mt-1" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Cocokkan transaksi perusahaan dengan mutasi bank secara akurat.</p>
      </div>

      <div class="flex items-center gap-2.5">
        <button
          class="flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition"
          :class="isDark ? 'border-white/10 text-gray-300 hover:bg-white/5' : 'border-gray-300 text-gray-700 hover:bg-gray-50'"
        >
          <ArrowUpTrayIcon class="w-4 h-4" />
          Impor Data Bank
        </button>
        <button
          class="flex items-center gap-2 pl-4 pr-3 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-medium shadow-lg shadow-purple-900/30 transition"
          @click="showNewReconciliationModal = true"
        >
          <PlusIcon class="w-4 h-4" />
          Buat Rekonsiliasi Baru
        </button>
      </div>
    </div>

    <ReconciliationFilterBar :period="progress.period" />

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div class="lg:col-span-2 space-y-4">
       
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <BalanceCard v-bind="summaryCards.companyBalance" />
          <BalanceCard v-bind="summaryCards.bankBalance" />
          <BalanceCard v-bind="summaryCards.difference" />
          <MatchStatusCard
            :percent="matchStatus.percent"
            :matched="matchStatus.matched"
            :discrepancy="matchStatus.discrepancy"
            :unmatched="matchStatus.unmatched"
          />
        </div>

        <ReconciliationTabs :tabs="tabs" v-model:active-tab="activeTab" />

        <!-- Tabel transaksi belum dicocokkan -->
        <UnmatchedTransactionsTable :rows="unmatchedRows" :filter-counts="filterCounts" />

        <SelisihTrendChart :labels="trend.labels" :data="trend.data" :stats="trendStats" />
      </div>

      <div class="space-y-4">
        <MatchStatusCard
          :percent="matchStatus.percent"
          :matched="matchStatus.matched"
          :discrepancy="matchStatus.discrepancy"
          :unmatched="matchStatus.unmatched"
        />
        <ReconciliationProgressCard :progress="progress" />
        <ReconciliationTasksCard :tasks="tasks" />
        <RecentActivityCard :activities="activities" />
        <ReconciliationTipCard :tip="tip" />
      </div>
    </div>

    <ReconciliationFormModal
      :open="showNewReconciliationModal"
      @close="showNewReconciliationModal = false"
      @submit="handleReconciliationSubmit"
    />
  </DashboardLayout>
</template>