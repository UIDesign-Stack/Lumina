<script setup>
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
  Tooltip,
} from 'chart.js'
import { ChevronDownIcon } from '@heroicons/vue/24/outline'
import { useTheme } from '@/composables/useTheme'

ChartJS.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Filler, Tooltip)

const props = defineProps({
  title: { type: String, default: 'Tren Keuangan' },
  labels: { type: Array, required: true },
  series: { type: Array, required: true }, // [{ label, data, color }]
  periodLabel: { type: String, default: 'Harian' },
})

const { isDark } = useTheme()

function formatShort(value) {
  if (value >= 1000000000) return `${(value / 1000000000).toFixed(1).replace('.0', '')} M`
  if (value >= 1000000) return `${Math.round(value / 1000000)} jt`
  return value
}

const chartData = computed(() => ({
  labels: props.labels,
  datasets: props.series.map((s) => ({
    label: s.label,
    data: s.data,
    borderColor: s.color,
    backgroundColor: 'transparent',
    pointBackgroundColor: s.color,
    pointRadius: 3,
    pointHoverRadius: 5,
    borderWidth: 2.5,
    tension: 0.4,
  })),
}))

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: 'index', intersect: false },
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: isDark.value ? '#100c1c' : '#ffffff',
      titleColor: isDark.value ? '#ffffff' : '#111827',
      bodyColor: isDark.value ? '#d1d5db' : '#374151',
      borderColor: isDark.value ? 'rgba(255,255,255,0.1)' : '#e5e7eb',
      borderWidth: 1,
      padding: 12,
      cornerRadius: 10,
      callbacks: {
        label: (ctx) => `${ctx.dataset.label}: Rp ${Number(ctx.raw).toLocaleString('id-ID')}`,
      },
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: isDark.value ? '#9ca3af' : '#6b7280', font: { size: 11 } },
    },
    y: {
      grid: { color: isDark.value ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' },
      ticks: {
        color: isDark.value ? '#9ca3af' : '#6b7280',
        font: { size: 11 },
        callback: (value) => formatShort(value),
      },
    },
  },
}))
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-1">
      <p class="text-base font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">{{ title }}</p>
      <button
        class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium whitespace-nowrap flex-shrink-0 transition"
        :class="isDark ? 'border-white/10 text-gray-300 hover:bg-white/5' : 'border-gray-300 text-gray-600 hover:bg-gray-50'"
      >
        {{ periodLabel }}
        <ChevronDownIcon class="w-3.5 h-3.5" />
      </button>
    </div>

    <div class="flex items-center gap-4 mb-4 text-xs flex-wrap">
      <span v-for="s in series" :key="s.label" class="flex items-center gap-1.5" :class="isDark ? 'text-gray-400' : 'text-gray-500'">
        <span class="w-2 h-2 rounded-full" :style="{ backgroundColor: s.color }"></span> {{ s.label }}
      </span>
    </div>

    <div class="h-64">
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>