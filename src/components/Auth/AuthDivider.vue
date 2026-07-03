<script setup>
import { useTheme } from '@/composables/useTheme'

defineProps({
  label: { type: String, default: 'atau' },
})

const { isDark } = useTheme()
</script>

<template>
  <div class="flex items-center gap-4 my-6">
    <div class="flex-1 h-px" :class="isDark ? 'bg-white/10' : 'bg-gray-200'"></div>
    <span class="text-xs text-gray-500">{{ label }}</span>
    <div class="flex-1 h-px" :class="isDark ? 'bg-white/10' : 'bg-gray-200'"></div>
  </div>
</template>