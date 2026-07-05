<script setup>
import { CalendarDaysIcon } from '@heroicons/vue/24/outline'
import { useTheme } from '@/composables/useTheme'

defineProps({
  progress: { type: Object, required: true },
})

const { isDark } = useTheme()
</script>

<template>
  <div class="rounded-2xl border p-5" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
    <div class="flex items-center justify-between mb-4">
      <p class="text-base font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">Progres Rekonsiliasi</p>
      <a href="#" class="text-sm text-purple-400 hover:text-purple-300 transition">Lihat Detail</a>
    </div>

    <div class="flex items-center gap-2 text-sm mb-3" :class="isDark ? 'text-gray-400' : 'text-gray-500'">
      <CalendarDaysIcon class="w-4 h-4" />
      Periode
    </div>
    <p class="text-sm mb-4" :class="isDark ? 'text-gray-300' : 'text-gray-700'">{{ progress.period }}</p>

    <!-- Progress bar -->
    <div class="flex items-center gap-3 mb-5">
      <div class="flex-1 h-2 rounded-full overflow-hidden" :class="isDark ? 'bg-white/10' : 'bg-gray-200'">
        <div class="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full" :style="{ width: progress.percent + '%' }"></div>
      </div>
      <span class="text-sm font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">{{ progress.percent }}%</span>
    </div>

    <ul class="space-y-2.5 mb-5">
      <li class="flex items-center justify-between text-sm">
        <span class="flex items-center gap-2" :class="isDark ? 'text-gray-300' : 'text-gray-600'">
          <span class="w-2 h-2 rounded-full bg-emerald-400"></span> Cocok
        </span>
        <span class="font-medium" :class="isDark ? 'text-white' : 'text-gray-900'">{{ progress.matched }}</span>
      </li>
      <li class="flex items-center justify-between text-sm">
        <span class="flex items-center gap-2" :class="isDark ? 'text-gray-300' : 'text-gray-600'">
          <span class="w-2 h-2 rounded-full bg-amber-400"></span> Selisih
        </span>
        <span class="font-medium" :class="isDark ? 'text-white' : 'text-gray-900'">{{ progress.discrepancy }}</span>
      </li>
      <li class="flex items-center justify-between text-sm">
        <span class="flex items-center gap-2" :class="isDark ? 'text-gray-300' : 'text-gray-600'">
          <span class="w-2 h-2 rounded-full bg-gray-400"></span> Belum Dicocokkan
        </span>
        <span class="font-medium" :class="isDark ? 'text-white' : 'text-gray-900'">{{ progress.unmatched }}</span>
      </li>
    </ul>

    <div class="flex items-center justify-between pt-4 border-t" :class="isDark ? 'border-white/5' : 'border-gray-100'">
      <span class="text-sm" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Total Transaksi</span>
      <span class="text-sm font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">{{ progress.total }}</span>
    </div>
  </div>
</template>