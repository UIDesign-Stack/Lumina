<script setup>
import { CheckCircleIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'
import BankLogo from './BankLogo.vue'
import { useTheme } from '@/composables/useTheme'

defineProps({
  transfers: { type: Array, required: true },
})

const { isDark } = useTheme()
</script>

<template>
  <div class="rounded-2xl border p-5" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
    <div class="flex items-center justify-between mb-4">
      <p class="text-base font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">Transfer Terbaru</p>
      <a href="#" class="text-sm text-purple-400 hover:text-purple-300 transition">Lihat Semua</a>
    </div>

    <ul class="space-y-3 mb-4">
      <li v-for="t in transfers" :key="t.id" class="flex items-center gap-3">
        <BankLogo :logo="t.logo" :color="t.color" size="sm" />
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium truncate" :class="isDark ? 'text-gray-200' : 'text-gray-800'">{{ t.name }}</p>
          <p class="text-xs truncate" :class="isDark ? 'text-gray-500' : 'text-gray-400'">{{ t.bank }} • {{ t.number }}</p>
        </div>
        <div class="text-right flex-shrink-0">
          <p class="text-sm font-medium text-rose-400">- {{ t.amount }}</p>
          <p class="text-xs" :class="isDark ? 'text-gray-500' : 'text-gray-400'">{{ t.date }}</p>
          <p class="flex items-center justify-end gap-1 text-xs text-emerald-400 mt-0.5">
            <CheckCircleIcon class="w-3 h-3" /> {{ t.status }}
          </p>
        </div>
      </li>
    </ul>

    <a
      href="#"
      class="flex items-center justify-between pt-4 border-t text-sm font-medium transition"
      :class="isDark ? 'border-white/5 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-600 hover:text-gray-900'"
    >
      Lihat Semua Riwayat Transfer
      <ChevronRightIcon class="w-4 h-4" />
    </a>
  </div>
</template>