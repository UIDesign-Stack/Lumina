<script setup>
import { ref } from 'vue'
import { StarIcon as StarSolidIcon } from '@heroicons/vue/24/solid'
import { StarIcon as StarOutlineIcon, EllipsisVerticalIcon } from '@heroicons/vue/24/outline'
import BankLogo from './BankLogo.vue'
import { useTheme } from '@/composables/useTheme'

const props = defineProps({
  favorites: { type: Array, required: true },
})

const { isDark } = useTheme()
const localFavorites = ref(props.favorites.map((f) => ({ ...f })))

function toggleStar(item) {
  item.starred = !item.starred
}
</script>

<template>
  <div class="rounded-2xl border p-5" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
    <div class="flex items-center justify-between mb-4">
      <p class="text-base font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">Favorit Saya</p>
      <a href="#" class="text-sm text-purple-400 hover:text-purple-300 transition">Lihat Semua</a>
    </div>

    <ul class="space-y-3">
      <li v-for="item in localFavorites" :key="item.id" class="flex items-center gap-3">
        <BankLogo :logo="item.logo" :color="item.color" size="sm" />
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium truncate" :class="isDark ? 'text-gray-200' : 'text-gray-800'">{{ item.name }}</p>
          <p class="text-xs truncate" :class="isDark ? 'text-gray-500' : 'text-gray-400'">{{ item.bank }}</p>
          <p class="text-xs truncate" :class="isDark ? 'text-gray-500' : 'text-gray-400'">{{ item.number }}</p>
        </div>
        <button class="flex-shrink-0" @click="toggleStar(item)">
          <StarSolidIcon v-if="item.starred" class="w-4.5 h-4.5 text-amber-400" />
          <StarOutlineIcon v-else class="w-4.5 h-4.5 text-gray-500" />
        </button>
        <button class="flex-shrink-0 text-gray-500 hover:text-gray-300 transition">
          <EllipsisVerticalIcon class="w-4 h-4" />
        </button>
      </li>
    </ul>
  </div>
</template>