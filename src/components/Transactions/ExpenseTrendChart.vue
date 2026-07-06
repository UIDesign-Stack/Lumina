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
import { FunnelIcon, ChevronDownIcon } from '@heroicons/vue/24/outline'
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
      label: 'Pengeluaran (Rp)',
      data: props.data,
      borderColor: '#fb7185',
      backgroundColor: 'rgba(251, 113, 133, 0.12)',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#fb7185',
      pointBorderColor: '#fb7185',
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
  <div>

    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-1">
      <p class="text-base font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">Tren Pengeluaran</p>
      <div class="flex items-center gap-2 flex-wrap">
        <button
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium whitespace-nowrap flex-shrink-0 transition"
          :class="isDark ? 'border-white/10 text-gray-300 hover:bg-white/5' : 'border-gray-300 text-gray-600 hover:bg-gray-50'"
        >
          6 Bulan Terakhir
          <ChevronDownIcon class="w-3.5 h-3.5" />
        </button>
        <button
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium whitespace-nowrap flex-shrink-0 transition"
          :class="isDark ? 'border-white/10 text-gray-300 hover:bg-white/5' : 'border-gray-300 text-gray-600 hover:bg-gray-50'"
        >
          Bulanan
          <ChevronDownIcon class="w-3.5 h-3.5" />
        </button>
        <button
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium whitespace-nowrap flex-shrink-0 transition"
          :class="isDark ? 'border-white/10 text-gray-300 hover:bg-white/5' : 'border-gray-300 text-gray-600 hover:bg-gray-50'"
        >
          <FunnelIcon class="w-3.5 h-3.5" />
          Filter
        </button>
      </div>
    </div>

    <div class="flex items-center gap-4 mb-4 text-xs">
      <span class="flex items-center gap-1.5" :class="isDark ? 'text-gray-400' : 'text-gray-500'">
        <span class="w-2 h-2 rounded-full bg-rose-400"></span> Pengeluaran (Rp)
      </span>
      <span class="flex items-center gap-1.5" :class="isDark ? 'text-gray-400' : 'text-gray-500'">
        <span class="w-3 border-t-2 border-dashed" :class="isDark ? 'border-gray-500' : 'border-gray-400'"></span>
        Rata-rata (Rp {{ average.toLocaleString('id-ID') }})
      </span>
    </div>

    <div class="h-64">
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>