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
  data: { type: Array, required: true },
  average: { type: Number, required: true },
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
      label: 'Pemasukan (Rp)',
      data: props.data,
      borderColor: '#34d399',
      backgroundColor: 'rgba(52, 211, 153, 0.12)',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#34d399',
      pointBorderColor: '#34d399',
      pointRadius: 4,
      pointHoverRadius: 6,
      borderWidth: 2.5,
    },
    {
      label: `Rata-rata (Rp ${props.average.toLocaleString('id-ID')})`,
      data: props.labels.map(() => props.average),
      borderColor: isDark.value ? '#6b7280' : '#9ca3af',
      borderDash: [6, 6],
      borderWidth: 1.5,
      pointRadius: 0,
      fill: false,
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
      displayColors: true,
      callbacks: {
        label: (ctx) => `${ctx.dataset.label.split(' (')[0]}: Rp ${Number(ctx.raw).toLocaleString('id-ID')}`,
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
  <div class="h-64">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>