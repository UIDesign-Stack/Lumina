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
    tanggal: today,
    jumlah: '',
    kategori: '',
    vendor: '',
    metodePembayaran: '',
    akunSumber: '',
    noReferensi: '',
    deskripsi: '',
    status: 'Lunas',
    lampiran: null,
    pajak: '',
    tag: '',
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
  form.lampiran = e.target.files?.[0] || null
}

function validate() {
  Object.keys(errors).forEach((k) => delete errors[k])
  if (!form.tanggal) errors.tanggal = 'Tanggal wajib diisi'
  if (!form.jumlah || Number(form.jumlah) <= 0) errors.jumlah = 'Jumlah wajib diisi dan lebih dari 0'
  if (!form.kategori) errors.kategori = 'Kategori wajib dipilih'
  if (!form.vendor) errors.vendor = 'Vendor/penerima wajib diisi'
  if (!form.metodePembayaran) errors.metodePembayaran = 'Metode pembayaran wajib dipilih'
  if (!form.akunSumber) errors.akunSumber = 'Akun sumber dana wajib dipilih'
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
                <h2 class="text-lg font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">Pengeluaran Baru</h2>
                <p class="text-xs mt-0.5" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Catat transaksi pengeluaran baru ke dalam pembukuan.</p>
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
                <!-- Tanggal -->
                <div>
                  <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                    Tanggal Transaksi <span class="text-rose-500">*</span>
                  </label>
                  <input
                    v-model="form.tanggal"
                    type="date"
                    class="w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/60 transition"
                    :class="isDark
                      ? 'bg-[#181428]/80 border border-white/10 text-white'
                      : 'bg-gray-50 border border-gray-200 text-gray-900'"
                  />
                  <p v-if="errors.tanggal" class="text-xs text-rose-500 mt-1">{{ errors.tanggal }}</p>
                </div>

                <!-- Jumlah -->
                <div>
                  <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                    Jumlah Pengeluaran <span class="text-rose-500">*</span>
                  </label>
                  <div class="relative">
                    <span
                      class="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm"
                      :class="isDark ? 'text-gray-500' : 'text-gray-400'"
                    >Rp</span>
                    <input
                      v-model="form.jumlah"
                      type="number"
                      min="0"
                      placeholder="0"
                      class="w-full rounded-xl pl-9 pr-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/60 transition"
                      :class="isDark
                        ? 'bg-[#181428]/80 border border-white/10 text-white placeholder-gray-500'
                        : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400'"
                    />
                  </div>
                  <p v-if="errors.jumlah" class="text-xs text-rose-500 mt-1">{{ errors.jumlah }}</p>
                </div>

                <!-- Kategori -->
                <div>
                  <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                    Kategori <span class="text-rose-500">*</span>
                  </label>
                  <select
                    v-model="form.kategori"
                    class="w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/60 transition"
                    :class="isDark
                      ? 'bg-[#181428]/80 border border-white/10 text-white'
                      : 'bg-gray-50 border border-gray-200 text-gray-900'"
                  >
                    <option value="" disabled>Pilih kategori</option>
                    <option value="operasional">Operasional</option>
                    <option value="gaji">Gaji & Tunjangan</option>
                    <option value="marketing">Marketing</option>
                    <option value="sewa">Sewa & Utilitas</option>
                    <option value="perlengkapan">Perlengkapan</option>
                    <option value="lainnya">Lainnya</option>
                  </select>
                  <p v-if="errors.kategori" class="text-xs text-rose-500 mt-1">{{ errors.kategori }}</p>
                </div>

                <!-- Vendor -->
                <div>
                  <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                    Vendor/Penerima <span class="text-rose-500">*</span>
                  </label>
                  <input
                    v-model="form.vendor"
                    type="text"
                    placeholder="Nama vendor, supplier, atau karyawan"
                    class="w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/60 transition"
                    :class="isDark
                      ? 'bg-[#181428]/80 border border-white/10 text-white placeholder-gray-500'
                      : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400'"
                  />
                  <p v-if="errors.vendor" class="text-xs text-rose-500 mt-1">{{ errors.vendor }}</p>
                </div>

                <!-- Metode Pembayaran -->
                <div>
                  <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                    Metode Pembayaran <span class="text-rose-500">*</span>
                  </label>
                  <select
                    v-model="form.metodePembayaran"
                    class="w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/60 transition"
                    :class="isDark
                      ? 'bg-[#181428]/80 border border-white/10 text-white'
                      : 'bg-gray-50 border border-gray-200 text-gray-900'"
                  >
                    <option value="" disabled>Pilih metode</option>
                    <option value="tunai">Tunai</option>
                    <option value="transfer">Transfer Bank</option>
                    <option value="ewallet">E-Wallet</option>
                    <option value="cek">Cek</option>
                    <option value="kartu_kredit">Kartu Kredit</option>
                  </select>
                  <p v-if="errors.metodePembayaran" class="text-xs text-rose-500 mt-1">{{ errors.metodePembayaran }}</p>
                </div>

                <!-- Akun Sumber -->
                <div>
                  <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                    Akun/Sumber Dana <span class="text-rose-500">*</span>
                  </label>
                  <select
                    v-model="form.akunSumber"
                    class="w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/60 transition"
                    :class="isDark
                      ? 'bg-[#181428]/80 border border-white/10 text-white'
                      : 'bg-gray-50 border border-gray-200 text-gray-900'"
                  >
                    <option value="" disabled>Pilih akun</option>
                    <option value="kas">Kas</option>
                    <option value="bca">Bank BCA</option>
                    <option value="mandiri">Bank Mandiri</option>
                    <option value="bni">Bank BNI</option>
                  </select>
                  <p v-if="errors.akunSumber" class="text-xs text-rose-500 mt-1">{{ errors.akunSumber }}</p>
                </div>

                <!-- No Referensi -->
                <div>
                  <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                    No. Referensi/Invoice
                  </label>
                  <input
                    v-model="form.noReferensi"
                    type="text"
                    placeholder="INV-0001 (opsional)"
                    class="w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/60 transition"
                    :class="isDark
                      ? 'bg-[#181428]/80 border border-white/10 text-white placeholder-gray-500'
                      : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400'"
                  />
                </div>

                <!-- Status -->
                <div>
                  <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                    Status
                  </label>
                  <select
                    v-model="form.status"
                    class="w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/60 transition"
                    :class="isDark
                      ? 'bg-[#181428]/80 border border-white/10 text-white'
                      : 'bg-gray-50 border border-gray-200 text-gray-900'"
                  >
                    <option value="Lunas">Lunas</option>
                    <option value="Pending">Pending</option>
                    <option value="Menunggu Persetujuan">Menunggu Persetujuan</option>
                  </select>
                </div>

                <!-- Pajak -->
                <div>
                  <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                    Pajak/PPN (%)
                  </label>
                  <input
                    v-model="form.pajak"
                    type="number"
                    min="0"
                    placeholder="Opsional"
                    class="w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/60 transition"
                    :class="isDark
                      ? 'bg-[#181428]/80 border border-white/10 text-white placeholder-gray-500'
                      : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400'"
                  />
                </div>

                <!-- Tag -->
                <div>
                  <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                    Tag/Label Departemen
                  </label>
                  <input
                    v-model="form.tag"
                    type="text"
                    placeholder="Opsional"
                    class="w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/60 transition"
                    :class="isDark
                      ? 'bg-[#181428]/80 border border-white/10 text-white placeholder-gray-500'
                      : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400'"
                  />
                </div>
              </div>

              <!-- Deskripsi -->
              <div>
                <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                  Deskripsi/Catatan
                </label>
                <textarea
                  v-model="form.deskripsi"
                  rows="3"
                  placeholder="Keterangan tambahan (opsional)"
                  class="w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/60 transition resize-none"
                  :class="isDark
                    ? 'bg-[#181428]/80 border border-white/10 text-white placeholder-gray-500'
                    : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400'"
                ></textarea>
              </div>

              <!-- Lampiran -->
              <div>
                <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                  Lampiran Bukti
                </label>
                <label
                  class="flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm cursor-pointer transition border border-dashed"
                  :class="isDark
                    ? 'border-white/15 text-gray-400 hover:bg-white/5'
                    : 'border-gray-300 text-gray-500 hover:bg-gray-50'"
                >
                  <CloudArrowUpIcon class="w-5 h-5 flex-shrink-0" />
                  <span class="truncate">{{ form.lampiran ? form.lampiran.name : 'Unggah struk, invoice, atau bukti transfer (opsional)' }}</span>
                  <input type="file" class="hidden" accept="image/*,.pdf" @change="handleFile" />
                </label>
              </div>


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
                  class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white text-sm font-medium shadow-lg shadow-rose-900/30 transition"
                >
                  Simpan Pengeluaran
                </button>
              </div>
            </form>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>