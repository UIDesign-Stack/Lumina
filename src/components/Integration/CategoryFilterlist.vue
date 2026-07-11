<script setup>
import { useTheme } from '@/composables/useTheme'

defineProps({
  categories: { type: Array, required: true },
  activeCategory: { type: String, required: true },
})
defineEmits(['update:activeCategory'])

const { isDark } = useTheme()
</script>

<template>
  <div class="rounded-2xl border p-5" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
    <p class="text-base font-semibold mb-3" :class="isDark ? 'text-white' : 'text-gray-900'">Kategori Integrasi</p>

    <ul class="space-y-1">
      <li v-for="cat in categories" :key="cat.key">
        <button
          class="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition"
          :class="activeCategory === cat.key
            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium'
            : (isDark ? 'text-gray-300 hover:bg-white/5' : 'text-gray-600 hover:bg-gray-50')"
          @click="$emit('update:activeCategory', cat.key)"
        >
          {{ cat.label }}
          <span
            class="text-xs px-1.5 py-0.5 rounded-full"
            :class="activeCategory === cat.key ? 'bg-white/20' : (isDark ? 'bg-white/5 text-gray-400' : 'bg-gray-100 text-gray-500')"
          >{{ cat.count }}</span>
        </button>
      </li>
    </ul>
  </div>
</template>