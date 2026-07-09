<script setup>
import { CalendarDaysIcon, MagnifyingGlassIcon, FunnelIcon } from '@heroicons/vue/24/outline'
import { useTheme } from '@/composables/useTheme'

defineProps({
  period: { type: String, required: true },
  accountValue: { type: String, required: true },
  accountOptions: { type: Array, required: true },
  categoryValue: { type: String, required: true },
  categoryOptions: { type: Array, required: true },
  projectValue: { type: String, required: true },
  projectOptions: { type: Array, required: true },
  searchQuery: { type: String, required: true },
})
defineEmits(['update:accountValue', 'update:categoryValue', 'update:projectValue', 'update:searchQuery'])

const { isDark } = useTheme()

const selectClass = (isDarkVal) =>
  isDarkVal
    ? 'bg-[#100c1c]/80 border-white/10 text-gray-300'
    : 'bg-white border-gray-300 text-gray-700'
</script>

<template>
  <div class="flex flex-wrap items-center gap-2 mb-6">
    <button
      class="flex items-center gap-2 px-3.5 py-2 rounded-xl border text-sm whitespace-nowrap transition"
      :class="isDark ? 'border-white/10 bg-[#100c1c]/80 text-gray-300 hover:bg-white/5' : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'"
    >
      {{ period }}
      <CalendarDaysIcon class="w-4 h-4 text-gray-500" />
    </button>

    <select
      :value="accountValue"
      class="border rounded-xl py-2 pl-3 pr-8 text-sm focus:outline-none transition"
      :class="selectClass(isDark)"
      @change="$emit('update:accountValue', $event.target.value)"
    >
      <option v-for="opt in accountOptions" :key="opt" :value="opt">{{ opt }}</option>
    </select>

    <select
      :value="categoryValue"
      class="border rounded-xl py-2 pl-3 pr-8 text-sm focus:outline-none transition"
      :class="selectClass(isDark)"
      @change="$emit('update:categoryValue', $event.target.value)"
    >
      <option v-for="opt in categoryOptions" :key="opt" :value="opt">{{ opt }}</option>
    </select>

    <select
      :value="projectValue"
      class="border rounded-xl py-2 pl-3 pr-8 text-sm focus:outline-none transition"
      :class="selectClass(isDark)"
      @change="$emit('update:projectValue', $event.target.value)"
    >
      <option v-for="opt in projectOptions" :key="opt" :value="opt">{{ opt }}</option>
    </select>

    <div class="relative flex-1 min-w-[200px]">
      <MagnifyingGlassIcon class="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
      <input
        :value="searchQuery"
        type="text"
        placeholder="Cari keterangan atau nomor..."
        class="w-full border rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition"
        :class="isDark ? 'bg-[#100c1c]/80 border-white/10 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'"
        @input="$emit('update:searchQuery', $event.target.value)"
      />
    </div>

    <button
      class="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-sm whitespace-nowrap flex-shrink-0 transition"
      :class="isDark ? 'border-white/10 bg-[#100c1c]/80 text-gray-300 hover:bg-white/5' : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'"
    >
      <FunnelIcon class="w-4 h-4" />
      Filter
    </button>
  </div>
</template>