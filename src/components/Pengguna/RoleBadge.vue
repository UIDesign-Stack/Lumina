<script setup>
import { useTheme } from '@/composables/useTheme'

defineProps({
  label: { type: String, required: true },
  color: { type: String, default: 'gray' },
})

const { isDark } = useTheme()

const colorMap = {
  purple: 'bg-purple-500/15 text-purple-300',
  blue: 'bg-blue-500/15 text-blue-300',
  teal: 'bg-teal-500/15 text-teal-300',
  gray: 'bg-gray-500/15 text-gray-300',
  pink: 'bg-pink-500/15 text-pink-300',
}

const colorMapLight = {
  purple: 'bg-purple-100 text-purple-600',
  blue: 'bg-blue-100 text-blue-600',
  teal: 'bg-teal-100 text-teal-600',
  gray: 'bg-gray-100 text-gray-600',
  pink: 'bg-pink-100 text-pink-600',
}
</script>

<template>
  <span
    class="inline-block text-xs font-medium px-2.5 py-1 rounded-full"
    :class="isDark ? (colorMap[color] || colorMap.gray) : (colorMapLight[color] || colorMapLight.gray)"
  >
    {{ label }}
  </span>
</template>