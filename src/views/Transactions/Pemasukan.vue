<script setup>
import { PlusIcon, ArrowUpTrayIcon, ChevronDownIcon } from '@heroicons/vue/24/outline'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import SummaryCard from '@/components/Transactions/SummaryCard.vue'
import IncomeTrendChart from '@/components/Transactions/IncomeTrendChart.vue'
import CategoryDonutChart from '@/components/Transactions/CategoryDonutChart.vue'
import TopSourcesList from '@/components/Transactions/TopSourcesList.vue'
import InsightCard from '@/components/Transactions/InsightCard.vue'
import IncomeTable from '@/components/Transactions/IncomeTable.vue'
import { usePemasukanData } from '@/composables/usePemasukanData'
import { useTheme } from '@/composables/useTheme'

const { summaryCards, trend, categoryBreakdown, categoryTotal, topSources, insight, tableRows } = usePemasukanData()
const { isDark } = useTheme()
</script>

<template>
  <DashboardLayout :unread-notifications="8">
    <!-- Header halaman -->
    <div class="flex flex-wrap items-start justify-between gap-4 mb-6">
      <div>
        <h1 class="text-2xl font-bold" :class="isDark ? 'text-white' : 'text-gray-900'">Pemasukan</h1>
        <p class="text-sm mt-1" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Kelola semua pemasukan keuangan perusahaan.</p>
      </div>

      <div class="flex items-center gap-2.5">
        <button
          class="flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition"
          :class="isDark ? 'border-white/10 text-gray-300 hover:bg-white/5' : 'border-gray-300 text-gray-700 hover:bg-gray-50'"
        >
          <ArrowUpTrayIcon class="w-4 h-4" />
          Impor Data
        </button>
        <button class="flex items-center gap-2 pl-4 pr-3 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-medium shadow-lg shadow-purple-900/30 transition">
          <PlusIcon class="w-4 h-4" />
          Pemasukan Baru
          <ChevronDownIcon class="w-4 h-4 opacity-80" />
        </button>
      </div>
    </div>

    <!-- Kartu ringkasan -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <SummaryCard
        v-for="card in summaryCards"
        :key="card.key"
        :label="card.label"
        :value="card.value"
        :change="card.change"
        :change-label="card.changeLabel"
        :trend="card.trend"
        :icon="card.icon"
        :has-info="card.hasInfo"
      />
    </div>

    <!-- Tren + Kategori -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
      <div class="lg:col-span-2 rounded-2xl border p-5" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
        <div class="flex items-center justify-between mb-1">
          <p class="text-base font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">Tren Pemasukan</p>
        </div>
        <div class="flex items-center gap-4 mb-4 text-xs">
          <span class="flex items-center gap-1.5" :class="isDark ? 'text-gray-400' : 'text-gray-500'">
            <span class="w-2 h-2 rounded-full bg-emerald-400"></span> Pemasukan (Rp)
          </span>
          <span class="flex items-center gap-1.5" :class="isDark ? 'text-gray-400' : 'text-gray-500'">
            <span class="w-3 border-t-2 border-dashed" :class="isDark ? 'border-gray-500' : 'border-gray-400'"></span> Rata-rata
          </span>
        </div>
        <IncomeTrendChart :labels="trend.labels" :data="trend.data" :average="trend.average" />
      </div>

      <div class="rounded-2xl border p-5" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
        <p class="text-base font-semibold mb-4" :class="isDark ? 'text-white' : 'text-gray-900'">Pemasukan per Kategori</p>
        <CategoryDonutChart :categories="categoryBreakdown" :total="categoryTotal" />
      </div>
    </div>

    <!-- Sumber terbesar + Insight -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
      <TopSourcesList :sources="topSources" />
      <InsightCard :title="insight.title" :description="insight.description" />
    </div>

    <!-- Tabel -->
    <IncomeTable :rows="tableRows" />
  </DashboardLayout>
</template>