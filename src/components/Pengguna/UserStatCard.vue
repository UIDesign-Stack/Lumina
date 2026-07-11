<script setup>
import { UsersIcon, UserIcon, UserMinusIcon, ShieldCheckIcon } from '@heroicons/vue/24/outline'
import { useTheme } from '@/composables/useTheme'

defineProps({
  label: { type: String, required: true },
  value: { type: String, required: true },
  note: { type: String, required: true },
  icon: { type: String, default: 'users' },
  color: { type: String, default: 'purple' },
})

const { isDark } = useTheme()

const iconMap = {
  users: UsersIcon,
  'user-check': UserIcon,
  'user-x': UserMinusIcon,
  shield: ShieldCheckIcon,
}

const colorMap = {
  purple: 'bg-purple-500/15 text-purple-400',
  emerald: 'bg-emerald-500/15 text-emerald-400',
  amber: 'bg-amber-500/15 text-amber-400',
  indigo: 'bg-indigo-500/15 text-indigo-400',
}
</script>

<template>
  <div class="rounded-2xl border p-5 flex items-center gap-4 transition" :class="isDark ? 'bg-[#100c1c]/80 border-white/10 hover:border-white/20' : 'bg-white border-gray-200 hover:border-gray-300'">
    <div class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" :class="colorMap[color]">
      <component :is="iconMap[icon]" class="w-6 h-6" />
    </div>
    <div class="min-w-0">
      <p class="text-2xl font-bold leading-tight" :class="isDark ? 'text-white' : 'text-gray-900'">{{ value }}</p>
      <p class="text-sm font-medium" :class="isDark ? 'text-gray-200' : 'text-gray-800'">{{ label }}</p>
      <p class="text-xs mt-0.5 truncate" :class="isDark ? 'text-gray-500' : 'text-gray-400'">{{ note }}</p>
    </div>
  </div>
</template>