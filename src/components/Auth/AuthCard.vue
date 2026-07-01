<script setup>
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
</script>

<template>
  <div
    :class="[
      'w-full mx-auto rounded-3xl bg-[#100c1c]/80 border border-white/10 backdrop-blur-sm p-8 sm:p-10 shadow-2xl',
      wide ? 'max-w-3xl' : 'max-w-md',
    ]"
  >
    <div v-if="$slots.icon" class="flex justify-center mb-5">
      <slot name="icon" />
    </div>

    <h2 class="text-2xl font-bold text-white text-center mb-2">{{ title }}</h2>
    <p v-if="subtitle" class="text-gray-400 text-sm text-center mb-8">{{ subtitle }}</p>

    <slot />

    <slot name="footer" />
  </div>
</template>