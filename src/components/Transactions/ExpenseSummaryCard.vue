<script setup>
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/vue/24/solid'
import {
  BriefcaseIcon,
  CalendarDaysIcon,
  DocumentTextIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/vue/24/outline'
import { useTheme } from '@/composables/useTheme'

const props = defineProps({
  label: { type: String, required: true },
  value: { type: String, required: true },
  change: { type: String, default: null },
  changeLabel: { type: String, default: '' },
  trend: { type: String, default: null },
  icon: { type: String, default: 'wallet' },
  color: { type: String, default: 'rose' },
  highlight: { type: String, default: null }, 
})

const { isDark } = useTheme()

const iconMap = { wallet: BriefcaseIcon, calendar: CalendarDaysIcon, document: DocumentTextIcon, trend: ArrowTrendingUpIcon }
const colorMap = {
  rose: { text: 'text-rose-400', iconBg: 'bg-rose-500/15', iconText: 'text-rose-400' },
  purple: { text: 'text-purple-400', iconBg: 'bg-purple-500/15', iconText: 'text-purple-400' },
  blue: { text: 'text-blue-400', iconBg: 'bg-blue-500/15', iconText: 'text-blue-400' },
  amber: { text: 'text-amber-400', iconBg: 'bg-amber-500/15', iconText: 'text-amber-400' },
}
</script>

<template>
  <div class="rounded-2xl border p-5 transition" :class="isDark ? 'bg-[#100c1c]/80 border-white/10 hover:border-white/20' : 'bg-white border-gray-200 hover:border-gray-300'">
    <div class="flex items-start justify-between mb-4">
      <p class="text-sm font-medium" :class="colorMap[color].text">{{ label }}</p>
      <div class="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" :class="colorMap[color].iconBg">
        <component :is="iconMap[icon]" class="w-5 h-5" :class="colorMap[color].iconText" />
      </div>
    </div>

    <p class="text-2xl font-bold mb-1.5" :class="isDark ? 'text-white' : 'text-gray-900'">{{ value }}</p>

    <p v-if="highlight" class="text-sm font-medium" :class="colorMap[color].text">{{ highlight }}</p>
    <p v-else class="flex items-center gap-1 text-xs" :class="isDark ? 'text-gray-400' : 'text-gray-500'">
      <template v-if="trend">
        <ArrowUpIcon v-if="trend === 'up'" class="w-3 h-3 text-rose-400" />
        <ArrowDownIcon v-else class="w-3 h-3 text-emerald-400" />
        <span :class="trend === 'up' ? 'text-rose-400' : 'text-emerald-400'" class="font-medium">{{ change }}</span>
      </template>
      {{ changeLabel }}
    </p>
  </div>
</template>