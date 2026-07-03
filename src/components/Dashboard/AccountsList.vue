<script setup>
import { useTheme } from '@/composables/useTheme'
import {
  WalletIcon,
  BuildingLibraryIcon,
  DevicePhoneMobileIcon,
} from '@heroicons/vue/24/outline'

defineProps({
  accounts: { type: Array, default: () => [] },
})

const { isDark } = useTheme()

const iconMap = {
  wallet: WalletIcon,
  bank: BuildingLibraryIcon,
  device: DevicePhoneMobileIcon,
}

const colorMap = {
  purple: { bg: 'bg-purple-500/10', text: 'text-purple-400' },
  blue: { bg: 'bg-blue-500/10', text: 'text-blue-400' },
  orange: { bg: 'bg-orange-500/10', text: 'text-orange-400' },
  teal: { bg: 'bg-teal-500/10', text: 'text-teal-400' },
}
</script>

<template>
  <div
    class="border rounded-2xl p-5 h-full transition-colors"
    :class="isDark ? 'bg-[#100c1e] border-white/5' : 'bg-white border-gray-200 shadow-sm'"
  >
    <div class="flex items-center justify-between mb-4">
      <h3 class="font-medium" :class="isDark ? 'text-white' : 'text-gray-900'">Akun & Rekening</h3>
      <a href="#" class="text-xs font-medium text-indigo-400 hover:text-indigo-300">Lihat semua</a>
    </div>

    <ul class="space-y-1">
      <li
        v-for="a in accounts"
        :key="a.id"
        class="flex items-center justify-between gap-3 py-2.5 border-b last:border-b-0"
        :class="isDark ? 'border-white/5' : 'border-gray-100'"
      >
        <div class="flex items-center gap-3 min-w-0">
          <div
            class="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            :class="[colorMap[a.color]?.bg, colorMap[a.color]?.text]"
          >
            <component :is="iconMap[a.icon]" class="w-4 h-4" />
          </div>
          <div class="min-w-0">
            <p class="text-sm font-medium truncate" :class="isDark ? 'text-white' : 'text-gray-900'">{{ a.name }}</p>
            <p class="text-xs text-gray-500 truncate">{{ a.bank }} • {{ a.number }}</p>
          </div>
        </div>
        <div class="text-right flex-shrink-0">
          <p class="text-sm font-medium" :class="isDark ? 'text-white' : 'text-gray-900'">{{ a.balance }}</p>
          <p class="text-xs text-gray-500">Saldo</p>
        </div>
      </li>
    </ul>
  </div>
</template>