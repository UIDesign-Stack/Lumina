<script setup>
import { ShieldCheckIcon, ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/outline'
import { useTheme } from '@/composables/useTheme'

defineProps({
  title: { type: String, required: true },
  text: { type: String, required: true },
  linkText: { type: String, default: 'Pelajari Lebih Lanjut' },
})

const { isDark } = useTheme()
</script>

<template>
  <div class="rounded-2xl border p-4 flex items-center gap-4 flex-wrap" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
    <div class="w-11 h-11 rounded-xl bg-purple-500/15 flex items-center justify-center flex-shrink-0">
      <ShieldCheckIcon class="w-5 h-5 text-purple-400" />
    </div>
    <div class="flex-1 min-w-[200px]">
      <p class="text-sm font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">{{ title }}</p>
      <p class="text-sm mt-0.5" :class="isDark ? 'text-gray-400' : 'text-gray-500'">{{ text }}</p>
    </div>
    <button class="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-medium transition flex-shrink-0">
      {{ linkText }}
      <ArrowTopRightOnSquareIcon class="w-3.5 h-3.5" />
    </button>
  </div>
</template>