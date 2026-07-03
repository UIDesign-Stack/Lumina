<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  UserIcon,
  EnvelopeIcon,
  BuildingOffice2Icon,
  UsersIcon,
  PhoneIcon,
  BriefcaseIcon,
  LockClosedIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  CheckCircleIcon,
} from '@heroicons/vue/24/outline'
import AuthLayout from '@/layouts/AuthLayout.vue'
import AuthCard from '@/components/Auth/AuthCard.vue'
import AuthTextField from '@/components/Auth/AuthTextField.vue'
import AuthSelectField from '@/components/Auth/AuthSelectField.vue'
import AuthPrimaryButton from '@/components/Auth/AuthPrimaryButton.vue'
import AuthSecondaryButton from '@/components/Auth/AuthSecondaryButton.vue'
import AuthDivider from '@/components/Auth/AuthDivider.vue'
import AuthErrorBanner from '@/components/Auth/AuthErrorBanner.vue'
import { useAuth } from '@/composables/useAuth'
import { useTheme } from '@/composables/useTheme'

const router = useRouter()
const { isLoading, errorMessage, register } = useAuth()
const { isDark } = useTheme()

const name = ref('')
const email = ref('')
const companyName = ref('')
const companySize = ref('')
const phone = ref('')
const jobTitle = ref('')
const password = ref('')
const confirmPassword = ref('')
const agreeTerms = ref(false)

const companySizeOptions = [
  { value: '1-10', label: '1 - 10 karyawan' },
  { value: '11-50', label: '11 - 50 karyawan' },
  { value: '51-200', label: '51 - 200 karyawan' },
  { value: '200+', label: 'Lebih dari 200 karyawan' },
]

const hasMinLength = computed(() => password.value.length >= 8)
const hasUpperLower = computed(() => /[a-z]/.test(password.value) && /[A-Z]/.test(password.value))
const hasNumber = computed(() => /[0-9]/.test(password.value))
const hasSymbol = computed(() => /[^A-Za-z0-9]/.test(password.value))

async function handleSubmit() {
  try {
    await register({
      name: name.value,
      email: email.value,
      companyName: companyName.value,
      companySize: companySize.value,
      phone: phone.value,
      jobTitle: jobTitle.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
      agreeTerms: agreeTerms.value,
    })
    router.push('/login')
  } catch {
    // errorMessage sudah diisi di dalam useAuth
  }
}

function handleGoogleRegister() {
  // TODO: sambungkan ke OAuth Google
  console.log('Daftar dengan Google')
}
</script>

