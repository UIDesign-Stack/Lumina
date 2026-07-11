<script setup>
import { ShieldCheckIcon, ArrowRightIcon } from '@heroicons/vue/24/outline'
import { useTheme } from '@/composables/useTheme'

defineProps({
  title: { type: String, required: true },
  text: { type: String, required: true },
  linkText: { type: String, default: 'Pelajari lebih lanjut' },
})

const { isDark } = useTheme()
</script>

<template>
  <div class="rounded-2xl border p-4 flex items-start gap-3" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
    <div class="w-9 h-9 rounded-lg bg-purple-500/15 flex items-center justify-center flex-shrink-0">
      <ShieldCheckIcon class="w-4.5 h-4.5 text-purple-400" />
    </div>
    <div class="min-w-0">
      <p class="text-sm font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">{{ title }}</p>
      <p class="text-sm mt-0.5" :class="isDark ? 'text-gray-400' : 'text-gray-500'">{{ text }}</p>
      <a href="#" class="inline-flex items-center gap-1 text-sm text-purple-400 hover:text-purple-300 transition mt-1.5">
        {{ linkText }}
        <ArrowRightIcon class="w-3.5 h-3.5" />
      </a>
    </div>
  </div>
</template>