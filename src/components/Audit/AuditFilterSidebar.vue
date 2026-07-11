<script setup>
import { ChevronDownIcon, CalendarIcon } from '@heroicons/vue/24/outline'
import { useTheme } from '@/composables/useTheme'

const props = defineProps({
  dateRange: { type: String, required: true },
  userOptions: { type: Array, required: true },
  moduleOptions: { type: Array, required: true },
  actionOptions: { type: Array, required: true },
  statusOptions: { type: Array, required: true },
  activeUser: { type: String, required: true },
  activeModule: { type: String, required: true },
  activeAction: { type: String, required: true },
  activeStatus: { type: String, required: true },
})

const emit = defineEmits(['update:activeUser', 'update:activeModule', 'update:activeAction', 'update:activeStatus', 'reset', 'apply'])

const { isDark } = useTheme()

const fields = [
  { label: 'Pengguna', key: 'activeUser', event: 'update:activeUser', optionsKey: 'userOptions' },
  { label: 'Modul', key: 'activeModule', event: 'update:activeModule', optionsKey: 'moduleOptions' },
  { label: 'Aksi', key: 'activeAction', event: 'update:activeAction', optionsKey: 'actionOptions' },
  { label: 'Status', key: 'activeStatus', event: 'update:activeStatus', optionsKey: 'statusOptions' },
]
</script>

<template>
  <div class="rounded-2xl border p-5" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
    <p class="text-base font-semibold mb-4" :class="isDark ? 'text-white' : 'text-gray-900'">Filter Audit</p>

    <div class="mb-4">
      <label class="text-xs font-medium block mb-1.5" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Tanggal</label>
      <button
        type="button"
        class="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm border transition"
        :class="isDark ? 'bg-white/5 border-white/10 text-gray-200 hover:bg-white/10' : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'"
      >
        {{ dateRange }}
        <CalendarIcon class="w-4 h-4" :class="isDark ? 'text-gray-500' : 'text-gray-400'" />
      </button>
    </div>

    <div v-for="field in fields" :key="field.key" class="mb-4">
      <label class="text-xs font-medium block mb-1.5" :class="isDark ? 'text-gray-400' : 'text-gray-500'">{{ field.label }}</label>
      <div class="relative">
        <select
          class="w-full appearance-none pl-3.5 pr-9 py-2.5 rounded-xl text-sm outline-none border transition cursor-pointer"
          :class="isDark ? 'bg-white/5 border-white/10 text-gray-200' : 'bg-gray-50 border-gray-200 text-gray-700'"
          :value="props[field.key]"
          @change="emit(field.event, $event.target.value)"
        >
          <option v-for="opt in props[field.optionsKey]" :key="opt" :value="opt">{{ opt }}</option>
        </select>
        <ChevronDownIcon class="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" :class="isDark ? 'text-gray-500' : 'text-gray-400'" />
      </div>
    </div>

    <div class="flex items-center gap-2.5 mt-5">
      <button
        type="button"
        class="flex-1 py-2.5 rounded-xl text-sm font-medium border transition"
        :class="isDark ? 'border-white/15 text-gray-200 hover:bg-white/10' : 'border-gray-200 text-gray-700 hover:bg-gray-50'"
        @click="$emit('reset')"
      >
        Reset Filter
      </button>
      <button
        type="button"
        class="flex-1 py-2.5 rounded-xl text-sm font-medium bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white transition"
        @click="$emit('apply')"
      >
        Terapkan Filter
      </button>
    </div>
  </div>
</template>