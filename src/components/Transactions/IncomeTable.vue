<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import {
  MagnifyingGlassIcon,
  CalendarDaysIcon,
  ArrowDownTrayIcon,
  TrashIcon,
  EllipsisVerticalIcon,
  ChevronUpDownIcon,
  CheckCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PencilSquareIcon,
  DocumentDuplicateIcon,
} from '@heroicons/vue/24/outline'
import { useTheme } from '@/composables/useTheme'

const props = defineProps({
  rows: { type: Array, required: true },
})

const { isDark } = useTheme()

const searchQuery = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const selectedIds = ref([])
const openMenuId = ref(null)

const categoryStyles = {
  emerald: 'bg-emerald-500/15 text-emerald-400',
  blue: 'bg-blue-500/15 text-blue-400',
  purple: 'bg-purple-500/15 text-purple-400',
}

const filteredRows = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return props.rows
  return props.rows.filter((r) =>
    [r.description, r.category, r.source, r.account].some((field) => field.toLowerCase().includes(q))
  )
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

function formatAmount(value) {
  return `Rp ${value.toLocaleString('id-ID')}`
}

function toggleAll(event) {
  selectedIds.value = event.target.checked ? paginatedRows.value.map((r) => r.id) : []
}

function toggleMenu(id) {
  openMenuId.value = openMenuId.value === id ? null : id
}

function handleClickOutside(event) {
  if (openMenuId.value !== null && !event.target.closest('[data-row-menu]')) {
    openMenuId.value = null
  }
}
onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))
</script>

