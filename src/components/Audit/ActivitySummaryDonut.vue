<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import { Chart, ArcElement, DoughnutController, Tooltip } from 'chart.js'
import { useTheme } from '@/composables/useTheme'

Chart.register(ArcElement, DoughnutController, Tooltip)

const props = defineProps({
  total: { type: Number, required: true },
  periodLabel: { type: String, required: true },
  segments: { type: Array, required: true },
})

const { isDark } = useTheme()

const canvasRef = ref(null)
let chartInstance = null

function buildChartData() {
  return {
    labels: props.segments.map((seg) => seg.label),
    datasets: [
      {
        data: props.segments.map((seg) => seg.value),
        backgroundColor: props.segments.map((seg) => seg.color),
        borderColor: isDark.value ? '#100c1c' : '#ffffff',
        borderWidth: 3,
        hoverOffset: 4,
      },
    ],
  }
}

function buildChartOptions() {
  return {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: isDark.value ? '#1c1630' : '#ffffff',
        titleColor: isDark.value ? '#ffffff' : '#111827',
        bodyColor: isDark.value ? '#d1d5db' : '#374151',
        borderColor: isDark.value ? 'rgba(255,255,255,0.1)' : '#e5e7eb',
        borderWidth: 1,
        padding: 10,
        callbacks: {
          label: (ctx) => {
            const seg = props.segments[ctx.dataIndex]
            return ` ${seg.label}: ${seg.value.toLocaleString('id-ID')} (${seg.percent.toFixed(1)}%)`
          },
        },
      },
    },
  }
}

function renderChart() {
  if (!canvasRef.value) return

  if (chartInstance) {
    chartInstance.data = buildChartData()
    chartInstance.options = buildChartOptions()
    chartInstance.update()
    return
  }

  chartInstance = new Chart(canvasRef.value, {
    type: 'doughnut',
    data: buildChartData(),
    options: buildChartOptions(),
  })
}

onMounted(async () => {
  await nextTick()
  renderChart()
})

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy()
    chartInstance = null
  }
})

watch(
  () => props.segments,
  () => renderChart(),
  { deep: true }
)

watch(isDark, () => renderChart())
</script>

<template>
  <div class="rounded-2xl border p-5" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
    <p class="text-base font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">Ringkasan Aktivitas</p>
    <p class="text-xs mb-5" :class="isDark ? 'text-gray-500' : 'text-gray-400'">{{ periodLabel }}</p>

    <div class="flex items-center justify-center mb-5">
      <div class="relative w-40 h-40">
        <canvas ref="canvasRef"></canvas>
        <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p class="text-2xl font-bold" :class="isDark ? 'text-white' : 'text-gray-900'">{{ total.toLocaleString('id-ID') }}</p>
          <p class="text-xs" :class="isDark ? 'text-gray-500' : 'text-gray-400'">Total</p>
        </div>
      </div>
    </div>

    <ul class="space-y-2.5">
      <li v-for="seg in segments" :key="seg.key" class="flex items-center justify-between text-sm">
        <span class="flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full flex-shrink-0" :style="{ backgroundColor: seg.color }"></span>
          <span :class="isDark ? 'text-gray-200' : 'text-gray-700'">{{ seg.label }}</span>
        </span>
        <span :class="isDark ? 'text-gray-400' : 'text-gray-500'">{{ seg.value.toLocaleString('id-ID') }} ({{ seg.percent.toFixed(1) }}%)</span>
      </li>
    </ul>
  </div>
</template>