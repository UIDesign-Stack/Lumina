<script setup>
import { reactive, watch, computed } from 'vue'
import { XMarkIcon, PlusIcon } from '@heroicons/vue/24/outline'
import { useTheme } from '@/composables/useTheme'

const { isDark } = useTheme()

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  roleOptions: {
    type: Array,
    default: () => [],
  },
})
const emit = defineEmits(['close', 'submit'])

// Opsi peran tanpa "Semua Peran" (itu hanya untuk filter tabel)
const assignableRoles = computed(() => props.roleOptions.filter((r) => r !== 'Semua Peran'))

function emptyForm() {
  return {
    emails: [''],
    peran: assignableRoles.value[0] || '',
    pesan: '',
  }
}

const form = reactive(emptyForm())
const errors = reactive({})

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) {
      Object.assign(form, emptyForm())
      Object.keys(errors).forEach((k) => delete errors[k])
    }
  }
)

function addEmailField() {
  form.emails.push('')
}

function removeEmailField(index) {
  if (form.emails.length > 1) {
    form.emails.splice(index, 1)
  }
}

function validate() {
  Object.keys(errors).forEach((k) => delete errors[k])
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const filledEmails = form.emails.map((e) => e.trim()).filter(Boolean)

  if (filledEmails.length === 0) {
    errors.emails = 'Minimal satu email wajib diisi'
  } else if (filledEmails.some((e) => !emailPattern.test(e))) {
    errors.emails = 'Ada format email yang tidak valid'
  }

  if (!form.peran) errors.peran = 'Peran wajib dipilih'

  return Object.keys(errors).length === 0
}

function handleSubmit() {
  if (!validate()) return
  const payload = {
    emails: form.emails.map((e) => e.trim()).filter(Boolean),
    peran: form.peran,
    pesan: form.pesan,
  }
  emit('submit', payload)
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
            class="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border shadow-2xl"
            :class="isDark ? 'bg-[#100c1c] border-white/10' : 'bg-white border-gray-200'"
          >
            <!-- Header -->
            <div
              class="flex items-center justify-between px-6 py-4 border-b sticky top-0 z-10"
              :class="isDark ? 'border-white/5 bg-[#100c1c]' : 'border-gray-100 bg-white'"
            >
              <div>
                <h2 class="text-lg font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">Undang Pengguna</h2>
                <p class="text-xs mt-0.5" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Kirim undangan akses ke anggota tim baru.</p>
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
              <!-- Email -->
              <div>
                <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                  Email Pengguna <span class="text-rose-500">*</span>
                </label>
                <div class="space-y-2">
                  <div v-for="(_, index) in form.emails" :key="index" class="flex items-center gap-2">
                    <input
                      v-model="form.emails[index]"
                      type="email"
                      placeholder="nama@perusahaan.com"
                      class="w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition"
                      :class="isDark
                        ? 'bg-[#181428]/80 border border-white/10 text-white placeholder-gray-500'
                        : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400'"
                    />
                    <button
                      v-if="form.emails.length > 1"
                      type="button"
                      class="shrink-0 p-2 rounded-lg transition"
                      :class="isDark ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100'"
                      @click="removeEmailField(index)"
                    >
                      <XMarkIcon class="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  class="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-purple-400 hover:text-purple-300 transition"
                  @click="addEmailField"
                >
                  <PlusIcon class="w-3.5 h-3.5" />
                  Tambah email lain
                </button>
                <p v-if="errors.emails" class="text-xs text-rose-500 mt-1">{{ errors.emails }}</p>
              </div>

              <!-- Peran -->
              <div>
                <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                  Peran <span class="text-rose-500">*</span>
                </label>
                <select
                  v-model="form.peran"
                  class="w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition"
                  :class="isDark
                    ? 'bg-[#181428]/80 border border-white/10 text-white'
                    : 'bg-gray-50 border border-gray-200 text-gray-900'"
                >
                  <option v-for="role in assignableRoles" :key="role" :value="role">{{ role }}</option>
                </select>
                <p v-if="errors.peran" class="text-xs text-rose-500 mt-1">{{ errors.peran }}</p>
              </div>

              <!-- Pesan -->
              <div>
                <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                  Pesan Undangan
                </label>
                <textarea
                  v-model="form.pesan"
                  rows="3"
                  placeholder="Tulis pesan singkat untuk pengguna yang diundang (opsional)"
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
                  Kirim Undangan
                </button>
              </div>
            </form>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>