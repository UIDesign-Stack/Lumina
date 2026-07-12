<script setup>
import { reactive, watch } from 'vue'
import { XMarkIcon, CloudArrowUpIcon } from '@heroicons/vue/24/outline'
import { useTheme } from '@/composables/useTheme'

const { isDark } = useTheme()

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['close', 'submit'])

const today = new Date().toISOString().slice(0, 10)

function emptyForm() {
  return {
    nama: '',
    akunBank: '',
    tanggalMulai: today,
    tanggalAkhir: today,
    saldoAwal: '',
    saldoAkhirBank: '',
    saldoAkhirPembukuan: '',
    toleransiSelisih: '',
    penanggungJawab: '',
    catatan: '',
    fileMutasi: null,
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

function handleFile(e) {
  form.fileMutasi = e.target.files?.[0] || null
}

function validate() {
  Object.keys(errors).forEach((k) => delete errors[k])
  if (!form.nama) errors.nama = 'Nama rekonsiliasi wajib diisi'
  if (!form.akunBank) errors.akunBank = 'Akun bank wajib dipilih'
  if (!form.tanggalMulai) errors.tanggalMulai = 'Tanggal mulai wajib diisi'
  if (!form.tanggalAkhir) errors.tanggalAkhir = 'Tanggal akhir wajib diisi'
  if (form.tanggalMulai && form.tanggalAkhir && form.tanggalAkhir < form.tanggalMulai) {
    errors.tanggalAkhir = 'Tanggal akhir tidak boleh sebelum tanggal mulai'
  }
  if (form.saldoAwal === '' || form.saldoAwal === null) errors.saldoAwal = 'Saldo awal wajib diisi'
  if (form.saldoAkhirBank === '' || form.saldoAkhirBank === null) errors.saldoAkhirBank = 'Saldo akhir menurut bank wajib diisi'
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
        v-if="open"
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
            v-if="open"
            class="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border shadow-2xl"
            :class="isDark ? 'bg-[#100c1c] border-white/10' : 'bg-white border-gray-200'"
          >
            <!-- Header -->
            <div
              class="flex items-center justify-between px-6 py-4 border-b sticky top-0 z-10"
              :class="isDark ? 'border-white/5 bg-[#100c1c]' : 'border-gray-100 bg-white'"
            >
              <div>
                <h2 class="text-lg font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">Buat Rekonsiliasi Baru</h2>
                <p class="text-xs mt-0.5" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Mulai sesi pencocokan transaksi perusahaan dengan mutasi bank.</p>
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
              <!-- Nama Rekonsiliasi -->
              <div>
                <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                  Nama Rekonsiliasi <span class="text-rose-500">*</span>
                </label>
                <input
                  v-model="form.nama"
                  type="text"
                  placeholder="Contoh: Rekonsiliasi Bank BCA - Juli 2026"
                  class="w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition"
                  :class="isDark
                    ? 'bg-[#181428]/80 border border-white/10 text-white placeholder-gray-500'
                    : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400'"
                />
                <p v-if="errors.nama" class="text-xs text-rose-500 mt-1">{{ errors.nama }}</p>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <!-- Akun Bank -->
                <div>
                  <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                    Akun/Rekening Bank <span class="text-rose-500">*</span>
                  </label>
                  <select
                    v-model="form.akunBank"
                    class="w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition"
                    :class="isDark
                      ? 'bg-[#181428]/80 border border-white/10 text-white'
                      : 'bg-gray-50 border border-gray-200 text-gray-900'"
                  >
                    <option value="" disabled>Pilih akun bank</option>
                    <option value="bca">Bank BCA</option>
                    <option value="mandiri">Bank Mandiri</option>
                    <option value="bni">Bank BNI</option>
                    <option value="kas">Kas</option>
                  </select>
                  <p v-if="errors.akunBank" class="text-xs text-rose-500 mt-1">{{ errors.akunBank }}</p>
                </div>

                <!-- Penanggung Jawab -->
                <div>
                  <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                    Penanggung Jawab
                  </label>
                  <input
                    v-model="form.penanggungJawab"
                    type="text"
                    placeholder="Nama staf yang mengerjakan (opsional)"
                    class="w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition"
                    :class="isDark
                      ? 'bg-[#181428]/80 border border-white/10 text-white placeholder-gray-500'
                      : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400'"
                  />
                </div>

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

                <!-- Saldo Awal -->
                <div>
                  <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                    Saldo Awal <span class="text-rose-500">*</span>
                  </label>
                  <div class="relative">
                    <span
                      class="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm"
                      :class="isDark ? 'text-gray-500' : 'text-gray-400'"
                    >Rp</span>
                    <input
                      v-model="form.saldoAwal"
                      type="number"
                      placeholder="0"
                      class="w-full rounded-xl pl-9 pr-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition"
                      :class="isDark
                        ? 'bg-[#181428]/80 border border-white/10 text-white placeholder-gray-500'
                        : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400'"
                    />
                  </div>
                  <p v-if="errors.saldoAwal" class="text-xs text-rose-500 mt-1">{{ errors.saldoAwal }}</p>
                </div>

                <!-- Saldo Akhir Bank -->
                <div>
                  <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                    Saldo Akhir Menurut Bank <span class="text-rose-500">*</span>
                  </label>
                  <div class="relative">
                    <span
                      class="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm"
                      :class="isDark ? 'text-gray-500' : 'text-gray-400'"
                    >Rp</span>
                    <input
                      v-model="form.saldoAkhirBank"
                      type="number"
                      placeholder="0"
                      class="w-full rounded-xl pl-9 pr-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition"
                      :class="isDark
                        ? 'bg-[#181428]/80 border border-white/10 text-white placeholder-gray-500'
                        : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400'"
                    />
                  </div>
                  <p v-if="errors.saldoAkhirBank" class="text-xs text-rose-500 mt-1">{{ errors.saldoAkhirBank }}</p>
                </div>

                <!-- Saldo Akhir Pembukuan -->
                <div>
                  <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                    Saldo Akhir Menurut Pembukuan
                  </label>
                  <div class="relative">
                    <span
                      class="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm"
                      :class="isDark ? 'text-gray-500' : 'text-gray-400'"
                    >Rp</span>
                    <input
                      v-model="form.saldoAkhirPembukuan"
                      type="number"
                      placeholder="Opsional, bisa dihitung otomatis"
                      class="w-full rounded-xl pl-9 pr-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition"
                      :class="isDark
                        ? 'bg-[#181428]/80 border border-white/10 text-white placeholder-gray-500'
                        : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400'"
                    />
                  </div>
                </div>

                <!-- Toleransi Selisih -->
                <div>
                  <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                    Toleransi Selisih Otomatis
                  </label>
                  <div class="relative">
                    <span
                      class="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm"
                      :class="isDark ? 'text-gray-500' : 'text-gray-400'"
                    >Rp</span>
                    <input
                      v-model="form.toleransiSelisih"
                      type="number"
                      min="0"
                      placeholder="0 (opsional)"
                      class="w-full rounded-xl pl-9 pr-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition"
                      :class="isDark
                        ? 'bg-[#181428]/80 border border-white/10 text-white placeholder-gray-500'
                        : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400'"
                    />
                  </div>
                </div>
              </div>

              <!-- Catatan -->
              <div>
                <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                  Catatan
                </label>
                <textarea
                  v-model="form.catatan"
                  rows="3"
                  placeholder="Keterangan tambahan (opsional)"
                  class="w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition resize-none"
                  :class="isDark
                    ? 'bg-[#181428]/80 border border-white/10 text-white placeholder-gray-500'
                    : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400'"
                ></textarea>
              </div>

              <!-- Upload Mutasi Bank -->
              <div>
                <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                  Unggah Mutasi Bank (Rekening Koran)
                </label>
                <label
                  class="flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm cursor-pointer transition border border-dashed"
                  :class="isDark
                    ? 'border-white/15 text-gray-400 hover:bg-white/5'
                    : 'border-gray-300 text-gray-500 hover:bg-gray-50'"
                >
                  <CloudArrowUpIcon class="w-5 h-5 flex-shrink-0" />
                  <span class="truncate">{{ form.fileMutasi ? form.fileMutasi.name : 'Unggah file CSV, Excel, atau PDF mutasi bank (opsional)' }}</span>
                  <input type="file" class="hidden" accept=".csv,.xlsx,.xls,.pdf" @change="handleFile" />
                </label>
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
                  Mulai Rekonsiliasi
                </button>
              </div>
            </form>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>