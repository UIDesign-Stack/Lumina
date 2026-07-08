<script setup>
import { WalletIcon, ArrowTrendingDownIcon, BanknotesIcon } from '@heroicons/vue/24/outline'
import { useTheme } from '@/composables/useTheme'

defineProps({
  activities: { type: Array, required: true },
})

const { isDark } = useTheme()

const iconMap = { operating: WalletIcon, investing: ArrowTrendingDownIcon, financing: BanknotesIcon }
</script>

<template>
  <div class="rounded-2xl border p-5" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
    <div class="flex items-center justify-between mb-4">
      <p class="text-base font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">Arus Kas per Aktivitas</p>
      <a href="#" class="text-sm text-purple-400 hover:text-purple-300 transition">Lihat Semua</a>
    </div>

    <ul class="space-y-4">
      <li v-for="activity in activities" :key="activity.key">
        <div class="flex items-start gap-3 mb-2">
          <div class="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" :class="activity.isNegative ? 'bg-rose-500/15 text-rose-400' : 'bg-purple-500/15 text-purple-400'">
            <component :is="iconMap[activity.key] || WalletIcon" class="w-4.5 h-4.5" />
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium" :class="isDark ? 'text-gray-200' : 'text-gray-800'">{{ activity.label }}</p>
            <p class="text-xs" :class="activity.isNegative ? 'text-rose-400' : (isDark ? 'text-gray-500' : 'text-gray-400')">{{ activity.value }}</p>
          </div>
          <span class="text-sm font-semibold flex-shrink-0" :class="activity.isNegative ? 'text-rose-400' : (isDark ? 'text-white' : 'text-gray-900')">
            {{ activity.isNegative ? '-' : '' }}{{ activity.percent }}%
          </span>
        </div>
        <div class="h-1.5 rounded-full overflow-hidden" :class="isDark ? 'bg-white/10' : 'bg-gray-200'">
          <div
            class="h-full rounded-full bg-gradient-to-r"
            :class="activity.isNegative ? 'from-rose-600 to-rose-400' : 'from-indigo-500 to-purple-500'"
            :style="{ width: activity.percent + '%' }"
          ></div>
        </div>
      </li>
    </ul>
  </div>
</template>