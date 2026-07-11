<script setup>
import { ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/outline'
import { useTheme } from '@/composables/useTheme'

const { isDark } = useTheme()
</script>

<template>
  <div class="rounded-2xl border p-5 text-center" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
    <div class="w-11 h-11 rounded-xl bg-purple-500/15 flex items-center justify-center mx-auto mb-3">
      <svg class="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3 18v-6a9 9 0 0118 0v6" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3v5zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3v5z" />
      </svg>
    </div>
    <p class="text-sm font-semibold mb-1.5" :class="isDark ? 'text-white' : 'text-gray-900'">Butuh Bantuan?</p>
    <p class="text-sm mb-4" :class="isDark ? 'text-gray-400' : 'text-gray-500'">
      Pelajari cara menghubungkan integrasi atau hubungi tim support kami.
    </p>
    <button class="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-medium transition">
      Pusat Bantuan
      <ArrowTopRightOnSquareIcon class="w-3.5 h-3.5" />
    </button>
  </div>
</template>