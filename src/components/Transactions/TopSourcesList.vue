<script setup>
import { BuildingLibraryIcon } from '@heroicons/vue/24/outline'
import { useTheme } from '@/composables/useTheme'

defineProps({
  sources: { type: Array, required: true },
})

const { isDark } = useTheme()
</script>

<template>
  <div class="rounded-2xl border p-5" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
    <div class="flex items-center justify-between mb-4">
      <p class="text-sm font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">Sumber Pemasukan Terbesar</p>
      <a href="#" class="text-xs text-purple-400 hover:text-purple-300 transition">Lihat semua</a>
    </div>

    <ul class="space-y-3">
      <li v-for="source in sources" :key="source.name" class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" :class="isDark ? 'bg-blue-500/15' : 'bg-blue-50'">
          <BuildingLibraryIcon class="w-4.5 h-4.5 text-blue-400" />
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium truncate" :class="isDark ? 'text-gray-200' : 'text-gray-800'">{{ source.name }}</p>
        </div>
        <div class="text-right flex-shrink-0">
          <p class="text-sm font-medium" :class="isDark ? 'text-gray-200' : 'text-gray-800'">{{ source.amount }}</p>
          <p class="text-xs" :class="isDark ? 'text-gray-500' : 'text-gray-400'">{{ source.percent }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>