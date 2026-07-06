<script setup>
import { ref, computed } from 'vue'
import { PlusIcon, ChevronDownIcon } from '@heroicons/vue/24/outline'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import BudgetSummaryCard from '@/components/Budget/BudgetSummaryCard.vue'
import ReconciliationTabs from '@/components/Reconciliation/ReconciliationTabs.vue'
import CategoryTable from '@/components/Category/CategoryTable.vue'
import CategorySplitDonut from '@/components/Category/CategorySplitDonut.vue'
import TopCategoriesList from '@/components/Category/TopCategoriesList.vue'
import CategoryTipCard from '@/components/Category/CategoryTipCard.vue'
import { useKategoriData } from '@/composables/useKategoriData'
import { useTheme } from '@/composables/useTheme'

const {
  summaryCards,
  tabs,
  expenseCategories,
  incomeCategories,
  categorySplit,
  totalCategories,
  topCategories,
  tip,
} = useKategoriData()
const { isDark } = useTheme()

const activeTab = ref(tabs[0])

const activeCategories = computed(() =>
  activeTab.value === 'Kategori Pengeluaran' ? expenseCategories : incomeCategories
)
const tableTitle = computed(() =>
  activeTab.value === 'Kategori Pengeluaran' ? 'Daftar Kategori Pengeluaran' : 'Daftar Kategori Pemasukan'
)
</script>

<template>
  <DashboardLayout :unread-notifications="8">

    <div class="flex flex-wrap items-start justify-between gap-4 mb-6">
      <div>
        <h1 class="text-2xl font-bold" :class="isDark ? 'text-white' : 'text-gray-900'">Kategori</h1>
        <p class="text-sm mt-1" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Kelola kategori pemasukan dan pengeluaran untuk memudahkan pencatatan dan pelaporan.</p>
      </div>

      <button class="flex items-center gap-2 pl-4 pr-3 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-medium shadow-lg shadow-purple-900/30 transition">
        <PlusIcon class="w-4 h-4" />
        Tambah Kategori
        <ChevronDownIcon class="w-4 h-4 opacity-80" />
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

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div class="lg:col-span-2">
        <CategoryTable :title="tableTitle" :categories="activeCategories" />
      </div>

      <div class="space-y-4">
        <div class="rounded-2xl border p-5" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
          <p class="text-base font-semibold mb-4" :class="isDark ? 'text-white' : 'text-gray-900'">Ringkasan Kategori</p>
          <CategorySplitDonut :split="categorySplit" :total="totalCategories" />
        </div>

        <TopCategoriesList :categories="topCategories" />
        <CategoryTipCard :tip="tip" />
      </div>
    </div>
  </DashboardLayout>
</template>