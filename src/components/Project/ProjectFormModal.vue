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
})
const emit = defineEmits(['close', 'submit'])

const today = new Date().toISOString().slice(0, 10)

function emptyForm() {
  return {
    nama: '',
    klien: '',
    kategori: '',
    prioritas: 'Sedang',
    tanggalMulai: today,
    tanggalSelesai: '',
    anggaran: '',
    status: 'Aktif',
    penanggungJawab: '',
    deskripsi: '',
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
  if (!form.nama) errors.nama = 'Nama proyek wajib diisi'
  if (!form.klien) errors.klien = 'Klien/perusahaan wajib diisi'
  if (!form.tanggalMulai) errors.tanggalMulai = 'Tanggal mulai wajib diisi'
  if (form.tanggalSelesai && form.tanggalSelesai < form.tanggalMulai) {
    errors.tanggalSelesai = 'Tanggal selesai tidak boleh sebelum tanggal mulai'
  }
  if (!form.anggaran || Number(form.anggaran) <= 0) errors.anggaran = 'Anggaran wajib diisi dan lebih dari 0'
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
                <h2 class="text-lg font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">Tambah Proyek Baru</h2>
                <p class="text-xs mt-0.5" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Buat proyek baru untuk mulai memantau anggaran dan realisasinya.</p>
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
              <!-- Nama Proyek -->
              <div>
                <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                  Nama Proyek <span class="text-rose-500">*</span>
                </label>
                <input
                  v-model="form.nama"
                  type="text"
                  placeholder="Contoh: Redesign Website Perusahaan"
                  class="w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition"
                  :class="isDark
                    ? 'bg-[#181428]/80 border border-white/10 text-white placeholder-gray-500'
                    : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400'"
                />
                <p v-if="errors.nama" class="text-xs text-rose-500 mt-1">{{ errors.nama }}</p>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <!-- Klien -->
                <div>
                  <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                    Klien/Perusahaan <span class="text-rose-500">*</span>
                  </label>
                  <input
                    v-model="form.klien"
                    type="text"
                    placeholder="Nama klien atau perusahaan"
                    class="w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition"
                    :class="isDark
                      ? 'bg-[#181428]/80 border border-white/10 text-white placeholder-gray-500'
                      : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400'"
                  />
                  <p v-if="errors.klien" class="text-xs text-rose-500 mt-1">{{ errors.klien }}</p>
                </div>

                <!-- Kategori -->
                <div>
                  <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                    Kategori Proyek
                  </label>
                  <select
                    v-model="form.kategori"
                    class="w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition"
                    :class="isDark
                      ? 'bg-[#181428]/80 border border-white/10 text-white'
                      : 'bg-gray-50 border border-gray-200 text-gray-900'"
                  >
                    <option value="" disabled>Pilih kategori</option>
                    <option value="pengembangan">Pengembangan</option>
                    <option value="desain">Desain</option>
                    <option value="marketing">Marketing</option>
                    <option value="konsultasi">Konsultasi</option>
                    <option value="konstruksi">Konstruksi</option>
                    <option value="lainnya">Lainnya</option>
                  </select>
                </div>

                <!-- Tanggal Mulai -->
                <div>
                  <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                    Tanggal Mulai <span class="text-rose-500">*</span>
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

                <!-- Target Selesai -->
                <div>
                  <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                    Target Selesai
                  </label>
                  <input
                    v-model="form.tanggalSelesai"
                    type="date"
                    class="w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition"
                    :class="isDark
                      ? 'bg-[#181428]/80 border border-white/10 text-white'
                      : 'bg-gray-50 border border-gray-200 text-gray-900'"
                  />
                  <p v-if="errors.tanggalSelesai" class="text-xs text-rose-500 mt-1">{{ errors.tanggalSelesai }}</p>
                </div>

                <!-- Anggaran -->
                <div>
                  <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                    Anggaran Proyek <span class="text-rose-500">*</span>
                  </label>
                  <div class="relative">
                    <span
                      class="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm"
                      :class="isDark ? 'text-gray-500' : 'text-gray-400'"
                    >Rp</span>
                    <input
                      v-model="form.anggaran"
                      type="number"
                      min="0"
                      placeholder="0"
                      class="w-full rounded-xl pl-9 pr-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition"
                      :class="isDark
                        ? 'bg-[#181428]/80 border border-white/10 text-white placeholder-gray-500'
                        : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400'"
                    />
                  </div>
                  <p v-if="errors.anggaran" class="text-xs text-rose-500 mt-1">{{ errors.anggaran }}</p>
                </div>

                <!-- Prioritas -->
                <div>
                  <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                    Prioritas
                  </label>
                  <select
                    v-model="form.prioritas"
                    class="w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition"
                    :class="isDark
                      ? 'bg-[#181428]/80 border border-white/10 text-white'
                      : 'bg-gray-50 border border-gray-200 text-gray-900'"
                  >
                    <option value="Tinggi">Tinggi</option>
                    <option value="Sedang">Sedang</option>
                    <option value="Rendah">Rendah</option>
                  </select>
                </div>

                <!-- Status -->
                <div>
                  <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                    Status
                  </label>
                  <select
                    v-model="form.status"
                    class="w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition"
                    :class="isDark
                      ? 'bg-[#181428]/80 border border-white/10 text-white'
                      : 'bg-gray-50 border border-gray-200 text-gray-900'"
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Selesai">Selesai</option>
                    <option value="Ditunda">Ditunda</option>
                  </select>
                </div>

                <!-- Penanggung Jawab -->
                <div>
                  <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                    Penanggung Jawab
                  </label>
                  <input
                    v-model="form.penanggungJawab"
                    type="text"
                    placeholder="Nama project manager (opsional)"
                    class="w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition"
                    :class="isDark
                      ? 'bg-[#181428]/80 border border-white/10 text-white placeholder-gray-500'
                      : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400'"
                  />
                </div>
              </div>

              <!-- Deskripsi -->
              <div>
                <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                  Deskripsi
                </label>
                <textarea
                  v-model="form.deskripsi"
                  rows="3"
                  placeholder="Ruang lingkup atau keterangan tambahan (opsional)"
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
                  Simpan Proyek
                </button>
              </div>
            </form>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>