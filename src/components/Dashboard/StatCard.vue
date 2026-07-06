<script setup>
import { computed, ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { Chart, registerables } from 'chart.js'
import { useTheme } from '@/composables/useTheme'
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ChartBarSquareIcon,
  BriefcaseIcon,
} from '@heroicons/vue/24/outline'

Chart.register(...registerables)

const { isDark } = useTheme()

const props = defineProps({
  cardKey: { type: String, default: '' },
  title: { type: String, required: true },
  value: { type: String, required: true },
  change: { type: String, required: true },
  changeLabel: { type: String, default: '' },
  trend: { type: String, default: 'up' },
  color: { type: String, default: 'emerald' },
  sparkline: { type: Array, default: () => [] },
})

const theme = {
  emerald: { text: 'text-emerald-400', bg: 'bg-emerald-500/10', stroke: '#34d399' },
  rose: { text: 'text-rose-400', bg: 'bg-rose-500/10', stroke: '#fb7185' },
  blue: { text: 'text-blue-400', bg: 'bg-blue-500/10', stroke: '#60a5fa' },
  amber: { text: 'text-amber-400', bg: 'bg-amber-500/10', stroke: '#fbbf24' },
}
const t = computed(() => theme[props.color] || theme.emerald)

const iconMap = {
  income: ArrowTrendingUpIcon,
  expense: ArrowTrendingDownIcon,
  profit: ChartBarSquareIcon,
  cash: BriefcaseIcon,
}
const mainIcon = computed(() => iconMap[props.cardKey] || ChartBarSquareIcon)

const canvasRef = ref(null)
let chartInstance = null

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${alpha})`
}

function buildChart() {
  if (!canvasRef.value) return
  const ctx = canvasRef.value.getContext('2d')
  const gradient = ctx.createLinearGradient(0, 0, 0, 48)
  gradient.addColorStop(0, hexToRgba(t.value.stroke, 0.28))
  gradient.addColorStop(1, hexToRgba(t.value.stroke, 0))

  chartInstance = new Chart(canvasRef.value, {
    type: 'line',
    data: {
      labels: props.sparkline.map((_, i) => i),
      datasets: [
        {
          data: props.sparkline,
          borderColor: t.value.stroke,
          backgroundColor: gradient,
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      plugins: { legend: { display: false }, tooltip: { enabled: false } },
      scales: {
        x: { display: false },
        y: { display: false },
      },
      elements: { line: { borderJoinStyle: 'round' } },
    },
  })
}

function destroyChart() {
  chartInstance?.destroy()
  chartInstance = null
}

onMounted(buildChart)
onBeforeUnmount(destroyChart)
watch(() => props.sparkline, () => {
  destroyChart()
  buildChart()
})
</script>

<template>
  <div
    class="border rounded-2xl p-5 transition-colors"
    :class="isDark ? 'bg-[#100c1e] border-white/5' : 'bg-white border-gray-200 shadow-sm'"
  >
    <div class="flex items-start justify-between mb-3">
      <p :class="t.text" class="text-sm font-medium">{{ title }}</p>
      <div :class="t.bg" class="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0">
        <component :is="mainIcon" :class="t.text" class="w-4 h-4" />
      </div>
    </div>

    <p class="text-2xl font-semibold mb-2" :class="isDark ? 'text-white' : 'text-gray-900'">{{ value }}</p>

    <div class="flex items-center gap-1 text-xs mb-3">
      <component
        :is="trend === 'up' ? ArrowTrendingUpIcon : ArrowTrendingDownIcon"
        :class="trend === 'up' ? 'text-emerald-400' : 'text-rose-400'"
        class="w-3.5 h-3.5"
      />
      <span :class="trend === 'up' ? 'text-emerald-400' : 'text-rose-400'" class="font-medium">{{ change }}</span>
      <span class="text-gray-500">{{ changeLabel }}</span>
    </div>

    <div class="h-8">
      <canvas ref="canvasRef"></canvas>
    </div>
  </div>
</template>