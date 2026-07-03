<script setup>
defineProps({
  loading: { type: Boolean, default: false },
  loadingText: { type: String, default: 'Memproses...' },
  type: { type: String, default: 'submit' },
})
</script>

<template>
  <button
    :type="type"
    :disabled="loading"
    class="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium text-sm shadow-lg shadow-purple-900/40 transition"
  >
    {{ loading ? loadingText : undefined }}
    <slot v-if="!loading" />
  </button>
</template>