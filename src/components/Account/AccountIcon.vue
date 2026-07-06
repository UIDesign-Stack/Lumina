<script setup>
import {
  BriefcaseIcon,
  BuildingLibraryIcon,
  DocumentTextIcon,
  ArchiveBoxIcon,
  MapIcon,
  ComputerDesktopIcon,
  CreditCardIcon,
} from '@heroicons/vue/24/outline'

defineProps({
  icon: { type: String, default: 'wallet' },
  color: { type: String, default: 'purple' },
  size: { type: String, default: 'md' }, // sm | md
})

const iconMap = {
  wallet: BriefcaseIcon,
  bank: BuildingLibraryIcon,
  receipt: DocumentTextIcon,
  box: ArchiveBoxIcon,
  land: MapIcon,
  device: ComputerDesktopIcon,
  card: CreditCardIcon,
}
const colorMap = {
  purple: 'bg-purple-500/15 text-purple-400',
  blue: 'bg-blue-500/15 text-blue-400',
  amber: 'bg-amber-500/15 text-amber-400',
  emerald: 'bg-emerald-500/15 text-emerald-400',
  rose: 'bg-rose-500/15 text-rose-400',
  indigo: 'bg-indigo-500/15 text-indigo-400',
}

// Warna default per jenis icon supaya konsisten dengan desain tanpa perlu prop color di tiap baris
const defaultColorByIcon = {
  wallet: 'purple',
  bank: 'blue',
  receipt: 'purple',
  box: 'amber',
  land: 'emerald',
  device: 'blue',
  card: 'rose',
}
</script>

<template>
  <div
    class="rounded-lg flex items-center justify-center flex-shrink-0"
    :class="[colorMap[defaultColorByIcon[icon] || color] || colorMap.purple, size === 'sm' ? 'w-9 h-9' : 'w-10 h-10']"
  >
    <component :is="iconMap[icon] || iconMap.wallet" :class="size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'" />
  </div>
</template>