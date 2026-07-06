<script setup>
import {
  ShoppingCartIcon,
  UserIcon,
  BuildingOfficeIcon,
  MegaphoneIcon,
  ComputerDesktopIcon,
} from '@heroicons/vue/24/outline'
import { useTheme } from '@/composables/useTheme'

defineProps({
  expenses: { type: Array, required: true },
})

const { isDark } = useTheme()

const iconMap = {
  cart: ShoppingCartIcon,
  user: UserIcon,
  building: BuildingOfficeIcon,
  megaphone: MegaphoneIcon,
  device: ComputerDesktopIcon,
}

const colorMap = {
  rose: 'bg-rose-500/15 text-rose-400',
  blue: 'bg-blue-500/15 text-blue-400',
  amber: 'bg-amber-500/15 text-amber-400',
  purple: 'bg-purple-500/15 text-purple-400',
  emerald: 'bg-emerald-500/15 text-emerald-400',
}
</script>

<template>
  <div class="rounded-2xl border p-5" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
    <div class="flex items-center justify-between mb-4">
      <p class="text-sm font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">Pengeluaran Terbesar</p>
      <a href="#" class="text-xs text-purple-400 hover:text-purple-300 transition">Lihat semua</a>
    </div>

    <ul class="space-y-3">
      <li v-for="(item, idx) in expenses" :key="idx" class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" :class="colorMap[item.color] || colorMap.rose">
          <component :is="iconMap[item.icon] || ShoppingCartIcon" class="w-4.5 h-4.5" />
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium truncate" :class="isDark ? 'text-gray-200' : 'text-gray-800'">{{ item.description }}</p>
          <p class="text-xs truncate" :class="isDark ? 'text-gray-500' : 'text-gray-400'">{{ item.category }}</p>
        </div>
        <div class="text-right flex-shrink-0">
          <p class="text-sm font-medium" :class="isDark ? 'text-gray-200' : 'text-gray-800'">{{ item.amount }}</p>
          <p class="text-xs" :class="isDark ? 'text-gray-500' : 'text-gray-400'">{{ item.date }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>