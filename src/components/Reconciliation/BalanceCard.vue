<script setup>
import { ChartBarIcon, BuildingLibraryIcon, ExclamationTriangleIcon } from '@heroicons/vue/24/outline'
import { useTheme } from '@/composables/useTheme'

defineProps({
  label: { type: String, required: true },
  value: { type: String, required: true },
  note: { type: String, required: true },
  icon: { type: String, default: 'chart' },
  color: { type: String, default: 'teal' },
})

const { isDark } = useTheme()
const iconMap = { chart: ChartBarIcon, bank: BuildingLibraryIcon, warning: ExclamationTriangleIcon }
const colorMap = {
  teal: 'bg-teal-500/15 text-teal-400',
  blue: 'bg-blue-500/15 text-blue-400',
  amber: 'bg-amber-500/15 text-amber-400',
}
</script>

<template>
  <div class="rounded-2xl border p-5 flex items-center gap-4" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
    <div class="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" :class="colorMap[color]">
      <component :is="iconMap[icon]" class="w-5 h-5" />
    </div>
    <div class="min-w-0">
      <p class="text-sm" :class="isDark ? 'text-gray-400' : 'text-gray-500'">{{ label }}</p>
      <p class="text-lg font-bold truncate" :class="isDark ? 'text-white' : 'text-gray-900'">{{ value }}</p>
      <p class="text-xs" :class="isDark ? 'text-gray-500' : 'text-gray-400'">{{ note }}</p>
    </div>
  </div>
</template>