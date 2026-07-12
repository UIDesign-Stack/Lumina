<script setup>
import { useTheme } from '@/composables/useTheme'

const props = defineProps({
  settings: { type: Object, required: true },
})

const { isDark } = useTheme()

const tarifPPNOptions = ['11%', '12%', '0% (Bebas PPN)']
const metodePajakOptions = ['Tidak Termasuk Pajak (Exclusive)', 'Termasuk Pajak (Inclusive)']
</script>

<template>
  <div class="rounded-2xl border p-5" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
    <p class="text-base font-semibold mb-1" :class="isDark ? 'text-white' : 'text-gray-900'">Pengaturan Pajak</p>
    <p class="text-xs mb-4" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Kelola status PKP dan preferensi perhitungan pajak perusahaan.</p>

    <div class="divide-y" :class="isDark ? 'divide-white/5' : 'divide-gray-100'">
      <!-- Status PKP -->
      <div class="flex items-center gap-3 py-4">
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium" :class="isDark ? 'text-white' : 'text-gray-900'">Status PKP</p>
          <p class="text-xs mt-0.5" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Aktifkan jika perusahaan berstatus Pengusaha Kena Pajak.</p>
        </div>
        <button
          type="button"
          class="relative w-11 h-6 rounded-full transition-colors flex-shrink-0"
          :class="settings.statusPKP ? 'bg-purple-600' : (isDark ? 'bg-white/10' : 'bg-gray-300')"
          @click="settings.statusPKP = !settings.statusPKP"
        >
          <span
            class="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform"
            :class="settings.statusPKP ? 'translate-x-5' : 'translate-x-0'"
          ></span>
        </button>
      </div>

      <!-- Nomor Pengukuhan PKP, tampil jika PKP aktif -->
      <div v-if="settings.statusPKP" class="flex flex-col sm:flex-row sm:items-center gap-3 py-4">
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium" :class="isDark ? 'text-white' : 'text-gray-900'">Nomor Pengukuhan PKP</p>
          <p class="text-xs mt-0.5" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Nomor surat pengukuhan sebagai Pengusaha Kena Pajak.</p>
        </div>
        <input
          v-model="settings.nomorPengukuhanPKP"
          type="text"
          class="w-full sm:w-64 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition flex-shrink-0"
          :class="isDark ? 'bg-[#181428]/80 border border-white/10 text-white' : 'bg-gray-50 border border-gray-200 text-gray-900'"
        />
      </div>

      <!-- Tarif PPN Default -->
      <div class="flex flex-col sm:flex-row sm:items-center gap-3 py-4">
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium" :class="isDark ? 'text-white' : 'text-gray-900'">Tarif PPN Default</p>
          <p class="text-xs mt-0.5" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Tarif PPN yang otomatis diterapkan pada transaksi baru.</p>
        </div>
        <select
          v-model="settings.tarifPPNDefault"
          class="w-full sm:w-64 border rounded-xl py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition flex-shrink-0"
          :class="isDark ? 'bg-[#181428]/80 border-white/10 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'"
        >
          <option v-for="opt in tarifPPNOptions" :key="opt" :value="opt">{{ opt }}</option>
        </select>
      </div>

      <!-- Metode Perhitungan Pajak -->
      <div class="flex flex-col sm:flex-row sm:items-center gap-3 py-4">
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium" :class="isDark ? 'text-white' : 'text-gray-900'">Metode Perhitungan Pajak</p>
          <p class="text-xs mt-0.5" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Tentukan apakah harga transaksi sudah termasuk pajak atau belum.</p>
        </div>
        <select
          v-model="settings.metodePajak"
          class="w-full sm:w-64 border rounded-xl py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition flex-shrink-0"
          :class="isDark ? 'bg-[#181428]/80 border-white/10 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'"
        >
          <option v-for="opt in metodePajakOptions" :key="opt" :value="opt">{{ opt }}</option>
        </select>
      </div>

      <!-- Pengingat Jatuh Tempo Pajak -->
      <div class="flex items-center gap-3 py-4">
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium" :class="isDark ? 'text-white' : 'text-gray-900'">Pengingat Jatuh Tempo Pajak</p>
          <p class="text-xs mt-0.5" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Terima notifikasi sebelum tanggal jatuh tempo pelaporan pajak.</p>
        </div>
        <button
          type="button"
          class="relative w-11 h-6 rounded-full transition-colors flex-shrink-0"
          :class="settings.pengingatJatuhTempo ? 'bg-purple-600' : (isDark ? 'bg-white/10' : 'bg-gray-300')"
          @click="settings.pengingatJatuhTempo = !settings.pengingatJatuhTempo"
        >
          <span
            class="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform"
            :class="settings.pengingatJatuhTempo ? 'translate-x-5' : 'translate-x-0'"
          ></span>
        </button>
      </div>

      <!-- Hari Sebelum Jatuh Tempo, tampil jika pengingat aktif -->
      <div v-if="settings.pengingatJatuhTempo" class="flex flex-col sm:flex-row sm:items-center gap-3 py-4">
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium" :class="isDark ? 'text-white' : 'text-gray-900'">Kirim Pengingat</p>
          <p class="text-xs mt-0.5" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Berapa hari sebelum jatuh tempo pengingat dikirim.</p>
        </div>
        <div class="relative w-full sm:w-64 flex-shrink-0">
          <input
            v-model="settings.hariSebelumJatuhTempo"
            type="number"
            min="1"
            max="30"
            class="w-full rounded-xl pl-3.5 pr-16 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition"
            :class="isDark ? 'bg-[#181428]/80 border border-white/10 text-white' : 'bg-gray-50 border border-gray-200 text-gray-900'"
          />
          <span class="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm" :class="isDark ? 'text-gray-500' : 'text-gray-400'">hari</span>
        </div>
      </div>
    </div>
  </div>
</template>