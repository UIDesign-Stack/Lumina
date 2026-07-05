<script setup>
import { ref, computed } from 'vue'
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  Bars3BottomLeftIcon,
  EllipsisVerticalIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/vue/24/outline'
import { useTheme } from '@/composables/useTheme'

const props = defineProps({
  rows: { type: Array, required: true },
  filterCounts: { type: Object, required: true },
})

const { isDark } = useTheme()

const filters = ['Semua', 'Perusahaan', 'Bank', 'Selisih']
const activeFilter = ref('Semua')
const searchQuery = ref('')
const currentPage = ref(1)
const pageSize = ref(10)

const categoryStyles = {
  blue: 'bg-blue-500/15 text-blue-400',
  purple: 'bg-purple-500/15 text-purple-400',
  emerald: 'bg-emerald-500/15 text-emerald-400',
}

function formatAmount(value) {
  if (value === null || value === undefined) return '-'
  const abs = Math.abs(value).toLocaleString('id-ID')
  return `${value < 0 ? '-' : ''}Rp ${abs}`
}

const filteredRows = computed(() => {
  let rows = props.rows
  if (activeFilter.value === 'Perusahaan') rows = rows.filter((r) => r.type === 'company')
  else if (activeFilter.value === 'Bank') rows = rows.filter((r) => r.bankDesc && r.type !== 'selisih')
  else if (activeFilter.value === 'Selisih') rows = rows.filter((r) => r.type === 'selisih')

  const q = searchQuery.value.trim().toLowerCase()
  if (q) rows = rows.filter((r) => r.companyDesc.toLowerCase().includes(q) || (r.bankDesc || '').toLowerCase().includes(q))
  return rows
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
  return `Menampilkan ${start} - ${end} dari ${filteredRows.value.length} data`
})
const pageNumbers = computed(() => {
  const total = totalPages.value
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const current = currentPage.value
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
function setFilter(f) {
  activeFilter.value = f
  currentPage.value = 1
}
</script>

<template>
  <div class="rounded-2xl border" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
    <!-- Filter pills + search + toolbar -->
    <div class="flex flex-col gap-3 p-5">
      <div class="flex items-center gap-2 flex-wrap">
        <button
          v-for="f in filters"
          :key="f"
          class="px-3.5 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition"
          :class="activeFilter === f
            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
            : (isDark ? 'bg-[#181428]/60 text-gray-400 hover:text-gray-200' : 'bg-gray-100 text-gray-600 hover:text-gray-900')"
          @click="setFilter(f)"
        >
          {{ f }} ({{ filterCounts[f] }})
        </button>
      </div>

      <div class="flex items-center gap-2">
        <div class="relative flex-1 min-w-0">
          <MagnifyingGlassIcon class="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari transaksi..."
            class="w-full border rounded-lg py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition"
            :class="isDark ? 'bg-[#181428]/80 border-white/10 text-white placeholder-gray-500' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'"
            @input="currentPage = 1"
          />
        </div>
        <button class="flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm flex-shrink-0 whitespace-nowrap transition" :class="isDark ? 'border-white/10 text-gray-300 hover:bg-white/5' : 'border-gray-300 text-gray-600 hover:bg-gray-50'">
          <FunnelIcon class="w-4 h-4" /> Filter
        </button>
        <button class="w-9 h-9 rounded-lg border flex items-center justify-center flex-shrink-0 transition" :class="isDark ? 'border-white/10 text-gray-400 hover:text-white hover:bg-white/5' : 'border-gray-300 text-gray-500 hover:text-gray-900 hover:bg-gray-50'">
          <Bars3BottomLeftIcon class="w-4 h-4" />
        </button>
      </div>
    </div>

    <p class="px-5 pb-3 text-base font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">Transaksi Belum Dicocokkan</p>

    <!-- Tabel dual-column (desktop) -->
    <div class="overflow-x-auto hidden lg:block">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-t" :class="isDark ? 'border-white/5' : 'border-gray-100'">
            <th class="w-10 px-5 py-2.5"><input type="checkbox" class="w-4 h-4 rounded" /></th>
            <th colspan="3" class="text-left px-3 py-2.5 text-xs font-semibold uppercase tracking-wide" :class="isDark ? 'text-gray-500' : 'text-gray-400'">Perusahaan</th>
            <th colspan="3" class="text-left px-3 py-2.5 text-xs font-semibold uppercase tracking-wide border-l" :class="isDark ? 'text-gray-500 border-white/5' : 'text-gray-400 border-gray-100'">Bank</th>
            <th class="text-right px-3 py-2.5 text-xs font-semibold uppercase tracking-wide" :class="isDark ? 'text-gray-500' : 'text-gray-400'">Selisih</th>
            <th class="w-32 px-3 py-2.5"></th>
          </tr>
          <tr class="border-b" :class="isDark ? 'border-white/5' : 'border-gray-100'">
            <th></th>
            <th class="text-left px-3 py-2 font-medium" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Tanggal</th>
            <th class="text-left px-3 py-2 font-medium" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Deskripsi</th>
            <th class="text-right px-3 py-2 font-medium" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Jumlah</th>
            <th class="text-left px-3 py-2 font-medium border-l" :class="isDark ? 'text-gray-400 border-white/5' : 'text-gray-500 border-gray-100'">Tanggal</th>
            <th class="text-left px-3 py-2 font-medium" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Deskripsi</th>
            <th class="text-right px-3 py-2 font-medium" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Jumlah</th>
            <th class="text-right px-3 py-2 font-medium" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Selisih</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in paginatedRows"
            :key="row.id"
            class="border-b transition"
            :class="isDark ? 'border-white/5 hover:bg-white/5' : 'border-gray-100 hover:bg-gray-50'"
          >
            <td class="px-5 py-3"><input type="checkbox" class="w-4 h-4 rounded" /></td>
            <td class="px-3 py-3 whitespace-nowrap" :class="isDark ? 'text-gray-300' : 'text-gray-600'">{{ row.companyDate }}</td>
            <td class="px-3 py-3 whitespace-nowrap">
              <p class="font-medium" :class="isDark ? 'text-gray-200' : 'text-gray-800'">{{ row.companyDesc }}</p>
              <span class="inline-block mt-1 px-2 py-0.5 rounded-full text-[11px] font-medium" :class="categoryStyles[row.categoryColor]">{{ row.category }}</span>
            </td>
            <td class="px-3 py-3 text-right font-medium whitespace-nowrap" :class="row.companyAmount < 0 ? 'text-rose-400' : 'text-emerald-400'">
              {{ formatAmount(row.companyAmount) }}
            </td>
            <td class="px-3 py-3 whitespace-nowrap border-l" :class="isDark ? 'text-gray-300 border-white/5' : 'text-gray-600 border-gray-100'">{{ row.bankDate || '-' }}</td>
            <td class="px-3 py-3 whitespace-nowrap" :class="isDark ? 'text-gray-300' : 'text-gray-600'">{{ row.bankDesc || '-' }}</td>
            <td class="px-3 py-3 text-right font-medium whitespace-nowrap" :class="row.bankAmount === null ? (isDark ? 'text-gray-500' : 'text-gray-400') : row.bankAmount < 0 ? 'text-rose-400' : 'text-emerald-400'">
              {{ formatAmount(row.bankAmount) }}
            </td>
            <td class="px-3 py-3 text-right font-medium whitespace-nowrap" :class="row.selisih === 0 ? (isDark ? 'text-gray-500' : 'text-gray-400') : 'text-amber-400'">
              {{ formatAmount(row.selisih) }}
            </td>
            <td class="px-3 py-3">
              <div class="flex items-center gap-1.5 justify-end">
                <button
                  class="px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition"
                  :class="row.type === 'selisih' ? 'bg-amber-500/90 hover:bg-amber-500 text-white' : 'bg-purple-600 hover:bg-purple-500 text-white'"
                >
                  {{ row.type === 'selisih' ? 'Tinjau' : 'Cocokkan' }}
                </button>
                <button class="p-1 rounded-md transition flex-shrink-0" :class="isDark ? 'text-gray-500 hover:text-white hover:bg-white/10' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100'">
                  <EllipsisVerticalIcon class="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- List (mobile) -->
    <div class="lg:hidden divide-y" :class="isDark ? 'divide-white/5' : 'divide-gray-100'">
      <div v-for="row in paginatedRows" :key="row.id" class="p-4">
        <div class="flex items-start justify-between mb-2">
          <div>
            <p class="text-sm font-medium" :class="isDark ? 'text-gray-200' : 'text-gray-800'">{{ row.companyDesc }}</p>
            <span class="inline-block mt-1 px-2 py-0.5 rounded-full text-[11px] font-medium" :class="categoryStyles[row.categoryColor]">{{ row.category }}</span>
          </div>
          <p class="text-sm font-medium flex-shrink-0 ml-2" :class="row.companyAmount < 0 ? 'text-rose-400' : 'text-emerald-400'">{{ formatAmount(row.companyAmount) }}</p>
        </div>
        <div class="text-xs mb-2" :class="isDark ? 'text-gray-500' : 'text-gray-400'">
          Perusahaan: {{ row.companyDate }} · Bank: {{ row.bankDate || '-' }} ({{ row.bankDesc || 'Tidak ada data' }})
        </div>
        <div class="flex items-center justify-between">
          <p class="text-xs font-medium" :class="row.selisih === 0 ? (isDark ? 'text-gray-500' : 'text-gray-400') : 'text-amber-400'">
            Selisih: {{ formatAmount(row.selisih) }}
          </p>
          <button
            class="px-3 py-1.5 rounded-lg text-xs font-medium transition"
            :class="row.type === 'selisih' ? 'bg-amber-500/90 text-white' : 'bg-purple-600 text-white'"
          >
            {{ row.type === 'selisih' ? 'Tinjau' : 'Cocokkan' }}
          </button>
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