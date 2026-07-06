<script setup>
import { ref, computed } from 'vue'
import {
  MagnifyingGlassIcon,
  UserGroupIcon,
  ChevronDownIcon,
  ArrowRightIcon,
} from '@heroicons/vue/24/outline'
import BankLogo from './BankLogo.vue'
import { useTheme } from '@/composables/useTheme'

const props = defineProps({
  fromAccount: { type: Object, required: true },
  methods: { type: Array, required: true },
})
const emit = defineEmits(['submit'])

const { isDark } = useTheme()

const searchTarget = ref('')
const activeMethod = ref(props.methods[0])
const accountNumber = ref('')
const receiverName = ref('')
const amount = ref('')
const note = ref('')
const saveAsFavorite = ref(false)

const noteCount = computed(() => note.value.length)

function handleSubmit() {
  emit('submit', {
    method: activeMethod.value,
    accountNumber: accountNumber.value,
    amount: amount.value,
    note: note.value,
    saveAsFavorite: saveAsFavorite.value,
  })
}
</script>

<template>
  <div class="rounded-2xl border p-5" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
    <p class="text-base font-semibold mb-5" :class="isDark ? 'text-white' : 'text-gray-900'">Detail Transfer</p>

    <form class="space-y-5" @submit.prevent="handleSubmit">

      <div>
        <label class="block text-sm mb-2" :class="isDark ? 'text-white' : 'text-gray-700'">Dari Rekening</label>
        <button
          type="button"
          class="w-full flex items-center gap-3 border rounded-xl p-3 transition"
          :class="isDark ? 'bg-[#181428]/80 border-white/10 hover:border-white/20' : 'bg-gray-50 border-gray-300 hover:border-gray-400'"
        >
          <BankLogo :logo="fromAccount.logo" :color="fromAccount.color" />
          <div class="flex-1 text-left min-w-0">
            <p class="text-sm font-medium truncate" :class="isDark ? 'text-white' : 'text-gray-900'">{{ fromAccount.name }}</p>
            <p class="text-xs truncate" :class="isDark ? 'text-gray-500' : 'text-gray-500'">{{ fromAccount.bank }} • {{ fromAccount.number }}</p>
          </div>
          <div class="text-right flex-shrink-0">
            <p class="text-xs" :class="isDark ? 'text-gray-500' : 'text-gray-400'">Saldo Tersedia</p>
            <p class="text-sm font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">{{ fromAccount.balance }}</p>
          </div>
          <ChevronDownIcon class="w-4 h-4 text-gray-500 flex-shrink-0" />
        </button>
      </div>

      <div>
        <label class="block text-sm mb-2" :class="isDark ? 'text-white' : 'text-gray-700'">Tujuan Transfer</label>
        <div class="flex items-center gap-2">
          <div class="relative flex-1">
            <MagnifyingGlassIcon class="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              v-model="searchTarget"
              type="text"
              placeholder="Cari nama, bank, atau nomor rekening"
              class="w-full border rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition"
              :class="isDark ? 'bg-[#181428]/80 border-white/10 text-white placeholder-gray-500' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'"
            />
          </div>
          <button
            type="button"
            class="w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 transition"
            :class="isDark ? 'border-white/10 text-gray-400 hover:text-white hover:bg-white/5' : 'border-gray-300 text-gray-500 hover:text-gray-900 hover:bg-gray-50'"
          >
            <UserGroupIcon class="w-4.5 h-4.5" />
          </button>
        </div>
      </div>

      <div class="flex items-center gap-2 flex-wrap">
        <button
          v-for="method in methods"
          :key="method"
          type="button"
          class="px-4 py-2 rounded-lg text-sm font-medium transition"
          :class="activeMethod === method
            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
            : (isDark ? 'bg-[#181428]/60 text-gray-400 hover:text-gray-200' : 'bg-gray-100 text-gray-600 hover:text-gray-900')"
          @click="activeMethod = method"
        >
          {{ method }}
        </button>
      </div>

      <div>
        <label class="block text-sm mb-2" :class="isDark ? 'text-white' : 'text-gray-700'">Nomor Rekening</label>
        <input
          v-model="accountNumber"
          type="text"
          placeholder="Masukkan nomor rekening tujuan"
          class="w-full border rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition"
          :class="isDark ? 'bg-[#181428]/80 border-white/10 text-white placeholder-gray-500' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'"
        />
      </div>

      <div>
        <label class="block text-sm mb-2" :class="isDark ? 'text-white' : 'text-gray-700'">Nama Penerima</label>
        <p class="text-sm" :class="isDark ? 'text-gray-500' : 'text-gray-400'">{{ receiverName || '-' }}</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm mb-2" :class="isDark ? 'text-white' : 'text-gray-700'">Jumlah Transfer</label>
          <div class="relative">
            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-sm" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Rp</span>
            <input
              v-model="amount"
              type="text"
              placeholder="0"
              class="w-full border rounded-xl py-3 pl-10 pr-14 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition"
              :class="isDark ? 'bg-[#181428]/80 border-white/10 text-white placeholder-gray-500' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'"
            />
            <span
              class="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium px-2 py-1 rounded"
              :class="isDark ? 'bg-white/5 text-gray-400' : 'bg-gray-200 text-gray-500'"
            >IDR</span>
          </div>
        </div>

        <div>
          <label class="block text-sm mb-2" :class="isDark ? 'text-white' : 'text-gray-700'">Berita (Opsional)</label>
          <textarea
            v-model="note"
            maxlength="140"
            rows="1"
            placeholder="Tulis keterangan (opsional)"
            class="w-full border rounded-xl py-3 px-4 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition"
            :class="isDark ? 'bg-[#181428]/80 border-white/10 text-white placeholder-gray-500' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'"
          ></textarea>
          <p class="text-right text-xs mt-1" :class="isDark ? 'text-gray-500' : 'text-gray-400'">{{ noteCount }} / 140</p>
        </div>
      </div>

      <div class="flex items-center justify-between">
        <span class="text-sm" :class="isDark ? 'text-gray-300' : 'text-gray-600'">Simpan sebagai Rekening Tersimpan</span>
        <button
          type="button"
          class="relative w-10 h-6 rounded-full transition-colors flex-shrink-0"
          :class="saveAsFavorite ? 'bg-purple-600' : (isDark ? 'bg-white/10' : 'bg-gray-300')"
          @click="saveAsFavorite = !saveAsFavorite"
        >
          <span
            class="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform"
            :class="saveAsFavorite ? 'translate-x-4' : 'translate-x-0'"
          ></span>
        </button>
      </div>

      <button
        type="submit"
        class="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium text-sm shadow-lg shadow-purple-900/40 transition flex items-center justify-center gap-2"
      >
        Lanjutkan
        <ArrowRightIcon class="w-4 h-4" />
      </button>
    </form>
  </div>
</template>