<script setup>
import { ref, computed } from 'vue'
import { PlusIcon, ChevronDownIcon } from '@heroicons/vue/24/outline'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import BudgetSummaryCard from '@/components/Budget/BudgetSummaryCard.vue'
import ProjectTabsBar from '@/components/Project/ProjectTabsBar.vue'
import ThirdPartyTable from '@/components/ThirdParty/ThirdPartyTable.vue'
import CategorySplitDonut from '@/components/Category/CategorySplitDonut.vue'
import TopProjectsList from '@/components/Project/TopProjectsList.vue'
import CategoryTipCard from '@/components/Category/CategoryTipCard.vue'
import { usePihakKetigaData } from '@/composables/usePihakKetigaData'
import { useTheme } from '@/composables/useTheme'

const { summaryCards, tabs, partners, typeSplit, totalPartners, topPartners, tip } = usePihakKetigaData()
const { isDark } = useTheme()

const activeTab = ref(tabs[0])
const searchQuery = ref('')
const currentPage = ref(1)
const pageSize = ref(10)

const filteredPartners = computed(() => {
  let list = partners
  if (activeTab.value !== 'Semua Pihak Ketiga') list = list.filter((p) => p.type === activeTab.value)
  const q = searchQuery.value.trim().toLowerCase()
  if (q) list = list.filter((p) => p.name.toLowerCase().includes(q) || p.email.toLowerCase().includes(q))
  return list
})

function handleTabChange(tab) {
  activeTab.value = tab
  currentPage.value = 1
}
function handleSearchChange(q) {
  searchQuery.value = q
  currentPage.value = 1
}
</script>

<template>
  <DashboardLayout :unread-notifications="9">

    <div class="flex flex-wrap items-start justify-between gap-4 mb-6">
      <div>
        <h1 class="text-2xl font-bold" :class="isDark ? 'text-white' : 'text-gray-900'">Pihak Ketiga</h1>
        <p class="text-sm mt-1" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Kelola data pihak ketiga seperti vendor, pelanggan, konsultan, dan lainnya.</p>
      </div>

      <button class="flex items-center gap-2 pl-4 pr-3 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-medium shadow-lg shadow-purple-900/30 transition">
        <PlusIcon class="w-4 h-4" />
        Tambah Pihak Ketiga
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

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div class="lg:col-span-2 space-y-4">
        <!-- Tabs + search + filter -->
        <ProjectTabsBar
          :tabs="tabs"
          :active-tab="activeTab"
          :search-query="searchQuery"
          placeholder="Cari pihak ketiga, kontak, atau email..."
          @update:active-tab="handleTabChange"
          @update:search-query="handleSearchChange"
        />

        <ThirdPartyTable
          :rows="filteredPartners"
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
        />
      </div>

      <!-- Sidebar kanan -->
      <div class="space-y-4">
        <div class="rounded-2xl border p-5" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
          <p class="text-base font-semibold mb-4" :class="isDark ? 'text-white' : 'text-gray-900'">Ringkasan Tipe Pihak Ketiga</p>
          <CategorySplitDonut :split="typeSplit" :total="totalPartners" />
        </div>

        <TopProjectsList :projects="topPartners" title="Pihak Ketiga" subtitle="Transaksi Tertinggi" />
        <CategoryTipCard heading="Informasi" :tip="tip" />
      </div>
    </div>
  </DashboardLayout>
</template>