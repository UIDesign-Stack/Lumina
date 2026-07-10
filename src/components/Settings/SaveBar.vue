<script setup>
import { CheckIcon } from '@heroicons/vue/24/outline'
import { useTheme } from '@/composables/useTheme'

defineEmits(['save'])

const { isDark } = useTheme()
</script>

<template>
  <div class="rounded-2xl border p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
    <div>
      <p class="text-sm font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">Simpan Perubahan</p>
      <p class="text-xs mt-0.5" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Pastikan untuk menyimpan setiap perubahan pengaturan yang Anda buat.</p>
    </div>
    <button
      class="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-medium shadow-lg shadow-purple-900/30 transition flex-shrink-0"
      @click="$emit('save')"
    >
      <CheckIcon class="w-4 h-4" />
      Simpan Perubahan
    </button>
  </div>
</template>