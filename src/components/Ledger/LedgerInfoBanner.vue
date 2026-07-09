<script setup>
import { ref } from 'vue'
import { InformationCircleIcon } from '@heroicons/vue/24/outline'
import { useTheme } from '@/composables/useTheme'

defineProps({
  text: { type: String, required: true },
})

const { isDark } = useTheme()
const isVisible = ref(true)
</script>

<template>
  <div
    v-if="isVisible"
    class="rounded-2xl border p-5 flex items-start gap-3"
    :class="isDark ? 'bg-purple-500/5 border-purple-500/20' : 'bg-purple-50 border-purple-200'"
  >
    <div class="w-8 h-8 rounded-lg bg-purple-500/15 flex items-center justify-center flex-shrink-0">
      <InformationCircleIcon class="w-5 h-5 text-purple-400" />
    </div>
    <div class="flex-1 min-w-0">
      <p class="text-sm font-semibold mb-1" :class="isDark ? 'text-white' : 'text-gray-900'">Tentang Buku Besar</p>
      <p class="text-sm leading-relaxed" :class="isDark ? 'text-gray-400' : 'text-gray-600'">{{ text }}</p>
    </div>
    <button
      class="px-3.5 py-1.5 rounded-lg border text-sm flex-shrink-0 whitespace-nowrap transition"
      :class="isDark ? 'border-white/10 text-gray-300 hover:bg-white/5' : 'border-gray-300 text-gray-700 hover:bg-gray-100'"
      @click="isVisible = false"
    >
      Tutup
    </button>
  </div>
</template>