<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { EnvelopeIcon, LockClosedIcon, CheckIcon } from '@heroicons/vue/24/outline'
import AuthLayout from '@/layouts/AuthLayout.vue'
import AuthCard from '@/components/Auth/AuthCard.vue'
import AuthTextField from '@/components/Auth/AuthTextField.vue'
import AuthPrimaryButton from '@/components/Auth/AuthPrimaryButton.vue'
import AuthSecondaryButton from '@/components/Auth/AuthSecondaryButton.vue'
import AuthDivider from '@/components/Auth/AuthDivider.vue'
import AuthErrorBanner from '@/components/Auth/AuthErrorBanner.vue'
import { useAuth } from '@/composables/useAuth'
import { useTheme } from '@/composables/useTheme'

const router = useRouter()
const { isLoading, errorMessage, login } = useAuth()
const { isDark } = useTheme()

const email = ref('')
const password = ref('')
const rememberMe = ref(true)

async function handleSubmit() {
  try {
    await login({ email: email.value, password: password.value, rememberMe: rememberMe.value })
    router.push('/dashboard')
  } catch {
  
  }
}

function handleGoogleLogin() {
  
  console.log('Login dengan Google')
}
</script>

<template>
  <AuthLayout>
    <AuthCard title="Masuk ke Lumina Finance" subtitle="Silakan masuk untuk melanjutkan ke akun Anda">
      <form class="space-y-5" @submit.prevent="handleSubmit">
        <AuthErrorBanner :message="errorMessage" />

        <AuthTextField
          id="email"
          v-model="email"
          label="Email"
          type="email"
          autocomplete="email"
          placeholder="nama@perusahaan.com"
          :icon="EnvelopeIcon"
        />

        <AuthTextField
          id="password"
          v-model="password"
          label="Kata Sandi"
          autocomplete="current-password"
          placeholder="Masukkan kata sandi Anda"
          :icon="LockClosedIcon"
          revealable
        />

        <div class="flex items-center justify-between pt-1">
          <label class="flex items-center gap-2 cursor-pointer select-none">
            <span class="relative flex-shrink-0">
              <input v-model="rememberMe" type="checkbox" class="peer sr-only" />
              <span
                class="block w-[18px] h-[18px] rounded border peer-checked:bg-purple-600 peer-checked:border-purple-600 transition"
                :class="isDark ? 'border-white/20 bg-[#181428]' : 'border-gray-300 bg-gray-50'"
              ></span>
              <CheckIcon v-if="rememberMe" class="w-3 h-3 text-white absolute top-[3px] left-[3px]" />
            </span>
            <span class="text-sm" :class="isDark ? 'text-gray-300' : 'text-gray-600'">Ingat saya</span>
          </label>
          <router-link to="/forgot-password" class="text-sm text-purple-400 hover:text-purple-300 transition">
            Lupa kata sandi?
          </router-link>
        </div>

        <AuthPrimaryButton :loading="isLoading" loading-text="Memproses...">Masuk</AuthPrimaryButton>
      </form>

      <template #footer>
        <AuthDivider />

        <AuthSecondaryButton type="button" @click="handleGoogleLogin">
          <svg class="w-[18px] h-[18px]" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l6-6C34.9 5.4 29.8 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21c0-1.2-.1-2.3-.4-3.5z"/>
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.9 18.9 13 24 13c3.1 0 5.8 1.1 8 3l6-6C34.9 5.4 29.8 3 24 3 16.3 3 9.7 7.5 6.3 14.7z"/>
            <path fill="#4CAF50" d="M24 45c5.7 0 10.8-2.2 14.6-5.8l-6.7-5.5C29.7 35.4 27 36 24 36c-5.3 0-9.6-3-11.3-7.4l-6.6 5.1C9.5 40.4 16.2 45 24 45z"/>
            <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.3 5.7l6.7 5.5C41.5 36.4 45 30.9 45 24c0-1.2-.1-2.3-.4-3.5z"/>
          </svg>
          Masuk dengan Google
        </AuthSecondaryButton>

        <p class="text-center text-sm mt-6" :class="isDark ? 'text-gray-400' : 'text-gray-500'">
          Belum punya akun?
          <router-link to="/register" class="text-purple-400 hover:text-purple-300 transition">Daftar di sini</router-link>
        </p>
      </template>
    </AuthCard>
  </AuthLayout>
</template>