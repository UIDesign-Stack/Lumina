<script setup>
import { ChevronDownIcon } from '@heroicons/vue/24/outline'
import { useTheme } from '@/composables/useTheme'

const props = defineProps({
  id: { type: String, required: true },
  label: { type: String, required: true },
  modelValue: { type: String, default: '' },
  icon: { type: [Object, Function], required: true },
  placeholder: { type: String, default: 'Pilih salah satu' },
  options: { type: Array, default: () => [] },
  required: { type: Boolean, default: true },
})

defineEmits(['update:modelValue'])

const { isDark } = useTheme()
</script>

<template>
  <div>
    <label :for="id" class="block text-sm mb-2" :class="isDark ? 'text-white' : 'text-gray-900'">{{ label }}</label>
    <div class="relative">
      <component :is="icon" class="w-5 h-5 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      <select
        :id="id"
        :value="modelValue"
        :required="required"
        class="w-full appearance-none rounded-xl py-3 pl-11 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 focus:border-transparent transition"
        :class="[
          isDark ? 'bg-[#181428]/80 border border-white/10' : 'bg-gray-50 border border-gray-200',
          modelValue ? (isDark ? 'text-white' : 'text-gray-900') : 'text-gray-500',
        ]"
        @change="$emit('update:modelValue', $event.target.value)"
      >
        <option value="" disabled>{{ placeholder }}</option>
        <option
          v-for="opt in options"
          :key="opt.value"
          :value="opt.value"
          class="text-white bg-[#181428]"
        >
          {{ opt.label }}
        </option>
      </select>
      <ChevronDownIcon class="w-4 h-4 text-gray-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
    </div>
  </div>
</template>