<script setup>
import { XMarkIcon, ClockIcon, UserIcon, Square3Stack3DIcon, GlobeAltIcon } from '@heroicons/vue/24/outline'
import { useTheme } from '@/composables/useTheme'

const { isDark } = useTheme()

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  log: {
    type: Object,
    default: null,
  },
})
const emit = defineEmits(['close'])

function handleClose() {
  emit('close')
}

function statusBadgeClass(status) {
  if (status === 'berhasil') {
    return isDark
      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
      : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
  }
  return isDark
    ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
    : 'bg-rose-50 text-rose-600 border border-rose-200'
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-show="open"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @keydown.escape="handleClose"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="handleClose"></div>

        <!-- Panel -->
        <Transition
          enter-active-class="transition-all duration-200 ease-out"
          enter-from-class="opacity-0 scale-95 translate-y-2"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition-all duration-150 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 translate-y-2"
        >
          <div
            v-if="log"
            v-show="open"
            class="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border shadow-2xl"
            :class="isDark ? 'bg-[#100c1c] border-white/10' : 'bg-white border-gray-200'"
          >
            <!-- Header -->
            <div
              class="flex items-center justify-between px-6 py-4 border-b sticky top-0 z-10"
              :class="isDark ? 'border-white/5 bg-[#100c1c]' : 'border-gray-100 bg-white'"
            >
              <div>
                <h2 class="text-lg font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">Detail Aktivitas</h2>
                <p class="text-xs mt-0.5" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Rincian lengkap aktivitas dalam audit log.</p>
              </div>
              <button
                type="button"
                class="p-1.5 rounded-lg transition"
                :class="isDark ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100'"
                @click="handleClose"
              >
                <XMarkIcon class="w-5 h-5" />
              </button>
            </div>

            <div class="px-6 py-5 space-y-5">
              <!-- Deskripsi + Status -->
              <div class="flex items-start justify-between gap-3">
                <p class="text-base font-medium" :class="isDark ? 'text-white' : 'text-gray-900'">{{ log.description }}</p>
                <span
                  class="shrink-0 px-2.5 py-1 rounded-full text-xs font-medium capitalize"
                  :class="statusBadgeClass(log.status)"
                >
                  {{ log.status }}
                </span>
              </div>

              <!-- Info Grid -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="flex items-start gap-2.5">
                  <UserIcon class="w-4 h-4 mt-0.5 shrink-0" :class="isDark ? 'text-gray-500' : 'text-gray-400'" />
                  <div>
                    <p class="text-xs" :class="isDark ? 'text-gray-500' : 'text-gray-400'">Pengguna</p>
                    <p class="text-sm font-medium" :class="isDark ? 'text-gray-200' : 'text-gray-800'">{{ log.name }}</p>
                  </div>
                </div>

                <div class="flex items-start gap-2.5">
                  <ClockIcon class="w-4 h-4 mt-0.5 shrink-0" :class="isDark ? 'text-gray-500' : 'text-gray-400'" />
                  <div>
                    <p class="text-xs" :class="isDark ? 'text-gray-500' : 'text-gray-400'">Waktu</p>
                    <p class="text-sm font-medium" :class="isDark ? 'text-gray-200' : 'text-gray-800'">{{ log.time || log.timestamp || '-' }}</p>
                  </div>
                </div>

                <div class="flex items-start gap-2.5">
                  <Square3Stack3DIcon class="w-4 h-4 mt-0.5 shrink-0" :class="isDark ? 'text-gray-500' : 'text-gray-400'" />
                  <div>
                    <p class="text-xs" :class="isDark ? 'text-gray-500' : 'text-gray-400'">Modul</p>
                    <p class="text-sm font-medium" :class="isDark ? 'text-gray-200' : 'text-gray-800'">{{ log.module }}</p>
                  </div>
                </div>

                <div class="flex items-start gap-2.5">
                  <GlobeAltIcon class="w-4 h-4 mt-0.5 shrink-0" :class="isDark ? 'text-gray-500' : 'text-gray-400'" />
                  <div>
                    <p class="text-xs" :class="isDark ? 'text-gray-500' : 'text-gray-400'">Alamat IP</p>
                    <p class="text-sm font-medium" :class="isDark ? 'text-gray-200' : 'text-gray-800'">{{ log.ipAddress || '-' }}</p>
                  </div>
                </div>
              </div>

              <!-- Aksi -->
              <div class="rounded-xl px-4 py-3" :class="isDark ? 'bg-[#181428]/80 border border-white/10' : 'bg-gray-50 border border-gray-200'">
                <p class="text-xs mb-1" :class="isDark ? 'text-gray-500' : 'text-gray-400'">Aksi</p>
                <p class="text-sm font-medium" :class="isDark ? 'text-gray-200' : 'text-gray-800'">{{ log.action }}</p>
              </div>

              <!-- Perubahan Data (before/after), tampil hanya jika tersedia -->
              <div v-if="log.before || log.after" class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div class="rounded-xl px-4 py-3" :class="isDark ? 'bg-rose-500/5 border border-rose-500/15' : 'bg-rose-50 border border-rose-100'">
                  <p class="text-xs mb-1.5 font-medium" :class="isDark ? 'text-rose-400' : 'text-rose-500'">Sebelum</p>
                  <pre class="text-xs whitespace-pre-wrap break-words" :class="isDark ? 'text-gray-300' : 'text-gray-700'">{{ log.before || '-' }}</pre>
                </div>
                <div class="rounded-xl px-4 py-3" :class="isDark ? 'bg-emerald-500/5 border border-emerald-500/15' : 'bg-emerald-50 border border-emerald-100'">
                  <p class="text-xs mb-1.5 font-medium" :class="isDark ? 'text-emerald-400' : 'text-emerald-600'">Sesudah</p>
                  <pre class="text-xs whitespace-pre-wrap break-words" :class="isDark ? 'text-gray-300' : 'text-gray-700'">{{ log.after || '-' }}</pre>
                </div>
              </div>

              <!-- User Agent, tampil hanya jika tersedia -->
              <div v-if="log.userAgent">
                <p class="text-xs mb-1" :class="isDark ? 'text-gray-500' : 'text-gray-400'">User Agent</p>
                <p class="text-xs break-words" :class="isDark ? 'text-gray-400' : 'text-gray-500'">{{ log.userAgent }}</p>
              </div>
            </div>

            <!-- Actions -->
            <div
              class="flex items-center justify-end gap-3 px-6 py-4 border-t"
              :class="isDark ? 'border-white/5' : 'border-gray-100'"
            >
              <button
                type="button"
                class="px-4 py-2.5 rounded-xl text-sm font-medium transition"
                :class="isDark ? 'text-gray-300 hover:bg-white/5' : 'text-gray-600 hover:bg-gray-100'"
                @click="handleClose"
              >
                Tutup
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>