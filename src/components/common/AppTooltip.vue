<script setup>
import { ref } from 'vue'
import { useUIPreferences } from '@/composables/useUIPreferences'
import { useTheme } from '@/composables/useTheme'

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  // 'top' | 'bottom' | 'left' | 'right'
  position: {
    type: String,
    default: 'top',
  },
})

const { tooltipsEnabled } = useUIPreferences()
const { isDark } = useTheme()
const visible = ref(false)

const positionClass = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
}
</script>

<template>
  <span
    class="relative inline-flex"
    @mouseenter="visible = true"
    @mouseleave="visible = false"
    @focusin="visible = true"
    @focusout="visible = false"
  >
    <slot />

    <span
      v-if="tooltipsEnabled && visible"
      class="absolute z-50 whitespace-nowrap px-2.5 py-1.5 rounded-lg text-xs font-medium shadow-lg pointer-events-none"
      :class="[
        positionClass[position] || positionClass.top,
        isDark ? 'bg-[#181428] text-gray-100 border border-white/10' : 'bg-gray-900 text-white',
      ]"
    >
      {{ text }}
    </span>
  </span>
</template>