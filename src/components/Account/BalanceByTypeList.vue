<script setup>
import AccountIcon from './AccountIcon.vue'
import { useTheme } from '@/composables/useTheme'

defineProps({
  items: { type: Array, required: true },
})

const { isDark } = useTheme()

const barColorMap = {
  purple: 'from-indigo-500 to-purple-500',
  rose: 'from-rose-600 to-rose-400',
  amber: 'from-amber-600 to-amber-400',
}
</script>

<template>
  <div class="rounded-2xl border p-5" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
    <p class="text-base font-semibold mb-4" :class="isDark ? 'text-white' : 'text-gray-900'">Saldo Berdasarkan Tipe</p>

    <ul class="space-y-5">
      <li v-for="item in items" :key="item.key">
        <div class="flex items-center gap-3 mb-2">
          <AccountIcon :icon="item.icon" :color="item.color" size="sm" />
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium" :class="isDark ? 'text-gray-200' : 'text-gray-800'">{{ item.label }}</p>
            <p class="text-xs" :class="isDark ? 'text-gray-500' : 'text-gray-400'">{{ item.amount }}</p>
          </div>
          <span class="text-sm font-semibold flex-shrink-0" :class="isDark ? 'text-white' : 'text-gray-900'">{{ item.percent }}%</span>
        </div>
        <div class="h-1.5 rounded-full overflow-hidden" :class="isDark ? 'bg-white/10' : 'bg-gray-200'">
          <div class="h-full rounded-full bg-gradient-to-r" :class="barColorMap[item.color] || barColorMap.purple" :style="{ width: item.percent + '%' }"></div>
        </div>
      </li>
    </ul>
  </div>
</template>