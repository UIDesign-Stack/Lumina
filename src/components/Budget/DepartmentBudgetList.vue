<script setup>
import {
  BuildingOffice2Icon,
  MegaphoneIcon,
  UsersIcon,
  ServerIcon,
  BuildingLibraryIcon,
  EllipsisHorizontalCircleIcon,
} from '@heroicons/vue/24/outline'
import { useTheme } from '@/composables/useTheme'

defineProps({
  departments: { type: Array, required: true }, // [{ key, name, amount, percent, icon, color }]
})

const { isDark } = useTheme()

const iconMap = {
  building: BuildingOffice2Icon,
  megaphone: MegaphoneIcon,
  users: UsersIcon,
  server: ServerIcon,
  bank: BuildingLibraryIcon,
  dots: EllipsisHorizontalCircleIcon,
}
const colorMap = {
  purple: 'bg-purple-500/15 text-purple-400',
  pink: 'bg-pink-500/15 text-pink-400',
  blue: 'bg-blue-500/15 text-blue-400',
  indigo: 'bg-indigo-500/15 text-indigo-400',
  teal: 'bg-teal-500/15 text-teal-400',
  gray: 'bg-gray-500/15 text-gray-400',
}
</script>

<template>
  <div class="rounded-2xl border p-5" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
    <div class="flex items-center justify-between mb-4">
      <p class="text-base font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">Anggaran per Departemen</p>
      <a href="#" class="text-sm text-purple-400 hover:text-purple-300 transition">Lihat Semua</a>
    </div>

    <ul class="space-y-4">
      <li v-for="dept in departments" :key="dept.key" class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" :class="colorMap[dept.color]">
          <component :is="iconMap[dept.icon]" class="w-4.5 h-4.5" />
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between mb-1.5">
            <p class="text-sm font-medium truncate" :class="isDark ? 'text-gray-200' : 'text-gray-800'">{{ dept.name }}</p>
            <span class="text-xs flex-shrink-0 ml-2" :class="isDark ? 'text-gray-500' : 'text-gray-400'">{{ dept.amount }}</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="flex-1 h-1.5 rounded-full overflow-hidden" :class="isDark ? 'bg-white/10' : 'bg-gray-200'">
              <div class="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" :style="{ width: dept.percent + '%' }"></div>
            </div>
            <span class="text-xs font-medium w-8 flex-shrink-0 text-right" :class="isDark ? 'text-gray-400' : 'text-gray-500'">{{ dept.percent }}%</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>