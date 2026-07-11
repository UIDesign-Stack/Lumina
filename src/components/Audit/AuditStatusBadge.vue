<script setup>
defineProps({
  status: { type: String, required: true },
  note: { type: String, default: '' },
})
</script>

<template>
  <div>
    <span
      class="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full"
      :class="status === 'berhasil' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/15 text-red-400'"
    >
      <span class="w-1.5 h-1.5 rounded-full" :class="status === 'berhasil' ? 'bg-emerald-400' : 'bg-red-400'"></span>
      {{ status === 'berhasil' ? 'Berhasil' : 'Gagal' }}
    </span>
    <p v-if="note" class="text-xs text-red-400 mt-1">{{ note }}</p>
  </div>
</template>