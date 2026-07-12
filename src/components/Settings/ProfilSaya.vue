<script setup>
import { reactive, ref } from 'vue'
import { CameraIcon, CalendarDaysIcon, CheckBadgeIcon, ClockIcon, IdentificationIcon } from '@heroicons/vue/24/outline'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import { useTheme } from '@/composables/useTheme'

const { isDark } = useTheme()

// TODO: ganti dengan data pengguna asli dari store/API
const profile = reactive({
  nama: 'FajarDev',
  email: 'fajar@luminafinance.com',
  telepon: '',
  jabatan: 'Finance Manager',
  departemen: 'Keuangan',
  lokasiKantor: 'Bekasi, Jawa Barat',
  zonaWaktu: 'WIB (UTC+7)',
  bahasa: 'Bahasa Indonesia',
  bio: '',
})

// TODO: ganti dengan data asli dari API (audit log, tanggal join, dll)
const accountInfo = {
  bergabungSejak: '15 Januari 2024',
  statusAkun: 'Aktif',
  peran: 'Admin Keuangan',
  loginTerakhir: '12 Juli 2026, 09:42',
}

const avatarPreview = ref('')
const isSaving = ref(false)
const savedMessage = ref('')

function handleAvatarChange(e) {
  const file = e.target.files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    avatarPreview.value = reader.result
  }
  reader.readAsDataURL(file)
}

async function handleSave() {
  isSaving.value = true
  savedMessage.value = ''
  // TODO: kirim `profile` (dan avatar) ke API
  console.log('Simpan profil:', profile)
  await new Promise((r) => setTimeout(r, 600))
  isSaving.value = false
  savedMessage.value = 'Perubahan profil berhasil disimpan.'
  setTimeout(() => (savedMessage.value = ''), 3000)
}
</script>

