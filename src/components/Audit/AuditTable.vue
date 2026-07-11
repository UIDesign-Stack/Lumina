<script setup>
import { computed } from 'vue'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'
import AuditTableRow from './AuditTableRow.vue'
import { useTheme } from '@/composables/useTheme'

const props = defineProps({
  logs: { type: Array, required: true },
  currentPage: { type: Number, default: 1 },
  perPage: { type: Number, default: 10 },
  totalData: { type: Number, required: true },
})

const emit = defineEmits(['update:currentPage'])

const { isDark } = useTheme()

const totalPages = computed(() => Math.max(1, Math.ceil(props.totalData / props.perPage)))

const rangeLabel = computed(() => {
  if (props.totalData === 0) return 'Menampilkan 0 dari 0 data'
  const start = (props.currentPage - 1) * props.perPage + 1
  const end = Math.min(props.currentPage * props.perPage, props.totalData)
  return `Menampilkan ${start} - ${end} dari ${props.totalData.toLocaleString('id-ID')} data`
})

// Menghasilkan urutan halaman dengan elipsis, mis. [1, 2, 3, '...', 125]
const pageItems = computed(() => {
  const total = totalPages.value
  const current = props.currentPage
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

  const items = new Set([1, 2, 3, current - 1, current, current + 1, total])
  const sorted = [...items].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b)

  const result = []
  let prev = null
  for (const page of sorted) {
    if (prev !== null && page - prev > 1) result.push('...')
    result.push(page)
    prev = page
  }
  return result
})

function goTo(page) {
  if (page < 1 || page > totalPages.value) return
  emit('update:currentPage', page)
}

const headers = ['Tanggal & Waktu', 'Pengguna', 'Modul', 'Aksi', 'Keterangan', 'IP Address', 'Status']
</script>

<template>
  <div class="rounded-2xl border overflow-hidden" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y" :class="isDark ? 'divide-white/10' : 'divide-gray-200'">
        <thead :class="isDark ? 'bg-white/5' : 'bg-gray-50'">
          <tr>
            <th
              v-for="(header, i) in headers"
              :key="header"
              scope="col"
              class="py-3.5 px-4 text-left text-xs font-medium uppercase tracking-wide"
              :class="[isDark ? 'text-gray-400' : 'text-gray-500', i === 0 ? 'pl-5' : '']"
            >
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody class="divide-y" :class="isDark ? 'divide-white/5' : 'divide-gray-200'">
          <AuditTableRow
            v-for="log in logs"
            :key="log.key"
            :log="log"
            class="[&>td:first-child]:pl-5"
          />
        </tbody>
      </table>
    </div>

    <div class="flex items-center justify-between px-5 py-4 border-t flex-wrap gap-3" :class="isDark ? 'border-white/10' : 'border-gray-100'">
      <p class="text-xs" :class="isDark ? 'text-gray-500' : 'text-gray-400'">{{ rangeLabel }}</p>

      <div class="flex items-center gap-1.5">
        <button
          type="button"
          class="w-8 h-8 rounded-lg border flex items-center justify-center transition disabled:opacity-40 disabled:cursor-not-allowed"
          :class="isDark ? 'border-white/10 text-gray-300 hover:bg-white/5' : 'border-gray-200 text-gray-600 hover:bg-gray-50'"
          :disabled="currentPage === 1"
          @click="goTo(currentPage - 1)"
        >
          <ChevronLeftIcon class="w-4 h-4" />
        </button>

        <template v-for="(item, idx) in pageItems" :key="idx">
          <span v-if="item === '...'" class="w-8 h-8 flex items-center justify-center text-sm" :class="isDark ? 'text-gray-500' : 'text-gray-400'">…</span>
          <button
            v-else
            type="button"
            class="w-8 h-8 rounded-lg text-sm font-medium transition"
            :class="item === currentPage
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
              : (isDark ? 'text-gray-300 hover:bg-white/5' : 'text-gray-600 hover:bg-gray-50')"
            @click="goTo(item)"
          >
            {{ item }}
          </button>
        </template>

        <button
          type="button"
          class="w-8 h-8 rounded-lg border flex items-center justify-center transition disabled:opacity-40 disabled:cursor-not-allowed"
          :class="isDark ? 'border-white/10 text-gray-300 hover:bg-white/5' : 'border-gray-200 text-gray-600 hover:bg-gray-50'"
          :disabled="currentPage === totalPages"
          @click="goTo(currentPage + 1)"
        >
          <ChevronRightIcon class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>