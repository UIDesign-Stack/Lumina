<script setup>
import { EllipsisVerticalIcon } from '@heroicons/vue/24/outline'
import RoleBadge from './RoleBadge.vue'
import { useTheme } from '@/composables/useTheme'

defineProps({
  user: { type: Object, required: true },
})

defineEmits(['menu'])

const { isDark } = useTheme()
</script>

<template>
  <tr class="border-b last:border-b-0" :class="isDark ? 'border-white/5' : 'border-gray-100'">
    <td class="py-3.5 pr-4">
      <div class="flex items-center gap-3">
        <img :src="user.avatar" :alt="user.name" class="w-9 h-9 rounded-full flex-shrink-0" />
        <div class="min-w-0">
          <p class="text-sm font-medium truncate" :class="isDark ? 'text-white' : 'text-gray-900'">{{ user.name }}</p>
          <p class="text-xs truncate" :class="isDark ? 'text-gray-500' : 'text-gray-400'">{{ user.email }}</p>
        </div>
      </div>
    </td>
    <td class="py-3.5 pr-4">
      <RoleBadge :label="user.role" :color="user.roleColor" />
    </td>
    <td class="py-3.5 pr-4 text-sm" :class="isDark ? 'text-gray-300' : 'text-gray-600'">{{ user.department }}</td>
    <td class="py-3.5 pr-4">
      <span class="inline-flex items-center gap-1.5 text-sm" :class="user.status === 'aktif' ? 'text-emerald-400' : 'text-amber-400'">
        <span class="w-1.5 h-1.5 rounded-full" :class="user.status === 'aktif' ? 'bg-emerald-400' : 'bg-amber-400'"></span>
        {{ user.status === 'aktif' ? 'Aktif' : 'Nonaktif' }}
      </span>
    </td>
    <td class="py-3.5 pr-4 text-sm" :class="isDark ? 'text-gray-400' : 'text-gray-500'">{{ user.lastActive || '-' }}</td>
    <td class="py-3.5 text-right">
      <button
        type="button"
        class="p-1.5 rounded-lg transition"
        :class="isDark ? 'text-gray-400 hover:bg-white/10 hover:text-white' : 'text-gray-500 hover:bg-gray-100'"
        @click="$emit('menu', user)"
      >
        <EllipsisVerticalIcon class="w-4 h-4" />
      </button>
    </td>
  </tr>
</template>