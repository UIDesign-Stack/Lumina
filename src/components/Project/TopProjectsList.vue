<script setup>
import { useTheme } from '@/composables/useTheme'

defineProps({
  projects: { type: Array, required: true },
  title: { type: String, default: 'Proyek' },
  subtitle: { type: String, default: '' },
})

const { isDark } = useTheme()

const rankColorMap = {
  purple: 'bg-purple-500/15 text-purple-400',
  blue: 'bg-blue-500/15 text-blue-400',
  amber: 'bg-amber-500/15 text-amber-400',
  rose: 'bg-rose-500/15 text-rose-400',
  emerald: 'bg-emerald-500/15 text-emerald-400',
}
const barColorMap = {
  purple: 'from-indigo-500 to-purple-500',
  blue: 'from-blue-600 to-blue-400',
  amber: 'from-amber-600 to-amber-400',
  rose: 'from-rose-600 to-rose-400',
  emerald: 'from-emerald-600 to-emerald-400',
}
</script>

<template>
  <div class="rounded-2xl border p-5" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
    <div class="flex items-center justify-between mb-4">
      <p class="text-base font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">
        Top 5 {{ title }} <span v-if="subtitle" class="font-normal text-sm" :class="isDark ? 'text-gray-500' : 'text-gray-400'">({{ subtitle }})</span>
      </p>
      <a href="#" class="text-sm text-purple-400 hover:text-purple-300 transition flex-shrink-0">Lihat Semua</a>
    </div>

    <ul class="space-y-4">
      <li v-for="p in projects" :key="p.rank" class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-sm font-semibold" :class="rankColorMap[p.color]">
          {{ p.rank }}
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between mb-1.5">
            <p class="text-sm font-medium truncate" :class="isDark ? 'text-gray-200' : 'text-gray-800'">{{ p.name }}</p>
            <span class="text-xs flex-shrink-0 ml-2 text-right" :class="isDark ? 'text-gray-500' : 'text-gray-400'">
              {{ p.amount }}<template v-if="p.count"><br />{{ p.count }}</template>
            </span>
          </div>
          <div class="h-1.5 rounded-full overflow-hidden" :class="isDark ? 'bg-white/10' : 'bg-gray-200'">
            <div class="h-full rounded-full bg-gradient-to-r" :class="barColorMap[p.color]" :style="{ width: p.percent + '%' }"></div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>