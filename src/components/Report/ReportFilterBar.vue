<script setup>
import { CalendarDaysIcon } from '@heroicons/vue/24/outline'
import { useTheme } from '@/composables/useTheme'

defineProps({
  period: { type: String, required: true },
  compareValue: { type: String, required: true },
  compareOptions: { type: Array, required: true },
})
defineEmits(['update:compareValue'])

const { isDark } = useTheme()
</script>

<template>
  <div class="flex flex-col sm:flex-row sm:items-center gap-3">
    <button
      class="flex items-center gap-2 px-3.5 py-2 rounded-xl border text-sm whitespace-nowrap transition"
      :class="isDark ? 'border-white/10 bg-[#100c1c]/80 text-gray-300 hover:bg-white/5' : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'"
    >
      {{ period }}
      <CalendarDaysIcon class="w-4 h-4 text-gray-500" />
    </button>

    <div class="flex items-center gap-2">
      <span class="text-sm whitespace-nowrap" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Bandingkan dengan</span>
      <select
        :value="compareValue"
        class="border rounded-xl py-2 pl-3 pr-8 text-sm focus:outline-none transition"
        :class="isDark ? 'bg-[#100c1c]/80 border-white/10 text-gray-300' : 'bg-white border-gray-300 text-gray-700'"
        @change="$emit('update:compareValue', $event.target.value)"
      >
        <option v-for="opt in compareOptions" :key="opt" :value="opt">{{ opt }}</option>
      </select>
    </div>
  </div>
</template>