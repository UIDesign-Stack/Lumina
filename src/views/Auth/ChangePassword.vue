<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { LockClosedIcon, CheckCircleIcon, ShieldCheckIcon, ArrowLeftIcon } from '@heroicons/vue/24/outline'
import { CheckCircleIcon as CheckCircleSolidIcon } from '@heroicons/vue/24/solid'
import AuthLayout from '@/layouts/AuthLayout.vue'
import AuthCard from '@/components/Auth/AuthCard.vue'
import AuthTextField from '@/components/Auth/AuthTextField.vue'
import AuthPrimaryButton from '@/components/Auth/AuthPrimaryButton.vue'
import AuthSecondaryButton from '@/components/Auth/AuthSecondaryButton.vue'
import AuthErrorBanner from '@/components/Auth/AuthErrorBanner.vue'
import { useAuth } from '@/composables/useAuth'
import { useTheme } from '@/composables/useTheme'

const router = useRouter()
const { isLoading, errorMessage, changePassword } = useAuth()
const { isDark } = useTheme()

const newPassword = ref('')
const confirmNewPassword = ref('')

const strengthScore = computed(() => {
  let score = 0
  if (newPassword.value.length >= 8) score++
  if (/[a-z]/.test(newPassword.value) && /[A-Z]/.test(newPassword.value)) score++
  if (/[0-9]/.test(newPassword.value)) score++
  if (/[^A-Za-z0-9]/.test(newPassword.value)) score++
  return score
})

const strengthMeta = computed(() => {
  if (!newPassword.value) return { label: 'Lemah', color: 'text-red-400', bar: 'bg-red-500' }
  if (strengthScore.value <= 1) return { label: 'Lemah', color: 'text-red-400', bar: 'bg-red-500' }
  if (strengthScore.value === 2) return { label: 'Sedang', color: 'text-yellow-400', bar: 'bg-yellow-500' }
  if (strengthScore.value === 3) return { label: 'Kuat', color: 'text-blue-400', bar: 'bg-blue-500' }
  return { label: 'Sangat Kuat', color: 'text-emerald-400', bar: 'bg-emerald-500' }
})

const filledSegments = computed(() => Math.max(strengthScore.value, newPassword.value ? 1 : 0))

async function handleSubmit() {
  try {
    await changePassword({ newPassword: newPassword.value, confirmNewPassword: confirmNewPassword.value })
    router.push('/login')
  } catch {
   
  }
}
</script>

