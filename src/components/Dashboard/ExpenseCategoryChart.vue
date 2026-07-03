<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { Chart, registerables } from 'chart.js'
import { useTheme } from '@/composables/useTheme'
import { ChevronDownIcon } from '@heroicons/vue/24/outline'

Chart.register(...registerables)

const props = defineProps({
  categories: { type: Array, default: () => [] },
  total: { type: String, default: '' },
})

const { isDark } = useTheme()
const canvasRef = ref(null)
let chartInstance = null

function buildChart() {
  if (!canvasRef.value) return
  chartInstance = new Chart(canvasRef.value, {
    type: 'doughnut',
    data: {
      labels: props.categories.map((c) => c.label),
      datasets: [
        {
          data: props.categories.map((c) => c.value),
          backgroundColor: props.categories.map((c) => c.color),
          borderWidth: 0,
          hoverOffset: 6,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '72%',
      layout: { padding: 0 },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => `${ctx.label}: Rp ${Number(ctx.raw).toLocaleString('id-ID')}`,
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

watch([() => props.categories, isDark], () => {
  destroyChart()
  buildChart()
})
</script>

<template>
  <div
    class="border rounded-2xl p-5 h-full transition-colors"
    :class="isDark ? 'bg-[#100c1e] border-white/5' : 'bg-white border-gray-200 shadow-sm'"
  >
    <div class="flex items-center flex-wrap gap-2 justify-between mb-5">
      <h3 class="font-medium" :class="isDark ? 'text-white' : 'text-gray-900'">Pengeluaran per Kategori</h3>
      <button
        class="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg border transition"
        :class="isDark ? 'text-gray-300 border-white/10 hover:bg-white/5' : 'text-gray-600 border-gray-200 hover:bg-gray-50'"
      >
        Bulan Ini
        <ChevronDownIcon class="w-3.5 h-3.5" />
      </button>
    </div>

    <div class="flex flex-col sm:flex-row items-center justify-center gap-5">
      <div class="relative w-44 h-44 sm:w-52 sm:h-52 lg:w-60 lg:h-60 flex-shrink-0">
        <canvas ref="canvasRef"></canvas>
        <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span class="text-xs" :class="isDark ? 'text-gray-500' : 'text-gray-400'">Total</span>
          <span class="text-sm font-semibold text-center leading-tight" :class="isDark ? 'text-white' : 'text-gray-900'">
            {{ total }}
          </span>
        </div>
      </div>

      <ul class="grid grid-cols-[auto_minmax(0,150px)_auto] sm:inline-grid gap-x-3 gap-y-3 text-xs items-start mx-auto sm:mx-0">
        <template v-for="c in categories" :key="c.label">
          <span class="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" :style="{ backgroundColor: c.color }"></span>
          <div class="min-w-0">
            <span class="text-sm font-medium block truncate" :class="isDark ? 'text-gray-200' : 'text-gray-800'">{{ c.label }}</span>
            <span class="block" :class="isDark ? 'text-gray-500' : 'text-gray-400'">Rp {{ Number(c.value).toLocaleString('id-ID') }}</span>
          </div>
          <span class="text-right pt-0.5" :class="isDark ? 'text-gray-500' : 'text-gray-400'">{{ c.percent }}%</span>
        </template>
      </ul>
    </div>
  </div>
</template>