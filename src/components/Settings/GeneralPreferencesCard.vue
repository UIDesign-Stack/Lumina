<script setup>
import PreferenceRow from './PreferenceRow.vue'
import { useTheme } from '@/composables/useTheme'

defineProps({
  preferences: { type: Array, required: true },
})

const { isDark } = useTheme()
</script>

<template>
  <div class="rounded-2xl border p-5" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
    <p class="text-base font-semibold mb-1" :class="isDark ? 'text-white' : 'text-gray-900'">Preferensi Umum</p>

    <div class="divide-y" :class="isDark ? 'divide-white/5' : 'divide-gray-100'">
      <PreferenceRow
        v-for="pref in preferences"
        :key="pref.key"
        :icon="pref.icon"
        :label="pref.label"
        :description="pref.description"
        v-model="pref.value"
        :options="pref.options"
      />
    </div>
  </div>
</template>