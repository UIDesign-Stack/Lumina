<script setup>
import { ref, computed } from 'vue'
import { PlusIcon } from '@heroicons/vue/24/outline'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import BudgetSummaryCard from '@/components/Budget/BudgetSummaryCard.vue'
import ProjectTabsBar from '@/components/Project/ProjectTabsBar.vue'
import ProjectTable from '@/components/Project/ProjectTable.vue'
import ProjectTrendChart from '@/components/Project/ProjectTrendChart.vue'
import TopProjectsList from '@/components/Project/TopProjectsList.vue'
import CategoryDonutChart from '@/components/Transactions/CategoryDonutChart.vue'
import CategorySplitDonut from '@/components/Category/CategorySplitDonut.vue'
import CategoryTipCard from '@/components/Category/CategoryTipCard.vue'
import ProjectFormModal from '@/components/Project/ProjectFormModal.vue'
import { useProyekData } from '@/composables/useProyekData'
import { useTheme } from '@/composables/useTheme'

const {
  summaryCards,
  tabs,
  projects,
  trend,
  categoryBreakdown,
  categoryTotal,
  statusSplit,
  totalProjects,
  topProjects,
  tip,
} = useProyekData()
const { isDark } = useTheme()

const activeTab = ref(tabs[0])
const searchQuery = ref('')
const currentPage = ref(1)
const pageSize = ref(10)

const statusMap = {
  'Proyek Aktif': 'Aktif',
  'Proyek Selesai': 'Selesai',
  'Proyek Ditunda': 'Ditunda',
}

const filteredProjects = computed(() => {
  let list = projects
  const wantedStatus = statusMap[activeTab.value]
  if (wantedStatus) list = list.filter((p) => p.status === wantedStatus)
  const q = searchQuery.value.trim().toLowerCase()
  if (q) list = list.filter((p) => p.name.toLowerCase().includes(q) || p.client.toLowerCase().includes(q))
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

const showNewProjectModal = ref(false)

function handleProjectSubmit(payload) {
  // TODO: kirim payload ke API / composable untuk menyimpan proyek baru
  console.log('Proyek baru:', payload)
}
</script>

<template>
  <DashboardLayout :unread-notifications="1">
    <!-- Header halaman -->
    <div class="flex flex-wrap items-start justify-between gap-4 mb-6">
      <div>
        <h1 class="text-2xl font-bold" :class="isDark ? 'text-white' : 'text-gray-900'">Proyek</h1>
        <p class="text-sm mt-1" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Kelola proyek dan pantau anggaran, realisasi, serta profitabilitas setiap proyek.</p>
      </div>

      <button
        class="flex items-center gap-2 pl-4 pr-3 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-medium shadow-lg shadow-purple-900/30 transition"
        @click="showNewProjectModal = true"
      >
        <PlusIcon class="w-4 h-4" />
        Tambah Proyek Baru
      </button>
    </div>

    <!-- Kartu ringkasan -->
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

    <!-- Grid utama: konten kiri (2/3) + sidebar kanan (1/3) -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div class="lg:col-span-2 space-y-4">
        <!-- Tabs + search + filter -->
        <ProjectTabsBar
          :tabs="tabs"
          :active-tab="activeTab"
          :search-query="searchQuery"
          @update:active-tab="handleTabChange"
          @update:search-query="handleSearchChange"
        />

        <ProjectTable
          :rows="filteredProjects"
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
        />

        <!-- Tren + kategori -->
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div class="lg:col-span-3 rounded-2xl border p-5" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
            <ProjectTrendChart :labels="trend.labels" :budget="trend.budget" :realization="trend.realization" />
          </div>
          <div class="lg:col-span-2 rounded-2xl border p-5" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
            <p class="text-base font-semibold mb-4" :class="isDark ? 'text-white' : 'text-gray-900'">Distribusi Anggaran per Kategori Proyek</p>
            <CategoryDonutChart :categories="categoryBreakdown" :total="categoryTotal" />
          </div>
        </div>
      </div>

      <!-- Sidebar kanan -->
      <div class="space-y-4">
        <div class="rounded-2xl border p-5" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
          <p class="text-base font-semibold mb-4" :class="isDark ? 'text-white' : 'text-gray-900'">Proyek Berdasarkan Status</p>
          <CategorySplitDonut :split="statusSplit" :total="totalProjects" />
        </div>

        <TopProjectsList :projects="topProjects" subtitle="Realisasi Tertinggi" />
        <CategoryTipCard heading="Informasi" :tip="tip" />
      </div>
    </div>

    <ProjectFormModal
      :open="showNewProjectModal"
      @close="showNewProjectModal = false"
      @submit="handleProjectSubmit"
    />
  </DashboardLayout>
</template>