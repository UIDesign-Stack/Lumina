<script setup>
import { reactive, ref } from 'vue'
import { KeyIcon, ShieldCheckIcon, DevicePhoneMobileIcon, BellIcon, TrashIcon, ComputerDesktopIcon, MapPinIcon } from '@heroicons/vue/24/outline'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import { useTheme } from '@/composables/useTheme'

const { isDark } = useTheme()

const passwordForm = reactive({
  current: '',
  baru: '',
  konfirmasi: '',
})
const passwordErrors = reactive({})
const isSavingPassword = ref(false)
const passwordMessage = ref('')

const twoFactorEnabled = ref(false)

const notifPrefs = reactive({
  emailTransaksi: true,
  emailLaporanMingguan: true,
  emailIntegrasi: false,
})

const showDeleteConfirm = ref(false)

// TODO: ganti dengan data sesi asli dari API
const activeSessions = ref([
  { id: 1, device: 'Chrome · Windows', location: 'Bekasi, Indonesia', lastActive: 'Aktif sekarang', current: true },
  { id: 2, device: 'Safari · iPhone', location: 'Bekasi, Indonesia', lastActive: '2 jam lalu', current: false },
  { id: 3, device: 'Chrome · Android', location: 'Jakarta, Indonesia', lastActive: '3 hari lalu', current: false },
])

function handleEndSession(session) {
  // TODO: panggil API untuk mengakhiri sesi tertentu
  console.log('Akhiri sesi:', session)
  activeSessions.value = activeSessions.value.filter((s) => s.id !== session.id)
}

function handleEndAllSessions() {
  // TODO: panggil API untuk logout dari semua perangkat lain
  console.log('Keluar dari semua perangkat lain')
  activeSessions.value = activeSessions.value.filter((s) => s.current)
}

function validatePassword() {
  Object.keys(passwordErrors).forEach((k) => delete passwordErrors[k])
  if (!passwordForm.current) passwordErrors.current = 'Kata sandi saat ini wajib diisi'
  if (!passwordForm.baru) {
    passwordErrors.baru = 'Kata sandi baru wajib diisi'
  } else if (passwordForm.baru.length < 8) {
    passwordErrors.baru = 'Kata sandi baru minimal 8 karakter'
  }
  if (passwordForm.konfirmasi !== passwordForm.baru) {
    passwordErrors.konfirmasi = 'Konfirmasi kata sandi tidak cocok'
  }
  return Object.keys(passwordErrors).length === 0
}

async function handleChangePassword() {
  if (!validatePassword()) return
  isSavingPassword.value = true
  passwordMessage.value = ''
  // TODO: kirim ke API untuk mengubah password
  console.log('Ubah kata sandi:', passwordForm)
  await new Promise((r) => setTimeout(r, 600))
  isSavingPassword.value = false
  passwordMessage.value = 'Kata sandi berhasil diperbarui.'
  passwordForm.current = ''
  passwordForm.baru = ''
  passwordForm.konfirmasi = ''
  setTimeout(() => (passwordMessage.value = ''), 3000)
}

function handleToggle2FA() {
  twoFactorEnabled.value = !twoFactorEnabled.value
  // TODO: panggil API untuk enable/disable 2FA, biasanya butuh alur verifikasi tambahan
  console.log('2FA:', twoFactorEnabled.value)
}

function handleDeleteAccount() {
  // TODO: panggil API untuk menghapus/menonaktifkan akun
  console.log('Akun dihapus (konfirmasi)')
  showDeleteConfirm.value = false
}
</script>

