<script setup>
import { computed } from 'vue'
import { Chart as ChartComponent } from 'vue-chartjs'
import {
  Chart as ChartJS,
  BarController,
  LineController,
  BarElement,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
} from 'chart.js'
import { ChevronDownIcon } from '@heroicons/vue/24/outline'
import { useTheme } from '@/composables/useTheme'

ChartJS.register(BarController, LineController, BarElement, LineElement, PointElement, LinearScale, CategoryScale, Tooltip)

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
      type: 'line',
      label: 'Anggaran',
      data: props.budget,
      borderColor: isDark.value ? '#e5e7eb' : '#6b7280',
      borderDash: [6, 6],
      borderWidth: 1.5,
      pointRadius: 3,
      pointBackgroundColor: isDark.value ? '#e5e7eb' : '#6b7280',
      fill: false,
      order: 0,
    },
    {
      type: 'bar',
      label: 'Realisasi',
      data: props.realization,
      backgroundColor: (ctx) => {
        const chart = ctx.chart
        const { ctx: canvasCtx, chartArea } = chart
        if (!chartArea) return '#a855f7'
        const gradient = canvasCtx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top)
        gradient.addColorStop(0, '#6366f1')
        gradient.addColorStop(1, '#c084fc')
        return gradient
      },
      borderRadius: 6,
      maxBarThickness: 28,
      order: 1,
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
    <div class="flex items-center justify-between mb-1">
      <p class="text-base font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">Realisasi Anggaran</p>
      <button
        class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium whitespace-nowrap flex-shrink-0 transition"
        :class="isDark ? 'border-white/10 text-gray-300 hover:bg-white/5' : 'border-gray-300 text-gray-600 hover:bg-gray-50'"
      >
        Per Bulan
        <ChevronDownIcon class="w-3.5 h-3.5" />
      </button>
    </div>

    <div class="flex items-center gap-4 mb-4 text-xs">
      <span class="flex items-center gap-1.5" :class="isDark ? 'text-gray-400' : 'text-gray-500'">
        <span class="w-3 border-t-2 border-dashed" :class="isDark ? 'border-gray-300' : 'border-gray-500'"></span> Anggaran
      </span>
      <span class="flex items-center gap-1.5" :class="isDark ? 'text-gray-400' : 'text-gray-500'">
        <span class="w-2.5 h-2.5 rounded bg-gradient-to-t from-indigo-500 to-purple-400"></span> Realisasi
      </span>
    </div>

    <div class="h-64">
      <ChartComponent type="bar" :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>