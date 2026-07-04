<script setup>
import { ArrowTrendingUpIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'
import { useTheme } from '@/composables/useTheme'

defineProps({
  heading: { type: String, default: 'Insight Pemasukan' },
  title: { type: String, required: true },
  description: { type: String, required: true },
  linkText: { type: String, default: 'Lihat Laporan Lengkap' },
  color: { type: String, default: 'emerald' }, // emerald | rose
})

const { isDark } = useTheme()

const colorMap = {
  emerald: { text: 'text-emerald-400', bg: 'bg-emerald-500/15' },
  rose: { text: 'text-rose-400', bg: 'bg-rose-500/15' },
}
</script>

<template>
  <div class="rounded-2xl border p-5" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
    <p class="text-sm font-semibold mb-4" :class="isDark ? 'text-white' : 'text-gray-900'">{{ heading }}</p>

    <div class="flex items-start gap-3">
      <div class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" :class="(colorMap[color] || colorMap.emerald).bg">
        <ArrowTrendingUpIcon class="w-5 h-5" :class="(colorMap[color] || colorMap.emerald).text" />
      </div>
      <div>
        <p class="text-sm font-medium" :class="isDark ? 'text-gray-200' : 'text-gray-800'">{{ title }}</p>
        <p class="text-sm mt-0.5" :class="isDark ? 'text-gray-400' : 'text-gray-500'">{{ description }}</p>
      </div>
    </div>

    <a
      href="#"
      class="flex items-center justify-between mt-5 pt-4 border-t text-sm transition"
      :class="[isDark ? 'border-white/5' : 'border-gray-100', (colorMap[color] || colorMap.emerald).text]"
    >
      {{ linkText }}
      <ChevronRightIcon class="w-4 h-4" />
    </a>
  </div>
</template>