<script setup>
import { reactive, watch } from 'vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { useTheme } from '@/composables/useTheme'

const { isDark } = useTheme()

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  // Info periode yang sedang aktif di halaman, ditampilkan sebagai konteks (read-only)
  periodLabel: {
    type: String,
    default: '',
  },
})
const emit = defineEmits(['close', 'submit'])

function emptyForm() {
  return {
    formatExport: 'pdf',
    sertakanStrukturAset: true,
    sertakanStrukturLiabilitasEkuitas: true,
  }
}

const form = reactive(emptyForm())

// Reset form setiap kali modal dibuka
watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) {
      Object.assign(form, emptyForm())
    }
  }
)

function handleSubmit() {
  emit('submit', { ...form })
  emit('close')
}

function handleClose() {
  emit('close')
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
            v-show="open"
            class="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl border shadow-2xl"
            :class="isDark ? 'bg-[#100c1c] border-white/10' : 'bg-white border-gray-200'"
          >
            <!-- Header -->
            <div
              class="flex items-center justify-between px-6 py-4 border-b sticky top-0 z-10"
              :class="isDark ? 'border-white/5 bg-[#100c1c]' : 'border-gray-100 bg-white'"
            >
              <div>
                <h2 class="text-lg font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">Export Laporan</h2>
                <p class="text-xs mt-0.5" :class="isDark ? 'text-gray-400' : 'text-gray-500'">
                  Export data neraca yang sedang ditampilkan<span v-if="periodLabel"> ({{ periodLabel }})</span>.
                </p>
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

            <!-- Form -->
            <form @submit.prevent="handleSubmit" class="px-6 py-5 space-y-5">
              <!-- Format Export -->
              <div>
                <label class="block text-sm font-medium mb-2" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                  Format Export
                </label>
                <div class="grid grid-cols-3 gap-3">
                  <button
                    v-for="fmt in [{ key: 'pdf', label: 'PDF' }, { key: 'excel', label: 'Excel' }, { key: 'csv', label: 'CSV' }]"
                    :key="fmt.key"
                    type="button"
                    class="rounded-xl px-4 py-2.5 text-sm font-medium border transition"
                    :class="form.formatExport === fmt.key
                      ? 'bg-purple-500/10 border-purple-500 text-purple-500'
                      : (isDark ? 'border-white/10 text-gray-300 hover:bg-white/5' : 'border-gray-200 text-gray-600 hover:bg-gray-50')"
                    @click="form.formatExport = fmt.key"
                  >
                    {{ fmt.label }}
                  </button>
                </div>
              </div>

              <!-- Opsi Konten -->
              <div>
                <label class="block text-sm font-medium mb-2" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                  Sertakan
                </label>
                <div class="space-y-2.5">
                  <label class="flex items-center gap-2.5 text-sm cursor-pointer" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                    <input v-model="form.sertakanStrukturAset" type="checkbox" class="w-4 h-4 rounded accent-purple-600" />
                    Struktur aset
                  </label>
                  <label class="flex items-center gap-2.5 text-sm cursor-pointer" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                    <input v-model="form.sertakanStrukturLiabilitasEkuitas" type="checkbox" class="w-4 h-4 rounded accent-purple-600" />
                    Struktur liabilitas & ekuitas
                  </label>
                </div>
              </div>

              <!-- Actions -->
              <div class="flex items-center justify-end gap-3 pt-2 border-t" :class="isDark ? 'border-white/5' : 'border-gray-100'">
                <button
                  type="button"
                  class="px-4 py-2.5 rounded-xl text-sm font-medium transition"
                  :class="isDark ? 'text-gray-300 hover:bg-white/5' : 'text-gray-600 hover:bg-gray-100'"
                  @click="handleClose"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-medium shadow-lg shadow-purple-900/30 transition"
                >
                  Export
                </button>
              </div>
            </form>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>