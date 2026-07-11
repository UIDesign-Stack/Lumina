<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useTheme } from '@/composables/useTheme'
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  XMarkIcon,
  BellIcon,
  ChevronDownIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/vue/24/outline'

const { isDark } = useTheme()

defineProps({
  unreadNotifications: {
    type: Number,
    default: 0,
  },
  userName: {
    type: String,
    default: 'FajarDev',
  },
  userRole: {
    type: String,
    default: 'Finance Manager',
  },
  userAvatar: {
    type: String,
    default: '',
  },
})
const emit = defineEmits(['toggle-sidebar'])

const searchQuery = ref('')
const searchOpen = ref(false)
const searchInputRef = ref(null)

const notifOpen = ref(false)
const userMenuOpen = ref(false)
const notifRef = ref(null)
const userRef = ref(null)
const searchRef = ref(null)

async function toggleSearch() {
  searchOpen.value = !searchOpen.value
  if (searchOpen.value) {
    await nextTick()
    searchInputRef.value?.focus()
  } else {
    searchQuery.value = ''
  }
}

function toggleNotif() {
  userMenuOpen.value = false
  notifOpen.value = !notifOpen.value
}
function toggleUserMenu() {
  notifOpen.value = false
  userMenuOpen.value = !userMenuOpen.value
}

// Tutup dropdown/search saat klik di luar area-nya
function handleClickOutside(event) {
  if (notifOpen.value && notifRef.value && !notifRef.value.contains(event.target)) {
    notifOpen.value = false
  }
  if (userMenuOpen.value && userRef.value && !userRef.value.contains(event.target)) {
    userMenuOpen.value = false
  }
  if (searchOpen.value && searchRef.value && !searchRef.value.contains(event.target)) {
    searchOpen.value = false
  }
}
onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))

// Mock data notifikasi — ganti dengan data asli dari API
const notifications = [
  { id: 1, title: 'Pembayaran Klien A berhasil diterima', time: '5 menit lalu', unread: true },
  { id: 2, title: 'Anggaran Pemasaran sudah mencapai 82%', time: '1 jam lalu', unread: true },
  { id: 3, title: 'Faktur #INV-0231 jatuh tempo besok', time: '3 jam lalu', unread: false },
  { id: 4, title: 'Rekonsiliasi Bank BCA selesai', time: 'Kemarin', unread: false },
]
</script>

