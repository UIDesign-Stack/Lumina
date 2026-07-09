<script setup>
import { ShieldCheckIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/vue/24/solid'
import { useTheme } from '@/composables/useTheme'

defineProps({
  isBalanced: { type: Boolean, default: true },
})

const { isDark } = useTheme()
</script>

<template>
  <div class="rounded-2xl border p-5 flex items-center justify-between gap-4 flex-wrap" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
    <div class="flex items-center gap-3">
      <div class="w-11 h-11 rounded-xl bg-purple-500/15 flex items-center justify-center flex-shrink-0">
        <ShieldCheckIcon class="w-6 h-6 text-purple-400" />
      </div>
      <div>
        <p class="text-sm font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">Keseimbangan Neraca</p>
        <p class="text-xs" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Total Aset sama dengan Total Liabilitas &amp; Ekuitas</p>
      </div>
    </div>

    <span
      class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium"
      :class="isBalanced ? 'bg-emerald-500/15 text-emerald-400' : 'bg-rose-500/15 text-rose-400'"
    >
      {{ isBalanced ? 'Seimbang' : 'Tidak Seimbang' }}
      <CheckCircleIcon v-if="isBalanced" class="w-4 h-4" />
      <XCircleIcon v-else class="w-4 h-4" />
    </span>
  </div>
</template>