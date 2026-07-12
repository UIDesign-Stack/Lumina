<script setup>
import { ref } from 'vue'
import { PlusIcon, ChevronDownIcon, ArrowUpTrayIcon, ArchiveBoxIcon, Square3Stack3DIcon } from '@heroicons/vue/24/outline'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import BudgetSummaryCard from '@/components/Budget/BudgetSummaryCard.vue'
import ReportFilterBar from '@/components/Report/ReportFilterBar.vue'
import BalanceSheetPanel from '@/components/BalanceSheet/BalanceSheetPanel.vue'
import BalanceCheckCard from '@/components/BalanceSheet/BalanceCheckCard.vue'
import CategoryDonutChart from '@/components/Transactions/CategoryDonutChart.vue'
import RecentReportsList from '@/components/Report/RecentReportsList.vue'
import BalanceSheetReportModal from '@/components/BalanceSheet/BalanceSheetReportModal.vue'
import BalanceSheetExportModal from '@/components/BalanceSheet/BalanceSheetExportModal.vue'
import { useNeracaData } from '@/composables/useNeracaData'
import { useTheme } from '@/composables/useTheme'

const {
  summaryCards,
  period,
  compareOptions,
  assetGroups,
  assetTotal,
  liabilityEquityGroups,
  liabilityEquityTotal,
  isBalanced,
  assetStructure,
  assetStructureTotal,
  liabilityEquityStructure,
  liabilityEquityStructureTotal,
  recentReports,
} = useNeracaData()
const { isDark } = useTheme()

const compareValue = ref(compareOptions[0])

const showReportModal = ref(false)
const showExportModal = ref(false)

function handleReportSubmit(payload) {
  // TODO: kirim payload ke API / composable untuk membuat laporan neraca baru
  console.log('Laporan neraca baru:', payload)
}

function handleExportSubmit(payload) {
  // TODO: kirim payload ke API / composable untuk export laporan neraca saat ini
  console.log('Export laporan neraca:', payload)
}
</script>

<template>
  <DashboardLayout :unread-notifications="3">

    <div class="flex flex-wrap items-start justify-between gap-4 mb-6">
      <div>
        <h1 class="text-2xl font-bold" :class="isDark ? 'text-white' : 'text-gray-900'">Laporan Neraca</h1>
        <p class="text-sm mt-1" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Ringkasan posisi keuangan perusahaan pada periode tertentu.</p>
      </div>

      <button
        @click="showReportModal = true"
        class="flex items-center gap-2 pl-4 pr-3 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-medium shadow-lg shadow-purple-900/30 transition"
      >
        <PlusIcon class="w-4 h-4" />
        Buat Laporan Neraca
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
        <div class="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <BalanceSheetPanel
            title="Aset"
            :icon="ArchiveBoxIcon"
            :period-label="period"
            :compare-label="compareValue"
            :groups="assetGroups"
            :grand-total="assetTotal"
          />
          <BalanceSheetPanel
            title="Liabilitas & Ekuitas"
            :icon="Square3Stack3DIcon"
            :period-label="period"
            :compare-label="compareValue"
            :groups="liabilityEquityGroups"
            :grand-total="liabilityEquityTotal"
          />
        </div>

        <BalanceCheckCard :is-balanced="isBalanced" />
      </div>


      <div class="space-y-4">
        <div class="rounded-2xl border p-5" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
          <div class="flex items-center justify-between mb-4">
            <p class="text-base font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">Struktur Aset</p>
            <a href="#" class="text-sm text-purple-400 hover:text-purple-300 transition">Lihat Detail</a>
          </div>
          <CategoryDonutChart :categories="assetStructure" :total="assetStructureTotal" />
        </div>

        <div class="rounded-2xl border p-5" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
          <div class="flex items-center justify-between mb-4">
            <p class="text-base font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">Struktur Liabilitas &amp; Ekuitas</p>
            <a href="#" class="text-sm text-purple-400 hover:text-purple-300 transition">Lihat Detail</a>
          </div>
          <CategoryDonutChart :categories="liabilityEquityStructure" :total="liabilityEquityStructureTotal" />
        </div>

        <RecentReportsList :reports="recentReports" title="Laporan Neraca Terbaru" />
      </div>
    </div>

    <BalanceSheetReportModal
      :open="showReportModal"
      @close="showReportModal = false"
      @submit="handleReportSubmit"
    />

    <BalanceSheetExportModal
      :open="showExportModal"
      :period-label="compareValue"
      @close="showExportModal = false"
      @submit="handleExportSubmit"
    />
  </DashboardLayout>
</template>