<script setup>
import ModuleBadge from './ModuleBadge.vue'
import AuditStatusBadge from './AuditStatusBadge.vue'
import { useTheme } from '@/composables/useTheme'

defineProps({
  log: { type: Object, required: true },
})

const { isDark } = useTheme()
</script>

<template>
  <tr class="align-top transition-colors" :class="isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50'">
    <td class="py-3.5 pr-4 text-sm whitespace-nowrap" :class="isDark ? 'text-gray-300' : 'text-gray-600'">{{ log.date }}</td>

    <td class="py-3.5 pr-4">
      <div class="flex items-center gap-3">
        <img :src="log.avatar" :alt="log.name" class="w-8 h-8 rounded-full flex-shrink-0" />
        <div class="min-w-0">
          <p class="text-sm font-medium truncate" :class="isDark ? 'text-white' : 'text-gray-900'">{{ log.name }}</p>
          <p class="text-xs truncate" :class="isDark ? 'text-gray-500' : 'text-gray-400'">{{ log.email }}</p>
        </div>
      </div>
    </td>

    <td class="py-3.5 pr-4"><ModuleBadge :label="log.module" :color="log.moduleColor" /></td>

    <td class="py-3.5 pr-4 text-sm whitespace-nowrap" :class="isDark ? 'text-gray-300' : 'text-gray-600'">{{ log.action }}</td>

    <td class="py-3.5 pr-4 text-sm max-w-xs" :class="isDark ? 'text-gray-400' : 'text-gray-500'">{{ log.description }}</td>

    <td class="py-3.5 pr-4 text-sm whitespace-nowrap" :class="isDark ? 'text-gray-400' : 'text-gray-500'">{{ log.ip }}</td>

    <td class="py-3.5 whitespace-nowrap"><AuditStatusBadge :status="log.status" :note="log.note" /></td>
  </tr>
</template>