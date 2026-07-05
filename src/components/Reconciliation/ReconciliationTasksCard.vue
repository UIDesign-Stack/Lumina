<script setup>
import {
  ExclamationTriangleIcon,
  LinkIcon,
  ArrowUpTrayIcon,
  CheckCircleIcon,
  ChevronRightIcon,
} from '@heroicons/vue/24/outline'
import { CheckCircleIcon as CheckCircleSolidIcon } from '@heroicons/vue/24/solid'
import { useTheme } from '@/composables/useTheme'

defineProps({
  tasks: { type: Array, required: true },
})

const { isDark } = useTheme()

const iconMap = { warning: ExclamationTriangleIcon, link: LinkIcon, upload: ArrowUpTrayIcon }
const colorMap = {
  amber: 'bg-amber-500/15 text-amber-400',
  blue: 'bg-blue-500/15 text-blue-400',
  emerald: 'bg-emerald-500/15 text-emerald-400',
}
</script>

<template>
  <div class="rounded-2xl border p-5" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
    <div class="flex items-center justify-between mb-4">
      <p class="text-base font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">Tugas Rekonsiliasi</p>
      <a href="#" class="text-sm text-purple-400 hover:text-purple-300 transition">Lihat Semua</a>
    </div>

    <ul class="space-y-3">
      <li v-for="task in tasks" :key="task.id" class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" :class="colorMap[task.color]">
          <component :is="iconMap[task.icon]" class="w-5 h-5" />
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium truncate" :class="isDark ? 'text-gray-200' : 'text-gray-800'">{{ task.title }}</p>
          <p class="text-xs truncate" :class="isDark ? 'text-gray-500' : 'text-gray-400'">{{ task.subtitle }}</p>
        </div>
        <CheckCircleSolidIcon v-if="task.done" class="w-5 h-5 text-emerald-400 flex-shrink-0" />
        <ChevronRightIcon v-else class="w-4 h-4 text-gray-500 flex-shrink-0" />
      </li>
    </ul>
  </div>
</template>