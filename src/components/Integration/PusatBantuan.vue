<script setup>
import { ref, computed } from 'vue'
import {
  MagnifyingGlassIcon,
  ChatBubbleLeftRightIcon,
  EnvelopeIcon,
  BookOpenIcon,
  PuzzlePieceIcon,
  CreditCardIcon,
  ShieldCheckIcon,
  ChevronDownIcon,
} from '@heroicons/vue/24/outline'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import { useTheme } from '@/composables/useTheme'

const { isDark } = useTheme()

const search = ref('')
const openFaqId = ref(null)

const categories = [
  { key: 'memulai', label: 'Memulai', icon: BookOpenIcon },
  { key: 'integrasi', label: 'Integrasi', icon: PuzzlePieceIcon },
  { key: 'pembayaran', label: 'Pembayaran & Tagihan', icon: CreditCardIcon },
  { key: 'keamanan', label: 'Keamanan & Akses', icon: ShieldCheckIcon },
]

const faqs = [
  {
    id: 'f1',
    category: 'integrasi',
    question: 'Kenapa sinkronisasi integrasi saya gagal?',
    answer: 'Sinkronisasi bisa gagal karena token otentikasi kedaluwarsa, koneksi internet terputus saat proses berjalan, atau perubahan struktur data di layanan pihak ketiga. Coba hubungkan ulang integrasi lewat halaman Integrasi > Kelola, lalu tunggu beberapa menit sebelum mencoba sinkronisasi manual lagi.',
  },
  {
    id: 'f2',
    category: 'integrasi',
    question: 'Bagaimana cara menghubungkan integrasi baru?',
    answer: 'Buka halaman Integrasi, pilih tab Tersedia, lalu klik tombol Hubungkan pada layanan yang ingin kamu pakai. Kamu akan diarahkan untuk memberi izin akses, dan setelah berhasil integrasi akan otomatis pindah ke daftar Terhubung.',
  },
  {
    id: 'f3',
    category: 'memulai',
    question: 'Bagaimana cara mengundang anggota tim?',
    answer: 'Buka halaman Pengguna & Peran, klik tombol Undang Pengguna di pojok kanan atas, masukkan email dan pilih peran yang sesuai, lalu kirim undangan.',
  },
  {
    id: 'f4',
    category: 'keamanan',
    question: 'Apa yang terjadi jika peran pengguna saya diubah?',
    answer: 'Perubahan peran akan langsung memengaruhi hak akses pengguna terhadap modul-modul tertentu pada sesi berikutnya. Beberapa perubahan mungkin memerlukan pengguna untuk login ulang agar berlaku sepenuhnya.',
  },
  {
    id: 'f5',
    category: 'pembayaran',
    question: 'Bagaimana cara melihat riwayat tagihan perusahaan?',
    answer: 'Riwayat tagihan dapat dilihat pada halaman Pengaturan > Langganan & Tagihan. Kamu bisa mengunduh invoice dalam format PDF untuk setiap periode.',
  },
]

const filteredFaqs = computed(() => {
  const q = search.value.trim().toLowerCase()
  if (!q) return faqs
  return faqs.filter((f) => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q))
})

function toggleFaq(id) {
  openFaqId.value = openFaqId.value === id ? null : id
}
</script>