<template>
  <div class="rounded-2xl border" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
    <!-- Header: judul + toolbar -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-5">
      <p class="text-base font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">Daftar Pemasukan</p>

      <div class="flex items-center gap-2 flex-wrap">
        <div class="relative flex-1 min-w-[160px] sm:flex-none sm:w-64">
          <MagnifyingGlassIcon class="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari pemasukan..."
            class="w-full border rounded-lg py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition"
            :class="isDark ? 'bg-[#181428]/80 border-white/10 text-white placeholder-gray-500' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'"
            @input="currentPage = 1"
          />
        </div>
        <button class="w-9 h-9 rounded-lg border flex items-center justify-center transition flex-shrink-0" :class="isDark ? 'border-white/10 text-gray-400 hover:text-white hover:bg-white/5' : 'border-gray-300 text-gray-500 hover:text-gray-900 hover:bg-gray-50'">
          <CalendarDaysIcon class="w-4 h-4" />
        </button>
        <button class="w-9 h-9 rounded-lg border flex items-center justify-center transition flex-shrink-0" :class="isDark ? 'border-white/10 text-gray-400 hover:text-white hover:bg-white/5' : 'border-gray-300 text-gray-500 hover:text-gray-900 hover:bg-gray-50'">
          <ArrowDownTrayIcon class="w-4 h-4" />
        </button>
        <button class="w-9 h-9 rounded-lg border flex items-center justify-center transition flex-shrink-0" :class="isDark ? 'border-white/10 text-gray-400 hover:text-white hover:bg-white/5' : 'border-gray-300 text-gray-500 hover:text-gray-900 hover:bg-gray-50'">
          <TrashIcon class="w-4 h-4" />
        </button>
        <button class="w-9 h-9 rounded-lg border flex items-center justify-center transition flex-shrink-0" :class="isDark ? 'border-white/10 text-gray-400 hover:text-white hover:bg-white/5' : 'border-gray-300 text-gray-500 hover:text-gray-900 hover:bg-gray-50'">
          <EllipsisVerticalIcon class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- Tabel (desktop) -->
    <div class="overflow-x-auto hidden md:block">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-t" :class="isDark ? 'border-white/5' : 'border-gray-100'">
            <th class="w-10 px-5 py-3">
              <input type="checkbox" class="w-4 h-4 rounded" @change="toggleAll" />
            </th>
            <th class="text-left px-3 py-3 font-medium" :class="isDark ? 'text-gray-400' : 'text-gray-500'">
              <span class="flex items-center gap-1 cursor-pointer">Tanggal <ChevronUpDownIcon class="w-3.5 h-3.5" /></span>
            </th>
            <th class="text-left px-3 py-3 font-medium" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Deskripsi</th>
            <th class="text-left px-3 py-3 font-medium" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Kategori</th>
            <th class="text-left px-3 py-3 font-medium" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Sumber</th>
            <th class="text-left px-3 py-3 font-medium" :class="isDark ? 'text-gray-400' : 'text-gray-500'">
              <span class="flex items-center gap-1 cursor-pointer">Akun <ChevronUpDownIcon class="w-3.5 h-3.5" /></span>
            </th>
            <th class="text-right px-3 py-3 font-medium" :class="isDark ? 'text-gray-400' : 'text-gray-500'">
              <span class="flex items-center justify-end gap-1 cursor-pointer">Jumlah <ChevronUpDownIcon class="w-3.5 h-3.5" /></span>
            </th>
            <th class="text-left px-3 py-3 font-medium" :class="isDark ? 'text-gray-400' : 'text-gray-500'">
              <span class="flex items-center gap-1 cursor-pointer">Status <ChevronUpDownIcon class="w-3.5 h-3.5" /></span>
            </th>
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
            <td class="px-5 py-3">
              <input type="checkbox" class="w-4 h-4 rounded" :checked="selectedIds.includes(row.id)" @change="
                selectedIds.includes(row.id)
                  ? (selectedIds = selectedIds.filter((id) => id !== row.id))
                  : selectedIds.push(row.id)
              " />
            </td>
            <td class="px-3 py-3 whitespace-nowrap" :class="isDark ? 'text-gray-300' : 'text-gray-600'">{{ row.date }}</td>
            <td class="px-3 py-3 font-medium whitespace-nowrap" :class="isDark ? 'text-gray-200' : 'text-gray-800'">{{ row.description }}</td>
            <td class="px-3 py-3">
              <span class="px-2.5 py-1 rounded-full text-xs font-medium" :class="categoryStyles[row.categoryColor]">{{ row.category }}</span>
            </td>
            <td class="px-3 py-3 whitespace-nowrap" :class="isDark ? 'text-gray-300' : 'text-gray-600'">{{ row.source }}</td>
            <td class="px-3 py-3 whitespace-nowrap" :class="isDark ? 'text-gray-300' : 'text-gray-600'">{{ row.account }}</td>
            <td class="px-3 py-3 text-right font-medium text-emerald-400 whitespace-nowrap">{{ formatAmount(row.amount) }}</td>
            <td class="px-3 py-3">
              <span class="inline-flex items-center gap-1 text-emerald-400 text-xs font-medium">
                <CheckCircleIcon class="w-3.5 h-3.5" />
                {{ row.status }}
              </span>
            </td>
            <td class="px-3 py-3 relative" data-row-menu>
              <button
                class="p-1 rounded-md transition"
                :class="isDark ? 'text-gray-500 hover:text-white hover:bg-white/10' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100'"
                @click.stop="toggleMenu(row.id)"
              >
                <EllipsisVerticalIcon class="w-4 h-4" />
              </button>

              <div
                v-if="openMenuId === row.id"
                class="absolute right-3 top-9 z-20 w-40 rounded-xl border shadow-2xl overflow-hidden"
                :class="isDark ? 'bg-[#100c1c] border-white/10' : 'bg-white border-gray-200'"
              >
                <button class="w-full flex items-center gap-2 px-3 py-2 text-sm transition text-left" :class="isDark ? 'text-gray-300 hover:bg-white/5' : 'text-gray-700 hover:bg-gray-50'">
                  <PencilSquareIcon class="w-4 h-4" /> Edit
                </button>
                <button class="w-full flex items-center gap-2 px-3 py-2 text-sm transition text-left" :class="isDark ? 'text-gray-300 hover:bg-white/5' : 'text-gray-700 hover:bg-gray-50'">
                  <DocumentDuplicateIcon class="w-4 h-4" /> Duplikat
                </button>
                <button class="w-full flex items-center gap-2 px-3 py-2 text-sm text-rose-400 hover:bg-rose-500/10 transition text-left">
                  <TrashIcon class="w-4 h-4" /> Hapus
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- List (mobile) -->
    <div class="md:hidden divide-y" :class="isDark ? 'divide-white/5' : 'divide-gray-100'">
      <div v-for="row in paginatedRows" :key="row.id" class="p-4">
        <div class="flex items-start justify-between mb-1.5">
          <p class="font-medium text-sm" :class="isDark ? 'text-gray-200' : 'text-gray-800'">{{ row.description }}</p>
          <p class="text-sm font-medium text-emerald-400 flex-shrink-0 ml-2">{{ formatAmount(row.amount) }}</p>
        </div>
        <div class="flex items-center gap-2 mb-2">
          <span class="px-2 py-0.5 rounded-full text-[11px] font-medium" :class="categoryStyles[row.categoryColor]">{{ row.category }}</span>
          <span class="text-xs" :class="isDark ? 'text-gray-500' : 'text-gray-400'">{{ row.source }}</span>
        </div>
        <div class="flex items-center justify-between text-xs" :class="isDark ? 'text-gray-500' : 'text-gray-400'">
          <span>{{ row.date }} · {{ row.account }}</span>
          <span class="inline-flex items-center gap-1 text-emerald-400 font-medium">
            <CheckCircleIcon class="w-3.5 h-3.5" /> {{ row.status }}
          </span>
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