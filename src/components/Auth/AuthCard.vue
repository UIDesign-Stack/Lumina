<script setup>
import { useTheme } from '@/composables/useTheme'

defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: '',
  },
  wide: {
    type: Boolean,
    default: false,
  },
})

const { isDark } = useTheme()
</script>

<template>
  <div
    class="w-full mx-auto rounded-3xl border backdrop-blur-sm p-8 sm:p-10 transition-colors duration-300"
    :class="[
      wide ? 'max-w-3xl' : 'max-w-md',
      isDark ? 'bg-[#100c1c]/80 border-white/10 shadow-2xl' : 'bg-white border-gray-200 shadow-lg',
    ]"
  >
  
    <div v-if="$slots.icon" class="flex justify-center mb-5">
      <slot name="icon" />
    </div>

    <h2 class="text-2xl font-bold text-center mb-2" :class="isDark ? 'text-white' : 'text-gray-900'">{{ title }}</h2>
    <p v-if="subtitle" class="text-sm text-center mb-8" :class="isDark ? 'text-gray-400' : 'text-gray-500'">{{ subtitle }}</p>

    <slot />

    <slot name="footer" />
  </div>
</template>