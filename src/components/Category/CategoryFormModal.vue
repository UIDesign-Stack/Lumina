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
  defaultType: {
    type: String,
    default: 'pengeluaran', // 'pengeluaran' | 'pemasukan'
  },
})
const emit = defineEmits(['close', 'submit'])

const colorOptions = [
  { key: 'purple', class: 'bg-purple-500' },
  { key: 'indigo', class: 'bg-indigo-500' },
  { key: 'rose', class: 'bg-rose-500' },
  { key: 'amber', class: 'bg-amber-500' },
  { key: 'emerald', class: 'bg-emerald-500' },
  { key: 'sky', class: 'bg-sky-500' },
  { key: 'pink', class: 'bg-pink-500' },
  { key: 'slate', class: 'bg-slate-500' },
]

function emptyForm() {
  return {
    nama: '',
    tipe: props.defaultType,
    kategoriInduk: '',
    warna: 'purple',
    icon: '',
    deskripsi: '',
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
  if (!form.nama) errors.nama = 'Nama kategori wajib diisi'
  if (!form.tipe) errors.tipe = 'Tipe kategori wajib dipilih'
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
            class="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border shadow-2xl"
            :class="isDark ? 'bg-[#100c1c] border-white/10' : 'bg-white border-gray-200'"
          >
            <!-- Header -->
            <div
              class="flex items-center justify-between px-6 py-4 border-b sticky top-0 z-10"
              :class="isDark ? 'border-white/5 bg-[#100c1c]' : 'border-gray-100 bg-white'"
            >
              <div>
                <h2 class="text-lg font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">Tambah Kategori</h2>
                <p class="text-xs mt-0.5" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Buat kategori baru untuk pemasukan atau pengeluaran.</p>
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
              <!-- Tipe Kategori -->
              <div>
                <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                  Tipe Kategori <span class="text-rose-500">*</span>
                </label>
                <div class="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    class="rounded-xl px-4 py-2.5 text-sm font-medium border transition"
                    :class="form.tipe === 'pemasukan'
                      ? 'bg-emerald-500/10 border-emerald-500 text-emerald-500'
                      : (isDark ? 'border-white/10 text-gray-300 hover:bg-white/5' : 'border-gray-200 text-gray-600 hover:bg-gray-50')"
                    @click="form.tipe = 'pemasukan'"
                  >
                    Pemasukan
                  </button>
                  <button
                    type="button"
                    class="rounded-xl px-4 py-2.5 text-sm font-medium border transition"
                    :class="form.tipe === 'pengeluaran'
                      ? 'bg-rose-500/10 border-rose-500 text-rose-500'
                      : (isDark ? 'border-white/10 text-gray-300 hover:bg-white/5' : 'border-gray-200 text-gray-600 hover:bg-gray-50')"
                    @click="form.tipe = 'pengeluaran'"
                  >
                    Pengeluaran
                  </button>
                </div>
              </div>

              <!-- Nama Kategori -->
              <div>
                <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                  Nama Kategori <span class="text-rose-500">*</span>
                </label>
                <input
                  v-model="form.nama"
                  type="text"
                  placeholder="Contoh: Transportasi, Penjualan Online"
                  class="w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition"
                  :class="isDark
                    ? 'bg-[#181428]/80 border border-white/10 text-white placeholder-gray-500'
                    : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400'"
                />
                <p v-if="errors.nama" class="text-xs text-rose-500 mt-1">{{ errors.nama }}</p>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <!-- Kategori Induk -->
                <div>
                  <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                    Kategori Induk
                  </label>
                  <select
                    v-model="form.kategoriInduk"
                    class="w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition"
                    :class="isDark
                      ? 'bg-[#181428]/80 border border-white/10 text-white'
                      : 'bg-gray-50 border border-gray-200 text-gray-900'"
                  >
                    <option value="">Tanpa induk (kategori utama)</option>
                    <option value="operasional">Operasional</option>
                    <option value="marketing">Marketing</option>
                    <option value="gaji">Gaji & Tunjangan</option>
                    <option value="penjualan">Penjualan</option>
                  </select>
                </div>

                <!-- Icon -->
                <div>
                  <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                    Icon/Emoji
                  </label>
                  <input
                    v-model="form.icon"
                    type="text"
                    maxlength="2"
                    placeholder="🛒 (opsional)"
                    class="w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition"
                    :class="isDark
                      ? 'bg-[#181428]/80 border border-white/10 text-white placeholder-gray-500'
                      : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400'"
                  />
                </div>
              </div>

              <!-- Warna -->
              <div>
                <label class="block text-sm font-medium mb-2" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                  Warna Label
                </label>
                <div class="flex flex-wrap gap-2.5">
                  <button
                    v-for="color in colorOptions"
                    :key="color.key"
                    type="button"
                    class="w-8 h-8 rounded-full transition ring-offset-2 flex-shrink-0"
                    :class="[
                      color.class,
                      form.warna === color.key ? 'ring-2 ring-purple-500' : '',
                      isDark ? 'ring-offset-[#100c1c]' : 'ring-offset-white'
                    ]"
                    @click="form.warna = color.key"
                  ></button>
                </div>
              </div>

              <!-- Deskripsi -->
              <div>
                <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                  Deskripsi
                </label>
                <textarea
                  v-model="form.deskripsi"
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
                  <p class="text-sm font-medium" :class="isDark ? 'text-gray-200' : 'text-gray-800'">Kategori Aktif</p>
                  <p class="text-xs" :class="isDark ? 'text-gray-500' : 'text-gray-500'">Kategori nonaktif tidak akan muncul saat memilih kategori transaksi.</p>
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
                  Simpan Kategori
                </button>
              </div>
            </form>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>