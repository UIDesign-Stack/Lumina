<script setup>
import { computed } from 'vue'
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, DoughnutController, ArcElement, Tooltip } from 'chart.js'
import { useTheme } from '@/composables/useTheme'

ChartJS.register(DoughnutController, ArcElement, Tooltip)

const props = defineProps({
  split: { type: Array, required: true }, // [{ label, count, percent, color }]
  total: { type: Number, required: true },
})

const { isDark } = useTheme()

const chartData = computed(() => ({
  labels: props.split.map((s) => s.label),
  datasets: [
    {
      data: props.split.map((s) => s.count),
      backgroundColor: props.split.map((s) => s.color),
      borderWidth: 0,
      hoverOffset: 6,
    },
  ],
}))

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  cutout: '68%',
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: isDark.value ? '#100c1c' : '#ffffff',
      titleColor: isDark.value ? '#ffffff' : '#111827',
      bodyColor: isDark.value ? '#d1d5db' : '#374151',
      borderColor: isDark.value ? 'rgba(255,255,255,0.1)' : '#e5e7eb',
      borderWidth: 1,
      padding: 10,
      cornerRadius: 10,
      callbacks: {
        label: (ctx) => `${ctx.label}: ${ctx.raw} kategori`,
      },
    },
  },
}))
</script>

<template>
  <div>
    <div class="relative h-40 flex items-center justify-center">
      <Doughnut :data="chartData" :options="chartOptions" />
      <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <p class="text-xs" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Total</p>
        <p class="text-2xl font-bold" :class="isDark ? 'text-white' : 'text-gray-900'">{{ total }}</p>
      </div>
    </div>

    <ul class="space-y-2.5 mt-4">
      <li v-for="s in split" :key="s.label" class="flex items-center justify-between text-sm">
        <span class="flex items-center gap-2" :class="isDark ? 'text-gray-300' : 'text-gray-600'">
          <span class="w-2 h-2 rounded-full flex-shrink-0" :style="{ backgroundColor: s.color }"></span>
          {{ s.label }}
        </span>
        <span class="font-medium" :class="isDark ? 'text-gray-200' : 'text-gray-800'">{{ s.count }} ({{ s.percent }}%)</span>
      </li>
    </ul>
  </div>
</template>