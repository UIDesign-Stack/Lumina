<script setup>
import { BanknotesIcon, ChartBarIcon, ChartPieIcon, ArrowTrendingUpIcon, CheckCircleIcon, CurrencyDollarIcon, ClockIcon, FolderIcon, UsersIcon } from '@heroicons/vue/24/outline'
import { useTheme } from '@/composables/useTheme'

defineProps({
  label: { type: String, required: true },
  value: { type: String, required: true },
  note: { type: String, required: true },
  icon: { type: String, default: 'wallet' }, // wallet | chart | pie | trend | check | dollar | clock
  color: { type: String, default: 'purple' }, // purple | blue | pink | emerald | indigo
})

const { isDark } = useTheme()

const iconMap = { wallet: BanknotesIcon, chart: ChartBarIcon, pie: ChartPieIcon, trend: ArrowTrendingUpIcon, check: CheckCircleIcon, dollar: CurrencyDollarIcon, clock: ClockIcon, folder: FolderIcon, users: UsersIcon }
const colorMap = {
  purple: { text: 'text-purple-400', iconBg: 'bg-purple-500/15', iconText: 'text-purple-400' },
  blue: { text: 'text-blue-400', iconBg: 'bg-blue-500/15', iconText: 'text-blue-400' },
  pink: { text: 'text-pink-400', iconBg: 'bg-pink-500/15', iconText: 'text-pink-400' },
  emerald: { text: 'text-emerald-400', iconBg: 'bg-emerald-500/15', iconText: 'text-emerald-400' },
  indigo: { text: 'text-indigo-400', iconBg: 'bg-indigo-500/15', iconText: 'text-indigo-400' },
}
</script>

<template>
  <div class="rounded-2xl border p-5 flex items-center gap-4 transition" :class="isDark ? 'bg-[#100c1c]/80 border-white/10 hover:border-white/20' : 'bg-white border-gray-200 hover:border-gray-300'">
    <div class="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" :class="colorMap[color].iconBg">
      <component :is="iconMap[icon]" class="w-5 h-5" :class="colorMap[color].iconText" />
    </div>
    <div class="min-w-0">
      <p class="text-sm font-medium truncate" :class="colorMap[color].text">{{ label }}</p>
      <p class="text-xl font-bold truncate" :class="isDark ? 'text-white' : 'text-gray-900'">{{ value }}</p>
      <p class="text-xs truncate" :class="isDark ? 'text-gray-500' : 'text-gray-400'">{{ note }}</p>
    </div>
  </div>
</template>