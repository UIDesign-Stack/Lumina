<script setup>
import { ArrowDownTrayIcon, DocumentArrowDownIcon } from '@heroicons/vue/24/outline'
import { useTheme } from '@/composables/useTheme'

const props = defineProps({
  settings: { type: Object, required: true },
  dataOptions: { type: Array, default: () => [] },
  history: { type: Array, default: () => [] },
})
const emit = defineEmits(['export'])

const { isDark } = useTheme()

function toggleData(key) {
  const idx = props.settings.selectedData.indexOf(key)
  if (idx === -1) {
    props.settings.selectedData.push(key)
  } else {
    props.settings.selectedData.splice(idx, 1)
  }
}

function handleExport() {
  emit('export', { ...props.settings })
}
</script>

<template>
  <div class="space-y-4">
    <!-- Form Ekspor -->
    <div class="rounded-2xl border p-5" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
      <p class="text-base font-semibold mb-1" :class="isDark ? 'text-white' : 'text-gray-900'">Ekspor Data</p>
      <p class="text-xs mb-4" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Unduh data bisnis dalam format PDF, Excel, atau CSV.</p>

      <!-- Pilih Data -->
      <div class="mb-5">
        <label class="block text-sm font-medium mb-2" :class="isDark ? 'text-gray-300' : 'text-gray-700'">Data yang Diekspor</label>
        <div class="space-y-2">
          <label
            v-for="opt in dataOptions"
            :key="opt.key"
            class="flex items-center gap-3 rounded-xl px-3.5 py-3 cursor-pointer border"
            :class="isDark ? 'bg-[#181428]/60 border-white/10' : 'bg-gray-50 border-gray-200'"
          >
            <input
              type="checkbox"
              :checked="settings.selectedData.includes(opt.key)"
              class="w-4 h-4 rounded accent-purple-600"
              @change="toggleData(opt.key)"
            />
            <span class="text-sm" :class="isDark ? 'text-gray-200' : 'text-gray-800'">{{ opt.label }}</span>
          </label>
        </div>
      </div>

      <!-- Rentang Tanggal -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
        <div>
          <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">Dari Tanggal</label>
          <input
            v-model="settings.tanggalMulai"
            type="date"
            class="w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition"
            :class="isDark ? 'bg-[#181428]/80 border border-white/10 text-white' : 'bg-gray-50 border border-gray-200 text-gray-900'"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1.5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">Sampai Tanggal</label>
          <input
            v-model="settings.tanggalAkhir"
            type="date"
            class="w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition"
            :class="isDark ? 'bg-[#181428]/80 border border-white/10 text-white' : 'bg-gray-50 border border-gray-200 text-gray-900'"
          />
        </div>
      </div>

      <!-- Format -->
      <div class="mb-5">
        <label class="block text-sm font-medium mb-2" :class="isDark ? 'text-gray-300' : 'text-gray-700'">Format Export</label>
        <div class="grid grid-cols-3 gap-3">
          <button
            v-for="fmt in [{ key: 'pdf', label: 'PDF' }, { key: 'excel', label: 'Excel' }, { key: 'csv', label: 'CSV' }]"
            :key="fmt.key"
            type="button"
            class="rounded-xl px-4 py-2.5 text-sm font-medium border transition"
            :class="settings.format === fmt.key
              ? 'bg-purple-500/10 border-purple-500 text-purple-500'
              : (isDark ? 'border-white/10 text-gray-300 hover:bg-white/5' : 'border-gray-200 text-gray-600 hover:bg-gray-50')"
            @click="settings.format = fmt.key"
          >
            {{ fmt.label }}
          </button>
        </div>
      </div>

      <!-- Sertakan Lampiran -->
      <label class="flex items-center gap-2.5 text-sm cursor-pointer mb-5" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
        <input v-model="settings.sertakanLampiran" type="checkbox" class="w-4 h-4 rounded accent-purple-600" />
        Sertakan lampiran / bukti transaksi (memperbesar ukuran file)
      </label>

      <button
        type="button"
        :disabled="settings.selectedData.length === 0"
        class="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-medium shadow-lg shadow-purple-900/30 transition disabled:opacity-50 disabled:cursor-not-allowed"
        @click="handleExport"
      >
        <ArrowDownTrayIcon class="w-4 h-4" />
        Ekspor Sekarang
      </button>
    </div>

    <!-- Riwayat Ekspor -->
    <div class="rounded-2xl border" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
      <div class="px-5 py-4 border-b" :class="isDark ? 'border-white/5' : 'border-gray-100'">
        <p class="text-sm font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">Riwayat Ekspor</p>
      </div>
      <div class="divide-y" :class="isDark ? 'divide-white/5' : 'divide-gray-100'">
        <div v-for="item in history" :key="item.id" class="flex items-center gap-3 px-5 py-3.5">
          <div class="w-9 h-9 rounded-xl bg-purple-500/15 flex items-center justify-center flex-shrink-0">
            <DocumentArrowDownIcon class="w-4 h-4 text-purple-400" />
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium truncate" :class="isDark ? 'text-gray-100' : 'text-gray-800'">{{ item.label }}</p>
            <p class="text-xs mt-0.5" :class="isDark ? 'text-gray-500' : 'text-gray-400'">{{ item.date }} · {{ item.format }} · {{ item.size }}</p>
          </div>
        </div>
        <p v-if="history.length === 0" class="text-sm text-center py-6" :class="isDark ? 'text-gray-500' : 'text-gray-400'">
          Belum ada riwayat ekspor.
        </p>
      </div>
    </div>
  </div>
</template>