<script setup>
import { useTheme } from '@/composables/useTheme'

defineProps({
  account: { type: Object, required: true },
})

const { isDark } = useTheme()
</script>

<template>
  <div class="rounded-2xl border p-5" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
    <p class="text-base font-semibold mb-4" :class="isDark ? 'text-white' : 'text-gray-900'">Informasi Akun</p>

    <div class="flex items-center gap-3 mb-4">
      <div class="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center text-white font-semibold flex-shrink-0 overflow-hidden">
        <img v-if="account.avatar" :src="account.avatar" :alt="account.name" class="w-full h-full object-cover" />
        <span v-else>{{ account.name.charAt(0) }}</span>
      </div>
      <div class="min-w-0">
        <p class="text-sm font-medium truncate" :class="isDark ? 'text-white' : 'text-gray-900'">{{ account.name }}</p>
        <p class="text-xs truncate" :class="isDark ? 'text-gray-400' : 'text-gray-500'">{{ account.role }}</p>
        <p class="text-xs truncate" :class="isDark ? 'text-gray-500' : 'text-gray-400'">{{ account.email }}</p>
      </div>
    </div>

    <router-link
      to="/profil"
      class="w-full block text-center py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-medium shadow-lg shadow-purple-900/30 transition"
    >
      Ubah Profil
    </router-link>
  </div>
</template>