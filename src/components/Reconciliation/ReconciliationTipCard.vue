<script setup>
import { LightBulbIcon } from '@heroicons/vue/24/solid'
import { ArrowRightIcon } from '@heroicons/vue/24/outline'
import { useTheme } from '@/composables/useTheme'

defineProps({
  tip: { type: Object, required: true },
})

const { isDark } = useTheme()
</script>

<template>
  <div class="rounded-2xl border p-5" :class="isDark ? 'bg-amber-500/5 border-amber-500/20' : 'bg-amber-50 border-amber-200'">
    <div class="flex items-start gap-3">
      <LightBulbIcon class="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
      <div>
        <p class="text-sm font-semibold mb-1" :class="isDark ? 'text-white' : 'text-gray-900'">Tips Rekonsiliasi</p>
        <p class="text-sm leading-relaxed" :class="isDark ? 'text-gray-400' : 'text-gray-600'">{{ tip.text }}</p>
        <a href="#" class="inline-flex items-center gap-1 text-sm text-amber-400 hover:text-amber-300 transition mt-2">
          {{ tip.linkText }}
          <ArrowRightIcon class="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  </div>
</template>