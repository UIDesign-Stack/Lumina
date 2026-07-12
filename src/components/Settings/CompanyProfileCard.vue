<script setup>
import { ref } from 'vue'
import { BuildingOffice2Icon, CameraIcon } from '@heroicons/vue/24/outline'
import { useTheme } from '@/composables/useTheme'

const props = defineProps({
  company: { type: Object, required: true },
})

const { isDark } = useTheme()
const logoPreview = ref('')

function handleLogoChange(e) {
  const file = e.target.files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    logoPreview.value = reader.result
    props.company.logo = reader.result
  }
  reader.readAsDataURL(file)
}
</script>

<template>
  <div class="rounded-2xl border p-5" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
    <p class="text-base font-semibold mb-4" :class="isDark ? 'text-white' : 'text-gray-900'">Profil Perusahaan</p>

    <!-- Logo -->
    <div class="flex items-center gap-4 mb-5">
      <div class="relative">
        <div
          class="w-16 h-16 rounded-2xl flex items-center justify-center overflow-hidden"
          :class="isDark ? 'bg-white/5 border border-white/10' : 'bg-gray-50 border border-gray-200'"
        >
          <img v-if="logoPreview || company.logo" :src="logoPreview || company.logo" alt="Logo" class="w-full h-full object-cover" />
          <BuildingOffice2Icon v-else class="w-7 h-7" :class="isDark ? 'text-gray-500' : 'text-gray-400'" />
        </div>
        <label
          class="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer border-2 transition"
          :class="isDark ? 'bg-[#181428] border-[#100c1c] text-gray-300 hover:text-white' : 'bg-white border-white text-gray-500 hover:text-gray-900 shadow'"
        >
          <CameraIcon class="w-3 h-3" />
          <input type="file" accept="image/*" class="hidden" @change="handleLogoChange" />
        </label>
      </div>
      <div>
        <p class="text-sm font-medium" :class="isDark ? 'text-white' : 'text-gray-900'">Logo Perusahaan</p>
        <p class="text-xs mt-0.5" :class="isDark ? 'text-gray-500' : 'text-gray-400'">PNG atau JPG, disarankan rasio 1:1.</p>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div class="sm:col-span-2">
        <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">Nama Perusahaan</label>
        <input
          v-model="company.nama"
          type="text"
          class="w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition"
          :class="isDark ? 'bg-[#181428]/80 border border-white/10 text-white' : 'bg-gray-50 border border-gray-200 text-gray-900'"
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">NPWP</label>
        <input
          v-model="company.npwp"
          type="text"
          placeholder="00.000.000.0-000.000"
          class="w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition"
          :class="isDark
            ? 'bg-[#181428]/80 border border-white/10 text-white placeholder-gray-500'
            : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400'"
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">Jenis Usaha</label>
        <input
          v-model="company.jenisUsaha"
          type="text"
          class="w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition"
          :class="isDark ? 'bg-[#181428]/80 border border-white/10 text-white' : 'bg-gray-50 border border-gray-200 text-gray-900'"
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">Email Perusahaan</label>
        <input
          v-model="company.email"
          type="email"
          class="w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition"
          :class="isDark ? 'bg-[#181428]/80 border border-white/10 text-white' : 'bg-gray-50 border border-gray-200 text-gray-900'"
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">Nomor Telepon</label>
        <input
          v-model="company.telepon"
          type="tel"
          class="w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition"
          :class="isDark ? 'bg-[#181428]/80 border border-white/10 text-white' : 'bg-gray-50 border border-gray-200 text-gray-900'"
        />
      </div>

      <div class="sm:col-span-2">
        <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">Website</label>
        <input
          v-model="company.website"
          type="url"
          placeholder="https://"
          class="w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition"
          :class="isDark
            ? 'bg-[#181428]/80 border border-white/10 text-white placeholder-gray-500'
            : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400'"
        />
      </div>

      <div class="sm:col-span-2">
        <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">Alamat</label>
        <textarea
          v-model="company.alamat"
          rows="3"
          class="w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition resize-none"
          :class="isDark ? 'bg-[#181428]/80 border border-white/10 text-white' : 'bg-gray-50 border border-gray-200 text-gray-900'"
        ></textarea>
      </div>
    </div>
  </div>
</template>