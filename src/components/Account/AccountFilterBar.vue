<script setup>
import { MagnifyingGlassIcon, ChevronDownIcon, FunnelIcon } from '@heroicons/vue/24/outline'
import { useTheme } from '@/composables/useTheme'

defineProps({
  modelValue: { type: String, required: true },
  typeFilter: { type: String, required: true },
  statusFilter: { type: String, required: true },
})
defineEmits(['update:modelValue', 'update:typeFilter', 'update:statusFilter'])

const { isDark } = useTheme()
</script>

<template>
  <div class="flex items-center gap-2 flex-wrap mb-6">
    <div class="relative flex-1 min-w-[180px]">
      <MagnifyingGlassIcon class="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
      <input
        :value="modelValue"
        type="text"
        placeholder="Cari akun..."
        class="w-full border rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition"
        :class="isDark ? 'bg-[#181428]/80 border-white/10 text-white placeholder-gray-500' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>

    <div class="relative flex-shrink-0">
      <select
        :value="typeFilter"
        class="appearance-none border rounded-xl py-2.5 pl-4 pr-9 text-sm focus:outline-none transition cursor-pointer"
        :class="isDark ? 'bg-[#181428]/80 border-white/10 text-gray-200' : 'bg-gray-50 border-gray-300 text-gray-700'"
        @change="$emit('update:typeFilter', $event.target.value)"
      >
        <option value="Semua Tipe">Semua Tipe</option>
        <option value="Aset">Aset</option>
        <option value="Liabilitas">Liabilitas</option>
        <option value="Ekuitas">Ekuitas</option>
      </select>
      <ChevronDownIcon class="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
    </div>

    <div class="relative flex-shrink-0">
      <select
        :value="statusFilter"
        class="appearance-none border rounded-xl py-2.5 pl-4 pr-9 text-sm focus:outline-none transition cursor-pointer"
        :class="isDark ? 'bg-[#181428]/80 border-white/10 text-gray-200' : 'bg-gray-50 border-gray-300 text-gray-700'"
        @change="$emit('update:statusFilter', $event.target.value)"
      >
        <option value="Semua Status">Semua Status</option>
        <option value="Aktif">Aktif</option>
        <option value="Nonaktif">Nonaktif</option>
      </select>
      <ChevronDownIcon class="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
    </div>

    <button
      class="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border text-sm font-medium flex-shrink-0 whitespace-nowrap transition"
      :class="isDark ? 'border-white/10 text-gray-300 hover:bg-white/5' : 'border-gray-300 text-gray-600 hover:bg-gray-50'"
    >
      <FunnelIcon class="w-4 h-4" /> Filter
    </button>
  </div>
</template>