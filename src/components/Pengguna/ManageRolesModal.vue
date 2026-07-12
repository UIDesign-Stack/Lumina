<script setup>
import { reactive, ref, watch } from 'vue'
import { XMarkIcon, PlusIcon, PencilIcon, TrashIcon, ArrowLeftIcon } from '@heroicons/vue/24/outline'
import { useTheme } from '@/composables/useTheme'

const { isDark } = useTheme()

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  // Daftar peran yang sudah ada, format: [{ name, description, userCount }]
  roles: {
    type: Array,
    default: () => [],
  },
})
const emit = defineEmits(['close', 'create-role', 'update-role', 'delete-role'])

const MODULES = [
  'Dashboard',
  'Transaksi',
  'Laporan Keuangan',
  'Buku Besar',
  'Pengguna & Peran',
  'Pengaturan',
]
const PERMISSIONS = ['lihat', 'tambah', 'edit', 'hapus']

// 'list' = daftar peran, 'form' = tambah/edit peran
const view = ref('list')
const editingRoleName = ref(null)

function emptyPermissions() {
  const perms = {}
  MODULES.forEach((mod) => {
    perms[mod] = { lihat: true, tambah: false, edit: false, hapus: false }
  })
  return perms
}

function emptyForm() {
  return {
    nama: '',
    deskripsi: '',
    permissions: emptyPermissions(),
  }
}

const form = reactive(emptyForm())
const errors = reactive({})

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) {
      view.value = 'list'
      editingRoleName.value = null
    }
  }
)

function openCreateForm() {
  Object.assign(form, emptyForm())
  Object.keys(errors).forEach((k) => delete errors[k])
  editingRoleName.value = null
  view.value = 'form'
}

function openEditForm(role) {
  Object.assign(form, {
    nama: role.name,
    deskripsi: role.description || '',
    permissions: role.permissions ? JSON.parse(JSON.stringify(role.permissions)) : emptyPermissions(),
  })
  Object.keys(errors).forEach((k) => delete errors[k])
  editingRoleName.value = role.name
  view.value = 'form'
}

function backToList() {
  view.value = 'list'
}

function validate() {
  Object.keys(errors).forEach((k) => delete errors[k])
  if (!form.nama.trim()) errors.nama = 'Nama peran wajib diisi'
  return Object.keys(errors).length === 0
}

function handleSubmitForm() {
  if (!validate()) return
  const payload = {
    nama: form.nama.trim(),
    deskripsi: form.deskripsi,
    permissions: form.permissions,
  }
  if (editingRoleName.value) {
    emit('update-role', { originalName: editingRoleName.value, ...payload })
  } else {
    emit('create-role', payload)
  }
  view.value = 'list'
}

