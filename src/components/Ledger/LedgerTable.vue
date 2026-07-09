<script setup>
import { computed } from 'vue'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'
import { useTheme } from '@/composables/useTheme'

const props = defineProps({
  rows: { type: Array, required: true },
  totalPeriod: { type: Object, required: true },
  currentPage: { type: Number, required: true },
  pageSize: { type: Number, required: true },
})
const emit = defineEmits(['update:currentPage', 'update:pageSize'])

const { isDark } = useTheme()

const categoryStyles = {
  Pemasukan: 'bg-emerald-500/15 text-emerald-400',
  Pengeluaran: 'bg-rose-500/15 text-rose-400',
}

function formatAmount(value) {
  if (!value) return '-'
  return value.toLocaleString('id-ID')
}

const totalPages = computed(() => Math.max(1, Math.ceil(props.rows.length / props.pageSize)))
const paginatedRows = computed(() => {
  const start = (props.currentPage - 1) * props.pageSize
  return props.rows.slice(start, start + props.pageSize)
})
const rangeLabel = computed(() => {
  if (props.rows.length === 0) return 'Tidak ada data'
  const start = (props.currentPage - 1) * props.pageSize + 1
  const end = Math.min(props.currentPage * props.pageSize, props.rows.length)
  return `Menampilkan ${start} - ${end} dari ${props.rows.length} data`
})
const pageNumbers = computed(() => {
  const total = totalPages.value
  const current = props.currentPage
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
  emit('update:currentPage', p)
}
</script>

<template>
  <div class="rounded-2xl border" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead>
          <tr>
            <th class="text-left px-5 py-3 font-medium whitespace-nowrap" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Tanggal</th>
            <th class="text-left px-3 py-3 font-medium whitespace-nowrap" :class="isDark ? 'text-gray-400' : 'text-gray-500'">No. Bukti</th>
            <th class="text-left px-3 py-3 font-medium whitespace-nowrap" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Keterangan</th>
            <th class="text-left px-3 py-3 font-medium whitespace-nowrap" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Akun</th>
            <th class="text-left px-3 py-3 font-medium whitespace-nowrap" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Kategori</th>
            <th class="text-left px-3 py-3 font-medium whitespace-nowrap" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Proyek</th>
            <th class="text-right px-3 py-3 font-medium whitespace-nowrap" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Debit</th>
            <th class="text-right px-3 py-3 font-medium whitespace-nowrap" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Kredit</th>
            <th class="text-right px-5 py-3 font-medium whitespace-nowrap" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Saldo</th>
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
            <td class="px-3 py-3 whitespace-nowrap" :class="isDark ? 'text-gray-400' : 'text-gray-500'">{{ row.voucherNo }}</td>
            <td class="px-3 py-3 font-medium whitespace-nowrap" :class="isDark ? 'text-gray-200' : 'text-gray-800'">{{ row.description }}</td>
            <td class="px-3 py-3 whitespace-nowrap" :class="isDark ? 'text-gray-300' : 'text-gray-600'">{{ row.account }}</td>
            <td class="px-3 py-3 whitespace-nowrap">
              <span v-if="row.category" class="px-2.5 py-1 rounded-full text-xs font-medium" :class="categoryStyles[row.category]">{{ row.category }}</span>
              <span v-else :class="isDark ? 'text-gray-600' : 'text-gray-400'">-</span>
            </td>
            <td class="px-3 py-3 whitespace-nowrap" :class="isDark ? 'text-gray-400' : 'text-gray-500'">{{ row.project || '-' }}</td>
            <td class="px-3 py-3 text-right whitespace-nowrap" :class="isDark ? 'text-gray-300' : 'text-gray-700'">{{ formatAmount(row.debit) }}</td>
            <td class="px-3 py-3 text-right whitespace-nowrap" :class="isDark ? 'text-gray-300' : 'text-gray-700'">{{ formatAmount(row.credit) }}</td>
            <td class="px-5 py-3 text-right whitespace-nowrap font-medium" :class="isDark ? 'text-gray-200' : 'text-gray-800'">{{ formatAmount(row.balance) }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr class="border-t-2" :class="isDark ? 'border-purple-500/30 bg-purple-500/10' : 'border-purple-300 bg-purple-50'">
            <td colspan="6" class="px-5 py-3.5 font-bold text-purple-400">Total Periode</td>
            <td class="px-3 py-3.5 text-right font-bold text-purple-400 whitespace-nowrap">{{ formatAmount(totalPeriod.debit) }}</td>
            <td class="px-3 py-3.5 text-right font-bold text-purple-400 whitespace-nowrap">{{ formatAmount(totalPeriod.credit) }}</td>
            <td class="px-5 py-3.5 text-right font-bold text-purple-400 whitespace-nowrap">{{ formatAmount(totalPeriod.balance) }}</td>
          </tr>
        </tfoot>
      </table>
    </div>

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
        :value="pageSize"
        class="border rounded-lg py-1.5 px-2.5 text-xs focus:outline-none transition mx-auto sm:mx-0"
        :class="isDark ? 'bg-[#181428]/80 border-white/10 text-gray-300' : 'bg-gray-50 border-gray-300 text-gray-600'"
        @change="$emit('update:pageSize', Number($event.target.value)); $emit('update:currentPage', 1)"
      >
        <option :value="10">10 / halaman</option>
        <option :value="25">25 / halaman</option>
        <option :value="50">50 / halaman</option>
      </select>
    </div>
  </div>
</template>