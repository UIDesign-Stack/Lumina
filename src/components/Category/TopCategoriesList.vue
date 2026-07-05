<script setup>
import CategoryIcon from './CategoryIcon.vue'
import { useTheme } from '@/composables/useTheme'

defineProps({
  categories: { type: Array, required: true }, // [{ key, name, transactions, icon, color }]
})

const { isDark } = useTheme()
</script>

<template>
  <div class="rounded-2xl border p-5" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
    <div class="flex items-center justify-between mb-4">
      <p class="text-base font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">Kategori Teratas</p>
      <a href="#" class="text-sm text-purple-400 hover:text-purple-300 transition">Lihat Semua</a>
    </div>

    <ul class="space-y-3.5">
      <li v-for="cat in categories" :key="cat.key" class="flex items-center gap-3">
        <CategoryIcon :icon="cat.icon" :color="cat.color" size="sm" />
        <div class="min-w-0">
          <p class="text-sm font-medium truncate" :class="isDark ? 'text-gray-200' : 'text-gray-800'">{{ cat.name }}</p>
          <p class="text-xs" :class="isDark ? 'text-gray-500' : 'text-gray-400'">{{ cat.transactions }} transaksi</p>
        </div>
      </li>
    </ul>
  </div>
</template>