<template>
  <AuthLayout max-width="max-w-7xl" :show-stats="false">
    <template #brand-title>
      Mulai Kelola Keuangan<br />
      Perusahaan dengan<br />
      <span class="bg-gradient-to-r from-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">Lebih Cerdas</span>
    </template>

    <template #brand-features>
      <div class="space-y-5">
        <div class="flex items-start gap-3">
          <div class="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
            <ShieldCheckIcon class="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <p class="text-white text-sm font-medium">Aman &amp; Terpercaya</p>
            <p class="text-gray-400 text-sm">Keamanan data terjamin dengan enkripsi tingkat enterprise.</p>
          </div>
        </div>

        <div class="flex items-start gap-3">
          <div class="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
            <ChartBarIcon class="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <p class="text-white text-sm font-medium">Laporan Real-time</p>
            <p class="text-gray-400 text-sm">Pantau keuangan perusahaan Anda secara real-time kapan saja.</p>
          </div>
        </div>

        <div class="flex items-start gap-3">
          <div class="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
            <UsersIcon class="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <p class="text-white text-sm font-medium">Mudah Digunakan</p>
            <p class="text-gray-400 text-sm">Antarmuka intuitif yang dirancang untuk tim keuangan modern.</p>
          </div>
        </div>
      </div>
    </template>

    <template #brand-footer>
      <p class="text-sm text-gray-400">
        Sudah punya akun?
        <router-link to="/login" class="text-purple-400 hover:text-purple-300 transition">Masuk di sini</router-link>
      </p>
    </template>

    <template #brand-illustration>
      <div class="relative h-80">
        <div class="absolute bottom-2 left-1/2 -translate-x-1/2 w-56 h-20 bg-purple-600/40 rounded-full blur-3xl"></div>

        <div class="absolute left-8 top-0 w-72 rounded-2xl bg-[#12101c]/90 border border-white/10 backdrop-blur-sm p-5 shadow-2xl">
          <div class="flex items-center gap-1.5 mb-4">
            <span class="w-2 h-2 rounded-full bg-red-400/70"></span>
            <span class="w-2 h-2 rounded-full bg-yellow-400/70"></span>
            <span class="w-2 h-2 rounded-full bg-emerald-400/70"></span>
            <div class="ml-3 h-2 w-20 rounded bg-white/10"></div>
          </div>

          <svg viewBox="0 0 260 90" class="w-full h-24">
            <polyline
              points="0,65 30,55 60,68 90,35 120,50 150,20 180,42 210,10 240,30 260,18"
              fill="none"
              stroke="url(#regLineGrad)"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <circle cx="180" cy="42" r="5" fill="#a855f7" />
            <defs>
              <linearGradient id="regLineGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stop-color="#818cf8" />
                <stop offset="100%" stop-color="#e879f9" />
              </linearGradient>
            </defs>
          </svg>

          <div class="h-2 w-32 rounded bg-white/10 mt-4"></div>
        </div>

        <div class="absolute left-0 bottom-8 w-32 h-32 rounded-2xl bg-[#12101c]/90 border border-white/10 backdrop-blur-sm p-4 shadow-xl flex items-center justify-center">
          <div class="w-16 h-16 rounded-full" style="background: conic-gradient(#a855f7 0% 45%, #f472b6 45% 70%, #6366f1 70% 100%);">
            <div class="w-8 h-8 rounded-full bg-[#12101c] m-auto translate-y-4"></div>
          </div>
        </div>

        <div class="absolute right-4 bottom-0 w-32 h-28 rounded-2xl bg-[#12101c]/90 border border-white/10 backdrop-blur-sm p-4 shadow-xl flex items-end gap-2">
          <div class="w-3 bg-purple-500/50 rounded-t h-8"></div>
          <div class="w-3 bg-purple-500/70 rounded-t h-14"></div>
          <div class="w-3 bg-gradient-to-t from-purple-500 to-fuchsia-400 rounded-t h-20"></div>
          <div class="w-3 bg-purple-500/60 rounded-t h-11"></div>
        </div>

        <div class="absolute right-0 top-6 w-14 h-14 rounded-2xl bg-[#12101c]/90 border border-purple-500/30 backdrop-blur-sm flex items-center justify-center shadow-xl">
          <ShieldCheckIcon class="w-6 h-6 text-purple-400" />
        </div>
      </div>
    </template>

    <AuthCard wide title="Buat Akun Lumina Finance" subtitle="Isi informasi di bawah untuk membuat akun baru">
      <form class="space-y-5" @submit.prevent="handleSubmit">
        <AuthErrorBanner :message="errorMessage" />

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <AuthTextField id="name" v-model="name" label="Nama Lengkap" autocomplete="name" placeholder="Masukkan nama lengkap Anda" :icon="UserIcon" />
          <AuthTextField id="email" v-model="email" label="Email" type="email" autocomplete="email" placeholder="nama@perusahaan.com" :icon="EnvelopeIcon" />
          <AuthTextField id="company-name" v-model="companyName" label="Nama Perusahaan" autocomplete="organization" placeholder="Masukkan nama perusahaan" :icon="BuildingOffice2Icon" />

          <AuthSelectField
            id="company-size"
            v-model="companySize"
            label="Ukuran Perusahaan"
            placeholder="Pilih ukuran perusahaan"
            :icon="UsersIcon"
            :options="companySizeOptions"
          />

          <AuthTextField id="phone" v-model="phone" label="Nomor Telepon" type="tel" autocomplete="tel" placeholder="+62 812-3456-7890" :icon="PhoneIcon" />
          <AuthTextField id="job-title" v-model="jobTitle" label="Jabatan" placeholder="Contoh: Finance Manager" :icon="BriefcaseIcon" />

          <AuthTextField id="password" v-model="password" label="Kata Sandi" autocomplete="new-password" placeholder="Minimal 8 karakter" :icon="LockClosedIcon" revealable />
          <AuthTextField id="confirm-password" v-model="confirmPassword" label="Konfirmasi Kata Sandi" autocomplete="new-password" placeholder="Ulangi kata sandi Anda" :icon="LockClosedIcon" revealable />
        </div>

        <div class="rounded-xl border p-4" :class="isDark ? 'bg-purple-500/5 border-purple-500/20' : 'bg-purple-50 border-purple-200'">
          <p class="flex items-center gap-2 text-sm font-medium mb-3" :class="isDark ? 'text-white' : 'text-gray-900'">
            <ShieldCheckIcon class="w-4 h-4 text-purple-400" />
            Kata sandi harus mengandung:
          </p>
          <ul class="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6">
            <li class="flex items-center gap-2 text-sm" :class="hasMinLength ? (isDark ? 'text-gray-200' : 'text-gray-800') : 'text-gray-500'">
              <CheckCircleIcon class="w-4 h-4 flex-shrink-0" :class="hasMinLength ? 'text-purple-400' : 'text-gray-500'" />
              Minimal 8 karakter
            </li>
            <li class="flex items-center gap-2 text-sm" :class="hasUpperLower ? (isDark ? 'text-gray-200' : 'text-gray-800') : 'text-gray-500'">
              <CheckCircleIcon class="w-4 h-4 flex-shrink-0" :class="hasUpperLower ? 'text-purple-400' : 'text-gray-500'" />
              Mengandung huruf besar dan kecil
            </li>
            <li class="flex items-center gap-2 text-sm" :class="hasNumber ? (isDark ? 'text-gray-200' : 'text-gray-800') : 'text-gray-500'">
              <CheckCircleIcon class="w-4 h-4 flex-shrink-0" :class="hasNumber ? 'text-purple-400' : 'text-gray-500'" />
              Mengandung angka
            </li>
            <li class="flex items-center gap-2 text-sm" :class="hasSymbol ? (isDark ? 'text-gray-200' : 'text-gray-800') : 'text-gray-500'">
              <CheckCircleIcon class="w-4 h-4 flex-shrink-0" :class="hasSymbol ? 'text-purple-400' : 'text-gray-500'" />
              Mengandung simbol (contoh: !@#$%)
            </li>
          </ul>
        </div>

        <label class="flex items-start gap-2.5 cursor-pointer select-none">
          <input
            v-model="agreeTerms"
            type="checkbox"
            required
            class="mt-0.5 w-4 h-4 rounded text-purple-600 focus:ring-purple-500/60 focus:ring-offset-0"
            :class="isDark ? 'border-white/20 bg-[#181428]' : 'border-gray-300 bg-gray-50'"
          />
          <span class="text-sm" :class="isDark ? 'text-gray-300' : 'text-gray-600'">
            Saya menyetujui
            <a href="#" class="text-purple-400 hover:text-purple-300 transition">Syarat &amp; Ketentuan</a>
            dan
            <a href="#" class="text-purple-400 hover:text-purple-300 transition">Kebijakan Privasi</a>
          </span>
        </label>

        <AuthPrimaryButton :loading="isLoading" loading-text="Memproses...">Daftar Sekarang</AuthPrimaryButton>
      </form>

      <template #footer>
        <AuthDivider />

        <AuthSecondaryButton type="button" @click="handleGoogleRegister">
          <svg class="w-[18px] h-[18px]" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l6-6C34.9 5.4 29.8 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21c0-1.2-.1-2.3-.4-3.5z"/>
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.9 18.9 13 24 13c3.1 0 5.8 1.1 8 3l6-6C34.9 5.4 29.8 3 24 3 16.3 3 9.7 7.5 6.3 14.7z"/>
            <path fill="#4CAF50" d="M24 45c5.7 0 10.8-2.2 14.6-5.8l-6.7-5.5C29.7 35.4 27 36 24 36c-5.3 0-9.6-3-11.3-7.4l-6.6 5.1C9.5 40.4 16.2 45 24 45z"/>
            <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.3 5.7l6.7 5.5C41.5 36.4 45 30.9 45 24c0-1.2-.1-2.3-.4-3.5z"/>
          </svg>
          Daftar dengan Google
        </AuthSecondaryButton>

        <p class="text-center text-xs mt-6 leading-relaxed" :class="isDark ? 'text-gray-500' : 'text-gray-400'">
          Dengan mendaftar, Anda setuju untuk menerima email dari Lumina Finance terkait informasi produk, berita, dan penawaran.
        </p>
      </template>
    </AuthCard>
  </AuthLayout>
</template>