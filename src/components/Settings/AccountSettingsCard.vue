<script setup>
import { BuildingLibraryIcon, ArrowRightIcon } from '@heroicons/vue/24/outline'
import { useTheme } from '@/composables/useTheme'

const props = defineProps({
  settings: { type: Object, required: true },
  accountOptions: { type: Array, default: () => [] },
})

const { isDark } = useTheme()
</script>

<template>
  <div class="rounded-2xl border p-5" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
    <div class="flex items-center justify-between mb-4">
      <p class="text-base font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">Akun & Rekening</p>
      <router-link
        to="/management/accounts"
        class="inline-flex items-center gap-1 text-sm text-purple-400 hover:text-purple-300 transition"
      >
        Kelola Rekening
        <ArrowRightIcon class="w-3.5 h-3.5" />
      </router-link>
    </div>

    <div class="divide-y" :class="isDark ? 'divide-white/5' : 'divide-gray-100'">
      <!-- Rekening Default -->
      <div class="flex flex-col sm:flex-row sm:items-center gap-3 py-4">
        <div class="flex items-start gap-3 flex-1 min-w-0">
          <div class="w-10 h-10 rounded-xl bg-purple-500/15 flex items-center justify-center flex-shrink-0">
            <BuildingLibraryIcon class="w-5 h-5 text-purple-400" />
          </div>
          <div class="min-w-0">
            <p class="text-sm font-medium" :class="isDark ? 'text-white' : 'text-gray-900'">Rekening Default</p>
            <p class="text-xs mt-0.5" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Rekening yang dipakai otomatis saat mencatat transaksi baru.</p>
          </div>
        </div>
        <select
          v-model="settings.rekeningDefault"
          class="w-full sm:w-64 border rounded-xl py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition flex-shrink-0"
          :class="isDark ? 'bg-[#181428]/80 border-white/10 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'"
        >
          <option v-for="opt in accountOptions" :key="opt" :value="opt">{{ opt }}</option>
        </select>
      </div>

      <!-- Tampilkan Saldo di Dashboard -->
      <div class="flex items-center gap-3 py-4">
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium" :class="isDark ? 'text-white' : 'text-gray-900'">Tampilkan Saldo di Dashboard</p>
          <p class="text-xs mt-0.5" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Ringkasan saldo semua rekening akan tampil di halaman Dashboard.</p>
        </div>
        <button
          type="button"
          class="relative w-11 h-6 rounded-full transition-colors flex-shrink-0"
          :class="settings.tampilkanSaldoDashboard ? 'bg-purple-600' : (isDark ? 'bg-white/10' : 'bg-gray-300')"
          @click="settings.tampilkanSaldoDashboard = !settings.tampilkanSaldoDashboard"
        >
          <span
            class="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform"
            :class="settings.tampilkanSaldoDashboard ? 'translate-x-5' : 'translate-x-0'"
          ></span>
        </button>
      </div>

      <!-- Notifikasi Saldo Rendah -->
      <div class="flex items-center gap-3 py-4">
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium" :class="isDark ? 'text-white' : 'text-gray-900'">Notifikasi Saldo Rendah</p>
          <p class="text-xs mt-0.5" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Kirim notifikasi jika saldo rekening di bawah batas tertentu.</p>
        </div>
        <button
          type="button"
          class="relative w-11 h-6 rounded-full transition-colors flex-shrink-0"
          :class="settings.notifikasiSaldoRendah ? 'bg-purple-600' : (isDark ? 'bg-white/10' : 'bg-gray-300')"
          @click="settings.notifikasiSaldoRendah = !settings.notifikasiSaldoRendah"
        >
          <span
            class="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform"
            :class="settings.notifikasiSaldoRendah ? 'translate-x-5' : 'translate-x-0'"
          ></span>
        </button>
      </div>

      <!-- Batas Saldo Minimum, hanya tampil jika notifikasi aktif -->
      <div v-if="settings.notifikasiSaldoRendah" class="flex flex-col sm:flex-row sm:items-center gap-3 py-4">
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium" :class="isDark ? 'text-white' : 'text-gray-900'">Batas Saldo Minimum</p>
          <p class="text-xs mt-0.5" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Ambang batas saldo (Rp) yang memicu notifikasi.</p>
        </div>
        <div class="relative w-full sm:w-64 flex-shrink-0">
          <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm" :class="isDark ? 'text-gray-500' : 'text-gray-400'">Rp</span>
          <input
            v-model="settings.batasSaldoMinimum"
            type="number"
            min="0"
            class="w-full rounded-xl pl-9 pr-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition"
            :class="isDark ? 'bg-[#181428]/80 border border-white/10 text-white' : 'bg-gray-50 border border-gray-200 text-gray-900'"
          />
        </div>
      </div>
    </div>
  </div>
</template>