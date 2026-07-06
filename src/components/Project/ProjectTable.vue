<script setup>
import { computed } from 'vue'
import { BriefcaseIcon, BuildingOffice2Icon, ArchiveBoxIcon, CheckCircleIcon, EllipsisVerticalIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'
import { useTheme } from '@/composables/useTheme'

const props = defineProps({
  rows: { type: Array, required: true },
  currentPage: { type: Number, required: true },
  pageSize: { type: Number, required: true },
})
const emit = defineEmits(['update:currentPage', 'update:pageSize'])

const { isDark } = useTheme()

const iconMap = { building: BuildingOffice2Icon, box: ArchiveBoxIcon, check: CheckCircleIcon, briefcase: BriefcaseIcon }
const iconColorMap = {
  purple: 'bg-purple-500/15 text-purple-400',
  blue: 'bg-blue-500/15 text-blue-400',
  amber: 'bg-amber-500/15 text-amber-400',
  emerald: 'bg-emerald-500/15 text-emerald-400',
  rose: 'bg-rose-500/15 text-rose-400',
}
const statusStyles = {
  Aktif: 'bg-emerald-500/15 text-emerald-400',
  Selesai: 'bg-blue-500/15 text-blue-400',
  Ditunda: 'bg-amber-500/15 text-amber-400',
}

function formatAmount(value) {
  return `Rp ${value.toLocaleString('id-ID')}`
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
  return `Menampilkan ${start} - ${end} dari ${props.rows.length} proyek`
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

    <div class="overflow-x-auto hidden lg:block">
      <table class="w-full text-sm">
        <thead>
          <tr>
            <th class="text-left px-5 py-3 font-medium" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Nama Proyek</th>
            <th class="text-left px-3 py-3 font-medium" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Klien</th>
            <th class="text-left px-3 py-3 font-medium" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Manager</th>
            <th class="text-right px-3 py-3 font-medium" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Anggaran</th>
            <th class="text-right px-3 py-3 font-medium" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Realisasi</th>
            <th class="text-left px-3 py-3 font-medium w-32" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Progress</th>
            <th class="text-left px-3 py-3 font-medium" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Status</th>
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
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" :class="iconColorMap[row.color]">
                  <component :is="iconMap[row.icon] || iconMap.briefcase" class="w-4.5 h-4.5" />
                </div>
                <div class="min-w-0">
                  <p class="font-medium whitespace-nowrap" :class="isDark ? 'text-gray-200' : 'text-gray-800'">{{ row.name }}</p>
                  <p class="text-xs" :class="isDark ? 'text-gray-500' : 'text-gray-400'">{{ row.code }}</p>
                </div>
              </div>
            </td>
            <td class="px-3 py-3 whitespace-nowrap" :class="isDark ? 'text-gray-300' : 'text-gray-600'">{{ row.client }}</td>
            <td class="px-3 py-3 whitespace-nowrap">
              <div class="flex items-center gap-2">
                <div class="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                  {{ row.manager.charAt(0) }}
                </div>
                <span :class="isDark ? 'text-gray-300' : 'text-gray-600'">{{ row.manager }}</span>
              </div>
            </td>
            <td class="px-3 py-3 text-right whitespace-nowrap" :class="isDark ? 'text-gray-300' : 'text-gray-700'">{{ formatAmount(row.budget) }}</td>
            <td class="px-3 py-3 text-right whitespace-nowrap" :class="isDark ? 'text-gray-300' : 'text-gray-700'">{{ formatAmount(row.realization) }}</td>
            <td class="px-3 py-3">
              <div class="flex items-center gap-2">
                <div class="flex-1 h-1.5 rounded-full overflow-hidden" :class="isDark ? 'bg-white/10' : 'bg-gray-200'">
                  <div class="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" :style="{ width: row.progress + '%' }"></div>
                </div>
                <span class="text-xs font-medium w-9 flex-shrink-0" :class="isDark ? 'text-gray-300' : 'text-gray-600'">{{ row.progress }}%</span>
              </div>
            </td>
            <td class="px-3 py-3">
              <span class="px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap" :class="statusStyles[row.status]">{{ row.status }}</span>
            </td>
            <td class="px-3 py-3">
              <button class="p-1 rounded-md transition" :class="isDark ? 'text-gray-500 hover:text-white hover:bg-white/10' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100'">
                <EllipsisVerticalIcon class="w-4 h-4" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="lg:hidden divide-y" :class="isDark ? 'divide-white/5' : 'divide-gray-100'">
      <div v-for="row in paginatedRows" :key="row.id" class="p-4">
        <div class="flex items-start gap-3 mb-2">
          <div class="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" :class="iconColorMap[row.color]">
            <component :is="iconMap[row.icon] || iconMap.briefcase" class="w-4.5 h-4.5" />
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between">
              <p class="font-medium text-sm" :class="isDark ? 'text-gray-200' : 'text-gray-800'">{{ row.name }}</p>
              <span class="px-2 py-0.5 rounded-full text-[11px] font-medium flex-shrink-0 ml-2" :class="statusStyles[row.status]">{{ row.status }}</span>
            </div>
            <p class="text-xs" :class="isDark ? 'text-gray-500' : 'text-gray-400'">{{ row.code }} • {{ row.client }}</p>
          </div>
        </div>
        <div class="flex items-center gap-2 mb-2">
          <div class="flex-1 h-1.5 rounded-full overflow-hidden" :class="isDark ? 'bg-white/10' : 'bg-gray-200'">
            <div class="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" :style="{ width: row.progress + '%' }"></div>
          </div>
          <span class="text-xs font-medium" :class="isDark ? 'text-gray-300' : 'text-gray-600'">{{ row.progress }}%</span>
        </div>
        <div class="flex items-center justify-between text-xs" :class="isDark ? 'text-gray-500' : 'text-gray-400'">
          <span>Anggaran {{ formatAmount(row.budget) }}</span>
          <span>Realisasi {{ formatAmount(row.realization) }}</span>
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
        @change="$emit('update:pageSize', Number($event.target.value)); $emit('update:currentPage', 1)"
      >
        <option :value="10">10 / halaman</option>
        <option :value="25">25 / halaman</option>
        <option :value="50">50 / halaman</option>
      </select>
    </div>
  </div>
</template>