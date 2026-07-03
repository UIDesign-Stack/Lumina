<script setup>
import { useTheme } from '@/composables/useTheme'

defineProps({
  items: { type: Array, default: () => [] },
})

const { isDark } = useTheme()

function formatRupiah(v) {
  return 'Rp ' + Number(v).toLocaleString('id-ID')
}
</script>

<template>
  <div
    class="border rounded-2xl p-5 h-full transition-colors overflow-x-auto"
    :class="isDark ? 'bg-[#100c1e] border-white/5' : 'bg-white border-gray-200 shadow-sm'"
  >
    <div class="flex items-center justify-between mb-4">
      <h3 class="font-medium" :class="isDark ? 'text-white' : 'text-gray-900'">Ringkasan Anggaran</h3>
      <a href="#" class="text-xs font-medium text-indigo-400 hover:text-indigo-300">Lihat semua</a>
    </div>

    <table class="w-full text-sm min-w-[560px]">
      <thead>
        <tr class="text-xs uppercase tracking-wide" :class="isDark ? 'text-gray-500' : 'text-gray-400'">
          <th class="text-left font-medium pb-2">Kategori</th>
          <th class="text-left font-medium pb-2">Anggaran</th>
          <th class="text-left font-medium pb-2">Realisasi</th>
          <th class="text-left font-medium pb-2">Sisa</th>
          <th class="text-left font-medium pb-2">Progress</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="i in items"
          :key="i.category"
          class="border-t"
          :class="isDark ? 'border-white/5' : 'border-gray-100'"
        >
          <td class="py-3 font-medium" :class="isDark ? 'text-white' : 'text-gray-900'">{{ i.category }}</td>
          <td class="py-3" :class="isDark ? 'text-gray-300' : 'text-gray-600'">{{ formatRupiah(i.budget) }}</td>
          <td class="py-3" :class="isDark ? 'text-gray-300' : 'text-gray-600'">{{ formatRupiah(i.actual) }}</td>
          <td class="py-3" :class="isDark ? 'text-gray-300' : 'text-gray-600'">{{ formatRupiah(i.remaining) }}</td>
          <td class="py-3">
            <div class="flex items-center gap-2 min-w-[110px]">
              <div class="flex-1 h-1.5 rounded-full overflow-hidden" :class="isDark ? 'bg-white/10' : 'bg-gray-200'">
                <div class="h-full rounded-full bg-emerald-400" :style="{ width: i.progress + '%' }"></div>
              </div>
              <span class="text-xs w-9 flex-shrink-0" :class="isDark ? 'text-gray-400' : 'text-gray-500'">{{ i.progress }}%</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>