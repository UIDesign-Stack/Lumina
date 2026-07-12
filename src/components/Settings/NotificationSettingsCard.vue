<script setup>
import { EnvelopeIcon, BellIcon, DevicePhoneMobileIcon, MoonIcon } from '@heroicons/vue/24/outline'
import { useTheme } from '@/composables/useTheme'

const props = defineProps({
  channels: { type: Array, required: true },
  modules: { type: Array, required: true },
  digestFrequency: { type: String, required: true },
  digestFrequencyOptions: { type: Array, default: () => [] },
  quietHours: { type: Object, required: true },
})
const emit = defineEmits(['update:digestFrequency'])

const { isDark } = useTheme()

const channelIcons = {
  email: EnvelopeIcon,
  pushBrowser: BellIcon,
  sms: DevicePhoneMobileIcon,
}
</script>

<template>
  <div class="space-y-4">
    <!-- Kanal Notifikasi -->
    <div class="rounded-2xl border p-5" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
      <p class="text-base font-semibold mb-1" :class="isDark ? 'text-white' : 'text-gray-900'">Kanal Notifikasi</p>
      <p class="text-xs mb-4" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Pilih cara kamu ingin menerima notifikasi.</p>

      <div class="divide-y" :class="isDark ? 'divide-white/5' : 'divide-gray-100'">
        <div v-for="channel in channels" :key="channel.key" class="flex items-center gap-3 py-3.5">
          <div class="w-9 h-9 rounded-xl bg-purple-500/15 flex items-center justify-center flex-shrink-0">
            <component :is="channelIcons[channel.key] || BellIcon" class="w-4 h-4 text-purple-400" />
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium" :class="isDark ? 'text-white' : 'text-gray-900'">{{ channel.label }}</p>
            <p class="text-xs mt-0.5" :class="isDark ? 'text-gray-400' : 'text-gray-500'">{{ channel.description }}</p>
          </div>
          <button
            type="button"
            class="relative w-11 h-6 rounded-full transition-colors flex-shrink-0"
            :class="channel.enabled ? 'bg-purple-600' : (isDark ? 'bg-white/10' : 'bg-gray-300')"
            @click="channel.enabled = !channel.enabled"
          >
            <span
              class="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform"
              :class="channel.enabled ? 'translate-x-5' : 'translate-x-0'"
            ></span>
          </button>
        </div>
      </div>
    </div>

    <!-- Notifikasi per Modul -->
    <div class="rounded-2xl border p-5" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
      <p class="text-base font-semibold mb-1" :class="isDark ? 'text-white' : 'text-gray-900'">Notifikasi per Modul</p>
      <p class="text-xs mb-4" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Atur modul mana saja yang mengirim notifikasi ke kamu.</p>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <label
          v-for="mod in modules"
          :key="mod.key"
          class="flex items-center justify-between gap-3 rounded-xl px-3.5 py-3 cursor-pointer border"
          :class="isDark ? 'bg-[#181428]/60 border-white/10' : 'bg-gray-50 border-gray-200'"
        >
          <span class="text-sm" :class="isDark ? 'text-gray-200' : 'text-gray-800'">{{ mod.label }}</span>
          <input v-model="mod.enabled" type="checkbox" class="w-4 h-4 rounded accent-purple-600" />
        </label>
      </div>
    </div>

    <!-- Frekuensi Ringkasan & Jam Tenang -->
    <div class="rounded-2xl border p-5" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
      <p class="text-base font-semibold mb-4" :class="isDark ? 'text-white' : 'text-gray-900'">Frekuensi & Jam Tenang</p>

      <div class="divide-y" :class="isDark ? 'divide-white/5' : 'divide-gray-100'">
        <!-- Frekuensi Ringkasan -->
        <div class="flex flex-col sm:flex-row sm:items-center gap-3 py-4">
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium" :class="isDark ? 'text-white' : 'text-gray-900'">Frekuensi Ringkasan Notifikasi</p>
            <p class="text-xs mt-0.5" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Seberapa sering ringkasan notifikasi dikirim ke email.</p>
          </div>
          <select
            :value="digestFrequency"
            class="w-full sm:w-56 border rounded-xl py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition flex-shrink-0"
            :class="isDark ? 'bg-[#181428]/80 border-white/10 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'"
            @change="emit('update:digestFrequency', $event.target.value)"
          >
            <option v-for="opt in digestFrequencyOptions" :key="opt" :value="opt">{{ opt }}</option>
          </select>
        </div>

        <!-- Jam Tenang -->
        <div class="flex items-center gap-3 py-4">
          <div class="w-9 h-9 rounded-xl bg-purple-500/15 flex items-center justify-center flex-shrink-0">
            <MoonIcon class="w-4 h-4 text-purple-400" />
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium" :class="isDark ? 'text-white' : 'text-gray-900'">Jam Tenang</p>
            <p class="text-xs mt-0.5" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Tunda notifikasi non-mendesak di luar jam kerja.</p>
          </div>
          <button
            type="button"
            class="relative w-11 h-6 rounded-full transition-colors flex-shrink-0"
            :class="quietHours.enabled ? 'bg-purple-600' : (isDark ? 'bg-white/10' : 'bg-gray-300')"
            @click="quietHours.enabled = !quietHours.enabled"
          >
            <span
              class="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform"
              :class="quietHours.enabled ? 'translate-x-5' : 'translate-x-0'"
            ></span>
          </button>
        </div>

        <div v-if="quietHours.enabled" class="flex items-center gap-3 py-4">
          <div class="flex-1">
            <label class="block text-xs mb-1.5" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Mulai</label>
            <input
              v-model="quietHours.mulai"
              type="time"
              class="w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition"
              :class="isDark ? 'bg-[#181428]/80 border border-white/10 text-white' : 'bg-gray-50 border border-gray-200 text-gray-900'"
            />
          </div>
          <div class="flex-1">
            <label class="block text-xs mb-1.5" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Selesai</label>
            <input
              v-model="quietHours.selesai"
              type="time"
              class="w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition"
              :class="isDark ? 'bg-[#181428]/80 border border-white/10 text-white' : 'bg-gray-50 border border-gray-200 text-gray-900'"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>