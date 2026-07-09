<script setup>
import { ref, computed, watch } from 'vue'
import { ArrowUpTrayIcon, ChevronDownIcon } from '@heroicons/vue/24/outline'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import BudgetSummaryCard from '@/components/Budget/BudgetSummaryCard.vue'
import LedgerFilterBar from '@/components/Ledger/LedgerFilterBar.vue'
import LedgerTable from '@/components/Ledger/LedgerTable.vue'
import AccountSummaryList from '@/components/Ledger/AccountSummaryList.vue'
import LedgerActivityList from '@/components/Ledger/LedgerActivityList.vue'
import LedgerInfoBanner from '@/components/Ledger/LedgerInfoBanner.vue'
import { useBukuBesarData } from '@/composables/useBukuBesarData'
import { useTheme } from '@/composables/useTheme'

const {
  summaryCards,
  period,
  accountOptions,
  categoryOptions,
  projectOptions,
  rows,
  totalPeriod,
  accountSummary,
  activities,
  infoText,
} = useBukuBesarData()
const { isDark } = useTheme()

const accountValue = ref(accountOptions[0])
const categoryValue = ref(categoryOptions[0])
const projectValue = ref(projectOptions[0])
const searchQuery = ref('')
const currentPage = ref(1)
const pageSize = ref(10)

const filteredRows = computed(() => {
  return rows.filter((r) => {
    const matchAccount = accountValue.value === 'Semua Akun' || r.account === accountValue.value
    const matchCategory = categoryValue.value === 'Semua Kategori' || r.category === categoryValue.value
    const matchProject = projectValue.value === 'Semua Proyek' || r.project === projectValue.value
    const q = searchQuery.value.trim().toLowerCase()
    const matchSearch = !q || r.description.toLowerCase().includes(q) || r.voucherNo.toLowerCase().includes(q)
    return matchAccount && matchCategory && matchProject && matchSearch
  })
})

watch([accountValue, categoryValue, projectValue, searchQuery], () => {
  currentPage.value = 1
})
</script>

<template>
  <DashboardLayout :unread-notifications="3">

    <div class="flex flex-wrap items-start justify-between gap-4 mb-6">
      <div>
        <h1 class="text-2xl font-bold" :class="isDark ? 'text-white' : 'text-gray-900'">Buku Besar</h1>
        <p class="text-sm mt-1" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Lihat seluruh transaksi keuangan berdasarkan akun secara detail dan menyeluruh.</p>
      </div>

      <button class="flex items-center gap-2 pl-4 pr-3 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-medium shadow-lg shadow-purple-900/30 transition">
        <ArrowUpTrayIcon class="w-4 h-4" />
        Export Buku Besar
        <ChevronDownIcon class="w-4 h-4 opacity-80" />
      </button>
    </div>

    <LedgerInfoBanner :text="infoText" class="mb-6" />

    <LedgerFilterBar
      :period="period"
      v-model:account-value="accountValue"
      :account-options="accountOptions"
      v-model:category-value="categoryValue"
      :category-options="categoryOptions"
      v-model:project-value="projectValue"
      :project-options="projectOptions"
      v-model:search-query="searchQuery"
    />

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
    
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
      <div class="lg:col-span-2">
        <LedgerTable
          :rows="filteredRows"
          :total-period="totalPeriod"
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
        />
      </div>

      <div class="space-y-4">
        <AccountSummaryList :accounts="accountSummary" />
        <LedgerActivityList :activities="activities" />
      </div>
    </div>

    
  </DashboardLayout>
</template>