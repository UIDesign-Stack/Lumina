<script setup>
import ToggleSettingRow from './ToggleSettingRow.vue'
import { useTheme } from '@/composables/useTheme'

defineProps({
  title: { type: String, required: true },
  settings: { type: Array, required: true },
})

const { isDark } = useTheme()
</script>

<template>
  <div class="rounded-2xl border p-5" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
    <p class="text-base font-semibold mb-1" :class="isDark ? 'text-white' : 'text-gray-900'">{{ title }}</p>

    <div class="divide-y" :class="isDark ? 'divide-white/5' : 'divide-gray-100'">
      <ToggleSettingRow
        v-for="setting in settings"
        :key="setting.key"
        :icon="setting.icon"
        :label="setting.label"
        :description="setting.description"
        v-model="setting.enabled"
      />
    </div>
  </div>
</template>