<template>
  <DashboardLayout>
    <div class="mb-6">
      <h1 class="text-2xl font-bold" :class="isDark ? 'text-white' : 'text-gray-900'">Profil Saya</h1>
      <p class="text-sm mt-1" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Kelola informasi profil dan identitas akun kamu.</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <div class="lg:col-span-2 rounded-2xl border" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
      <form @submit.prevent="handleSave" class="p-6 space-y-6">
        <!-- Avatar -->
        <div class="flex items-center gap-4">
          <div class="relative">
            <div class="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center text-white text-2xl font-semibold overflow-hidden">
              <img v-if="avatarPreview" :src="avatarPreview" alt="Avatar" class="w-full h-full object-cover" />
              <span v-else>{{ profile.nama.charAt(0) }}</span>
            </div>
            <label
              class="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center cursor-pointer border-2 transition"
              :class="isDark ? 'bg-[#181428] border-[#100c1c] text-gray-300 hover:text-white' : 'bg-white border-white text-gray-500 hover:text-gray-900 shadow'"
            >
              <CameraIcon class="w-3.5 h-3.5" />
              <input type="file" accept="image/*" class="hidden" @change="handleAvatarChange" />
            </label>
          </div>
          <div>
            <p class="text-sm font-medium" :class="isDark ? 'text-white' : 'text-gray-900'">{{ profile.nama }}</p>
            <p class="text-xs mt-0.5" :class="isDark ? 'text-gray-500' : 'text-gray-400'">{{ profile.jabatan }} · {{ profile.departemen }}</p>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <!-- Nama -->
          <div>
            <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">Nama Lengkap</label>
            <input
              v-model="profile.nama"
              type="text"
              class="w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition"
              :class="isDark ? 'bg-[#181428]/80 border border-white/10 text-white' : 'bg-gray-50 border border-gray-200 text-gray-900'"
            />
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">Email</label>
            <input
              v-model="profile.email"
              type="email"
              disabled
              class="w-full rounded-xl px-3.5 py-2.5 text-sm cursor-not-allowed opacity-70"
              :class="isDark ? 'bg-[#181428]/50 border border-white/10 text-gray-400' : 'bg-gray-100 border border-gray-200 text-gray-500'"
            />
            <p class="text-xs mt-1" :class="isDark ? 'text-gray-500' : 'text-gray-400'">Hubungi admin untuk mengubah email.</p>
          </div>

          <!-- Telepon -->
          <div>
            <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">Nomor Telepon</label>
            <input
              v-model="profile.telepon"
              type="tel"
              placeholder="08xxxxxxxxxx"
              class="w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition"
              :class="isDark
                ? 'bg-[#181428]/80 border border-white/10 text-white placeholder-gray-500'
                : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400'"
            />
          </div>

          <!-- Jabatan (read-only, biasanya diatur admin) -->
          <div>
            <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">Jabatan</label>
            <input
              v-model="profile.jabatan"
              type="text"
              disabled
              class="w-full rounded-xl px-3.5 py-2.5 text-sm cursor-not-allowed opacity-70"
              :class="isDark ? 'bg-[#181428]/50 border border-white/10 text-gray-400' : 'bg-gray-100 border border-gray-200 text-gray-500'"
            />
          </div>

          <!-- Lokasi Kantor -->
          <div>
            <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">Lokasi Kantor</label>
            <input
              v-model="profile.lokasiKantor"
              type="text"
              placeholder="Kota, Provinsi"
              class="w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition"
              :class="isDark
                ? 'bg-[#181428]/80 border border-white/10 text-white placeholder-gray-500'
                : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400'"
            />
          </div>

          <!-- Zona Waktu -->
          <div>
            <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">Zona Waktu</label>
            <select
              v-model="profile.zonaWaktu"
              class="w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition"
              :class="isDark ? 'bg-[#181428]/80 border border-white/10 text-white' : 'bg-gray-50 border border-gray-200 text-gray-900'"
            >
              <option>WIB (UTC+7)</option>
              <option>WITA (UTC+8)</option>
              <option>WIT (UTC+9)</option>
            </select>
          </div>

          <!-- Bahasa -->
          <div>
            <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">Bahasa Tampilan</label>
            <select
              v-model="profile.bahasa"
              class="w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition"
              :class="isDark ? 'bg-[#181428]/80 border border-white/10 text-white' : 'bg-gray-50 border border-gray-200 text-gray-900'"
            >
              <option>Bahasa Indonesia</option>
              <option>English</option>
            </select>
          </div>
        </div>

        <!-- Bio -->
        <div>
          <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">Bio</label>
          <textarea
            v-model="profile.bio"
            rows="3"
            placeholder="Ceritakan sedikit tentang dirimu (opsional)"
            class="w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition resize-none"
            :class="isDark
              ? 'bg-[#181428]/80 border border-white/10 text-white placeholder-gray-500'
              : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400'"
          ></textarea>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-3 pt-2 border-t" :class="isDark ? 'border-white/5' : 'border-gray-100'">
          <button
            type="submit"
            :disabled="isSaving"
            class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-medium shadow-lg shadow-purple-900/30 transition disabled:opacity-60"
          >
            {{ isSaving ? 'Menyimpan...' : 'Simpan Perubahan' }}
          </button>
          <p v-if="savedMessage" class="text-sm text-emerald-500">{{ savedMessage }}</p>
        </div>
      </form>
    </div>

    <!-- Sidebar: Info Akun -->
    <div class="space-y-4">
      <div class="rounded-2xl border" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
        <div class="px-5 py-4 border-b" :class="isDark ? 'border-white/5' : 'border-gray-100'">
          <p class="text-sm font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">Info Akun</p>
        </div>
        <div class="p-5 space-y-4">
          <div class="flex items-start gap-2.5">
            <CalendarDaysIcon class="w-4 h-4 mt-0.5 shrink-0" :class="isDark ? 'text-gray-500' : 'text-gray-400'" />
            <div>
              <p class="text-xs" :class="isDark ? 'text-gray-500' : 'text-gray-400'">Bergabung Sejak</p>
              <p class="text-sm font-medium" :class="isDark ? 'text-gray-200' : 'text-gray-800'">{{ accountInfo.bergabungSejak }}</p>
            </div>
          </div>
          <div class="flex items-start gap-2.5">
            <CheckBadgeIcon class="w-4 h-4 mt-0.5 shrink-0" :class="isDark ? 'text-gray-500' : 'text-gray-400'" />
            <div>
              <p class="text-xs" :class="isDark ? 'text-gray-500' : 'text-gray-400'">Status Akun</p>
              <p class="text-sm font-medium flex items-center gap-1.5" :class="isDark ? 'text-gray-200' : 'text-gray-800'">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                {{ accountInfo.statusAkun }}
              </p>
            </div>
          </div>
          <div class="flex items-start gap-2.5">
            <IdentificationIcon class="w-4 h-4 mt-0.5 shrink-0" :class="isDark ? 'text-gray-500' : 'text-gray-400'" />
            <div>
              <p class="text-xs" :class="isDark ? 'text-gray-500' : 'text-gray-400'">Peran Akses</p>
              <p class="text-sm font-medium" :class="isDark ? 'text-gray-200' : 'text-gray-800'">{{ accountInfo.peran }}</p>
            </div>
          </div>
          <div class="flex items-start gap-2.5">
            <ClockIcon class="w-4 h-4 mt-0.5 shrink-0" :class="isDark ? 'text-gray-500' : 'text-gray-400'" />
            <div>
              <p class="text-xs" :class="isDark ? 'text-gray-500' : 'text-gray-400'">Login Terakhir</p>
              <p class="text-sm font-medium" :class="isDark ? 'text-gray-200' : 'text-gray-800'">{{ accountInfo.loginTerakhir }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="rounded-2xl border p-5" :class="isDark ? 'bg-purple-500/5 border-purple-500/15' : 'bg-purple-50 border-purple-100'">
        <p class="text-sm font-semibold mb-1.5" :class="isDark ? 'text-white' : 'text-gray-900'">Lengkapi Profil</p>
        <p class="text-xs leading-relaxed" :class="isDark ? 'text-gray-400' : 'text-gray-500'">
          Profil yang lengkap memudahkan tim lain mengenali dan menghubungi kamu di dalam sistem.
        </p>
      </div>
    </div>
    </div>
  </DashboardLayout>
</template>