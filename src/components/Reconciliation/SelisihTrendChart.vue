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
  labels: { type: Array, required: true },
  data: { type: Array, required: true },
  stats: { type: Object, required: true }, // { total, biggest: {value, date}, smallest: {value, date} }
})

const { isDark } = useTheme()

function formatShort(value) {
  const abs = Math.abs(value)
  if (abs >= 1000000) return `${value < 0 ? '-' : ''}${Math.round(abs / 1000000)} jt`
  return value
}

const chartData = computed(() => ({
  labels: props.labels,
  datasets: [
    {
      label: 'Selisih',
      data: props.data,
      borderColor: '#a78bfa',
      backgroundColor: 'rgba(167, 139, 250, 0.15)',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#a78bfa',
      pointBorderColor: '#a78bfa',
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
        label: (ctx) => `Selisih: Rp ${Number(ctx.raw).toLocaleString('id-ID')}`,
      },
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: isDark.value ? '#9ca3af' : '#6b7280', font: { size: 11 }, maxRotation: 0, autoSkip: true },
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
  <div class="rounded-2xl border p-5" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
    <!-- Header: judul + Harian, membentang full lebar card (sejajar tepi kanan statistik di bawah) -->
    <div class="flex items-center justify-between mb-4">
      <p class="text-base font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">Tren Selisih Rekonsiliasi</p>
      <button
        class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium whitespace-nowrap flex-shrink-0 transition"
        :class="isDark ? 'border-white/10 text-gray-300 hover:bg-white/5' : 'border-gray-300 text-gray-600 hover:bg-gray-50'"
      >
        Harian
        <ChevronDownIcon class="w-3.5 h-3.5" />
      </button>
    </div>

    <div class="flex flex-col xl:flex-row gap-6">
      <!-- Chart -->
      <div class="flex-1 min-w-0">
        <div class="h-64">
          <Line :data="chartData" :options="chartOptions" />
        </div>
      </div>

      <!-- Statistik samping: lebar pas konten (auto), mentok kanan, tidak melar -->
      <div class="grid grid-cols-3 xl:grid-cols-1 gap-4 xl:gap-6 xl:flex-shrink-0 xl:ml-auto xl:pt-2 xl:text-right">
        <div>
          <p class="text-xs mb-1" :class="isDark ? 'text-gray-500' : 'text-gray-400'">Total Selisih</p>
          <p class="text-lg font-bold text-amber-400">{{ stats.total }}</p>
        </div>
        <div>
          <p class="text-xs mb-1" :class="isDark ? 'text-gray-500' : 'text-gray-400'">Selisih Terbesar</p>
          <p class="text-base font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">{{ stats.biggest.value }}</p>
          <p class="text-xs" :class="isDark ? 'text-gray-500' : 'text-gray-400'">{{ stats.biggest.date }}</p>
        </div>
        <div>
          <p class="text-xs mb-1" :class="isDark ? 'text-gray-500' : 'text-gray-400'">Selisih Terkecil</p>
          <p class="text-base font-semibold text-rose-400">{{ stats.smallest.value }}</p>
          <p class="text-xs" :class="isDark ? 'text-gray-500' : 'text-gray-400'">{{ stats.smallest.date }}</p>
        </div>
      </div>
    </div>
  </div>
</template>