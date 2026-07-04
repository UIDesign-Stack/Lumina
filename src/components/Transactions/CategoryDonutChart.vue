<script setup>
import { computed } from 'vue'
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, DoughnutController, ArcElement, Tooltip } from 'chart.js'
import { useTheme } from '@/composables/useTheme'

ChartJS.register(DoughnutController, ArcElement, Tooltip)

const props = defineProps({
  categories: { type: Array, required: true }, // [{ label, value, percent, color }]
  total: { type: String, required: true },
})

const { isDark } = useTheme()

const chartData = computed(() => ({
  labels: props.categories.map((c) => c.label),
  datasets: [
    {
      data: props.categories.map((c) => c.value),
      backgroundColor: props.categories.map((c) => c.color),
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
        label: (ctx) => `${ctx.label}: Rp ${Number(ctx.raw).toLocaleString('id-ID')}`,
      },
    },
  },
}))
</script>

<template>
  <div class="space-y-5">
    <div class="relative h-48 flex items-center justify-center">
      <Doughnut :data="chartData" :options="chartOptions" />
      <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <p class="text-xs" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Total</p>
        <p class="text-sm font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">{{ total }}</p>
      </div>
    </div>

    <ul class="space-y-3">
      <li v-for="cat in categories" :key="cat.label" class="flex items-center justify-between text-sm">
        <span class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full flex-shrink-0" :style="{ backgroundColor: cat.color }"></span>
          <span>
            <span class="block" :class="isDark ? 'text-gray-200' : 'text-gray-800'">{{ cat.label }}</span>
            <span class="block text-xs" :class="isDark ? 'text-gray-500' : 'text-gray-400'">
              Rp {{ cat.value.toLocaleString('id-ID') }}
            </span>
          </span>
        </span>
        <span class="font-medium" :class="isDark ? 'text-gray-300' : 'text-gray-600'">{{ cat.percent }}%</span>
      </li>
    </ul>
  </div>
</template>