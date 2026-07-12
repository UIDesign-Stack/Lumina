<script setup>
import { CheckCircleIcon, SparklesIcon, WrenchScrewdriverIcon, BugAntIcon } from '@heroicons/vue/24/outline'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import { useTheme } from '@/composables/useTheme'
import { usePengaturanData } from '@/composables/usePengaturanData'

const { isDark } = useTheme()
const { aboutApp } = usePengaturanData()

// TODO: ganti dengan data changelog asli, idealnya dari CHANGELOG.md atau API
const releases = [
  {
    version: 'Versi 1.0.0',
    date: '10 Juli 2026',
    tag: 'Rilis Awal',
    tagColor: 'emerald',
    changes: [
      { type: 'feature', text: 'Peluncuran perdana Lumina Finance untuk manajemen keuangan perusahaan.' },
      { type: 'feature', text: 'Modul Transaksi, Laporan Keuangan, Buku Besar, dan Rekonsiliasi.' },
      { type: 'feature', text: 'Integrasi dengan QuickBooks, Google Drive, dan Mailchimp.' },
    ],
  },
]

const typeConfig = {
  feature: { icon: SparklesIcon, label: 'Fitur Baru', color: 'text-purple-400' },
  improvement: { icon: WrenchScrewdriverIcon, label: 'Peningkatan', color: 'text-blue-400' },
  fix: { icon: BugAntIcon, label: 'Perbaikan', color: 'text-amber-400' },
}
</script>

<template>
  <DashboardLayout>
    <div class="mb-6">
      <h1 class="text-2xl font-bold" :class="isDark ? 'text-white' : 'text-gray-900'">Tentang Aplikasi</h1>
      <p class="text-sm mt-1" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Informasi versi dan riwayat pembaruan Lumina Finance.</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 space-y-4">
        <div class="rounded-2xl border" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
          <div class="px-5 py-4 border-b" :class="isDark ? 'border-white/5' : 'border-gray-100'">
            <p class="text-base font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">Riwayat Rilis</p>
          </div>

          <div class="divide-y" :class="isDark ? 'divide-white/5' : 'divide-gray-100'">
            <div v-for="release in releases" :key="release.version" class="px-5 py-5">
              <div class="flex items-center gap-2.5 mb-3">
                <p class="text-sm font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">{{ release.version }}</p>
                <span
                  class="text-[10px] font-medium px-2 py-0.5 rounded-full"
                  :class="isDark ? 'bg-emerald-500/15 text-emerald-400' : 'bg-emerald-50 text-emerald-600'"
                >
                  {{ release.tag }}
                </span>
                <span class="text-xs" :class="isDark ? 'text-gray-500' : 'text-gray-400'">{{ release.date }}</span>
              </div>

              <ul class="space-y-2">
                <li v-for="(change, idx) in release.changes" :key="idx" class="flex items-start gap-2.5">
                  <component
                    :is="typeConfig[change.type]?.icon || CheckCircleIcon"
                    class="w-4 h-4 mt-0.5 shrink-0"
                    :class="typeConfig[change.type]?.color || 'text-gray-400'"
                  />
                  <span class="text-sm" :class="isDark ? 'text-gray-300' : 'text-gray-700'">{{ change.text }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <div class="rounded-2xl border p-5 text-center" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-400 via-purple-500 to-fuchsia-500 flex items-center justify-center mx-auto mb-3">
            <span class="text-white font-bold text-xl">L</span>
          </div>
          <p class="text-base font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">{{ aboutApp.name }}</p>
          <p class="text-xs mt-0.5 mb-3" :class="isDark ? 'text-gray-500' : 'text-gray-400'">{{ aboutApp.version }}</p>
          <p class="text-sm leading-relaxed" :class="isDark ? 'text-gray-400' : 'text-gray-600'">{{ aboutApp.description }}</p>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>