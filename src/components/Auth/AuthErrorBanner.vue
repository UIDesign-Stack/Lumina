<script setup>
defineProps({
  message: { type: String, default: '' },
})
</script>

<template>
  <p
    v-if="message"
    class="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2"
  >
    {{ message }}
  </p>
</template>