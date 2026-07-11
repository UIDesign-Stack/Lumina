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
  red: 'bg-red-500/15 text-red-300',
  pink: 'bg-pink-500/15 text-pink-300',
  sky: 'bg-sky-500/15 text-sky-300',
  gray: 'bg-gray-500/15 text-gray-300',
  emerald: 'bg-emerald-500/15 text-emerald-300',
  amber: 'bg-amber-500/15 text-amber-300',
  teal: 'bg-teal-500/15 text-teal-300',
  indigo: 'bg-indigo-500/15 text-indigo-300',
}

const colorMapLight = {
  purple: 'bg-purple-100 text-purple-600',
  blue: 'bg-blue-100 text-blue-600',
  red: 'bg-red-100 text-red-600',
  pink: 'bg-pink-100 text-pink-600',
  sky: 'bg-sky-100 text-sky-600',
  gray: 'bg-gray-100 text-gray-600',
  emerald: 'bg-emerald-100 text-emerald-600',
  amber: 'bg-amber-100 text-amber-600',
  teal: 'bg-teal-100 text-teal-600',
  indigo: 'bg-indigo-100 text-indigo-600',
}
</script>

<template>
  <span
    class="inline-block text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap"
    :class="isDark ? (colorMap[color] || colorMap.gray) : (colorMapLight[color] || colorMapLight.gray)"
  >
    {{ label }}
  </span>
</template>