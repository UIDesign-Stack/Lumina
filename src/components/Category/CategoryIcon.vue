<script setup>
import {
  BriefcaseIcon,
  MegaphoneIcon,
  UsersIcon,
  ChatBubbleLeftRightIcon,
  BuildingLibraryIcon,
  TruckIcon,
  CakeIcon,
  WrenchScrewdriverIcon,
  EllipsisHorizontalCircleIcon,
} from '@heroicons/vue/24/outline'

defineProps({
  icon: { type: String, default: 'dots' },
  color: { type: String, default: 'purple' },
  size: { type: String, default: 'md' }, // sm | md
})

const iconMap = {
  wallet: BriefcaseIcon,
  megaphone: MegaphoneIcon,
  users: UsersIcon,
  chat: ChatBubbleLeftRightIcon,
  bank: BuildingLibraryIcon,
  car: TruckIcon,
  coffee: CakeIcon,
  wrench: WrenchScrewdriverIcon,
  dots: EllipsisHorizontalCircleIcon,
}
const colorMap = {
  purple: 'bg-purple-500/15 text-purple-400',
  indigo: 'bg-indigo-500/15 text-indigo-400',
  amber: 'bg-amber-500/15 text-amber-400',
  blue: 'bg-blue-500/15 text-blue-400',
  emerald: 'bg-emerald-500/15 text-emerald-400',
  pink: 'bg-pink-500/15 text-pink-400',
  gray: 'bg-gray-500/15 text-gray-400',
}
</script>

<template>
  <div
    class="rounded-lg flex items-center justify-center flex-shrink-0"
    :class="[colorMap[color] || colorMap.gray, size === 'sm' ? 'w-9 h-9' : 'w-10 h-10']"
  >
    <component :is="iconMap[icon] || iconMap.dots" :class="size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'" />
  </div>
</template>