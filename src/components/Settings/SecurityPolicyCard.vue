<script setup>
import { ShieldCheckIcon } from '@heroicons/vue/24/outline'
import { useTheme } from '@/composables/useTheme'

const props = defineProps({
  policy: { type: Object, required: true },
  masaBerlakuSandiOptions: { type: Array, default: () => [] },
  durasiKunciOptions: { type: Array, default: () => [] },
  waktuLogoutOptions: { type: Array, default: () => [] },
})

const { isDark } = useTheme()
</script>

<template>
  <div class="space-y-4">
    <!-- Kebijakan Login -->
    <div class="rounded-2xl border p-5" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
      <div class="flex items-center gap-2.5 mb-1">
        <ShieldCheckIcon class="w-4 h-4" :class="isDark ? 'text-purple-400' : 'text-purple-500'" />
        <p class="text-base font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">Kebijakan Login & Akses</p>
      </div>
      <p class="text-xs mb-4" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Berlaku untuk seluruh pengguna dalam organisasi ini.</p>

      <div class="divide-y" :class="isDark ? 'divide-white/5' : 'divide-gray-100'">
        <!-- Wajib 2FA -->
        <div class="flex items-center gap-3 py-4">
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium" :class="isDark ? 'text-white' : 'text-gray-900'">Wajibkan 2FA untuk Semua Pengguna</p>
            <p class="text-xs mt-0.5" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Setiap pengguna wajib mengaktifkan autentikasi dua faktor.</p>
          </div>
          <button
            type="button"
            class="relative w-11 h-6 rounded-full transition-colors flex-shrink-0"
            :class="policy.wajib2FA ? 'bg-purple-600' : (isDark ? 'bg-white/10' : 'bg-gray-300')"
            @click="policy.wajib2FA = !policy.wajib2FA"
          >
            <span
              class="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform"
              :class="policy.wajib2FA ? 'translate-x-5' : 'translate-x-0'"
            ></span>
          </button>
        </div>

        <!-- Batas Percobaan Login -->
        <div class="flex flex-col sm:flex-row sm:items-center gap-3 py-4">
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium" :class="isDark ? 'text-white' : 'text-gray-900'">Batas Percobaan Login Gagal</p>
            <p class="text-xs mt-0.5" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Akun terkunci sementara setelah gagal login berkali-kali.</p>
          </div>
          <input
            v-model="policy.batasPercobaanLogin"
            type="number"
            min="3"
            max="10"
            class="w-full sm:w-56 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition flex-shrink-0"
            :class="isDark ? 'bg-[#181428]/80 border border-white/10 text-white' : 'bg-gray-50 border border-gray-200 text-gray-900'"
          />
        </div>

        <!-- Durasi Kunci Akun -->
        <div class="flex flex-col sm:flex-row sm:items-center gap-3 py-4">
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium" :class="isDark ? 'text-white' : 'text-gray-900'">Durasi Kunci Akun</p>
            <p class="text-xs mt-0.5" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Berapa lama akun dikunci setelah melewati batas percobaan.</p>
          </div>
          <select
            v-model="policy.durasiKunciAkun"
            class="w-full sm:w-56 border rounded-xl py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition flex-shrink-0"
            :class="isDark ? 'bg-[#181428]/80 border-white/10 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'"
          >
            <option v-for="opt in durasiKunciOptions" :key="opt" :value="opt">{{ opt }}</option>
          </select>
        </div>

        <!-- Waktu Logout Otomatis -->
        <div class="flex flex-col sm:flex-row sm:items-center gap-3 py-4">
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium" :class="isDark ? 'text-white' : 'text-gray-900'">Logout Otomatis Setelah Tidak Aktif</p>
            <p class="text-xs mt-0.5" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Sesi pengguna berakhir otomatis setelah tidak ada aktivitas.</p>
          </div>
          <select
            v-model="policy.waktuLogoutOtomatis"
            class="w-full sm:w-56 border rounded-xl py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition flex-shrink-0"
            :class="isDark ? 'bg-[#181428]/80 border-white/10 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'"
          >
            <option v-for="opt in waktuLogoutOptions" :key="opt" :value="opt">{{ opt }}</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Kebijakan Kata Sandi -->
    <div class="rounded-2xl border p-5" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
      <p class="text-base font-semibold mb-1" :class="isDark ? 'text-white' : 'text-gray-900'">Kebijakan Kata Sandi</p>
      <p class="text-xs mb-4" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Aturan minimum kata sandi untuk seluruh pengguna.</p>

      <div class="divide-y" :class="isDark ? 'divide-white/5' : 'divide-gray-100'">
        <div class="flex flex-col sm:flex-row sm:items-center gap-3 py-4">
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium" :class="isDark ? 'text-white' : 'text-gray-900'">Panjang Minimal Kata Sandi</p>
            <p class="text-xs mt-0.5" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Jumlah karakter minimum yang diwajibkan.</p>
          </div>
          <input
            v-model="policy.panjangMinimalSandi"
            type="number"
            min="6"
            max="32"
            class="w-full sm:w-56 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition flex-shrink-0"
            :class="isDark ? 'bg-[#181428]/80 border border-white/10 text-white' : 'bg-gray-50 border border-gray-200 text-gray-900'"
          />
        </div>

        <div class="flex items-center gap-3 py-4">
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium" :class="isDark ? 'text-white' : 'text-gray-900'">Wajib Kombinasi Karakter</p>
            <p class="text-xs mt-0.5" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Kata sandi wajib mengandung huruf besar, angka, dan simbol.</p>
          </div>
          <button
            type="button"
            class="relative w-11 h-6 rounded-full transition-colors flex-shrink-0"
            :class="policy.wajibKombinasiSandi ? 'bg-purple-600' : (isDark ? 'bg-white/10' : 'bg-gray-300')"
            @click="policy.wajibKombinasiSandi = !policy.wajibKombinasiSandi"
          >
            <span
              class="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform"
              :class="policy.wajibKombinasiSandi ? 'translate-x-5' : 'translate-x-0'"
            ></span>
          </button>
        </div>

        <div class="flex flex-col sm:flex-row sm:items-center gap-3 py-4">
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium" :class="isDark ? 'text-white' : 'text-gray-900'">Masa Berlaku Kata Sandi</p>
            <p class="text-xs mt-0.5" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Pengguna diminta mengganti kata sandi secara berkala.</p>
          </div>
          <select
            v-model="policy.masaBerlakuSandi"
            class="w-full sm:w-56 border rounded-xl py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition flex-shrink-0"
            :class="isDark ? 'bg-[#181428]/80 border-white/10 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'"
          >
            <option v-for="opt in masaBerlakuSandiOptions" :key="opt" :value="opt">{{ opt }}</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Pembatasan Akses IP -->
    <div class="rounded-2xl border p-5" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
      <div class="flex items-center gap-3 mb-1">
        <div class="flex-1 min-w-0">
          <p class="text-base font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">Batasi Akses Berdasarkan IP</p>
          <p class="text-xs mt-0.5" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Hanya izinkan login dari alamat IP tertentu (misal jaringan kantor).</p>
        </div>
        <button
          type="button"
          class="relative w-11 h-6 rounded-full transition-colors flex-shrink-0"
          :class="policy.batasiAksesIP ? 'bg-purple-600' : (isDark ? 'bg-white/10' : 'bg-gray-300')"
          @click="policy.batasiAksesIP = !policy.batasiAksesIP"
        >
          <span
            class="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform"
            :class="policy.batasiAksesIP ? 'translate-x-5' : 'translate-x-0'"
          ></span>
        </button>
      </div>

      <div v-if="policy.batasiAksesIP" class="mt-4">
        <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">Daftar IP yang Diizinkan</label>
        <textarea
          v-model="policy.daftarIPDiizinkan"
          rows="3"
          placeholder="Satu IP per baris, misal:&#10;103.10.24.5&#10;182.253.1.100"
          class="w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition resize-none font-mono"
          :class="isDark
            ? 'bg-[#181428]/80 border border-white/10 text-white placeholder-gray-500'
            : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400'"
        ></textarea>
      </div>
    </div>
  </div>
</template>