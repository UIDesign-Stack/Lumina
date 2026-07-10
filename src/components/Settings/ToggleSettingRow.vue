<script setup>
import {
  MoonIcon,
  BookOpenIcon,
  InformationCircleIcon,
  SparklesIcon,
  EnvelopeIcon,
  BanknotesIcon,
  BellIcon,
  CalendarDaysIcon,
} from '@heroicons/vue/24/outline'
import { useTheme } from '@/composables/useTheme'

const props = defineProps({
  icon: { type: String, default: 'info' },
  label: { type: String, required: true },
  description: { type: String, required: true },
  modelValue: { type: Boolean, required: true },
})
defineEmits(['update:modelValue'])

const { isDark } = useTheme()

const iconMap = {
  moon: MoonIcon,
  book: BookOpenIcon,
  info: InformationCircleIcon,
  sparkles: SparklesIcon,
  mail: EnvelopeIcon,
  wallet: BanknotesIcon,
  bell: BellIcon,
  calendar: CalendarDaysIcon,
}
</script>

<template>
  <div class="flex items-center gap-3 py-4">
    <div class="w-10 h-10 rounded-xl bg-purple-500/15 flex items-center justify-center flex-shrink-0">
      <component :is="iconMap[icon] || iconMap.info" class="w-5 h-5 text-purple-400" />
    </div>
    <div class="flex-1 min-w-0">
      <p class="text-sm font-medium" :class="isDark ? 'text-white' : 'text-gray-900'">{{ label }}</p>
      <p class="text-xs mt-0.5" :class="isDark ? 'text-gray-400' : 'text-gray-500'">{{ description }}</p>
    </div>
    <button
      type="button"
      class="relative w-11 h-6 rounded-full transition-colors flex-shrink-0"
      :class="modelValue ? 'bg-purple-600' : (isDark ? 'bg-white/10' : 'bg-gray-300')"
      @click="$emit('update:modelValue', !modelValue)"
    >
      <span
        class="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform"
        :class="modelValue ? 'translate-x-5' : 'translate-x-0'"
      ></span>
    </button>
  </div>
</template>