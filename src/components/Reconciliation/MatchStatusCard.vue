<script setup>
import { computed } from 'vue'
import { useTheme } from '@/composables/useTheme'

const props = defineProps({
  percent: { type: Number, required: true },
  matched: { type: Number, required: true },
  discrepancy: { type: Number, required: true },
  unmatched: { type: Number, required: true },
})

const { isDark } = useTheme()

const radius = 32
const circumference = 2 * Math.PI * radius
const dashOffset = computed(() => circumference * (1 - props.percent / 100))
</script>

<template>
  <div class="rounded-2xl border p-5 flex items-center gap-4" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
    <div>
      <p class="text-sm mb-3" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Status Rekonsiliasi</p>
      <div class="relative w-20 h-20">
        <svg viewBox="0 0 80 80" class="w-20 h-20 -rotate-90">
          <circle cx="40" cy="40" :r="radius" fill="none" :stroke="isDark ? 'rgba(255,255,255,0.08)' : '#e5e7eb'" stroke-width="8" />
          <circle
            cx="40" cy="40" :r="radius" fill="none" stroke="#34d399" stroke-width="8" stroke-linecap="round"
            :stroke-dasharray="circumference" :stroke-dashoffset="dashOffset"
          />
        </svg>
        <div class="absolute inset-0 flex items-center justify-center">
          <span class="text-lg font-bold" :class="isDark ? 'text-white' : 'text-gray-900'">{{ percent }}%</span>
        </div>
      </div>
    </div>

    <ul class="space-y-1.5 text-sm">
      <li class="flex items-center gap-2">
        <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
        <span :class="isDark ? 'text-gray-300' : 'text-gray-600'">{{ matched }}</span>
        <span :class="isDark ? 'text-gray-500' : 'text-gray-400'">Cocok</span>
      </li>
      <li class="flex items-center gap-2">
        <span class="w-2 h-2 rounded-full bg-amber-400"></span>
        <span :class="isDark ? 'text-gray-300' : 'text-gray-600'">{{ discrepancy }}</span>
        <span :class="isDark ? 'text-gray-500' : 'text-gray-400'">Selisih</span>
      </li>
      <li class="flex items-center gap-2">
        <span class="w-2 h-2 rounded-full bg-gray-400"></span>
        <span :class="isDark ? 'text-gray-300' : 'text-gray-600'">{{ unmatched }}</span>
        <span :class="isDark ? 'text-gray-500' : 'text-gray-400'">Belum Dicocokkan</span>
      </li>
    </ul>
  </div>
</template>