<script setup>
import { useTheme } from '@/composables/useTheme'

defineProps({
  tag: { type: [String, Object], default: 'button' }, // 'button' | 'router-link' | 'a'
  type: { type: String, default: 'button' }, // dipakai kalau tag='button'
})

const { isDark } = useTheme()
</script>

<template>
  <component
    :is="tag"
    :type="tag === 'button' ? type : undefined"
    class="w-full py-3 rounded-xl border flex items-center justify-center gap-2 text-sm font-medium transition"
    :class="isDark ? 'border-white/10 bg-[#181428]/60 hover:bg-[#181428] text-white' : 'border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-900'"
  >
    <slot />
  </component>
</template>