<script setup>
import { useTheme } from '@/composables/useTheme'

defineProps({
  activities: { type: Array, required: true },
})

const { isDark } = useTheme()
</script>

<template>
  <div class="rounded-2xl border p-5" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
    <div class="flex items-center justify-between mb-4">
      <p class="text-base font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">Aktivitas Terbaru</p>
      <a href="#" class="text-sm text-purple-400 hover:text-purple-300 transition">Lihat Semua</a>
    </div>

    <ul class="space-y-4">
      <li v-for="activity in activities" :key="activity.id" class="pb-4 border-b last:border-b-0 last:pb-0" :class="isDark ? 'border-white/5' : 'border-gray-100'">
        <p class="text-xs" :class="isDark ? 'text-gray-500' : 'text-gray-400'">{{ activity.time }}</p>
        <p class="text-sm font-medium mt-1" :class="isDark ? 'text-gray-200' : 'text-gray-800'">{{ activity.title }}</p>
        <p class="text-xs" :class="isDark ? 'text-gray-500' : 'text-gray-400'">{{ activity.voucherNo }}</p>
        <p class="text-sm font-medium mt-0.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">{{ activity.amount }}</p>
      </li>
    </ul>
  </div>
</template>