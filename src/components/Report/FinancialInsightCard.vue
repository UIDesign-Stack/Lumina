<script setup>
import { ArrowTrendingUpIcon, ChartPieIcon, CheckCircleIcon, ArrowRightIcon } from '@heroicons/vue/24/outline'
import { useTheme } from '@/composables/useTheme'

defineProps({
  insights: { type: Array, required: true },
  period: { type: String, default: '' },
})

const { isDark } = useTheme()

const iconMap = { trend: ArrowTrendingUpIcon, pie: ChartPieIcon, check: CheckCircleIcon }
const colorMap = {
  emerald: 'bg-emerald-500/15 text-emerald-400',
  amber: 'bg-amber-500/15 text-amber-400',
  blue: 'bg-blue-500/15 text-blue-400',
}
</script>

<template>
  <div class="rounded-2xl border p-5" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
    <div class="flex items-center justify-between mb-4">
      <p class="text-base font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">Insight Keuangan</p>
      <span v-if="period" class="text-xs" :class="isDark ? 'text-gray-500' : 'text-gray-400'">{{ period }}</span>
    </div>

    <ul class="space-y-4">
      <li v-for="insight in insights" :key="insight.id" class="flex items-start gap-3">
        <div class="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" :class="colorMap[insight.color]">
          <component :is="iconMap[insight.icon]" class="w-4.5 h-4.5" />
        </div>
        <p class="text-sm leading-relaxed" :class="isDark ? 'text-gray-300' : 'text-gray-600'">{{ insight.text }}</p>
      </li>
    </ul>

    <a href="#" class="flex items-center gap-1 text-sm text-purple-400 hover:text-purple-300 transition mt-5 pt-4 border-t" :class="isDark ? 'border-white/5' : 'border-gray-100'">
      Lihat Analisis Lengkap
      <ArrowRightIcon class="w-3.5 h-3.5" />
    </a>
  </div>
</template>