<template>
  <DashboardLayout>
    <div class="mb-6">
      <h1 class="text-2xl font-bold" :class="isDark ? 'text-white' : 'text-gray-900'">Pengaturan Akun</h1>
      <p class="text-sm mt-1" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Kelola keamanan, notifikasi, dan preferensi akun kamu.</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 space-y-4">
      <!-- Ubah Kata Sandi -->
      <div class="rounded-2xl border" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
        <div class="flex items-center gap-2.5 px-6 py-4 border-b" :class="isDark ? 'border-white/5' : 'border-gray-100'">
          <KeyIcon class="w-4 h-4" :class="isDark ? 'text-purple-400' : 'text-purple-500'" />
          <p class="text-sm font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">Ubah Kata Sandi</p>
        </div>
        <form @submit.prevent="handleChangePassword" class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">Kata Sandi Saat Ini</label>
            <input
              v-model="passwordForm.current"
              type="password"
              class="w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition"
              :class="isDark ? 'bg-[#181428]/80 border border-white/10 text-white' : 'bg-gray-50 border border-gray-200 text-gray-900'"
            />
            <p v-if="passwordErrors.current" class="text-xs text-rose-500 mt-1">{{ passwordErrors.current }}</p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">Kata Sandi Baru</label>
              <input
                v-model="passwordForm.baru"
                type="password"
                class="w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition"
                :class="isDark ? 'bg-[#181428]/80 border border-white/10 text-white' : 'bg-gray-50 border border-gray-200 text-gray-900'"
              />
              <p v-if="passwordErrors.baru" class="text-xs text-rose-500 mt-1">{{ passwordErrors.baru }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">Konfirmasi Kata Sandi</label>
              <input
                v-model="passwordForm.konfirmasi"
                type="password"
                class="w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition"
                :class="isDark ? 'bg-[#181428]/80 border border-white/10 text-white' : 'bg-gray-50 border border-gray-200 text-gray-900'"
              />
              <p v-if="passwordErrors.konfirmasi" class="text-xs text-rose-500 mt-1">{{ passwordErrors.konfirmasi }}</p>
            </div>
          </div>

          <div class="flex items-center gap-3 pt-1">
            <button
              type="submit"
              :disabled="isSavingPassword"
              class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-medium shadow-lg shadow-purple-900/30 transition disabled:opacity-60"
            >
              {{ isSavingPassword ? 'Menyimpan...' : 'Perbarui Kata Sandi' }}
            </button>
            <p v-if="passwordMessage" class="text-sm text-emerald-500">{{ passwordMessage }}</p>
          </div>
        </form>
      </div>

      <!-- Autentikasi Dua Faktor -->
      <div class="rounded-2xl border p-6 flex items-center justify-between gap-4" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
        <div class="flex items-start gap-3">
          <div class="w-9 h-9 rounded-xl bg-purple-500/15 flex items-center justify-center shrink-0">
            <DevicePhoneMobileIcon class="w-4 h-4 text-purple-400" />
          </div>
          <div>
            <p class="text-sm font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">Autentikasi Dua Faktor (2FA)</p>
            <p class="text-xs mt-0.5" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Tambahkan lapisan keamanan ekstra saat login.</p>
          </div>
        </div>
        <button
          type="button"
          role="switch"
          :aria-checked="twoFactorEnabled"
          class="shrink-0 w-11 h-6 rounded-full relative transition-colors"
          :class="twoFactorEnabled ? 'bg-purple-600' : (isDark ? 'bg-white/10' : 'bg-gray-300')"
          @click="handleToggle2FA"
        >
          <span
            class="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform"
            :class="twoFactorEnabled ? 'translate-x-5' : 'translate-x-0'"
          ></span>
        </button>
      </div>

      <!-- Preferensi Notifikasi -->
      <div class="rounded-2xl border" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
        <div class="flex items-center gap-2.5 px-6 py-4 border-b" :class="isDark ? 'border-white/5' : 'border-gray-100'">
          <BellIcon class="w-4 h-4" :class="isDark ? 'text-purple-400' : 'text-purple-500'" />
          <p class="text-sm font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">Preferensi Notifikasi Email</p>
        </div>
        <div class="p-6 space-y-3">
          <label class="flex items-center justify-between gap-3 cursor-pointer">
            <span class="text-sm" :class="isDark ? 'text-gray-300' : 'text-gray-700'">Notifikasi transaksi baru</span>
            <input v-model="notifPrefs.emailTransaksi" type="checkbox" class="w-4 h-4 rounded accent-purple-600" />
          </label>
          <label class="flex items-center justify-between gap-3 cursor-pointer">
            <span class="text-sm" :class="isDark ? 'text-gray-300' : 'text-gray-700'">Ringkasan laporan mingguan</span>
            <input v-model="notifPrefs.emailLaporanMingguan" type="checkbox" class="w-4 h-4 rounded accent-purple-600" />
          </label>
          <label class="flex items-center justify-between gap-3 cursor-pointer">
            <span class="text-sm" :class="isDark ? 'text-gray-300' : 'text-gray-700'">Status sinkronisasi integrasi</span>
            <input v-model="notifPrefs.emailIntegrasi" type="checkbox" class="w-4 h-4 rounded accent-purple-600" />
          </label>
        </div>
      </div>

      <!-- Zona Berbahaya -->
      <div class="rounded-2xl border" :class="isDark ? 'bg-rose-500/5 border-rose-500/20' : 'bg-rose-50 border-rose-200'">
        <div class="flex items-center gap-2.5 px-6 py-4 border-b" :class="isDark ? 'border-rose-500/10' : 'border-rose-100'">
          <ShieldCheckIcon class="w-4 h-4 text-rose-500" />
          <p class="text-sm font-semibold text-rose-500">Zona Berbahaya</p>
        </div>
        <div class="p-6 flex items-center justify-between gap-4">
          <div>
            <p class="text-sm font-medium" :class="isDark ? 'text-gray-200' : 'text-gray-800'">Hapus Akun</p>
            <p class="text-xs mt-0.5" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Tindakan ini permanen dan tidak dapat dibatalkan.</p>
          </div>
          <button
            type="button"
            class="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl border border-rose-500/40 text-rose-500 text-sm font-medium hover:bg-rose-500/10 transition"
            @click="showDeleteConfirm = true"
          >
            <TrashIcon class="w-4 h-4" />
            Hapus Akun
          </button>
        </div>
      </div>
      </div>

      <!-- Sidebar: Sesi Aktif -->
      <div class="space-y-4">
        <div class="rounded-2xl border" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
          <div class="flex items-center gap-2.5 px-5 py-4 border-b" :class="isDark ? 'border-white/5' : 'border-gray-100'">
            <ComputerDesktopIcon class="w-4 h-4" :class="isDark ? 'text-purple-400' : 'text-purple-500'" />
            <p class="text-sm font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">Sesi Aktif</p>
          </div>
          <div class="p-4 space-y-2.5">
            <div
              v-for="session in activeSessions"
              :key="session.id"
              class="rounded-xl px-3.5 py-3 border"
              :class="isDark ? 'bg-[#181428]/60 border-white/10' : 'bg-gray-50 border-gray-200'"
            >
              <div class="flex items-start justify-between gap-2">
                <div class="min-w-0">
                  <p class="text-sm font-medium truncate" :class="isDark ? 'text-gray-100' : 'text-gray-800'">
                    {{ session.device }}
                    <span v-if="session.current" class="ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-500 align-middle">Perangkat ini</span>
                  </p>
                  <p class="text-xs mt-1 flex items-center gap-1" :class="isDark ? 'text-gray-500' : 'text-gray-400'">
                    <MapPinIcon class="w-3 h-3 shrink-0" />
                    {{ session.location }}
                  </p>
                  <p class="text-xs mt-0.5" :class="isDark ? 'text-gray-500' : 'text-gray-400'">{{ session.lastActive }}</p>
                </div>
                <button
                  v-if="!session.current"
                  type="button"
                  class="shrink-0 text-xs font-medium text-rose-500 hover:text-rose-400 transition"
                  @click="handleEndSession(session)"
                >
                  Akhiri
                </button>
              </div>
            </div>
          </div>
          <div class="px-4 pb-4">
            <button
              type="button"
              class="w-full text-center py-2.5 rounded-xl border text-sm font-medium transition"
              :class="isDark ? 'border-white/10 text-gray-300 hover:bg-white/5' : 'border-gray-200 text-gray-600 hover:bg-gray-50'"
              @click="handleEndAllSessions"
            >
              Keluar dari Semua Perangkat Lain
            </button>
          </div>
        </div>

        <div class="rounded-2xl border p-5" :class="isDark ? 'bg-purple-500/5 border-purple-500/15' : 'bg-purple-50 border-purple-100'">
          <p class="text-sm font-semibold mb-1.5" :class="isDark ? 'text-white' : 'text-gray-900'">Tips Keamanan</p>
          <p class="text-xs leading-relaxed" :class="isDark ? 'text-gray-400' : 'text-gray-500'">
            Aktifkan 2FA dan gunakan kata sandi unik untuk akun ini. Segera akhiri sesi pada perangkat yang tidak kamu kenali.
          </p>
        </div>
      </div>
    </div>

    <!-- Konfirmasi Hapus Akun -->
    <Teleport to="body">
      <div v-if="showDeleteConfirm" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showDeleteConfirm = false"></div>
        <div
          class="relative w-full max-w-sm rounded-2xl border shadow-2xl p-6"
          :class="isDark ? 'bg-[#100c1c] border-white/10' : 'bg-white border-gray-200'"
        >
          <p class="text-base font-semibold mb-2" :class="isDark ? 'text-white' : 'text-gray-900'">Hapus akun kamu?</p>
          <p class="text-sm mb-5" :class="isDark ? 'text-gray-400' : 'text-gray-500'">
            Semua data pribadi terkait akun ini akan dihapus permanen. Tindakan ini tidak dapat dibatalkan.
          </p>
          <div class="flex items-center justify-end gap-3">
            <button
              type="button"
              class="px-4 py-2.5 rounded-xl text-sm font-medium transition"
              :class="isDark ? 'text-gray-300 hover:bg-white/5' : 'text-gray-600 hover:bg-gray-100'"
              @click="showDeleteConfirm = false"
            >
              Batal
            </button>
            <button
              type="button"
              class="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-sm font-medium transition"
              @click="handleDeleteAccount"
            >
              Ya, Hapus Akun
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </DashboardLayout>
</template>