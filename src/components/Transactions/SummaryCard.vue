<script setup>
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/vue/24/solid'
import {
  BriefcaseIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  InformationCircleIcon,
} from '@heroicons/vue/24/outline'
import { useTheme } from '@/composables/useTheme'

const props = defineProps({
  label: { type: String, required: true },
  value: { type: String, required: true },
  change: { type: String, default: null },
  changeLabel: { type: String, default: '' },
  trend: { type: String, default: null },
  icon: { type: String, default: 'wallet' },
  hasInfo: { type: Boolean, default: false },
})

const { isDark } = useTheme()

const iconMap = {
  wallet: BriefcaseIcon,
  calendar: CalendarDaysIcon,
  check: CheckCircleIcon,
}
</script>

<template>
  <div class="rounded-2xl border p-5 transition" :class="isDark ? 'bg-[#100c1c]/80 border-white/10 hover:border-white/20' : 'bg-white border-gray-200 hover:border-gray-300'">
    <div class="flex items-start justify-between mb-4">
      <p class="flex items-center gap-1.5 text-sm font-medium text-emerald-400">
        {{ label }}
        <InformationCircleIcon v-if="hasInfo" class="w-3.5 h-3.5 text-gray-500" />
      </p>
      <div class="w-9 h-9 rounded-lg bg-emerald-500/15 flex items-center justify-center flex-shrink-0">
        <component :is="iconMap[icon]" class="w-5 h-5 text-emerald-400" />
      </div>
    </div>

    <p class="text-2xl font-bold mb-1.5" :class="isDark ? 'text-white' : 'text-gray-900'">{{ value }}</p>

    <p class="flex items-center gap-1 text-xs" :class="isDark ? 'text-gray-400' : 'text-gray-500'">
      <template v-if="trend">
        <ArrowUpIcon v-if="trend === 'up'" class="w-3 h-3 text-emerald-400" />
        <ArrowDownIcon v-else class="w-3 h-3 text-rose-400" />
        <span class="text-emerald-400 font-medium">{{ change }}</span>
      </template>
      {{ changeLabel }}
    </p>
  </div>
</template>