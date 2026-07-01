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
import { useAuth } from '@/composables/useAuth'

const { isLoading, errorMessage, sendResetPasswordEmail } = useAuth()

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
        <p
          v-if="errorMessage"
          class="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2"
        >
          {{ errorMessage }}
        </p>

        <div>
          <label for="email" class="block text-sm text-white mb-2">Email</label>
          <div class="relative">
            <EnvelopeIcon class="w-5 h-5 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="email"
              v-model="email"
              type="email"
              autocomplete="email"
              placeholder="Masukkan email Anda"
              required
              class="w-full bg-[#181428]/80 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/60 focus:border-transparent transition"
            />
          </div>
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium text-sm shadow-lg shadow-purple-900/40 transition"
        >
          {{ isLoading ? 'Mengirim...' : 'Kirim Instruksi Reset' }}
        </button>
      </form>

      <template #footer>

        <div class="flex items-center gap-4 my-6">
          <div class="flex-1 h-px bg-white/10"></div>
          <span class="text-xs text-gray-500">atau</span>
          <div class="flex-1 h-px bg-white/10"></div>
        </div>

        <router-link
          to="/login"
          class="w-full py-3 rounded-xl border border-white/10 bg-[#181428]/60 hover:bg-[#181428] flex items-center justify-center gap-2 text-sm text-white font-medium transition"
        >
          <ArrowLeftIcon class="w-4 h-4" />
          Kembali ke Halaman Login
        </router-link>

        <div class="mt-6 rounded-xl border border-white/10 bg-[#181428]/40 p-4">
          <div class="flex items-start gap-2.5">
            <InformationCircleIcon class="w-5 h-5 text-blue-400 flex-shrink-0" />
            <div>
              <p class="text-white text-sm font-medium mb-1">Tidak menerima email?</p>
              <p class="text-gray-400 text-sm leading-relaxed">
                Periksa folder spam atau promo Anda.<br />
                Jika masih belum menerima, coba kirim ulang.
              </p>
              <button
                type="button"
                class="text-purple-400 hover:text-purple-300 text-sm mt-2 transition"
                @click="handleResendEmail"
              >
                Kirim Ulang Email
              </button>
            </div>
          </div>
        </div>
      </template>
    </AuthCard>
  </AuthLayout>
</template>