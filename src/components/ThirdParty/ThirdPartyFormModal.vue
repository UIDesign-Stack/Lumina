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

function emptyForm() {
  return {
    nama: '',
    tipe: '',
    email: '',
    telepon: '',
    perusahaan: '',
    alamat: '',
    npwp: '',
    namaBank: '',
    noRekening: '',
    catatan: '',
    aktif: true,
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
  if (!form.nama) errors.nama = 'Nama wajib diisi'
  if (!form.tipe) errors.tipe = 'Tipe pihak ketiga wajib dipilih'
  if (!form.email) {
    errors.email = 'Email wajib diisi'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Format email tidak valid'
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
                <h2 class="text-lg font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">Tambah Pihak Ketiga</h2>
                <p class="text-xs mt-0.5" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Daftarkan vendor, pelanggan, konsultan, atau mitra lainnya.</p>
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
                <!-- Nama -->
                <div>
                  <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                    Nama <span class="text-rose-500">*</span>
                  </label>
                  <input
                    v-model="form.nama"
                    type="text"
                    placeholder="Nama orang atau perusahaan"
                    class="w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition"
                    :class="isDark
                      ? 'bg-[#181428]/80 border border-white/10 text-white placeholder-gray-500'
                      : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400'"
                  />
                  <p v-if="errors.nama" class="text-xs text-rose-500 mt-1">{{ errors.nama }}</p>
                </div>

                <!-- Tipe -->
                <div>
                  <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                    Tipe Pihak Ketiga <span class="text-rose-500">*</span>
                  </label>
                  <select
                    v-model="form.tipe"
                    class="w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition"
                    :class="isDark
                      ? 'bg-[#181428]/80 border border-white/10 text-white'
                      : 'bg-gray-50 border border-gray-200 text-gray-900'"
                  >
                    <option value="" disabled>Pilih tipe</option>
                    <option value="Vendor">Vendor</option>
                    <option value="Pelanggan">Pelanggan</option>
                    <option value="Konsultan">Konsultan</option>
                    <option value="Supplier">Supplier</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                  <p v-if="errors.tipe" class="text-xs text-rose-500 mt-1">{{ errors.tipe }}</p>
                </div>

                <!-- Perusahaan -->
                <div>
                  <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                    Nama Perusahaan
                  </label>
                  <input
                    v-model="form.perusahaan"
                    type="text"
                    placeholder="Opsional, jika berbeda dari nama"
                    class="w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition"
                    :class="isDark
                      ? 'bg-[#181428]/80 border border-white/10 text-white placeholder-gray-500'
                      : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400'"
                  />
                </div>

                <!-- Email -->
                <div>
                  <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                    Email <span class="text-rose-500">*</span>
                  </label>
                  <input
                    v-model="form.email"
                    type="email"
                    placeholder="nama@perusahaan.com"
                    class="w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition"
                    :class="isDark
                      ? 'bg-[#181428]/80 border border-white/10 text-white placeholder-gray-500'
                      : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400'"
                  />
                  <p v-if="errors.email" class="text-xs text-rose-500 mt-1">{{ errors.email }}</p>
                </div>

                <!-- Telepon -->
                <div>
                  <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                    No. Telepon
                  </label>
                  <input
                    v-model="form.telepon"
                    type="text"
                    placeholder="Opsional"
                    class="w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition"
                    :class="isDark
                      ? 'bg-[#181428]/80 border border-white/10 text-white placeholder-gray-500'
                      : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400'"
                  />
                </div>

                <!-- NPWP -->
                <div>
                  <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                    NPWP
                  </label>
                  <input
                    v-model="form.npwp"
                    type="text"
                    placeholder="Opsional"
                    class="w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition"
                    :class="isDark
                      ? 'bg-[#181428]/80 border border-white/10 text-white placeholder-gray-500'
                      : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400'"
                  />
                </div>

                <!-- Nama Bank -->
                <div>
                  <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                    Nama Bank
                  </label>
                  <input
                    v-model="form.namaBank"
                    type="text"
                    placeholder="Opsional, untuk pembayaran"
                    class="w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition"
                    :class="isDark
                      ? 'bg-[#181428]/80 border border-white/10 text-white placeholder-gray-500'
                      : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400'"
                  />
                </div>

                <!-- No Rekening -->
                <div>
                  <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                    Nomor Rekening
                  </label>
                  <input
                    v-model="form.noRekening"
                    type="text"
                    placeholder="Opsional"
                    class="w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition"
                    :class="isDark
                      ? 'bg-[#181428]/80 border border-white/10 text-white placeholder-gray-500'
                      : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400'"
                  />
                </div>
              </div>

              <!-- Alamat -->
              <div>
                <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                  Alamat
                </label>
                <textarea
                  v-model="form.alamat"
                  rows="2"
                  placeholder="Alamat lengkap (opsional)"
                  class="w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition resize-none"
                  :class="isDark
                    ? 'bg-[#181428]/80 border border-white/10 text-white placeholder-gray-500'
                    : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400'"
                ></textarea>
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

              <!-- Status Aktif -->
              <div class="flex items-center justify-between rounded-xl px-3.5 py-3" :class="isDark ? 'bg-[#181428]/60' : 'bg-gray-50'">
                <div>
                  <p class="text-sm font-medium" :class="isDark ? 'text-gray-200' : 'text-gray-800'">Status Aktif</p>
                  <p class="text-xs" :class="isDark ? 'text-gray-500' : 'text-gray-500'">Pihak ketiga nonaktif tidak muncul saat memilih kontak transaksi.</p>
                </div>
                <button
                  type="button"
                  role="switch"
                  :aria-checked="form.aktif"
                  class="relative flex-shrink-0 w-11 h-6 rounded-full transition"
                  :class="form.aktif ? 'bg-purple-600' : (isDark ? 'bg-white/15' : 'bg-gray-300')"
                  @click="form.aktif = !form.aktif"
                >
                  <span
                    class="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform"
                    :class="form.aktif ? 'translate-x-5' : 'translate-x-0'"
                  ></span>
                </button>
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
                  Simpan Pihak Ketiga
                </button>
              </div>
            </form>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>