<script setup>
import { EllipsisVerticalIcon } from '@heroicons/vue/24/outline'
import IntegrationLogo from './IntegrationLogo.vue'
import { useTheme } from '@/composables/useTheme'

const props = defineProps({
  item: { type: Object, required: true },
  variant: { type: String, default: 'connected' }, // connected | action | disconnected
})

const emit = defineEmits(['primary-action'])

const { isDark } = useTheme()

const variantMap = {
  connected: { dot: 'bg-emerald-400', buttonLabel: 'Kelola', buttonStyle: 'secondary' },
  action: { dot: 'bg-amber-400', buttonLabel: 'Perbarui', buttonStyle: 'primary-amber' },
  disconnected: { dot: 'bg-gray-400', buttonLabel: 'Hubungkan', buttonStyle: 'primary-purple' },
}

function handlePrimary() {
  emit('primary-action', { item: props.item, variant: props.variant })
}

function handleMenu() {
  emit('primary-action', { item: props.item, variant: props.variant, action: 'menu' })
}
</script>

<template>
  <div class="flex items-center gap-4 py-4">
    <IntegrationLogo :logo="item.logo" :color="item.color" class="flex-shrink-0" />

    <div class="flex-1 min-w-0">
      <div class="flex items-center gap-2 flex-wrap">
        <p class="text-sm font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">{{ item.name }}</p>
        <span
          class="text-xs px-2 py-0.5 rounded-full font-medium"
          :class="isDark ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 text-purple-600'"
        >
          {{ item.category }}
        </span>
      </div>

      <p class="text-sm mt-0.5 truncate" :class="isDark ? 'text-gray-400' : 'text-gray-500'">
        {{ item.description }}
      </p>

      <div class="flex items-center gap-2 mt-1.5 text-xs flex-wrap" :class="isDark ? 'text-gray-500' : 'text-gray-400'">
        <span class="w-1.5 h-1.5 rounded-full flex-shrink-0" :class="variantMap[variant].dot"></span>

        <template v-if="variant === 'connected'">
          <span>Terhubung sejak {{ item.since }}</span>
          <span>•</span>
          <span>Sinkron terakhir: {{ item.lastSync }}</span>
        </template>

        <template v-else-if="variant === 'action'">
          <span class="text-amber-400">{{ item.warning }}</span>
          <span>•</span>
          <span>{{ item.expiresAt }}</span>
        </template>

        <template v-else>
          <span>Belum terhubung</span>
        </template>
      </div>
    </div>

    <div class="flex items-center gap-2 flex-shrink-0">
      <button
        type="button"
        class="text-sm font-medium px-4 py-1.5 rounded-lg border transition"
        :class="[
          variantMap[variant].buttonStyle === 'primary-amber'
            ? 'bg-amber-500 border-amber-500 text-white hover:bg-amber-600'
            : variantMap[variant].buttonStyle === 'primary-purple'
              ? 'bg-purple-500 border-purple-500 text-white hover:bg-purple-600'
              : (isDark ? 'border-white/15 text-white hover:bg-white/10' : 'border-gray-200 text-gray-700 hover:bg-gray-50'),
        ]"
        @click="handlePrimary"
      >
        {{ variantMap[variant].buttonLabel }}
      </button>

      <button
        v-if="variant === 'connected'"
        type="button"
        class="p-1.5 rounded-lg border transition"
        :class="isDark
          ? 'border-white/15 text-white hover:bg-white/10'
          : 'border-gray-200 text-gray-700 hover:bg-gray-50'"
        @click="handleMenu"
      >
        <EllipsisVerticalIcon class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>