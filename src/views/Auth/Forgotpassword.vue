<script setup>
import { ref } from 'vue'
import {
  LockClosedIcon,
  EnvelopeIcon,
  ArrowLeftIcon,
  InformationCircleIcon,
  QuestionMarkCircleIcon,
  PaperAirplaneIcon,
  CheckIcon,
} from '@heroicons/vue/24/outline'
import AuthLayout from '@/layouts/AuthLayout.vue'
import AuthCard from '@/components/Auth/AuthCard.vue'
import AuthTextField from '@/components/Auth/AuthTextField.vue'
import AuthPrimaryButton from '@/components/Auth/AuthPrimaryButton.vue'
import AuthSecondaryButton from '@/components/Auth/AuthSecondaryButton.vue'
import AuthDivider from '@/components/Auth/AuthDivider.vue'
import AuthErrorBanner from '@/components/Auth/AuthErrorBanner.vue'
import { useAuth } from '@/composables/useAuth'
import { useTheme } from '@/composables/useTheme'

const { isLoading, errorMessage, sendResetPasswordEmail } = useAuth()
const { isDark } = useTheme()

const email = ref('')

async function handleSubmit() {
  try {
    await sendResetPasswordEmail({ email: email.value })
  } catch {
    // errorMessage sudah diisi di dalam useAuth
  }
}

function handleResendEmail() {
  handleSubmit()
}
</script>

<template>
  <AuthLayout :show-stats="false">
    <template #brand-title>
      Keamanan Akun Anda<br />
      adalah <span class="bg-gradient-to-r from-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">Prioritas Kami</span>
    </template>

    <template #brand-features>
      <p class="text-gray-400 text-base leading-relaxed max-w-md">
        Jangan khawatir, kami akan membantu Anda mengatur ulang kata sandi agar dapat kembali mengakses akun dengan aman.
      </p>
    </template>

    <template #brand-illustration>
      <div class="relative h-72 mt-4">
        <div class="absolute bottom-0 left-16 w-52 h-20 bg-purple-600/40 rounded-full blur-3xl"></div>

        <PaperAirplaneIcon class="absolute right-12 top-2 w-8 h-8 text-purple-300 rotate-45" />
        <svg class="absolute right-8 top-8 w-24 h-16 text-purple-400/50" viewBox="0 0 100 60" fill="none">
          <path d="M2 55 C 20 20, 60 10, 90 5" stroke="currentColor" stroke-width="2" stroke-dasharray="5 5" />
        </svg>

        <div class="absolute left-24 top-12 w-52 rounded-2xl bg-[#12101c]/90 border border-white/10 backdrop-blur-sm p-4 shadow-xl">
          <div class="h-2 w-24 rounded bg-white/10 mb-4"></div>
          <div class="flex items-center gap-2">
            <div class="flex gap-1.5">
              <span class="w-2.5 h-2.5 rounded-full bg-purple-400"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-purple-400"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-purple-400"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-purple-400"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-purple-400"></span>
            </div>
          </div>
        </div>

        <div class="absolute left-[13.5rem] top-24 w-14 h-14 rounded-full bg-[#12101c]/90 border border-purple-500/30 backdrop-blur-sm flex items-center justify-center shadow-xl">
          <CheckIcon class="w-6 h-6 text-purple-400" />
        </div>

        <div class="absolute left-16 bottom-6 w-40 h-28 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-700 shadow-2xl flex items-center justify-center">
          <EnvelopeIcon class="w-12 h-12 text-white/90" />
        </div>

        <div class="absolute left-0 bottom-16 w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-fuchsia-500 shadow-xl flex items-center justify-center">
          <LockClosedIcon class="w-8 h-8 text-white" />
        </div>
      </div>
    </template>

    <template #brand-footer>
      <div class="flex items-start gap-2">
        <QuestionMarkCircleIcon class="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
        <p class="text-sm text-gray-400">
          Butuh bantuan?
          <a href="#" class="block text-purple-400 hover:text-purple-300 transition">Hubungi tim support kami</a>
        </p>
      </div>
    </template>

    <AuthCard
      title="Lupa Kata Sandi?"
      subtitle="Masukkan email akun Anda dan kami akan mengirimkan instruksi untuk mengatur ulang kata sandi."
    >
      <template #icon>
        <div class="w-16 h-16 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mx-auto mb-5">
          <LockClosedIcon class="w-7 h-7 text-purple-400" />
        </div>
      </template>

      <form class="space-y-5" @submit.prevent="handleSubmit">
        <AuthErrorBanner :message="errorMessage" />

        <AuthTextField
          id="email"
          v-model="email"
          label="Email"
          type="email"
          autocomplete="email"
          placeholder="Masukkan email Anda"
          :icon="EnvelopeIcon"
        />

        <AuthPrimaryButton :loading="isLoading" loading-text="Mengirim...">Kirim Instruksi Reset</AuthPrimaryButton>
      </form>

      <template #footer>
        <AuthDivider />

        <AuthSecondaryButton tag="router-link" to="/login">
          <ArrowLeftIcon class="w-4 h-4" />
          Kembali ke Halaman Login
        </AuthSecondaryButton>

        <div class="mt-6 rounded-xl border p-4" :class="isDark ? 'border-white/10 bg-[#181428]/40' : 'border-gray-200 bg-gray-50'">
          <div class="flex items-start gap-2.5">
            <InformationCircleIcon class="w-5 h-5 text-blue-400 flex-shrink-0" />
            <div>
              <p class="text-sm font-medium mb-1" :class="isDark ? 'text-white' : 'text-gray-900'">Tidak menerima email?</p>
              <p class="text-gray-400 text-sm leading-relaxed">
                Periksa folder spam atau promo Anda.<br />
                Jika masih belum menerima, coba kirim ulang.
              </p>
              <button type="button" class="text-purple-400 hover:text-purple-300 text-sm mt-2 transition" @click="handleResendEmail">
                Kirim Ulang Email
              </button>
            </div>
          </div>
        </div>
      </template>
    </AuthCard>
  </AuthLayout>
</template>