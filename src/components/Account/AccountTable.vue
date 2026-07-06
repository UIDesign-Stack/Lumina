<script setup>
import { computed } from 'vue'
import { PencilSquareIcon, EllipsisVerticalIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'
import AccountIcon from './AccountIcon.vue'
import { useTheme } from '@/composables/useTheme'

const props = defineProps({
  title: { type: String, default: 'Daftar Akun' },
  rows: { type: Array, required: true },
  currentPage: { type: Number, required: true },
  pageSize: { type: Number, required: true },
})
const emit = defineEmits(['update:currentPage', 'update:pageSize'])

const { isDark } = useTheme()

const typeStyles = {
  Aset: 'bg-purple-500/15 text-purple-400',
  Liabilitas: 'bg-rose-500/15 text-rose-400',
  Ekuitas: 'bg-amber-500/15 text-amber-400',
}
const statusStyles = {
  Aktif: 'bg-emerald-500/15 text-emerald-400',
  Nonaktif: 'bg-gray-500/15 text-gray-400',
}

function formatAmount(value) {
  const sign = value < 0 ? '-' : ''
  return `${sign}Rp ${Math.abs(value).toLocaleString('id-ID')}`
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
  return `Menampilkan ${start} - ${end} dari ${props.rows.length} akun`
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
    <div class="p-5">
      <p class="text-base font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">{{ title }}</p>
    </div>

    <!-- Tabel (desktop) -->
    <div class="overflow-x-auto hidden md:block">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-t" :class="isDark ? 'border-white/5' : 'border-gray-100'">
            <th class="text-left px-5 py-3 font-medium" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Nama Akun</th>
            <th class="text-left px-3 py-3 font-medium" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Kode</th>
            <th class="text-left px-3 py-3 font-medium" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Tipe</th>
            <th class="text-left px-3 py-3 font-medium" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Kategori</th>
            <th class="text-right px-3 py-3 font-medium" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Saldo</th>
            <th class="text-left px-3 py-3 font-medium" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Status</th>
            <th class="w-20 px-3 py-3"></th>
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
              <div class="flex items-center gap-3">
                <AccountIcon :icon="row.icon" size="sm" />
                <span class="font-medium whitespace-nowrap" :class="isDark ? 'text-gray-200' : 'text-gray-800'">{{ row.name }}</span>
              </div>
            </td>
            <td class="px-3 py-3 whitespace-nowrap" :class="isDark ? 'text-gray-400' : 'text-gray-500'">{{ row.code }}</td>
            <td class="px-3 py-3">
              <span class="px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap" :class="typeStyles[row.type]">{{ row.type }}</span>
            </td>
            <td class="px-3 py-3 whitespace-nowrap" :class="isDark ? 'text-gray-400' : 'text-gray-500'">{{ row.category }}</td>
            <td
              class="px-3 py-3 text-right font-medium whitespace-nowrap"
              :class="row.balance < 0 ? 'text-rose-400' : (isDark ? 'text-gray-200' : 'text-gray-800')"
            >
              {{ formatAmount(row.balance) }}
            </td>
            <td class="px-3 py-3">
              <span class="px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap" :class="statusStyles[row.status]">{{ row.status }}</span>
            </td>
            <td class="px-3 py-3">
              <div class="flex items-center justify-end gap-1">
                <button class="p-1.5 rounded-md transition" :class="isDark ? 'text-gray-500 hover:text-white hover:bg-white/10' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100'">
                  <PencilSquareIcon class="w-4 h-4" />
                </button>
                <button class="p-1.5 rounded-md transition" :class="isDark ? 'text-gray-500 hover:text-white hover:bg-white/10' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100'">
                  <EllipsisVerticalIcon class="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- List (mobile) -->
    <div class="md:hidden divide-y" :class="isDark ? 'divide-white/5' : 'divide-gray-100'">
      <div v-for="row in paginatedRows" :key="row.id" class="p-4 flex items-center gap-3">
        <AccountIcon :icon="row.icon" size="sm" />
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between mb-1">
            <p class="font-medium text-sm" :class="isDark ? 'text-gray-200' : 'text-gray-800'">{{ row.name }}</p>
            <span class="px-2 py-0.5 rounded-full text-[11px] font-medium flex-shrink-0 ml-2" :class="statusStyles[row.status]">{{ row.status }}</span>
          </div>
          <p class="text-xs" :class="isDark ? 'text-gray-500' : 'text-gray-400'">{{ row.code }} • {{ row.category }}</p>
          <p class="text-sm font-medium mt-1" :class="row.balance < 0 ? 'text-rose-400' : (isDark ? 'text-gray-200' : 'text-gray-800')">{{ formatAmount(row.balance) }}</p>
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
        :value="pageSize"
        class="border rounded-lg py-1.5 px-2.5 text-xs focus:outline-none transition mx-auto sm:mx-0"
        :class="isDark ? 'bg-[#181428]/80 border-white/10 text-gray-300' : 'bg-gray-50 border-gray-300 text-gray-600'"
        @change="emit('update:pageSize', Number($event.target.value)); emit('update:currentPage', 1)"
      >
        <option :value="10">10 / halaman</option>
        <option :value="25">25 / halaman</option>
        <option :value="50">50 / halaman</option>
      </select>
    </div>
  </div>
</template>