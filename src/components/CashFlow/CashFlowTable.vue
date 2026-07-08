<script setup>
import { ref, computed } from 'vue'
import { EllipsisVerticalIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'
import { useTheme } from '@/composables/useTheme'

const props = defineProps({
  tabs: { type: Array, required: true },
  rows: { type: Array, required: true },
})

const { isDark } = useTheme()

const activeTab = ref(props.tabs[0])
const currentPage = ref(1)
const pageSize = ref(10)

const categoryStyles = {
  'Saldo Awal': 'bg-gray-500/15 text-gray-400',
  Operasional: 'bg-purple-500/15 text-purple-400',
  Investasi: 'bg-pink-500/15 text-pink-400',
  Pendanaan: 'bg-blue-500/15 text-blue-400',
}

function formatAmount(value) {
  if (value === null || value === undefined) return '-'
  return `${value < 0 ? '-' : ''}Rp ${Math.abs(value).toLocaleString('id-ID')}`
}

const filteredRows = computed(() => {
  if (activeTab.value === 'Semua') return props.rows
  return props.rows.filter((r) => r.category === activeTab.value)
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredRows.value.length / pageSize.value)))
const paginatedRows = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filteredRows.value.slice(start, start + pageSize.value)
})
const rangeLabel = computed(() => {
  if (filteredRows.value.length === 0) return 'Tidak ada data'
  const start = (currentPage.value - 1) * pageSize.value + 1
  const end = Math.min(currentPage.value * pageSize.value, filteredRows.value.length)
  return `Menampilkan ${start} - ${end} dari ${filteredRows.value.length} transaksi`
})
const pageNumbers = computed(() => {
  const total = totalPages.value
  const current = currentPage.value
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const pages = [1]
  if (current > 3) pages.push('...')
  for (let p = Math.max(2, current - 1); p <= Math.min(total - 1, current + 1); p++) pages.push(p)
  if (current < total - 2) pages.push('...')
  pages.push(total)
  return pages
})
function goToPage(p) {
  if (p === '...' || p < 1 || p > totalPages.value) return
  currentPage.value = p
}
function setTab(tab) {
  activeTab.value = tab
  currentPage.value = 1
}
</script>