function handleDeleteRole(role) {
  emit('delete-role', role)
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
              <div class="flex items-center gap-2">
                <button
                  v-if="view === 'form'"
                  type="button"
                  class="p-1.5 rounded-lg transition"
                  :class="isDark ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100'"
                  @click="backToList"
                >
                  <ArrowLeftIcon class="w-4 h-4" />
                </button>
                <div>
                  <h2 class="text-lg font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">
                    {{ view === 'list' ? 'Kelola Peran' : (editingRoleName ? 'Edit Peran' : 'Tambah Peran Baru') }}
                  </h2>
                  <p class="text-xs mt-0.5" :class="isDark ? 'text-gray-400' : 'text-gray-500'">
                    {{ view === 'list' ? 'Atur peran dan hak akses pengguna dalam sistem.' : 'Tentukan nama dan hak akses untuk peran ini.' }}
                  </p>
                </div>
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

            <!-- VIEW: Daftar Peran -->
            <div v-if="view === 'list'" class="px-6 py-5 space-y-3">
              <button
                type="button"
                class="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-dashed text-sm font-medium transition"
                :class="isDark ? 'border-white/15 text-gray-300 hover:bg-white/5' : 'border-gray-300 text-gray-600 hover:bg-gray-50'"
                @click="openCreateForm"
              >
                <PlusIcon class="w-4 h-4" />
                Tambah Peran Baru
              </button>

              <div
                v-for="role in roles"
                :key="role.name"
                class="flex items-center justify-between gap-3 rounded-xl px-4 py-3 border"
                :class="isDark ? 'bg-[#181428]/60 border-white/10' : 'bg-gray-50 border-gray-200'"
              >
                <div class="min-w-0">
                  <p class="text-sm font-medium truncate" :class="isDark ? 'text-white' : 'text-gray-900'">{{ role.name }}</p>
                  <p class="text-xs mt-0.5 truncate" :class="isDark ? 'text-gray-400' : 'text-gray-500'">
                    {{ role.description || 'Tidak ada deskripsi' }}
                    <span v-if="role.userCount !== undefined"> · {{ role.userCount }} pengguna</span>
                  </p>
                </div>
                <div class="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    class="p-2 rounded-lg transition"
                    :class="isDark ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100'"
                    @click="openEditForm(role)"
                  >
                    <PencilIcon class="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    class="p-2 rounded-lg transition"
                    :class="isDark ? 'text-gray-400 hover:text-rose-400 hover:bg-rose-500/10' : 'text-gray-400 hover:text-rose-500 hover:bg-rose-50'"
                    @click="handleDeleteRole(role)"
                  >
                    <TrashIcon class="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p v-if="roles.length === 0" class="text-sm text-center py-4" :class="isDark ? 'text-gray-500' : 'text-gray-400'">
                Belum ada peran. Klik "Tambah Peran Baru" untuk membuat.
              </p>
            </div>

            <!-- VIEW: Form Tambah/Edit Peran -->
            <form v-else @submit.prevent="handleSubmitForm" class="px-6 py-5 space-y-5">
              <!-- Nama Peran -->
              <div>
                <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                  Nama Peran <span class="text-rose-500">*</span>
                </label>
                <input
                  v-model="form.nama"
                  type="text"
                  placeholder="Contoh: Manajer Keuangan"
                  class="w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition"
                  :class="isDark
                    ? 'bg-[#181428]/80 border border-white/10 text-white placeholder-gray-500'
                    : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400'"
                />
                <p v-if="errors.nama" class="text-xs text-rose-500 mt-1">{{ errors.nama }}</p>
              </div>

              <!-- Deskripsi -->
              <div>
                <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                  Deskripsi
                </label>
                <input
                  v-model="form.deskripsi"
                  type="text"
                  placeholder="Deskripsi singkat peran ini (opsional)"
                  class="w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition"
                  :class="isDark
                    ? 'bg-[#181428]/80 border border-white/10 text-white placeholder-gray-500'
                    : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400'"
                />
              </div>

              <!-- Hak Akses -->
              <div>
                <label class="block text-sm font-medium mb-2" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                  Hak Akses per Modul
                </label>
                <div class="rounded-xl border overflow-hidden" :class="isDark ? 'border-white/10' : 'border-gray-200'">
                  <table class="w-full text-sm">
                    <thead>
                      <tr :class="isDark ? 'bg-white/5' : 'bg-gray-50'">
                        <th class="text-left px-3.5 py-2.5 font-medium" :class="isDark ? 'text-gray-300' : 'text-gray-600'">Modul</th>
                        <th v-for="perm in PERMISSIONS" :key="perm" class="text-center px-2 py-2.5 font-medium capitalize" :class="isDark ? 'text-gray-300' : 'text-gray-600'">
                          {{ perm }}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="mod in MODULES"
                        :key="mod"
                        class="border-t"
                        :class="isDark ? 'border-white/5' : 'border-gray-100'"
                      >
                        <td class="px-3.5 py-2.5" :class="isDark ? 'text-gray-200' : 'text-gray-800'">{{ mod }}</td>
                        <td v-for="perm in PERMISSIONS" :key="perm" class="text-center px-2 py-2.5">
                          <input
                            v-model="form.permissions[mod][perm]"
                            type="checkbox"
                            class="w-4 h-4 rounded accent-purple-600"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- Actions -->
              <div class="flex items-center justify-end gap-3 pt-2 border-t" :class="isDark ? 'border-white/5' : 'border-gray-100'">
                <button
                  type="button"
                  class="px-4 py-2.5 rounded-xl text-sm font-medium transition"
                  :class="isDark ? 'text-gray-300 hover:bg-white/5' : 'text-gray-600 hover:bg-gray-100'"
                  @click="backToList"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-medium shadow-lg shadow-purple-900/30 transition"
                >
                  {{ editingRoleName ? 'Simpan Perubahan' : 'Buat Peran' }}
                </button>
              </div>
            </form>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>