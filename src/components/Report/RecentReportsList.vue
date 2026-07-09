<script setup>
import { DocumentTextIcon, ArrowDownTrayIcon } from '@heroicons/vue/24/outline'
import { useTheme } from '@/composables/useTheme'

defineProps({
  reports: { type: Array, required: true }, 
  title: { type: String, default: 'Laporan Terbaru' },
})

const { isDark } = useTheme()

const colorMap = {
  purple: 'bg-purple-500/15 text-purple-400',
  blue: 'bg-blue-500/15 text-blue-400',
  amber: 'bg-amber-500/15 text-amber-400',
  emerald: 'bg-emerald-500/15 text-emerald-400',
  pink: 'bg-pink-500/15 text-pink-400',
}
</script>

<template>
  <div class="rounded-2xl border p-5" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
    <div class="flex items-center justify-between mb-4">
      <p class="text-base font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">{{ title }}</p>
      <a href="#" class="text-sm text-purple-400 hover:text-purple-300 transition">Lihat Semua</a>
    </div>

    <ul class="space-y-3.5">
      <li v-for="r in reports" :key="r.id" class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" :class="colorMap[r.color]">
          <DocumentTextIcon class="w-4.5 h-4.5" />
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium truncate" :class="isDark ? 'text-gray-200' : 'text-gray-800'">{{ r.name }}</p>
          <p class="text-xs" :class="isDark ? 'text-gray-500' : 'text-gray-400'">{{ r.period }}</p>
        </div>
        <div class="flex flex-col items-end gap-1 flex-shrink-0">
          <span class="px-2 py-0.5 rounded text-[11px] font-semibold bg-purple-500/15 text-purple-400">{{ r.format }}</span>
          <button class="flex items-center gap-1 text-xs" :class="isDark ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'">
            <ArrowDownTrayIcon class="w-3 h-3" />
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>