<script setup>
import { PlusIcon } from '@heroicons/vue/24/outline'
import BankLogo from './BankLogo.vue'
import { useTheme } from '@/composables/useTheme'

defineProps({
  favorites: { type: Array, required: true },
})
const emit = defineEmits(['select', 'add-favorite'])

const { isDark } = useTheme()
</script>

<template>
  <div class="rounded-2xl border p-5" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
    <div class="flex items-center justify-between mb-4">
      <p class="text-base font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">Favorit</p>
      <a href="#" class="text-sm text-purple-400 hover:text-purple-300 transition">Kelola Favorit →</a>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      <!-- Tambah Favorit -->
      <button
        class="rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-2 py-4 transition"
        :class="isDark ? 'border-white/10 text-gray-500 hover:border-white/20 hover:text-gray-300' : 'border-gray-300 text-gray-400 hover:border-gray-400 hover:text-gray-600'"
        @click="emit('add-favorite')"
      >
        <PlusIcon class="w-5 h-5" />
        <span class="text-xs font-medium">Tambah Favorit</span>
      </button>

      <!-- Kartu favorit -->
      <button
        v-for="fav in favorites"
        :key="fav.id"
        class="rounded-xl border p-3 text-left transition"
        :class="isDark ? 'bg-[#181428]/60 border-white/10 hover:border-purple-500/50' : 'bg-gray-50 border-gray-200 hover:border-purple-300'"
        @click="emit('select', fav)"
      >
        <BankLogo :logo="fav.logo" :color="fav.color" class="mb-2" />
        <p class="text-sm font-medium truncate" :class="isDark ? 'text-gray-200' : 'text-gray-800'">{{ fav.bank }}</p>
        <p class="text-xs truncate" :class="isDark ? 'text-gray-500' : 'text-gray-500'">{{ fav.name }}</p>
        <p class="text-xs truncate" :class="isDark ? 'text-gray-500' : 'text-gray-400'">{{ fav.account }}</p>
      </button>
    </div>
  </div>
</template>