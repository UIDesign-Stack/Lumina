<script setup>
import { Squares2X2Icon, CheckCircleIcon, ClockIcon, NoSymbolIcon } from '@heroicons/vue/24/outline'
import { useTheme } from '@/composables/useTheme'

defineProps({
  label: { type: String, required: true },
  value: { type: String, required: true },
  note: { type: String, required: true },
  icon: { type: String, default: 'grid' },
  color: { type: String, default: 'purple' },
})

const { isDark } = useTheme()

const iconMap = { grid: Squares2X2Icon, check: CheckCircleIcon, clock: ClockIcon, ban: NoSymbolIcon }
const colorMap = {
  purple: 'bg-purple-500/15 text-purple-400',
  emerald: 'bg-emerald-500/15 text-emerald-400',
  amber: 'bg-amber-500/15 text-amber-400',
  gray: 'bg-gray-500/15 text-gray-400',
}
</script>

<template>
  <div class="rounded-2xl border p-5 transition" :class="isDark ? 'bg-[#100c1c]/80 border-white/10 hover:border-white/20' : 'bg-white border-gray-200 hover:border-gray-300'">
    <div class="w-10 h-10 rounded-xl flex items-center justify-center mb-3" :class="colorMap[color]">
      <component :is="iconMap[icon]" class="w-5 h-5" />
    </div>
    <p class="text-2xl font-bold mb-1" :class="isDark ? 'text-white' : 'text-gray-900'">{{ value }}</p>
    <p class="text-sm font-medium" :class="isDark ? 'text-gray-200' : 'text-gray-800'">{{ label }}</p>
    <p class="text-xs mt-0.5" :class="isDark ? 'text-gray-500' : 'text-gray-400'">{{ note }}</p>
  </div>
</template>