<script setup>
import IntegrationListItem from './IntegrationListItem.vue'
import { useTheme } from '@/composables/useTheme'

defineProps({
  title: { type: String, required: true },
  items: { type: Array, required: true },
  variant: { type: String, default: 'connected' },
})
defineEmits(['primary-action'])

const { isDark } = useTheme()
</script>

<template>
  <div class="rounded-2xl border p-5" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
    <p class="text-base font-semibold mb-1" :class="isDark ? 'text-white' : 'text-gray-900'">{{ title }}</p>

    <div class="divide-y" :class="isDark ? 'divide-white/5' : 'divide-gray-100'">
      <IntegrationListItem
        v-for="item in items"
        :key="item.key"
        :item="item"
        :variant="variant"
        @primary-action="$emit('primary-action', $event)"
      />
    </div>
  </div>
</template>