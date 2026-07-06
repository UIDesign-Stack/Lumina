<script setup>
import { ref } from 'vue'
import { useTheme } from '@/composables/useTheme'
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  BellIcon,
  ChevronDownIcon,
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
const userMenuOpen = ref(false)
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

    <div class="relative flex-1 max-w-xl hidden sm:block">
      <MagnifyingGlassIcon
        class="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2"
        :class="isDark ? 'text-gray-500' : 'text-gray-400'"
      />
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Cari transaksi, laporan, atau fitur..."
        class="w-full rounded-xl py-2.5 pl-10 pr-16 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 focus:border-transparent transition"
        :class="isDark
          ? 'bg-[#181428]/80 border border-white/10 text-white placeholder-gray-500'
          : 'bg-gray-100 border border-gray-200 text-gray-900 placeholder-gray-400'"
      />
      <span
        class="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] rounded px-1.5 py-0.5"
        :class="isDark ? 'text-gray-500 border border-white/10' : 'text-gray-400 border border-gray-300'"
      >
        ⌘ K
      </span>
    </div>

    <div class="flex items-center gap-4 sm:gap-5 ml-auto">

      <button
        class="flex-shrink-0 transition"
        :class="isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'"
      >
        <MagnifyingGlassIcon class="w-5 h-5" />
      </button>

      <button
        class="relative flex-shrink-0 transition"
        :class="isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'"
      >
        <BellIcon class="w-5 h-5" />
        <span
          v-if="unreadNotifications > 0"
          class="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-rose-500 text-white text-[10px] font-semibold flex items-center justify-center"
        >
          {{ unreadNotifications }}
        </span>
      </button>

      <button class="flex items-center gap-2.5 flex-shrink-0" @click="userMenuOpen = !userMenuOpen">
        <div class="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0 overflow-hidden">
          <img v-if="userAvatar" :src="userAvatar" :alt="userName" class="w-full h-full object-cover" />
          <span v-else>{{ userName.charAt(0) }}</span>
        </div>
        <div class="hidden sm:block text-left">
          <p class="text-sm font-medium leading-none" :class="isDark ? 'text-white' : 'text-gray-900'">{{ userName }}</p>
          <p class="text-xs text-gray-500 mt-1">{{ userRole }}</p>
        </div>
        <ChevronDownIcon class="hidden sm:block w-4 h-4 text-gray-500" />
      </button>
    </div>
  </header>
</template>