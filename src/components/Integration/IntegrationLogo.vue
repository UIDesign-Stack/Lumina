<script setup>
import {
  BanknotesIcon,
  TableCellsIcon,
  FolderIcon,
  EnvelopeIcon,
  BuildingLibraryIcon,
  CalculatorIcon,
} from '@heroicons/vue/24/solid'

defineProps({
  logo: { type: String, default: '' },
  color: { type: String, default: 'purple' },
})

const colorMap = {
  emerald: 'bg-emerald-500',
  blue: 'bg-blue-500',
  amber: 'bg-amber-500',
  sky: 'bg-sky-500',
  purple: 'bg-purple-500',
}

const iconMap = {
  qb: BanknotesIcon,
  xl: TableCellsIcon,
  gd: FolderIcon,
  mc: EnvelopeIcon,
  bca: BuildingLibraryIcon,
  xero: CalculatorIcon,
}
</script>

<template>
  <div
    class="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 text-white"
    :class="colorMap[color] || colorMap.purple"
  >
    <component :is="iconMap[logo] || BanknotesIcon" class="w-5 h-5" />
  </div>
</template>