<script setup>
import {
  CalendarDaysIcon,
  CalendarIcon,
  ChartBarSquareIcon,
  ClockIcon,
} from '@heroicons/vue/24/outline'
import { useTheme } from '@/composables/useTheme'

defineProps({
  items: { type: Array, required: true }, // [{ label, value, icon, color, progress? }]
})

const { isDark } = useTheme()

const iconMap = {
  week: CalendarDaysIcon,
  month: CalendarIcon,
  year: ChartBarSquareIcon,
  remaining: ClockIcon,
}

const colorMap = {
  purple: 'bg-purple-500/15 text-purple-400',
  blue: 'bg-blue-500/15 text-blue-400',
  amber: 'bg-amber-500/15 text-amber-400',
  rose: 'bg-rose-500/15 text-rose-400',
}
</script>

<template>
  <div class="rounded-2xl border p-5" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
    <p class="text-sm font-semibold mb-4" :class="isDark ? 'text-white' : 'text-gray-900'">Ringkasan Pengeluaran</p>

    <ul class="space-y-4">
      <li v-for="item in items" :key="item.label">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" :class="colorMap[item.color] || colorMap.purple">
            <component :is="iconMap[item.icon] || CalendarDaysIcon" class="w-4.5 h-4.5" />
          </div>
          <p class="flex-1 text-sm" :class="isDark ? 'text-gray-300' : 'text-gray-600'">{{ item.label }}</p>
          <p class="text-sm font-medium flex items-center gap-2" :class="isDark ? 'text-gray-200' : 'text-gray-800'">
            {{ item.value }}
            <span v-if="item.progress !== undefined" class="text-rose-400 text-xs font-semibold">{{ item.progress }}%</span>
          </p>
        </div>

        <!-- Progress bar untuk item Sisa Anggaran -->
        <div v-if="item.progress !== undefined" class="h-1.5 rounded-full mt-2 ml-12 overflow-hidden" :class="isDark ? 'bg-white/10' : 'bg-gray-200'">
          <div class="h-full rounded-full bg-gradient-to-r from-rose-500 to-orange-400" :style="{ width: item.progress + '%' }"></div>
        </div>
      </li>
    </ul>
  </div>
</template>