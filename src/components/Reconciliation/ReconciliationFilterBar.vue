<script setup>
import { CalendarDaysIcon, ChevronDownIcon } from '@heroicons/vue/24/outline'
import { useTheme } from '@/composables/useTheme'

defineProps({
  period: { type: String, required: true },
})

const { isDark } = useTheme()
</script>

<template>
  <div class="flex flex-wrap items-center gap-3 mb-6">
    <button
      class="flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm transition"
      :class="isDark ? 'border-white/10 bg-[#100c1c]/80 text-gray-300 hover:bg-white/5' : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'"
    >
      Semua Rekening
      <ChevronDownIcon class="w-4 h-4 text-gray-500" />
    </button>

    <button
      class="flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm transition"
      :class="isDark ? 'border-white/10 bg-[#100c1c]/80 text-gray-300 hover:bg-white/5' : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'"
    >
      {{ period }}
      <CalendarDaysIcon class="w-4 h-4 text-gray-500" />
    </button>
  </div>
</template>