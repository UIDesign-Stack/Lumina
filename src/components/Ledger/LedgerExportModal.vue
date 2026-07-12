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
  accountOptions: {
    type: Array,
    default: () => [],
  },
  categoryOptions: {
    type: Array,
    default: () => [],
  },
  projectOptions: {
    type: Array,
    default: () => [],
  },
})
const emit = defineEmits(['close', 'submit'])

const today = new Date().toISOString().slice(0, 10)

function firstDayOfMonth() {
  const d = new Date()
  return new Date(d.getFullYear(), d.getMonth(), 1).toISOString().slice(0, 10)
}

function emptyForm() {
  return {
    akun: props.accountOptions[0] || 'Semua Akun',
    kategori: props.categoryOptions[0] || 'Semua Kategori',
    proyek: props.projectOptions[0] || 'Semua Proyek',
    tanggalMulai: firstDayOfMonth(),
    tanggalAkhir: today,
    formatExport: 'pdf',
    sertakanSaldoAwalAkhir: true,
    sertakanNomorVoucher: true,
    sertakanCatatan: false,
    catatan: '',
  }
}

const form = reactive(emptyForm())
const errors = reactive({})

// Reset form setiap kali modal dibuka
watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) {
      Object.assign(form, emptyForm())
      Object.keys(errors).forEach((k) => delete errors[k])
    }
  }
)

function validate() {
  Object.keys(errors).forEach((k) => delete errors[k])
  if (!form.tanggalMulai) errors.tanggalMulai = 'Tanggal mulai wajib diisi'
  if (!form.tanggalAkhir) errors.tanggalAkhir = 'Tanggal akhir wajib diisi'
  if (form.tanggalMulai && form.tanggalAkhir && form.tanggalAkhir < form.tanggalMulai) {
    errors.tanggalAkhir = 'Tanggal akhir tidak boleh sebelum tanggal mulai'
  }
  return Object.keys(errors).length === 0
}

function handleSubmit() {
  if (!validate()) return
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
            class="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border shadow-2xl"
            :class="isDark ? 'bg-[#100c1c] border-white/10' : 'bg-white border-gray-200'"
          >
            <!-- Header -->
            <div
              class="flex items-center justify-between px-6 py-4 border-b sticky top-0 z-10"
              :class="isDark ? 'border-white/5 bg-[#100c1c]' : 'border-gray-100 bg-white'"
            >
              <div>
                <h2 class="text-lg font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">Export Buku Besar</h2>
                <p class="text-xs mt-0.5" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Pilih cakupan dan format export buku besar.</p>
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
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <!-- Tanggal Mulai -->
                <div>
                  <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                    Periode Mulai <span class="text-rose-500">*</span>
                  </label>
                  <input
                    v-model="form.tanggalMulai"
                    type="date"
                    class="w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition"
                    :class="isDark
                      ? 'bg-[#181428]/80 border border-white/10 text-white'
                      : 'bg-gray-50 border border-gray-200 text-gray-900'"
                  />
                  <p v-if="errors.tanggalMulai" class="text-xs text-rose-500 mt-1">{{ errors.tanggalMulai }}</p>
                </div>

                <!-- Tanggal Akhir -->
                <div>
                  <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                    Periode Akhir <span class="text-rose-500">*</span>
                  </label>
                  <input
                    v-model="form.tanggalAkhir"
                    type="date"
                    class="w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition"
                    :class="isDark
                      ? 'bg-[#181428]/80 border border-white/10 text-white'
                      : 'bg-gray-50 border border-gray-200 text-gray-900'"
                  />
                  <p v-if="errors.tanggalAkhir" class="text-xs text-rose-500 mt-1">{{ errors.tanggalAkhir }}</p>
                </div>
              </div>

              <!-- Akun / Kategori / Proyek -->
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                    Akun
                  </label>
                  <select
                    v-model="form.akun"
                    class="w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition"
                    :class="isDark
                      ? 'bg-[#181428]/80 border border-white/10 text-white'
                      : 'bg-gray-50 border border-gray-200 text-gray-900'"
                  >
                    <option v-for="opt in accountOptions" :key="opt" :value="opt">{{ opt }}</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                    Kategori
                  </label>
                  <select
                    v-model="form.kategori"
                    class="w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition"
                    :class="isDark
                      ? 'bg-[#181428]/80 border border-white/10 text-white'
                      : 'bg-gray-50 border border-gray-200 text-gray-900'"
                  >
                    <option v-for="opt in categoryOptions" :key="opt" :value="opt">{{ opt }}</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                    Proyek
                  </label>
                  <select
                    v-model="form.proyek"
                    class="w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition"
                    :class="isDark
                      ? 'bg-[#181428]/80 border border-white/10 text-white'
                      : 'bg-gray-50 border border-gray-200 text-gray-900'"
                  >
                    <option v-for="opt in projectOptions" :key="opt" :value="opt">{{ opt }}</option>
                  </select>
                </div>
              </div>

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
                  Konten Export
                </label>
                <div class="space-y-2.5">
                  <label class="flex items-center gap-2.5 text-sm cursor-pointer" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                    <input v-model="form.sertakanSaldoAwalAkhir" type="checkbox" class="w-4 h-4 rounded accent-purple-600" />
                    Sertakan saldo awal & akhir per akun
                  </label>
                  <label class="flex items-center gap-2.5 text-sm cursor-pointer" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                    <input v-model="form.sertakanNomorVoucher" type="checkbox" class="w-4 h-4 rounded accent-purple-600" />
                    Sertakan nomor voucher
                  </label>
                  <label class="flex items-center gap-2.5 text-sm cursor-pointer" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                    <input v-model="form.sertakanCatatan" type="checkbox" class="w-4 h-4 rounded accent-purple-600" />
                    Sertakan kolom catatan
                  </label>
                </div>
              </div>

              <!-- Catatan -->
              <div>
                <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                  Catatan
                </label>
                <textarea
                  v-model="form.catatan"
                  rows="2"
                  placeholder="Keterangan tambahan (opsional)"
                  class="w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition resize-none"
                  :class="isDark
                    ? 'bg-[#181428]/80 border border-white/10 text-white placeholder-gray-500'
                    : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400'"
                ></textarea>
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