<template>
  <DashboardLayout :unread-notifications="1">

    <div class="mb-6">
      <h1 class="text-2xl font-bold" :class="isDark ? 'text-white' : 'text-gray-900'">Pusat Bantuan</h1>
      <p class="text-sm mt-1" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Cari jawaban atau hubungi tim support kami.</p>
    </div>

    <!-- Search -->
    <div class="relative mb-6">
      <MagnifyingGlassIcon class="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2" :class="isDark ? 'text-gray-500' : 'text-gray-400'" />
      <input
        v-model="search"
        type="text"
        placeholder="Cari topik bantuan, misal: integrasi, tagihan, keamanan..."
        class="w-full rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition"
        :class="isDark
          ? 'bg-[#181428]/80 border border-white/10 text-white placeholder-gray-500'
          : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400'"
      />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div class="lg:col-span-2 space-y-4">
        <!-- Kategori -->
        <div v-if="!search" class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
          <div
            v-for="cat in categories"
            :key="cat.key"
            class="rounded-2xl border p-4 flex items-center gap-3 cursor-pointer transition"
            :class="isDark ? 'bg-[#100c1c]/80 border-white/10 hover:bg-white/5' : 'bg-white border-gray-200 hover:bg-gray-50'"
          >
            <div class="w-10 h-10 rounded-xl bg-purple-500/15 flex items-center justify-center shrink-0">
              <component :is="cat.icon" class="w-5 h-5 text-purple-400" />
            </div>
            <p class="text-sm font-medium" :class="isDark ? 'text-white' : 'text-gray-900'">{{ cat.label }}</p>
          </div>
        </div>

        <!-- FAQ -->
        <div class="rounded-2xl border" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
          <div class="px-5 py-4 border-b" :class="isDark ? 'border-white/5' : 'border-gray-100'">
            <p class="text-base font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">Pertanyaan yang Sering Diajukan</p>
          </div>
          <div>
            <div
              v-for="faq in filteredFaqs"
              :key="faq.id"
              class="border-b last:border-b-0"
              :class="isDark ? 'border-white/5' : 'border-gray-100'"
            >
              <button
                type="button"
                class="w-full flex items-center justify-between gap-3 px-5 py-4 text-left transition"
                :class="isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50'"
                @click="toggleFaq(faq.id)"
              >
                <span class="text-sm font-medium" :class="isDark ? 'text-gray-100' : 'text-gray-800'">{{ faq.question }}</span>
                <ChevronDownIcon
                  class="w-4 h-4 shrink-0 transition-transform"
                  :class="[isDark ? 'text-gray-400' : 'text-gray-400', openFaqId === faq.id ? 'rotate-180' : '']"
                />
              </button>
              <div v-show="openFaqId === faq.id" class="px-5 pb-4 text-sm" :class="isDark ? 'text-gray-400' : 'text-gray-500'">
                {{ faq.answer }}
              </div>
            </div>

            <p v-if="filteredFaqs.length === 0" class="text-sm text-center py-8" :class="isDark ? 'text-gray-500' : 'text-gray-400'">
              Tidak ada hasil untuk "{{ search }}".
            </p>
          </div>
        </div>
      </div>

      <!-- Kontak Support -->
      <div class="space-y-4">
        <div class="rounded-2xl border p-5" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
          <p class="text-sm font-semibold mb-4" :class="isDark ? 'text-white' : 'text-gray-900'">Masih butuh bantuan?</p>

          <div class="space-y-3">
            <a
              href="mailto:support@luminafinance.com"
              class="flex items-center gap-3 rounded-xl px-4 py-3 border transition"
              :class="isDark ? 'border-white/10 hover:bg-white/5' : 'border-gray-200 hover:bg-gray-50'"
            >
              <EnvelopeIcon class="w-4 h-4" :class="isDark ? 'text-purple-400' : 'text-purple-500'" />
              <div>
                <p class="text-sm font-medium" :class="isDark ? 'text-gray-100' : 'text-gray-800'">Email Support</p>
                <p class="text-xs" :class="isDark ? 'text-gray-500' : 'text-gray-400'">support@luminafinance.com</p>
              </div>
            </a>

            <button
              type="button"
              class="w-full flex items-center gap-3 rounded-xl px-4 py-3 border transition"
              :class="isDark ? 'border-white/10 hover:bg-white/5' : 'border-gray-200 hover:bg-gray-50'"
            >
              <ChatBubbleLeftRightIcon class="w-4 h-4" :class="isDark ? 'text-purple-400' : 'text-purple-500'" />
              <div class="text-left">
                <p class="text-sm font-medium" :class="isDark ? 'text-gray-100' : 'text-gray-800'">Live Chat</p>
                <p class="text-xs" :class="isDark ? 'text-gray-500' : 'text-gray-400'">Respons dalam beberapa menit</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>