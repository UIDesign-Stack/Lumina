<script setup>
import { CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/vue/24/solid'
import IntegrationLogo from './IntegrationLogo.vue'
import { useTheme } from '@/composables/useTheme'

defineProps({
  activities: { type: Array, required: true },
})

const { isDark } = useTheme()
</script>

<template>
  <div class="rounded-2xl border p-5" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
    <div class="flex items-center justify-between mb-4">
      <p class="text-base font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">Aktivitas Integrasi Terbaru</p>
      <a href="#" class="text-sm text-purple-400 hover:text-purple-300 transition">Lihat Semua</a>
    </div>

    <ul class="space-y-3.5">
      <li v-for="activity in activities" :key="activity.key" class="flex items-start gap-3">
        <IntegrationLogo :logo="activity.logo" :color="activity.color" />
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium truncate" :class="isDark ? 'text-gray-200' : 'text-gray-800'">{{ activity.title }}</p>
          <p class="text-xs truncate" :class="isDark ? 'text-gray-500' : 'text-gray-400'">{{ activity.description }}</p>
          <p class="text-xs mt-0.5" :class="isDark ? 'text-gray-500' : 'text-gray-400'">{{ activity.date }}</p>
        </div>
        <CheckCircleIcon v-if="activity.status === 'success'" class="w-5 h-5 text-emerald-400 flex-shrink-0" />
        <ExclamationTriangleIcon v-else class="w-5 h-5 text-amber-400 flex-shrink-0" />
      </li>
    </ul>
  </div>
</template>