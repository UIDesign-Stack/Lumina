<script setup>
import { useTheme } from '@/composables/useTheme'

defineProps({
  roles: { type: Array, required: true },
})

defineEmits(['manage-roles'])

const { isDark } = useTheme()

const barColorMap = {
  purple: 'bg-purple-500',
  blue: 'bg-blue-500',
  teal: 'bg-teal-500',
  gray: 'bg-gray-400',
  pink: 'bg-pink-500',
}

const textColorMap = {
  purple: 'text-purple-400',
  blue: 'text-blue-400',
  teal: 'text-teal-400',
  gray: 'text-gray-300',
  pink: 'text-pink-400',
}
</script>

<template>
  <div class="rounded-2xl border p-5" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
    <p class="text-base font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">Peran Populer</p>
    <p class="text-xs mb-4" :class="isDark ? 'text-gray-500' : 'text-gray-400'">5 peran yang paling banyak digunakan</p>

    <ul class="space-y-3.5">
      <li v-for="role in roles" :key="role.key">
        <div class="flex items-center justify-between text-sm mb-1.5">
          <span class="font-medium" :class="textColorMap[role.color]">{{ role.name }}</span>
          <span :class="isDark ? 'text-gray-400' : 'text-gray-500'">{{ role.count }} pengguna</span>
        </div>
        <div class="w-full h-1.5 rounded-full" :class="isDark ? 'bg-white/5' : 'bg-gray-100'">
          <div class="h-1.5 rounded-full" :class="barColorMap[role.color]" :style="{ width: role.percent + '%' }"></div>
        </div>
      </li>
    </ul>

    <button
      type="button"
      class="w-full mt-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-medium transition"
      @click="$emit('manage-roles')"
    >
      Kelola Peran
    </button>
  </div>
</template>