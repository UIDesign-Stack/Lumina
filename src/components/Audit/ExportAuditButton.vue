<script setup>
import { ref } from 'vue'
import { ArrowUpTrayIcon, ChevronDownIcon } from '@heroicons/vue/24/outline'
import { useTheme } from '@/composables/useTheme'

const emit = defineEmits(['export'])
const { isDark } = useTheme()

const open = ref(false)
const formats = ['CSV', 'Excel (XLSX)', 'PDF']

function choose(format) {
  open.value = false
  emit('export', format)
}
</script>

<template>
  <div class="relative">
    <div class="inline-flex rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition overflow-hidden">
      <button
        type="button"
        class="inline-flex items-center gap-2 px-4 py-2.5 text-white text-sm font-medium"
        @click="choose('CSV')"
      >
        <ArrowUpTrayIcon class="w-4 h-4" />
        Export Audit Log
      </button>
      <button
        type="button"
        class="px-2.5 border-l border-white/20 flex items-center justify-center"
        @click="open = !open"
      >
        <ChevronDownIcon class="w-4 h-4 text-white" />
      </button>
    </div>

    <div
      v-if="open"
      class="absolute right-0 mt-2 w-44 rounded-xl border shadow-lg overflow-hidden z-10"
      :class="isDark ? 'bg-[#17122a] border-white/10' : 'bg-white border-gray-200'"
    >
      <button
        v-for="format in formats"
        :key="format"
        type="button"
        class="w-full text-left px-4 py-2.5 text-sm transition"
        :class="isDark ? 'text-gray-200 hover:bg-white/5' : 'text-gray-700 hover:bg-gray-50'"
        @click="choose(format)"
      >
        {{ format }}
      </button>
    </div>
  </div>
</template>