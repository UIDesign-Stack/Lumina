<script setup>
import { MagnifyingGlassIcon, FunnelIcon, Bars3BottomLeftIcon } from '@heroicons/vue/24/outline'
import { useTheme } from '@/composables/useTheme'

defineProps({
  tabs: { type: Array, required: true },
  activeTab: { type: String, required: true },
  searchQuery: { type: String, required: true },
})
defineEmits(['update:activeTab', 'update:searchQuery'])

const { isDark } = useTheme()
</script>

<template>
  <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 pb-4 border-b" :class="isDark ? 'border-white/10' : 'border-gray-200'">
    <div class="flex items-center gap-6 overflow-x-auto">
      <button
        v-for="tab in tabs"
        :key="tab"
        class="pb-3 lg:pb-0 text-sm font-medium whitespace-nowrap border-b-2 transition -mb-4 lg:mb-0 lg:border-b-0 flex-shrink-0"
        :class="activeTab === tab
          ? 'border-purple-500 text-purple-400'
          : (isDark ? 'border-transparent text-gray-400 hover:text-gray-200' : 'border-transparent text-gray-500 hover:text-gray-800')"
        @click="$emit('update:activeTab', tab)"
      >
        {{ tab }}
      </button>
    </div>

    <div class="flex items-center gap-2">
      <div class="relative flex-1 min-w-0 sm:min-w-[220px]">
        <MagnifyingGlassIcon class="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          :value="searchQuery"
          type="text"
          placeholder="Cari proyek..."
          class="w-full border rounded-lg py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition"
          :class="isDark ? 'bg-[#181428]/80 border-white/10 text-white placeholder-gray-500' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'"
          @input="$emit('update:searchQuery', $event.target.value)"
        />
      </div>
      <button class="flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm flex-shrink-0 whitespace-nowrap transition" :class="isDark ? 'border-white/10 text-gray-300 hover:bg-white/5' : 'border-gray-300 text-gray-600 hover:bg-gray-50'">
        <FunnelIcon class="w-4 h-4" /> Filter
      </button>
      <button class="w-9 h-9 rounded-lg border flex items-center justify-center flex-shrink-0 transition" :class="isDark ? 'border-white/10 text-gray-400 hover:text-white hover:bg-white/5' : 'border-gray-300 text-gray-500 hover:text-gray-900 hover:bg-gray-50'">
        <Bars3BottomLeftIcon class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>