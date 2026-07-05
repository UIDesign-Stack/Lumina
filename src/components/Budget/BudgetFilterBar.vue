<script setup>
import { CalendarDaysIcon, FunnelIcon } from '@heroicons/vue/24/outline'
import { useTheme } from '@/composables/useTheme'

defineProps({
  year: { type: String, required: true },
})

const { isDark } = useTheme()
</script>

<template>
  <div class="flex items-center gap-2 flex-shrink-0">
    <button
      class="flex items-center gap-2 px-3.5 py-2 rounded-xl border text-sm whitespace-nowrap transition"
      :class="isDark ? 'border-white/10 bg-[#100c1c]/80 text-gray-300 hover:bg-white/5' : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'"
    >
      {{ year }}
      <CalendarDaysIcon class="w-4 h-4 text-gray-500" />
    </button>
    <button
      class="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-sm whitespace-nowrap transition"
      :class="isDark ? 'border-white/10 bg-[#100c1c]/80 text-gray-300 hover:bg-white/5' : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'"
    >
      <FunnelIcon class="w-4 h-4" />
      Filter
    </button>
  </div>
</template>