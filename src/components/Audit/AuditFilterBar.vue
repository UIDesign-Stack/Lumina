<script setup>
import { CalendarIcon, MagnifyingGlassIcon, ChevronDownIcon, FunnelIcon } from '@heroicons/vue/24/outline'
import { useTheme } from '@/composables/useTheme'

defineProps({
  dateRange: { type: String, required: true },
  search: { type: String, default: '' },
  userOptions: { type: Array, required: true },
  moduleOptions: { type: Array, required: true },
  actionOptions: { type: Array, required: true },
  statusOptions: { type: Array, required: true },
  activeUser: { type: String, required: true },
  activeModule: { type: String, required: true },
  activeAction: { type: String, required: true },
  activeStatus: { type: String, required: true },
})

defineEmits(['update:search', 'update:activeUser', 'update:activeModule', 'update:activeAction', 'update:activeStatus', 'open-filter'])

const { isDark } = useTheme()

const selectClass = (dark) => dark
  ? 'bg-white/5 border-white/10 text-gray-200'
  : 'bg-gray-50 border-gray-200 text-gray-700'
</script>

<template>
  <div class="rounded-2xl border p-4 flex flex-wrap gap-3" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
    <button
      type="button"
      class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm border transition"
      :class="isDark ? 'bg-white/5 border-white/10 text-gray-200 hover:bg-white/10' : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'"
    >
      <CalendarIcon class="w-4 h-4" :class="isDark ? 'text-gray-400' : 'text-gray-500'" />
      {{ dateRange }}
    </button>

    <div v-for="cfg in [
      { key: 'activeUser', options: userOptions, event: 'update:activeUser', value: activeUser },
      { key: 'activeModule', options: moduleOptions, event: 'update:activeModule', value: activeModule },
      { key: 'activeAction', options: actionOptions, event: 'update:activeAction', value: activeAction },
      { key: 'activeStatus', options: statusOptions, event: 'update:activeStatus', value: activeStatus },
    ]" :key="cfg.key" class="relative">
      <select
        class="appearance-none pl-4 pr-9 py-2.5 rounded-xl text-sm outline-none border transition cursor-pointer"
        :class="selectClass(isDark)"
        :value="cfg.value"
        @change="$emit(cfg.event, $event.target.value)"
      >
        <option v-for="opt in cfg.options" :key="opt" :value="opt">{{ opt }}</option>
      </select>
      <ChevronDownIcon class="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" :class="isDark ? 'text-gray-500' : 'text-gray-400'" />
    </div>

    <div class="relative flex-1 min-w-[160px]">
      <MagnifyingGlassIcon class="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2" :class="isDark ? 'text-gray-500' : 'text-gray-400'" />
      <input
        type="text"
        placeholder="Cari aktivitas..."
        class="w-full pl-10 pr-3 py-2.5 rounded-xl text-sm outline-none border transition"
        :class="isDark
          ? 'bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-purple-500/50'
          : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-purple-400'"
        :value="search"
        @input="$emit('update:search', $event.target.value)"
      />
    </div>

    <button
      type="button"
      class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition"
      :class="isDark ? 'border-white/15 text-white hover:bg-white/10' : 'border-gray-200 text-gray-700 hover:bg-gray-50'"
      @click="$emit('open-filter')"
    >
      <FunnelIcon class="w-4 h-4" />
      Filter
    </button>
  </div>
</template>