<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  CheckIcon,
} from '@heroicons/vue/24/outline'
import AuthLayout from '@/layouts/AuthLayout.vue'
import AuthCard from '@/components/Auth/AuthCard.vue'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { isLoading, errorMessage, login } = useAuth()

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const rememberMe = ref(true)

function togglePassword() {
  showPassword.value = !showPassword.value
}

async function handleSubmit() {
  try {
    await login({
      email: email.value,
      password: password.value,
      rememberMe: rememberMe.value,
    })
    router.push('/dashboard')
  } catch {
    // errorMessage sudah diisi di dalam useAuth, cukup tampilkan di template
  }
}

function handleGoogleLogin() {
  // TODO: sambungkan ke OAuth Google
  console.log('Login dengan Google')
}
</script>

<template>
  <AuthLayout>
    <AuthCard
      title="Masuk ke Lumina Finance"
      subtitle="Silakan masuk untuk melanjutkan ke akun Anda"
    >
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
              placeholder="nama@perusahaan.com"
              required
              class="w-full bg-[#181428]/80 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/60 focus:border-transparent transition"
            />
          </div>
        </div>


        <div>
          <label for="password" class="block text-sm text-white mb-2">Kata Sandi</label>
          <div class="relative">
            <LockClosedIcon class="w-5 h-5 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              autocomplete="current-password"
              placeholder="Masukkan kata sandi Anda"
              required
              class="w-full bg-[#181428]/80 border border-white/10 rounded-xl py-3 pl-11 pr-11 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/60 focus:border-transparent transition"
            />
            <button
              type="button"
              class="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition"
              @click="togglePassword"
              :aria-label="showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'"
            >
              <EyeSlashIcon v-if="showPassword" class="w-5 h-5" />
              <EyeIcon v-else class="w-5 h-5" />
            </button>
          </div>
        </div>

        <div class="flex items-center justify-between pt-1">
          <label class="flex items-center gap-2 cursor-pointer select-none">
            <span class="relative flex-shrink-0">
              <input v-model="rememberMe" type="checkbox" class="peer sr-only" />
              <span class="block w-[18px] h-[18px] rounded border border-white/20 bg-[#181428] peer-checked:bg-purple-600 peer-checked:border-purple-600 transition"></span>
              <CheckIcon v-if="rememberMe" class="w-3 h-3 text-white absolute top-[3px] left-[3px]" />
            </span>
            <span class="text-sm text-gray-300">Ingat saya</span>
          </label>
          <router-link to="/forgot-password" class="text-sm text-purple-400 hover:text-purple-300 transition">
            Lupa kata sandi?
          </router-link>
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium text-sm shadow-lg shadow-purple-900/40 transition"
        >
          {{ isLoading ? 'Memproses...' : 'Masuk' }}
        </button>
      </form>

      <template #footer>

        <div class="flex items-center gap-4 my-6">
          <div class="flex-1 h-px bg-white/10"></div>
          <span class="text-xs text-gray-500">atau</span>
          <div class="flex-1 h-px bg-white/10"></div>
        </div>

        <button
          type="button"
          class="w-full py-3 rounded-xl border border-white/10 bg-[#181428]/60 hover:bg-[#181428] flex items-center justify-center gap-3 text-sm text-white font-medium transition"
          @click="handleGoogleLogin"
        >
          <svg class="w-[18px] h-[18px]" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l6-6C34.9 5.4 29.8 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21c0-1.2-.1-2.3-.4-3.5z"/>
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.9 18.9 13 24 13c3.1 0 5.8 1.1 8 3l6-6C34.9 5.4 29.8 3 24 3 16.3 3 9.7 7.5 6.3 14.7z"/>
            <path fill="#4CAF50" d="M24 45c5.7 0 10.8-2.2 14.6-5.8l-6.7-5.5C29.7 35.4 27 36 24 36c-5.3 0-9.6-3-11.3-7.4l-6.6 5.1C9.5 40.4 16.2 45 24 45z"/>
            <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.3 5.7l6.7 5.5C41.5 36.4 45 30.9 45 24c0-1.2-.1-2.3-.4-3.5z"/>
          </svg>
          Masuk dengan Google
        </button>

        <p class="text-center text-sm text-gray-400 mt-6">
          Belum punya akun?
          <router-link to="/register" class="text-purple-400 hover:text-purple-300 transition">Daftar di sini</router-link>
        </p>
      </template>
    </AuthCard>
  </AuthLayout>
</template>