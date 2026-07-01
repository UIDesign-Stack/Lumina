<script setup>
import {
  ShieldCheckIcon,
  ChartPieIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/vue/24/outline'

defineProps({
  title: {
    type: String,
    default: 'Kelola Keuangan Perusahaan dengan Lebih Cerdas',
  },
  description: {
    type: String,
    default:
      'Lumina Finance membantu perusahaan Anda mengelola keuangan, laporan, dan analisis dalam satu platform terintegrasi.',
  },
  showStats: {
    type: Boolean,
    default: true,
  },
})
</script>

<template>
  <div class="relative hidden lg:block">
    <!-- Ambient glow -->
    <div class="absolute -top-20 -left-20 w-96 h-96 bg-purple-700/20 rounded-full blur-3xl pointer-events-none"></div>

    <!-- Logo -->
    <div class="relative flex items-center gap-3 mb-14">
      <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-400 via-purple-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-purple-900/40">
        <span class="text-white font-bold text-lg">L</span>
      </div>
      <div>
        <p class="text-white font-semibold tracking-[0.2em] text-lg leading-none">LUMINA</p>
        <p class="text-gray-400 text-[11px] tracking-[0.3em] mt-1">FINANCE</p>
      </div>
    </div>

    <!-- Headline: default rendering dari prop `title`, atau override lewat slot #title untuk markup kustom (mis. sebagian teks berwarna) -->
    <h1 class="relative text-4xl font-bold text-white leading-tight mb-5 whitespace-pre-line">
      <slot name="title">{{ title }}</slot>
    </h1>
    <p class="relative text-gray-400 text-base leading-relaxed max-w-md mb-8">
      {{ description }}
    </p>

    <!-- Konten tambahan opsional (mis. daftar fitur), tampil di antara deskripsi & ilustrasi -->
    <div class="relative mb-8">
      <slot name="features" />
    </div>

    <!-- Ilustrasi: default kartu statistik, atau override lewat slot #illustration -->
    <slot name="illustration">
      <div v-if="showStats" class="relative h-72">
        <!-- Glow dasar -->
        <div class="absolute bottom-0 left-24 w-40 h-16 bg-purple-600/40 rounded-full blur-2xl"></div>

        <!-- Kartu Total Aset -->
        <div class="absolute left-0 top-0 w-52 rounded-2xl bg-[#12101c]/90 border border-white/10 backdrop-blur-sm p-4 shadow-xl">
          <p class="text-gray-400 text-xs mb-1">Total Aset</p>
          <p class="text-white font-semibold text-lg">Rp 56.750.000.000</p>
          <p class="text-emerald-400 text-xs flex items-center gap-1 mt-1">
            <ArrowTrendingUpIcon class="w-3.5 h-3.5" />
            8.6% dari periode lalu
          </p>
        </div>

        <!-- Kartu Grafik -->
        <div class="absolute right-0 top-8 w-44 h-36 rounded-2xl bg-[#12101c]/90 border border-white/10 backdrop-blur-sm p-4 shadow-xl flex flex-col gap-3">
          <div class="h-2 w-16 rounded bg-white/10"></div>
          <div class="flex items-end gap-4 flex-1">
            <div class="w-10 h-10 rounded-full border-[6px] border-purple-500/70" style="border-right-color:#f472b6;border-bottom-color:#f472b6;"></div>
            <div class="flex items-end gap-1.5 flex-1 h-16">
              <div class="w-2.5 bg-purple-500/60 rounded-t h-6"></div>
              <div class="w-2.5 bg-purple-500/80 rounded-t h-10"></div>
              <div class="w-2.5 bg-gradient-to-t from-purple-500 to-fuchsia-400 rounded-t h-16"></div>
            </div>
          </div>
        </div>

        <!-- Kartu tren garis -->
        <div class="absolute left-14 bottom-4 w-52 h-28 rounded-2xl bg-[#12101c]/90 border border-white/10 backdrop-blur-sm p-4 shadow-xl">
          <div class="h-2 w-20 rounded bg-white/10 mb-3"></div>
          <svg viewBox="0 0 160 50" class="w-full h-12">
            <polyline
              points="0,35 20,25 40,32 60,15 80,22 100,8 120,18 140,4 160,10"
              fill="none"
              stroke="url(#lineGrad)"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <circle cx="100" cy="8" r="4" fill="#a855f7" />
            <defs>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stop-color="#818cf8" />
                <stop offset="100%" stop-color="#e879f9" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <!-- Kartu shield -->
        <div class="absolute left-0 bottom-0 w-16 h-16 rounded-2xl bg-[#12101c]/90 border border-white/10 backdrop-blur-sm flex items-center justify-center shadow-xl">
          <ShieldCheckIcon class="w-7 h-7 text-purple-400" />
        </div>

        <!-- Kartu pie -->
        <div class="absolute right-4 bottom-0 w-16 h-16 rounded-2xl bg-[#12101c]/90 border border-white/10 backdrop-blur-sm flex items-center justify-center shadow-xl">
          <ChartPieIcon class="w-7 h-7 text-fuchsia-400" />
        </div>
      </div>
    </slot>

    <!-- Footer opsional, mis. link "Sudah punya akun? Masuk di sini" -->
    <div class="relative mt-8">
      <slot name="footer" />
    </div>
  </div>
</template>