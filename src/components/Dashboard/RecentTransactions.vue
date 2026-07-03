<script setup>
import { useTheme } from '@/composables/useTheme'
import {
  ArrowDownIcon,
  ShoppingCartIcon,
  UserIcon,
  BuildingOffice2Icon,
} from '@heroicons/vue/24/outline'

defineProps({
  transactions: { type: Array, default: () => [] },
})

const { isDark } = useTheme()

const iconMap = {
  'arrow-down': ArrowDownIcon,
  cart: ShoppingCartIcon,
  user: UserIcon,
  building: BuildingOffice2Icon,
}
</script>

<template>
  <div
    class="border rounded-2xl p-5 h-full transition-colors"
    :class="isDark ? 'bg-[#100c1e] border-white/5' : 'bg-white border-gray-200 shadow-sm'"
  >
    <div class="flex items-center justify-between mb-4">
      <h3 class="font-medium" :class="isDark ? 'text-white' : 'text-gray-900'">Transaksi Terbaru</h3>
      <a href="#" class="text-xs font-medium text-indigo-400 hover:text-indigo-300">Lihat semua</a>
    </div>

    <ul class="space-y-1">
      <li
        v-for="t in transactions"
        :key="t.id"
        class="flex items-center justify-between gap-3 py-2.5 border-b last:border-b-0"
        :class="isDark ? 'border-white/5' : 'border-gray-100'"
      >
        <div class="flex items-center gap-3 min-w-0">
          <div
            class="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
            :class="t.type === 'income' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'"
          >
            <component :is="iconMap[t.icon]" class="w-4 h-4" />
          </div>
          <div class="min-w-0">
            <p class="text-sm font-medium truncate" :class="isDark ? 'text-white' : 'text-gray-900'">{{ t.title }}</p>
            <p class="text-xs text-gray-500 truncate">{{ t.subtitle }}</p>
          </div>
        </div>
        <div class="text-right flex-shrink-0">
          <p class="text-sm font-medium" :class="t.type === 'income' ? 'text-emerald-400' : (isDark ? 'text-white' : 'text-gray-900')">
            {{ t.amount }}
          </p>
          <p class="text-xs text-gray-500">{{ t.time }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>