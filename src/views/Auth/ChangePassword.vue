<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  LockClosedIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  ArrowLeftIcon,
  EyeIcon,
  EyeSlashIcon,
} from '@heroicons/vue/24/outline'
import { CheckCircleIcon as CheckCircleSolidIcon } from '@heroicons/vue/24/solid'
import AuthLayout from '@/layouts/AuthLayout.vue'
import AuthCard from '@/components/Auth/AuthCard.vue'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { isLoading, errorMessage, changePassword } = useAuth()

const newPassword = ref('')
const confirmNewPassword = ref('')
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

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
    await changePassword({
      newPassword: newPassword.value,
      confirmNewPassword: confirmNewPassword.value,
    })
    router.push('/login')
  } catch {
    // errorMessage sudah diisi di dalam useAuth
  }
}
</script>

<template>
  <AuthLayout :show-stats="false">
    <!-- Headline dengan sebagian teks berwarna -->
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

        <p
          v-if="errorMessage"
          class="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2"
        >
          {{ errorMessage }}
        </p>

        <div>
          <label for="new-password" class="block text-sm text-white mb-2">Kata Sandi Baru</label>
          <div class="relative">
            <LockClosedIcon class="w-5 h-5 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="new-password"
              v-model="newPassword"
              :type="showNewPassword ? 'text' : 'password'"
              autocomplete="new-password"
              placeholder="Masukkan kata sandi baru"
              required
              class="w-full bg-[#181428]/80 border border-white/10 rounded-xl py-3 pl-11 pr-11 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/60 focus:border-transparent transition"
            />
            <button
              type="button"
              class="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition"
              @click="showNewPassword = !showNewPassword"
              :aria-label="showNewPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'"
            >
              <EyeSlashIcon v-if="showNewPassword" class="w-5 h-5" />
              <EyeIcon v-else class="w-5 h-5" />
            </button>
          </div>

          <div class="flex items-center gap-3 mt-3">
            <span class="text-xs text-gray-400">Kekuatan Kata Sandi:</span>
            <span class="text-xs font-medium" :class="strengthMeta.color">{{ strengthMeta.label }}</span>
            <div class="flex gap-1 flex-1">
              <div
                v-for="i in 4"
                :key="i"
                class="h-1.5 flex-1 rounded-full"
                :class="i <= filledSegments ? strengthMeta.bar : 'bg-white/10'"
              ></div>
            </div>
          </div>
        </div>

        <div>
          <label for="confirm-new-password" class="block text-sm text-white mb-2">Konfirmasi Kata Sandi Baru</label>
          <div class="relative">
            <LockClosedIcon class="w-5 h-5 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="confirm-new-password"
              v-model="confirmNewPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              autocomplete="new-password"
              placeholder="Masukkan ulang kata sandi baru"
              required
              class="w-full bg-[#181428]/80 border border-white/10 rounded-xl py-3 pl-11 pr-11 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/60 focus:border-transparent transition"
            />
            <button
              type="button"
              class="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition"
              @click="showConfirmPassword = !showConfirmPassword"
              :aria-label="showConfirmPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'"
            >
              <EyeSlashIcon v-if="showConfirmPassword" class="w-5 h-5" />
              <EyeIcon v-else class="w-5 h-5" />
            </button>
          </div>
        </div>

        <div class="rounded-xl bg-purple-500/5 border border-purple-500/20 p-4">
          <p class="flex items-center gap-2 text-sm text-white font-medium mb-3">
            <ShieldCheckIcon class="w-4 h-4 text-purple-400" />
            Tips membuat kata sandi yang kuat:
          </p>
          <ul class="space-y-2">
            <li class="flex items-center gap-2 text-sm text-gray-300">
              <CheckCircleIcon class="w-4 h-4 text-purple-400 flex-shrink-0" />
              Minimal 8 karakter
            </li>
            <li class="flex items-center gap-2 text-sm text-gray-300">
              <CheckCircleIcon class="w-4 h-4 text-purple-400 flex-shrink-0" />
              Gunakan kombinasi huruf besar, huruf kecil, angka, dan simbol
            </li>
            <li class="flex items-center gap-2 text-sm text-gray-300">
              <CheckCircleIcon class="w-4 h-4 text-purple-400 flex-shrink-0" />
              Hindari informasi pribadi atau kata yang mudah ditebak
            </li>
          </ul>
        </div>

        <!-- Tombol Simpan -->
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium text-sm shadow-lg shadow-purple-900/40 transition"
        >
          {{ isLoading ? 'Menyimpan...' : 'Simpan Kata Sandi Baru' }}
        </button>
      </form>

      <template #footer>
        <div class="text-center mt-5">
          <router-link
            to="/login"
            class="inline-flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition"
          >
            <ArrowLeftIcon class="w-4 h-4" />
            Kembali ke Halaman Login
          </router-link>
        </div>
      </template>
    </AuthCard>
  </AuthLayout>
</template>