<script setup>
import { InformationCircleIcon, ArrowRightIcon } from '@heroicons/vue/24/outline'
import { useTheme } from '@/composables/useTheme'

defineProps({
  text: { type: String, required: true },
  linkText: { type: String, default: 'Pelajari lebih lanjut' },
})

const { isDark } = useTheme()
</script>

<template>
  <div class="rounded-2xl border p-4 flex items-center gap-2 flex-wrap" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
    <InformationCircleIcon class="w-5 h-5 text-purple-400 flex-shrink-0" />
    <p class="text-sm" :class="isDark ? 'text-gray-300' : 'text-gray-600'">{{ text }}</p>
    <a href="#" class="inline-flex items-center gap-1 text-sm text-purple-400 hover:text-purple-300 transition ml-auto">
      {{ linkText }}
      <ArrowRightIcon class="w-3.5 h-3.5" />
    </a>
  </div>
</template>