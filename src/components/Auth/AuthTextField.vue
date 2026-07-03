<script setup>
import { ref, computed } from 'vue'
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'
import { useTheme } from '@/composables/useTheme'

const props = defineProps({
  id: { type: String, required: true },
  label: { type: String, required: true },
  modelValue: { type: String, default: '' },
  type: { type: String, default: 'text' }, // text | email | tel | password
  icon: { type: [Object, Function], required: true },
  placeholder: { type: String, default: '' },
  autocomplete: { type: String, default: '' },
  required: { type: Boolean, default: true },
  revealable: { type: Boolean, default: false }, // tampilkan toggle show/hide (untuk password)
})

defineEmits(['update:modelValue'])

const { isDark } = useTheme()
const show = ref(false)

const inputType = computed(() => {
  if (!props.revealable) return props.type
  return show.value ? 'text' : 'password'
})
</script>

<template>
  <div>
    <label :for="id" class="block text-sm mb-2" :class="isDark ? 'text-white' : 'text-gray-900'">{{ label }}</label>
    <div class="relative">
      <component :is="icon" class="w-5 h-5 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
      <input
        :id="id"
        :value="modelValue"
        :type="inputType"
        :autocomplete="autocomplete"
        :placeholder="placeholder"
        :required="required"
        class="w-full rounded-xl py-3 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/60 focus:border-transparent transition"
        :class="[
          revealable ? 'pl-11 pr-11' : 'pl-11 pr-4',
          isDark ? 'bg-[#181428]/80 border border-white/10 text-white' : 'bg-gray-50 border border-gray-200 text-gray-900',
        ]"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <button
        v-if="revealable"
        type="button"
        class="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition"
        :aria-label="show ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'"
        @click="show = !show"
      >
        <EyeSlashIcon v-if="show" class="w-5 h-5" />
        <EyeIcon v-else class="w-5 h-5" />
      </button>
    </div>
  </div>
</template>