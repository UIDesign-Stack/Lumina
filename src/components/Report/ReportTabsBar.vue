<script setup>
import { ArrowUpTrayIcon, ChevronDownIcon } from '@heroicons/vue/24/outline'
import { useTheme } from '@/composables/useTheme'

defineProps({
  tabs: { type: Array, required: true },
  activeTab: { type: String, required: true },
})
defineEmits(['update:activeTab'])

const { isDark } = useTheme()
</script>

<template>
  <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 pb-4 border-b" :class="isDark ? 'border-white/10' : 'border-gray-200'">
    <div class="flex items-center gap-6 overflow-x-auto">
      <button
        v-for="tab in tabs"
        :key="tab"
        class="pb-3 lg:pb-0 text-sm font-medium whitespace-nowrap border-b-2 transition -mb-4 lg:mb-0 lg:border-b-0 flex-shrink-0"
        :class="activeTab === tab
          ? 'border-purple-500 text-purple-400'
          : (isDark ? 'border-transparent text-gray-400 hover:text-gray-200' : 'border-transparent text-gray-500 hover:text-gray-800')"
        @click="$emit('update:activeTab', tab)"
      >
        {{ tab }}
      </button>
    </div>

    <button
      class="flex items-center gap-2 px-3.5 py-2 rounded-xl border text-sm whitespace-nowrap flex-shrink-0 transition"
      :class="isDark ? 'border-white/10 text-gray-300 hover:bg-white/5' : 'border-gray-300 text-gray-700 hover:bg-gray-50'"
    >
      <ArrowUpTrayIcon class="w-4 h-4" />
      Export Laporan
      <ChevronDownIcon class="w-3.5 h-3.5 opacity-70" />
    </button>
  </div>
</template>