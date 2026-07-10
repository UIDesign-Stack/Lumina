<script setup>
import { ArrowRightIcon } from '@heroicons/vue/24/outline'
import { useTheme } from '@/composables/useTheme'

defineProps({
  app: { type: Object, required: true },
})

const { isDark } = useTheme()
</script>

<template>
  <div class="rounded-2xl border p-5" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
    <div class="flex items-center gap-2.5 mb-4">
      <div class="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-400 via-purple-500 to-fuchsia-500 flex items-center justify-center flex-shrink-0">
        <span class="text-white font-bold text-sm">L</span>
      </div>
      <p class="text-base font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">Tentang Lumina Finance</p>
    </div>

    <p class="text-sm font-medium" :class="isDark ? 'text-white' : 'text-gray-900'">{{ app.name }}</p>
    <p class="text-xs mb-3" :class="isDark ? 'text-gray-500' : 'text-gray-400'">{{ app.version }}</p>
    <p class="text-sm leading-relaxed mb-3" :class="isDark ? 'text-gray-400' : 'text-gray-600'">{{ app.description }}</p>

    <a href="#" class="inline-flex items-center gap-1 text-sm text-purple-400 hover:text-purple-300 transition">
      Lihat Rilis Terbaru
      <ArrowRightIcon class="w-3.5 h-3.5" />
    </a>
  </div>
</template>