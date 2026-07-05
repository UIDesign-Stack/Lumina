<script setup>
import { LightBulbIcon } from '@heroicons/vue/24/solid'
import { ArrowRightIcon } from '@heroicons/vue/24/outline'
import { useTheme } from '@/composables/useTheme'

defineProps({
  tip: { type: Object, required: true }, // { text, linkText }
})

const { isDark } = useTheme()
</script>

<template>
  <div class="rounded-2xl border p-5" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
    <p class="text-base font-semibold mb-4" :class="isDark ? 'text-white' : 'text-gray-900'">Tips Kategori</p>
    <div class="flex items-start gap-3">
      <div class="w-10 h-10 rounded-xl bg-purple-500/15 flex items-center justify-center flex-shrink-0">
        <LightBulbIcon class="w-5 h-5 text-purple-400" />
      </div>
      <div>
        <p class="text-sm leading-relaxed" :class="isDark ? 'text-gray-400' : 'text-gray-600'">{{ tip.text }}</p>
        <a href="#" class="inline-flex items-center gap-1 text-sm text-purple-400 hover:text-purple-300 transition mt-2">
          {{ tip.linkText }}
          <ArrowRightIcon class="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  </div>
</template>