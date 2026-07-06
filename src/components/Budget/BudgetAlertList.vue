<script setup>
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'
import { useTheme } from '@/composables/useTheme'

defineProps({
  alerts: { type: Array, required: true },
})

const { isDark } = useTheme()

const levelStyles = {
  danger: { iconBg: 'bg-rose-500/15 text-rose-400', badge: 'bg-rose-500/15 text-rose-400' },
  warning: { iconBg: 'bg-amber-500/15 text-amber-400', badge: 'bg-amber-500/15 text-amber-400' },
  caution: { iconBg: 'bg-yellow-500/15 text-yellow-400', badge: 'bg-yellow-500/15 text-yellow-400' },
}
</script>

<template>
  <div class="rounded-2xl border p-5" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
    <div class="flex items-center justify-between mb-4">
      <p class="text-base font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">Anggaran Mendekati Batas</p>
      <a href="#" class="text-sm text-purple-400 hover:text-purple-300 transition">Lihat Semua</a>
    </div>

    <ul class="space-y-3">
      <li v-for="alert in alerts" :key="alert.key" class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" :class="levelStyles[alert.severity].iconBg">
          <ExclamationTriangleIcon class="w-5 h-5" />
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium truncate" :class="isDark ? 'text-gray-200' : 'text-gray-800'">{{ alert.name }}</p>
          <p class="text-xs" :class="isDark ? 'text-gray-500' : 'text-gray-400'">{{ alert.subtitle }}</p>
        </div>
        <span class="px-2.5 py-1 rounded-full text-xs font-semibold flex-shrink-0" :class="levelStyles[alert.severity].badge">{{ alert.percent }}%</span>
      </li>
    </ul>
  </div>
</template>