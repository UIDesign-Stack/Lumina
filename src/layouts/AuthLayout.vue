<script setup>
import { useSlots } from 'vue'
import BrandPanel from '@/components/Auth/BrandPanel.vue'
import { useTheme } from '@/composables/useTheme'

defineProps({
  brandTitle: {
    type: String,
    default: undefined,
  },
  brandDescription: {
    type: String,
    default: undefined,
  },
  showStats: {
    type: Boolean,
    default: true,
  },
  maxWidth: {
    type: String,
    default: 'max-w-6xl',
  },
})

const slots = useSlots()
const { isDark } = useTheme()
</script>

<template>
  <div class="min-h-screen flex flex-col transition-colors duration-300" :class="isDark ? 'bg-[#07050f]' : 'bg-gray-50'">
    <div class="flex-1 flex items-center justify-center px-6 py-12 lg:px-16">
      <div :class="['w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center', maxWidth]">
        <BrandPanel
          :title="brandTitle"
          :description="brandDescription"
          :show-stats="showStats"
        >
          <template v-if="slots['brand-title']" #title><slot name="brand-title" /></template>
          <template v-if="slots['brand-features']" #features><slot name="brand-features" /></template>
          <template v-if="slots['brand-illustration']" #illustration><slot name="brand-illustration" /></template>
          <template v-if="slots['brand-footer']" #footer><slot name="brand-footer" /></template>
        </BrandPanel>

        <slot />
      </div>
    </div>

    <footer class="text-center text-xs pb-6" :class="isDark ? 'text-gray-600' : 'text-gray-400'">
      © 2026 Lumina Finance. Semua hak dilindungi. Created By: FajarDev
    </footer>
  </div>
</template>