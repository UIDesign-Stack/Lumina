<script setup>
import { BuildingLibraryIcon } from '@heroicons/vue/24/solid'

defineProps({
  logo: { type: String, default: '' },
  color: { type: String, default: 'blue' },
  size: { type: String, default: 'md' },
})

const colorMap = {
  orange: 'bg-orange-500',
  blue: 'bg-blue-500',
  amber: 'bg-amber-500',
  purple: 'bg-purple-500',
  teal: 'bg-teal-500',
  sky: 'bg-sky-500',
}
</script>

<template>
  <div
    class="rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold"
    :class="[colorMap[color] || 'bg-gray-500', size === 'sm' ? 'w-9 h-9 text-xs' : 'w-11 h-11 text-sm']"
  >
    <span v-if="logo === 'BNI'">N</span>
    <span v-else-if="logo === 'BCA'"><BuildingLibraryIcon class="w-5 h-5" /></span>
    <span v-else-if="logo === 'Mandiri'">M</span>
    <span v-else-if="logo === 'OVO'">O</span>
    <span v-else-if="logo === 'BRI'"><BuildingLibraryIcon class="w-5 h-5" /></span>
    <span v-else-if="logo === 'GoPay'"><BuildingLibraryIcon class="w-5 h-5" /></span>
    <BuildingLibraryIcon v-else class="w-5 h-5" />
  </div>
</template>