<template>
  <AuthLayout :show-stats="false">
    <template #brand-title>
      Buat Kata Sandi Baru<br />
      untuk Akun Anda<br />
      <span class="bg-gradient-to-r from-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">Aman &amp; Terlindungi</span>
    </template>

    <template #brand-features>
      <p class="text-gray-400 text-base leading-relaxed max-w-md">
        Silakan buat kata sandi baru yang kuat untuk menjaga keamanan akun dan data perusahaan Anda.
      </p>
    </template>

    <template #brand-illustration>
      <div class="relative h-72 mt-4">
        <div class="absolute bottom-0 left-16 w-56 h-20 bg-purple-600/40 rounded-full blur-3xl"></div>

        <div class="absolute left-4 top-4 w-44 h-52">
          <svg viewBox="0 0 100 120" class="w-full h-full drop-shadow-2xl">
            <path
              d="M50 4 L92 20 V56 C92 86 74 106 50 116 C26 106 8 86 8 56 V20 Z"
              fill="url(#shieldGrad)"
              fill-opacity="0.15"
              stroke="url(#shieldGrad)"
              stroke-width="2.5"
            />
            <defs>
              <linearGradient id="shieldGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#a78bfa" />
                <stop offset="100%" stop-color="#e879f9" />
              </linearGradient>
            </defs>
          </svg>
          <LockClosedIcon class="w-10 h-10 text-purple-300 absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2" />
        </div>

        <div class="absolute right-2 top-24 w-48 rounded-2xl bg-[#12101c]/90 border border-white/10 backdrop-blur-sm p-4 shadow-xl">
          <div class="flex gap-1.5 mb-2">
            <span class="w-2.5 h-2.5 rounded-full bg-purple-400"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-purple-400"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-purple-400"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-purple-400"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-purple-400"></span>
          </div>
          <div class="h-2 w-24 rounded bg-white/10"></div>
        </div>

        <div class="absolute right-10 top-14 w-12 h-12 rounded-full bg-[#12101c]/90 border border-purple-500/30 backdrop-blur-sm flex items-center justify-center shadow-xl">
          <CheckCircleSolidIcon class="w-7 h-7 text-purple-400" />
        </div>
      </div>
    </template>

    <AuthCard
      title="Buat Kata Sandi Baru"
      subtitle="Kata sandi baru Anda harus berbeda dari kata sandi sebelumnya dan cukup kuat untuk melindungi akun Anda."
    >
      <template #icon>
        <div class="relative">
          <div class="w-16 h-16 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
            <LockClosedIcon class="w-7 h-7 text-purple-400" />
          </div>
          <div class="absolute -bottom-0.5 -right-0.5 w-6 h-6 rounded-full bg-emerald-500 border-2 border-[#100c1c] flex items-center justify-center">
            <CheckCircleSolidIcon class="w-4 h-4 text-white" />
          </div>
        </div>
      </template>

      <form class="space-y-5" @submit.prevent="handleSubmit">
        <AuthErrorBanner :message="errorMessage" />

        <div>
          <AuthTextField
            id="new-password"
            v-model="newPassword"
            label="Kata Sandi Baru"
            autocomplete="new-password"
            placeholder="Masukkan kata sandi baru"
            :icon="LockClosedIcon"
            revealable
          />

          <div class="flex items-center gap-3 mt-3">
            <span class="text-xs" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Kekuatan Kata Sandi:</span>
            <span class="text-xs font-medium" :class="strengthMeta.color">{{ strengthMeta.label }}</span>
            <div class="flex gap-1 flex-1">
              <div
                v-for="i in 4"
                :key="i"
                class="h-1.5 flex-1 rounded-full"
                :class="i <= filledSegments ? strengthMeta.bar : (isDark ? 'bg-white/10' : 'bg-gray-200')"
              ></div>
            </div>
          </div>
        </div>

        <AuthTextField
          id="confirm-new-password"
          v-model="confirmNewPassword"
          label="Konfirmasi Kata Sandi Baru"
          autocomplete="new-password"
          placeholder="Masukkan ulang kata sandi baru"
          :icon="LockClosedIcon"
          revealable
        />

        <div class="rounded-xl border p-4" :class="isDark ? 'bg-purple-500/5 border-purple-500/20' : 'bg-purple-50 border-purple-200'">
          <p class="flex items-center gap-2 text-sm font-medium mb-3" :class="isDark ? 'text-white' : 'text-gray-900'">
            <ShieldCheckIcon class="w-4 h-4 text-purple-400" />
            Tips membuat kata sandi yang kuat:
          </p>
          <ul class="space-y-2">
            <li class="flex items-center gap-2 text-sm" :class="isDark ? 'text-gray-300' : 'text-gray-600'">
              <CheckCircleIcon class="w-4 h-4 text-purple-400 flex-shrink-0" />
              Minimal 8 karakter
            </li>
            <li class="flex items-center gap-2 text-sm" :class="isDark ? 'text-gray-300' : 'text-gray-600'">
              <CheckCircleIcon class="w-4 h-4 text-purple-400 flex-shrink-0" />
              Gunakan kombinasi huruf besar, huruf kecil, angka, dan simbol
            </li>
            <li class="flex items-center gap-2 text-sm" :class="isDark ? 'text-gray-300' : 'text-gray-600'">
              <CheckCircleIcon class="w-4 h-4 text-purple-400 flex-shrink-0" />
              Hindari informasi pribadi atau kata yang mudah ditebak
            </li>
          </ul>
        </div>

        <AuthPrimaryButton :loading="isLoading" loading-text="Menyimpan...">Simpan Kata Sandi Baru</AuthPrimaryButton>
      </form>

      <template #footer>
        <div class="text-center mt-5">
          <router-link to="/login" class="inline-flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition">
            <ArrowLeftIcon class="w-4 h-4" />
            Kembali ke Halaman Login
          </router-link>
        </div>
      </template>
    </AuthCard>
  </AuthLayout>
</template>