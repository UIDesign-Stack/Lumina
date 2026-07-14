<script setup>
import { ref, nextTick } from 'vue'
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
const triggerRef = ref(null)
const coords = ref({ top: 0, left: 0 })

const GAP = 8

async function showTooltip() {
  if (!props.text) return
  visible.value = true
  await nextTick()
  positionTooltip()
}

function hideTooltip() {
  visible.value = false
}

function positionTooltip() {
  const el = triggerRef.value
  if (!el) return
  const rect = el.getBoundingClientRect()

  if (props.position === 'right') {
    coords.value = { top: rect.top + rect.height / 2, left: rect.right + GAP }
  } else if (props.position === 'left') {
    coords.value = { top: rect.top + rect.height / 2, left: rect.left - GAP }
  } else if (props.position === 'bottom') {
    coords.value = { top: rect.bottom + GAP, left: rect.left + rect.width / 2 }
  } else {
    coords.value = { top: rect.top - GAP, left: rect.left + rect.width / 2 }
  }
}

const transformStyle = {
  top: 'translate(-50%, -100%)',
  bottom: 'translate(-50%, 0)',
  left: 'translate(-100%, -50%)',
  right: 'translate(0, -50%)',
}
</script>

<template>
  <span
    ref="triggerRef"
    class="relative inline-flex"
    v-bind="$attrs"
    @mouseenter="showTooltip"
    @mouseleave="hideTooltip"
    @focusin="showTooltip"
    @focusout="hideTooltip"
  >
    <slot />
  </span>

  <Teleport to="body">
    <span
      v-if="tooltipsEnabled && visible && text"
      class="fixed z-[9999] whitespace-nowrap px-2.5 py-1.5 rounded-lg text-xs font-medium shadow-lg pointer-events-none"
      :style="{
        top: coords.top + 'px',
        left: coords.left + 'px',
        transform: transformStyle[position] || transformStyle.top,
      }"
      :class="isDark ? 'bg-[#181428] text-gray-100 border border-white/10' : 'bg-gray-900 text-white'"
    >
      {{ text }}
    </span>
  </Teleport>
</template>