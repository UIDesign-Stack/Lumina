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
import { useTheme } from '@/composables/useTheme'

ChartJS.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Filler, Tooltip)

const props = defineProps({
  labels: { type: Array, required: true },
  budget: { type: Array, required: true },
  realization: { type: Array, required: true },
})

const { isDark } = useTheme()

function formatShort(value) {
  if (value >= 1000000000) return `${(value / 1000000000).toFixed(1).replace('.0', '')} M`
  if (value >= 1000000) return `${Math.round(value / 1000000)} jt`
  return value
}

const chartData = computed(() => ({
  labels: props.labels,
  datasets: [
    {
      label: 'Anggaran',
      data: props.budget,
      borderColor: isDark.value ? '#e5e7eb' : '#6b7280',
      borderDash: [6, 6],
      borderWidth: 1.5,
      pointRadius: 3,
      pointBackgroundColor: isDark.value ? '#e5e7eb' : '#6b7280',
      fill: false,
      tension: 0.3,
    },
    {
      label: 'Realisasi',
      data: props.realization,
      borderColor: '#a855f7',
      backgroundColor: 'rgba(168, 85, 247, 0.2)',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#a855f7',
      pointBorderColor: '#a855f7',
      pointRadius: 3,
      pointHoverRadius: 5,
      borderWidth: 2.5,
    },
  ],
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
    <div class="flex items-center justify-between mb-4">
      <p class="text-base font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">Tren Realisasi Proyek</p>
      <div class="flex items-center gap-4 text-xs">
        <span class="flex items-center gap-1.5" :class="isDark ? 'text-gray-400' : 'text-gray-500'">
          <span class="w-3 border-t-2 border-dashed" :class="isDark ? 'border-gray-300' : 'border-gray-500'"></span> Anggaran
        </span>
        <span class="flex items-center gap-1.5" :class="isDark ? 'text-gray-400' : 'text-gray-500'">
          <span class="w-2.5 h-2.5 rounded-full bg-purple-500"></span> Realisasi
        </span>
      </div>
    </div>

    <div class="h-64">
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>