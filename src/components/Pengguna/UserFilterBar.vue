<script setup>
import { MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/vue/24/outline'
import { useTheme } from '@/composables/useTheme'

defineProps({
  search: { type: String, default: '' },
  roleOptions: { type: Array, required: true },
  statusOptions: { type: Array, required: true },
  activeRole: { type: String, required: true },
  activeStatus: { type: String, required: true },
})

defineEmits(['update:search', 'update:activeRole', 'update:activeStatus'])

const { isDark } = useTheme()
</script>

<template>
  <div class="rounded-2xl border p-4 flex flex-col sm:flex-row gap-3" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
    <div class="relative flex-1">
      <MagnifyingGlassIcon class="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2" :class="isDark ? 'text-gray-500' : 'text-gray-400'" />
      <input
        type="text"
        placeholder="Cari nama atau email pengguna..."
        class="w-full pl-10 pr-3 py-2.5 rounded-xl text-sm outline-none border transition"
        :class="isDark
          ? 'bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-purple-500/50'
          : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-purple-400'"
        :value="search"
        @input="$emit('update:search', $event.target.value)"
      />
    </div>

    <div class="relative">
      <select
        class="appearance-none pl-4 pr-9 py-2.5 rounded-xl text-sm outline-none border transition cursor-pointer w-full sm:w-44"
        :class="isDark ? 'bg-white/5 border-white/10 text-gray-200' : 'bg-gray-50 border-gray-200 text-gray-700'"
        :value="activeRole"
        @change="$emit('update:activeRole', $event.target.value)"
      >
        <option v-for="role in roleOptions" :key="role" :value="role">{{ role }}</option>
      </select>
      <ChevronDownIcon class="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" :class="isDark ? 'text-gray-500' : 'text-gray-400'" />
    </div>

    <div class="relative">
      <select
        class="appearance-none pl-4 pr-9 py-2.5 rounded-xl text-sm outline-none border transition cursor-pointer w-full sm:w-40"
        :class="isDark ? 'bg-white/5 border-white/10 text-gray-200' : 'bg-gray-50 border-gray-200 text-gray-700'"
        :value="activeStatus"
        @change="$emit('update:activeStatus', $event.target.value)"
      >
        <option v-for="status in statusOptions" :key="status" :value="status">{{ status }}</option>
      </select>
      <ChevronDownIcon class="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" :class="isDark ? 'text-gray-500' : 'text-gray-400'" />
    </div>
  </div>
</template>