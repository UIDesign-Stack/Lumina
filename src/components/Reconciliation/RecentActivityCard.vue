<script setup>
import {
  ArrowUpTrayIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ArrowPathIcon,
} from '@heroicons/vue/24/outline'
import { useTheme } from '@/composables/useTheme'

defineProps({
  activities: { type: Array, required: true },
})

const { isDark } = useTheme()

const iconMap = { upload: ArrowUpTrayIcon, document: DocumentTextIcon, check: CheckCircleIcon, refresh: ArrowPathIcon }
</script>

<template>
  <div class="rounded-2xl border p-5" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
    <div class="flex items-center justify-between mb-4">
      <p class="text-base font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">Aktivitas Terakhir</p>
      <a href="#" class="text-sm text-purple-400 hover:text-purple-300 transition">Lihat Semua</a>
    </div>

    <ul class="space-y-3.5">
      <li v-for="activity in activities" :key="activity.id" class="flex items-start gap-3">
        <div class="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" :class="isDark ? 'bg-white/5' : 'bg-gray-100'">
          <component :is="iconMap[activity.icon]" class="w-4.5 h-4.5" :class="isDark ? 'text-gray-400' : 'text-gray-500'" />
        </div>
        <div class="min-w-0">
          <p class="text-sm" :class="isDark ? 'text-gray-200' : 'text-gray-800'">{{ activity.text }}</p>
          <p class="text-xs mt-0.5" :class="isDark ? 'text-gray-500' : 'text-gray-400'">{{ activity.time }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>