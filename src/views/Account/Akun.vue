<script setup>
import { ref, computed } from 'vue'
import { PlusIcon } from '@heroicons/vue/24/outline'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import BudgetSummaryCard from '@/components/Budget/BudgetSummaryCard.vue'
import ReconciliationTabs from '@/components/Reconciliation/ReconciliationTabs.vue'
import AccountFilterBar from '@/components/Account/AccountFilterBar.vue'
import AccountTable from '@/components/Account/AccountTable.vue'
import BalanceByTypeList from '@/components/Account/BalanceByTypeList.vue'
import CategorySplitDonut from '@/components/Category/CategorySplitDonut.vue'
import CategoryTipCard from '@/components/Category/CategoryTipCard.vue'
import AccountFormModal from '@/components/Account/AccountFormModal.vue'
import { useAkunData } from '@/composables/useAkunData'
import { useTheme } from '@/composables/useTheme'

const { summaryCards, tabs, accounts, accountSplit, totalAccounts, balanceByType, tip } = useAkunData()
const { isDark } = useTheme()

const activeTab = ref(tabs[0])

const searchQuery = ref('')
const typeFilter = ref('Semua Tipe')
const statusFilter = ref('Semua Status')
const currentPage = ref(1)
const pageSize = ref(10)

const filteredAccounts = computed(() => {
  return accounts.filter((acc) => {
    const matchSearch = acc.name.toLowerCase().includes(searchQuery.value.trim().toLowerCase())
    const matchType = typeFilter.value === 'Semua Tipe' || acc.type === typeFilter.value
    const matchStatus = statusFilter.value === 'Semua Status' || acc.status === statusFilter.value
    return matchSearch && matchType && matchStatus
  })
})


function resetPage() {
  currentPage.value = 1
}

const showNewAccountModal = ref(false)

function handleAccountSubmit(payload) {
  // TODO: kirim payload ke API / composable untuk menyimpan akun baru
  console.log('Akun baru:', payload)
}
</script>

<template>
  <DashboardLayout :unread-notifications="8">

    <div class="flex flex-wrap items-start justify-between gap-4 mb-6">
      <div>
        <h1 class="text-2xl font-bold" :class="isDark ? 'text-white' : 'text-gray-900'">Akun &amp; Rekening</h1>
        <p class="text-sm mt-1" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Kelola akun dan rekening perusahaan untuk memudahkan pencatatan dan pelaporan keuangan.</p>
      </div>

      <button
        class="flex items-center gap-2 pl-4 pr-3 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-medium shadow-lg shadow-purple-900/30 transition"
        @click="showNewAccountModal = true"
      >
        <PlusIcon class="w-4 h-4" />
        Tambah Akun Baru
      </button>
    </div>

    <ReconciliationTabs :tabs="tabs" v-model:active-tab="activeTab" />

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 mb-6">
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

    <AccountFilterBar
      v-model="searchQuery"
      v-model:type-filter="typeFilter"
      v-model:status-filter="statusFilter"
      @update:model-value="resetPage"
      @update:type-filter="resetPage"
      @update:status-filter="resetPage"
    />

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div class="lg:col-span-2">
        <AccountTable
          title="Daftar Akun"
          :rows="filteredAccounts"
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
        />
      </div>

      <div class="space-y-4">
        <div class="rounded-2xl border p-5" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
          <p class="text-base font-semibold mb-4" :class="isDark ? 'text-white' : 'text-gray-900'">Ringkasan Akun</p>
          <CategorySplitDonut :split="accountSplit" :total="totalAccounts" />
        </div>

        <BalanceByTypeList :items="balanceByType" />
        <CategoryTipCard heading="Tips" :tip="tip" />
      </div>
    </div>

    <AccountFormModal
      :open="showNewAccountModal"
      @close="showNewAccountModal = false"
      @submit="handleAccountSubmit"
    />
  </DashboardLayout>
</template>