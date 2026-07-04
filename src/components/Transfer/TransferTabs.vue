<script setup>
import { useTheme } from '@/composables/useTheme'

defineProps({
  tabs: { type: Array, required: true },
  activeTab: { type: String, required: true },
})
defineEmits(['update:activeTab'])

const { isDark } = useTheme()
</script>

<template>
  <div class="flex items-center gap-6 border-b overflow-x-auto" :class="isDark ? 'border-white/10' : 'border-gray-200'">
    <button
      v-for="tab in tabs"
      :key="tab"
      class="pb-3 text-sm font-medium whitespace-nowrap border-b-2 transition -mb-px"
      :class="activeTab === tab
        ? 'border-purple-500 text-purple-400'
        : (isDark ? 'border-transparent text-gray-400 hover:text-gray-200' : 'border-transparent text-gray-500 hover:text-gray-800')"
      @click="$emit('update:activeTab', tab)"
    >
      {{ tab }}
    </button>
  </div>
</template>