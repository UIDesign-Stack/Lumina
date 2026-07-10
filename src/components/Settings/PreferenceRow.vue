<script setup>
import {
  BanknotesIcon,
  HashtagIcon,
  ClockIcon,
  CalendarDaysIcon,
  ListBulletIcon,
  GlobeAltIcon,
} from '@heroicons/vue/24/outline'
import { useTheme } from '@/composables/useTheme'

defineProps({
  icon: { type: String, default: 'hash' },
  label: { type: String, required: true },
  description: { type: String, required: true },
  modelValue: { type: String, required: true },
  options: { type: Array, required: true },
})
defineEmits(['update:modelValue'])

const { isDark } = useTheme()

const iconMap = {
  currency: BanknotesIcon,
  hash: HashtagIcon,
  clock: ClockIcon,
  calendar: CalendarDaysIcon,
  list: ListBulletIcon,
  globe: GlobeAltIcon,
}
</script>

<template>
  <div class="flex flex-col sm:flex-row sm:items-center gap-3 py-4">
    <div class="flex items-start gap-3 flex-1 min-w-0">
      <div class="w-10 h-10 rounded-xl bg-purple-500/15 flex items-center justify-center flex-shrink-0">
        <component :is="iconMap[icon] || iconMap.hash" class="w-5 h-5 text-purple-400" />
      </div>
      <div class="min-w-0">
        <p class="text-sm font-medium" :class="isDark ? 'text-white' : 'text-gray-900'">{{ label }}</p>
        <p class="text-xs mt-0.5" :class="isDark ? 'text-gray-400' : 'text-gray-500'">{{ description }}</p>
      </div>
    </div>

    <select
      :value="modelValue"
      class="w-full sm:w-64 border rounded-xl py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition flex-shrink-0"
      :class="isDark ? 'bg-[#181428]/80 border-white/10 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <option v-for="opt in options" :key="opt" :value="opt">{{ opt }}</option>
    </select>
  </div>
</template>