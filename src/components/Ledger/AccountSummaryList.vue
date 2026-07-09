<script setup>
import { BriefcaseIcon, DocumentTextIcon, ArchiveBoxIcon, BuildingOffice2Icon } from '@heroicons/vue/24/outline'
import { useTheme } from '@/composables/useTheme'

defineProps({
  accounts: { type: Array, required: true },
})

const { isDark } = useTheme()

const iconMap = { wallet: BriefcaseIcon, document: DocumentTextIcon, archive: ArchiveBoxIcon, building: BuildingOffice2Icon }
const colorMap = {
  purple: 'bg-purple-500/15 text-purple-400',
  blue: 'bg-blue-500/15 text-blue-400',
  amber: 'bg-amber-500/15 text-amber-400',
  emerald: 'bg-emerald-500/15 text-emerald-400',
  rose: 'bg-rose-500/15 text-rose-400',
}
</script>

<template>
  <div class="rounded-2xl border p-5" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
    <div class="flex items-center justify-between mb-4">
      <p class="text-base font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">Ringkasan Akun</p>
      <a href="#" class="text-sm text-purple-400 hover:text-purple-300 transition">Lihat Semua</a>
    </div>

    <ul class="space-y-3.5 mb-4">
      <li v-for="acc in accounts" :key="acc.key" class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" :class="colorMap[acc.color]">
          <component :is="iconMap[acc.icon] || iconMap.wallet" class="w-4 h-4" />
        </div>
        <div class="min-w-0">
          <p class="text-sm font-medium truncate" :class="isDark ? 'text-gray-200' : 'text-gray-800'">{{ acc.name }}</p>
          <p class="text-xs" :class="isDark ? 'text-gray-500' : 'text-gray-400'">{{ acc.amount }}</p>
        </div>
      </li>
    </ul>

    <button
      class="w-full py-2.5 rounded-xl border text-sm font-medium transition"
      :class="isDark ? 'border-purple-500/30 text-purple-400 hover:bg-purple-500/10' : 'border-purple-300 text-purple-600 hover:bg-purple-50'"
    >
      Lihat Semua Akun
    </button>
  </div>
</template>