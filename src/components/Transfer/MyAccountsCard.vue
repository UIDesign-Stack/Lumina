<script setup>
import BankLogo from './BankLogo.vue'
import { useTheme } from '@/composables/useTheme'

defineProps({
  accounts: { type: Array, required: true },
})

const { isDark } = useTheme()
</script>

<template>
  <div class="rounded-2xl border p-5" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
    <div class="flex items-center justify-between mb-4">
      <p class="text-base font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">Rekening Saya</p>
      <a href="#" class="text-sm text-purple-400 hover:text-purple-300 transition">Kelola</a>
    </div>

    <ul class="space-y-3">
      <li v-for="acc in accounts" :key="acc.id" class="flex items-center gap-3">
        <BankLogo :logo="acc.logo" :color="acc.color" size="sm" />
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium truncate" :class="isDark ? 'text-gray-200' : 'text-gray-800'">{{ acc.name }}</p>
          <p class="text-xs truncate" :class="isDark ? 'text-gray-500' : 'text-gray-400'">
            {{ acc.bank ? acc.bank + ' • ' : '' }}{{ acc.number }}
          </p>
        </div>
        <div class="text-right flex-shrink-0">
          <p class="text-sm font-medium" :class="isDark ? 'text-gray-200' : 'text-gray-800'">{{ acc.balance }}</p>
          <p class="text-xs text-emerald-400">Saldo Tersedia</p>
        </div>
      </li>
    </ul>
  </div>
</template>