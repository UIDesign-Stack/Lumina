<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { Chart, registerables } from 'chart.js'
import { useTheme } from '@/composables/useTheme'
import { ChevronDownIcon, InformationCircleIcon } from '@heroicons/vue/24/outline'

Chart.register(...registerables)

const props = defineProps({
  labels: { type: Array, default: () => [] },
  income: { type: Array, default: () => [] },
  expense: { type: Array, default: () => [] },
})

const { isDark } = useTheme()
const canvasRef = ref(null)
let chartInstance = null

function formatRupiah(v) {
  return 'Rp ' + Number(v).toLocaleString('id-ID')
}

function buildChart() {
  if (!canvasRef.value) return
  const gridColor = isDark.value ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'
  const tickColor = isDark.value ? '#6b7280' : '#9ca3af'

  chartInstance = new Chart(canvasRef.value, {
    type: 'line',
    data: {
      labels: props.labels,
      datasets: [
        {
          label: 'Pemasukan',
          data: props.income,
          borderColor: '#34d399',
          backgroundColor: 'rgba(52,211,153,0.12)',
          tension: 0.4,
          fill: true,
          pointRadius: 3,
          pointBackgroundColor: '#34d399',
          borderWidth: 2,
        },
        {
          label: 'Pengeluaran',
          data: props.expense,
          borderColor: '#fb7185',
          backgroundColor: 'rgba(251,113,133,0.12)',
          tension: 0.4,
          fill: true,
          pointRadius: 3,
          pointBackgroundColor: '#fb7185',
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => `${ctx.dataset.label}: ${formatRupiah(ctx.raw)}`,
          },
        },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: tickColor, font: { size: 11 } },
        },
        y: {
          grid: { color: gridColor },
          ticks: {
            color: tickColor,
            font: { size: 11 },
            callback: (v) => (v >= 1000000 ? `${v / 1000000} jt` : v),
          },
        },
      },
    },
  })
}

function destroyChart() {
  chartInstance?.destroy()
  chartInstance = null
}

onMounted(buildChart)
onBeforeUnmount(destroyChart)

watch(
  [() => props.labels, () => props.income, () => props.expense, isDark],
  () => {
    destroyChart()
    buildChart()
  }
)
</script>

<template>
  <div
    class="border rounded-2xl p-5 h-full transition-colors"
    :class="isDark ? 'bg-[#100c1e] border-white/5' : 'bg-white border-gray-200 shadow-sm'"
  >
    <div class="flex items-center justify-between mb-1">
      <h3 class="font-medium flex items-center gap-1.5" :class="isDark ? 'text-white' : 'text-gray-900'">
        Arus Kas
        <InformationCircleIcon class="w-3.5 h-3.5" :class="isDark ? 'text-gray-500' : 'text-gray-400'" />
      </h3>
      <button
        class="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg border transition"
        :class="isDark ? 'text-gray-300 border-white/10 hover:bg-white/5' : 'text-gray-600 border-gray-200 hover:bg-gray-50'"
      >
        6 Bulan Terakhir
        <ChevronDownIcon class="w-3.5 h-3.5" />
      </button>
    </div>
    <div class="flex items-center gap-4 text-xs mb-3" :class="isDark ? 'text-gray-400' : 'text-gray-500'">
      <span class="flex items-center gap-1.5">
        <span class="w-2 h-2 rounded-full bg-emerald-400"></span>Pemasukan
      </span>
      <span class="flex items-center gap-1.5">
        <span class="w-2 h-2 rounded-full bg-rose-400"></span>Pengeluaran
      </span>
    </div>
    <div class="h-64">
      <canvas ref="canvasRef"></canvas>
    </div>
  </div>
</template>