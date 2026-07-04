<script setup>
import { LockClosedIcon } from '@heroicons/vue/24/solid'
import { ArrowRightIcon } from '@heroicons/vue/24/outline'
import { useTheme } from '@/composables/useTheme'

const { isDark } = useTheme()
</script>

<template>
  <div class="rounded-2xl border p-5" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
    <div class="flex items-start gap-3">
      <div class="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center flex-shrink-0">
        <LockClosedIcon class="w-5 h-5 text-emerald-400" />
      </div>
      <div>
        <p class="text-sm font-semibold mb-1" :class="isDark ? 'text-white' : 'text-gray-900'">Keamanan Transaksi</p>
        <p class="text-sm leading-relaxed" :class="isDark ? 'text-gray-400' : 'text-gray-500'">
          Semua transaksi transfer dienkripsi dengan standar keamanan tinggi.
        </p>
        <a href="#" class="inline-flex items-center gap-1 text-sm text-purple-400 hover:text-purple-300 transition mt-2">
          Pelajari lebih lanjut
          <ArrowRightIcon class="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  </div>
</template>