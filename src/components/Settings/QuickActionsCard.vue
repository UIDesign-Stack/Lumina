<script setup>
import { ArrowDownTrayIcon, ArrowUpTrayIcon, TrashIcon, Cog6ToothIcon } from '@heroicons/vue/24/outline'
import { useTheme } from '@/composables/useTheme'

defineProps({
  actions: { type: Array, required: true },
})
const emit = defineEmits(['action'])

const { isDark } = useTheme()

const iconMap = { download: ArrowDownTrayIcon, upload: ArrowUpTrayIcon, trash: TrashIcon, settings: Cog6ToothIcon }
</script>

<template>
  <div class="rounded-2xl border p-5" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
    <p class="text-base font-semibold mb-4" :class="isDark ? 'text-white' : 'text-gray-900'">Aksi Cepat</p>

    <div class="space-y-2">
      <button
        v-for="action in actions"
        :key="action.key"
        class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl border text-sm font-medium transition"
        :class="action.danger
          ? 'border-rose-500/30 text-rose-400 hover:bg-rose-500/10'
          : (isDark ? 'border-white/10 text-gray-300 hover:bg-white/5' : 'border-gray-200 text-gray-700 hover:bg-gray-50')"
        @click="emit('action', action.key)"
      >
        <component :is="iconMap[action.icon]" class="w-4 h-4" />
        {{ action.label }}
      </button>
    </div>
  </div>
</template>