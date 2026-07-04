<script setup>
import { ShieldCheckIcon } from '@heroicons/vue/24/solid'
</script>

<template>
  <div class="relative rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 p-5 overflow-hidden">
    <!-- Dekorasi lingkaran & koin -->
    <div class="absolute -right-4 -top-4 w-28 h-28 bg-white/10 rounded-full"></div>
    <div class="absolute right-6 bottom-4 w-10 h-10 bg-amber-400/90 rounded-full flex items-center justify-center text-amber-900 text-xs font-bold rotate-12">Rp</div>
    <div class="absolute right-14 bottom-2 w-6 h-6 bg-amber-300/80 rounded-full"></div>

    <div class="relative">
      <div class="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center mb-4">
        <ShieldCheckIcon class="w-6 h-6 text-white" />
      </div>
      <p class="text-white font-semibold mb-1.5">Tingkatkan Limit Transfer</p>
      <p class="text-indigo-100 text-sm leading-relaxed mb-4">
        Tingkatkan limit harian transfer Anda agar transaksi lebih fleksibel.
      </p>
      <button class="px-4 py-2 rounded-xl bg-white text-indigo-700 text-sm font-medium hover:bg-indigo-50 transition">
        Tingkatkan Sekarang
      </button>
    </div>
  </div>
</template>