<template>
  <div class="rounded-2xl border" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
    <div class="p-5">
      <p class="text-base font-semibold mb-4" :class="isDark ? 'text-white' : 'text-gray-900'">Rincian Arus Kas</p>
      <div class="flex items-center gap-2 flex-wrap">
        <button
          v-for="tab in tabs"
          :key="tab"
          class="px-3.5 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition"
          :class="activeTab === tab
            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
            : (isDark ? 'bg-[#181428]/60 text-gray-400 hover:text-gray-200' : 'bg-gray-100 text-gray-600 hover:text-gray-900')"
          @click="setTab(tab)"
        >
          {{ tab }}
        </button>
      </div>
    </div>

    <div class="overflow-x-auto hidden lg:block">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-t" :class="isDark ? 'border-white/5' : 'border-gray-100'">
            <th class="text-left px-5 py-3 font-medium" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Tanggal</th>
            <th class="text-left px-3 py-3 font-medium" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Keterangan</th>
            <th class="text-left px-3 py-3 font-medium" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Kategori</th>
            <th class="text-right px-3 py-3 font-medium" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Kas Masuk</th>
            <th class="text-right px-3 py-3 font-medium" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Kas Keluar</th>
            <th class="text-right px-3 py-3 font-medium" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Arus Kas Bersih</th>
            <th class="text-right px-3 py-3 font-medium" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Saldo Kas</th>
            <th class="w-10 px-3 py-3"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in paginatedRows"
            :key="row.id"
            class="border-t transition"
            :class="isDark ? 'border-white/5 hover:bg-white/5' : 'border-gray-100 hover:bg-gray-50'"
          >
            <td class="px-5 py-3 whitespace-nowrap" :class="isDark ? 'text-gray-300' : 'text-gray-600'">{{ row.date }}</td>
            <td class="px-3 py-3 font-medium whitespace-nowrap" :class="isDark ? 'text-gray-200' : 'text-gray-800'">{{ row.description }}</td>
            <td class="px-3 py-3">
              <span class="px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap" :class="categoryStyles[row.category]">{{ row.category }}</span>
            </td>
            <td class="px-3 py-3 text-right whitespace-nowrap text-emerald-400">{{ row.cashIn ? formatAmount(row.cashIn) : '-' }}</td>
            <td class="px-3 py-3 text-right whitespace-nowrap text-rose-400">{{ row.cashOut ? formatAmount(row.cashOut) : '-' }}</td>
            <td class="px-3 py-3 text-right whitespace-nowrap" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
              {{ row.netCashFlow !== null ? formatAmount(row.netCashFlow) : '-' }}
            </td>
            <td class="px-3 py-3 text-right whitespace-nowrap font-medium" :class="isDark ? 'text-gray-200' : 'text-gray-800'">{{ formatAmount(row.balance) }}</td>
            <td class="px-3 py-3">
              <button v-if="row.category !== 'Saldo Awal'" class="p-1 rounded-md transition" :class="isDark ? 'text-gray-500 hover:text-white hover:bg-white/10' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100'">
                <EllipsisVerticalIcon class="w-4 h-4" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="lg:hidden divide-y" :class="isDark ? 'divide-white/5' : 'divide-gray-100'">
      <div v-for="row in paginatedRows" :key="row.id" class="p-4">
        <div class="flex items-start justify-between mb-1.5">
          <p class="font-medium text-sm" :class="isDark ? 'text-gray-200' : 'text-gray-800'">{{ row.description }}</p>
          <span class="px-2 py-0.5 rounded-full text-[11px] font-medium flex-shrink-0 ml-2" :class="categoryStyles[row.category]">{{ row.category }}</span>
        </div>
        <p class="text-xs mb-2" :class="isDark ? 'text-gray-500' : 'text-gray-400'">{{ row.date }}</p>
        <div class="flex items-center justify-between text-xs">
          <span class="text-emerald-400">{{ row.cashIn ? formatAmount(row.cashIn) : '-' }}</span>
          <span class="text-rose-400">{{ row.cashOut ? formatAmount(row.cashOut) : '-' }}</span>
          <span :class="isDark ? 'text-gray-300' : 'text-gray-600'">Saldo {{ formatAmount(row.balance) }}</span>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-5 border-t" :class="isDark ? 'border-white/5' : 'border-gray-100'">
      <p class="text-xs text-center sm:text-left" :class="isDark ? 'text-gray-500' : 'text-gray-400'">{{ rangeLabel }}</p>

      <div class="w-full sm:w-auto overflow-x-auto order-first sm:order-none">
        <div class="flex items-center gap-1.5 w-max mx-auto">
          <button
            class="w-8 h-8 rounded-lg border flex items-center justify-center transition disabled:opacity-40 disabled:cursor-not-allowed"
            :class="isDark ? 'border-white/10 text-gray-400 hover:text-white' : 'border-gray-300 text-gray-500 hover:text-gray-900'"
            :disabled="currentPage === 1"
            @click="goToPage(currentPage - 1)"
          >
            <ChevronLeftIcon class="w-4 h-4" />
          </button>

          <button
            v-for="(p, idx) in pageNumbers"
            :key="idx"
            class="min-w-8 h-8 px-2 rounded-lg text-sm font-medium transition"
            :class="p === currentPage
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
              : p === '...'
                ? 'cursor-default text-gray-500'
                : (isDark ? 'text-gray-400 hover:bg-white/5' : 'text-gray-500 hover:bg-gray-100')"
            @click="goToPage(p)"
          >
            {{ p }}
          </button>

          <button
            class="w-8 h-8 rounded-lg border flex items-center justify-center transition disabled:opacity-40 disabled:cursor-not-allowed"
            :class="isDark ? 'border-white/10 text-gray-400 hover:text-white' : 'border-gray-300 text-gray-500 hover:text-gray-900'"
            :disabled="currentPage === totalPages"
            @click="goToPage(currentPage + 1)"
          >
            <ChevronRightIcon class="w-4 h-4" />
          </button>
        </div>
      </div>

      <select
        v-model.number="pageSize"
        class="border rounded-lg py-1.5 px-2.5 text-xs focus:outline-none transition mx-auto sm:mx-0"
        :class="isDark ? 'bg-[#181428]/80 border-white/10 text-gray-300' : 'bg-gray-50 border-gray-300 text-gray-600'"
        @change="currentPage = 1"
      >
        <option :value="10">10 / halaman</option>
        <option :value="25">25 / halaman</option>
        <option :value="50">50 / halaman</option>
      </select>
    </div>
  </div>
</template>