<template>
  <header
    class="sticky top-0 z-30 backdrop-blur-sm px-4 sm:px-6 py-3.5 flex items-center gap-3 transition-colors"
    :class="isDark ? 'bg-[#07050f]/90 border-b border-white/5' : 'bg-white/90 border-b border-gray-200'"
  >
    <button
      class="lg:hidden flex-shrink-0 transition"
      :class="isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'"
      @click="emit('toggle-sidebar')"
    >
      <Bars3Icon class="w-6 h-6" />
    </button>

    <!-- Search: collapsed by default, muncul saat icon diklik -->
    <div ref="searchRef" class="flex items-center" :class="searchOpen ? 'flex-1 max-w-xl' : ''">
      <button
        v-show="!searchOpen"
        type="button"
        class="flex-shrink-0 transition"
        :class="isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'"
        @click.stop="toggleSearch"
      >
        <MagnifyingGlassIcon class="w-5 h-5" />
      </button>

      <div v-show="searchOpen" class="relative w-full">
        <MagnifyingGlassIcon
          class="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2"
          :class="isDark ? 'text-gray-500' : 'text-gray-400'"
        />
        <input
          ref="searchInputRef"
          v-model="searchQuery"
          type="text"
          placeholder="Cari transaksi, laporan, atau fitur..."
          class="w-full rounded-xl py-2.5 pl-10 pr-16 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 focus:border-transparent transition"
          :class="isDark
            ? 'bg-[#181428]/80 border border-white/10 text-white placeholder-gray-500'
            : 'bg-gray-100 border border-gray-200 text-gray-900 placeholder-gray-400'"
          @keydown.escape="toggleSearch"
        />
        <button
          type="button"
          class="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 transition"
          :class="isDark ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-gray-900'"
          @click.stop="toggleSearch"
        >
          <XMarkIcon class="w-4 h-4" />
        </button>
      </div>
    </div>

    <div class="flex items-center gap-4 sm:gap-5 ml-auto flex-shrink-0">
      <!-- Notifikasi -->
      <div ref="notifRef" class="relative">
        <button
          class="relative flex-shrink-0 h-9 w-9 flex items-center justify-center transition"
          :class="isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'"
          @click.stop="toggleNotif"
        >
          <BellIcon class="w-5 h-5" />
          <span
            v-if="unreadNotifications > 0"
            class="absolute top-0.5 right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-rose-500 text-white text-[10px] font-semibold flex items-center justify-center"
          >
            {{ unreadNotifications }}
          </span>
        </button>

        <!-- Dropdown notifikasi -->
        <div
          v-if="notifOpen"
          class="absolute right-0 mt-3 w-80 rounded-2xl border shadow-2xl overflow-hidden"
          :class="isDark ? 'bg-[#100c1c] border-white/10' : 'bg-white border-gray-200'"
        >
          <div class="flex items-center justify-between px-4 py-3 border-b" :class="isDark ? 'border-white/5' : 'border-gray-100'">
            <p class="text-sm font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">Notifikasi</p>
            <button class="text-xs text-purple-400 hover:text-purple-300 transition">Tandai semua dibaca</button>
          </div>
          <ul class="max-h-80 overflow-y-auto">
            <li
              v-for="notif in notifications"
              :key="notif.id"
              class="px-4 py-3 cursor-pointer border-b transition"
              :class="isDark ? 'border-white/5 hover:bg-white/5 last:border-b-0' : 'border-gray-100 hover:bg-gray-50 last:border-b-0'"
            >
              <div class="flex items-start gap-2.5">
                <span
                  class="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                  :class="notif.unread ? 'bg-purple-400' : 'bg-transparent'"
                ></span>
                <div>
                  <p class="text-sm leading-snug" :class="isDark ? 'text-gray-200' : 'text-gray-700'">{{ notif.title }}</p>
                  <p class="text-xs text-gray-500 mt-1">{{ notif.time }}</p>
                </div>
              </div>
            </li>
          </ul>
          <div class="px-4 py-3 text-center border-t" :class="isDark ? 'border-white/5' : 'border-gray-100'">
            <router-link to="#" class="text-sm text-purple-400 hover:text-purple-300 transition">Lihat semua notifikasi</router-link>
          </div>
        </div>
      </div>

      <!-- User -->
      <div ref="userRef" class="relative">
        <button class="flex items-center gap-2.5 flex-shrink-0" @click.stop="toggleUserMenu">
          <div class="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0 overflow-hidden">
            <img v-if="userAvatar" :src="userAvatar" :alt="userName" class="w-full h-full object-cover" />
            <span v-else>{{ userName.charAt(0) }}</span>
          </div>
          <div class="hidden sm:block text-left">
            <p class="text-sm font-medium leading-none" :class="isDark ? 'text-white' : 'text-gray-900'">{{ userName }}</p>
            <p class="text-xs text-gray-500 mt-1">{{ userRole }}</p>
          </div>
          <ChevronDownIcon class="hidden sm:block w-4 h-4 text-gray-500 transition" :class="userMenuOpen ? 'rotate-180' : ''" />
        </button>

        <!-- Dropdown user -->
        <div
          v-if="userMenuOpen"
          class="absolute right-0 mt-3 w-56 rounded-2xl border shadow-2xl overflow-hidden"
          :class="isDark ? 'bg-[#100c1c] border-white/10' : 'bg-white border-gray-200'"
        >
          <div class="px-4 py-3 border-b" :class="isDark ? 'border-white/5' : 'border-gray-100'">
            <p class="text-sm font-medium" :class="isDark ? 'text-white' : 'text-gray-900'">{{ userName }}</p>
            <p class="text-xs text-gray-500 mt-0.5">{{ userRole }}</p>
          </div>
          <ul class="py-2">
            <li>
              <a
                href="#"
                class="flex items-center gap-3 px-4 py-2.5 text-sm transition"
                :class="isDark ? 'text-gray-300 hover:bg-white/5 hover:text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'"
              >
                <UserCircleIcon class="w-4 h-4" />
                Profil Saya
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center gap-3 px-4 py-2.5 text-sm transition"
                :class="isDark ? 'text-gray-300 hover:bg-white/5 hover:text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'"
              >
                <Cog6ToothIcon class="w-4 h-4" />
                Pengaturan Akun
              </a>
            </li>
          </ul>
          <div class="border-t py-2" :class="isDark ? 'border-white/5' : 'border-gray-100'">
            <a href="#" class="flex items-center gap-3 px-4 py-2.5 text-sm text-rose-400 hover:bg-rose-500/10 transition">
              <ArrowRightOnRectangleIcon class="w-4 h-4" />
              Keluar
            </a>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>