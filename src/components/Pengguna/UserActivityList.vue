<script setup>
import { UserPlusIcon, PencilSquareIcon, UserMinusIcon, EnvelopeIcon } from '@heroicons/vue/24/outline'
import { useTheme } from '@/composables/useTheme'

defineProps({
  activities: { type: Array, required: true },
})

const { isDark } = useTheme()

const iconMap = {
  added: { icon: UserPlusIcon, color: 'bg-emerald-500/15 text-emerald-400' },
  'role-changed': { icon: PencilSquareIcon, color: 'bg-blue-500/15 text-blue-400' },
  deactivated: { icon: UserMinusIcon, color: 'bg-amber-500/15 text-amber-400' },
  invited: { icon: EnvelopeIcon, color: 'bg-purple-500/15 text-purple-400' },
}
</script>

<template>
  <div class="rounded-2xl border p-5" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
    <div class="flex items-center justify-between mb-4">
      <p class="text-base font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">Aktivitas Terbaru</p>
      <a href="#" class="text-sm text-purple-400 hover:text-purple-300 transition">Lihat Semua</a>
    </div>

    <ul class="space-y-4">
      <li v-for="activity in activities" :key="activity.key" class="flex items-start gap-3">
        <div class="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" :class="iconMap[activity.type]?.color">
          <component :is="iconMap[activity.type]?.icon" class="w-4.5 h-4.5" />
        </div>
        <div class="min-w-0">
          <p class="text-sm font-medium" :class="isDark ? 'text-gray-200' : 'text-gray-800'">{{ activity.title }}</p>
          <p class="text-xs truncate" :class="isDark ? 'text-gray-500' : 'text-gray-400'">{{ activity.subject }}</p>
          <p class="text-xs mt-0.5" :class="isDark ? 'text-gray-600' : 'text-gray-400'">{{ activity.date }}</p>
        </div>
      </li>
    </ul>

    <a
      href="#"
      class="mt-4 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium border transition"
      :class="isDark ? 'border-white/10 text-gray-300 hover:bg-white/5' : 'border-gray-200 text-gray-600 hover:bg-gray-50'"
    >
      Lihat Semua Aktivitas →
    </a>
  </div>
</template>