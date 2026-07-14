<script setup>
import {
  HomeIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  ArrowsRightLeftIcon,
  ClipboardDocumentCheckIcon,
  BanknotesIcon,
  TagIcon,
  BuildingLibraryIcon,
  FolderIcon,
  UserGroupIcon,
  DocumentChartBarIcon,
  ArrowTrendingUpIcon,
  ChartBarIcon,
  ScaleIcon,
  BookOpenIcon,
  Cog6ToothIcon,
  PuzzlePieceIcon,
  UsersIcon,
  ClipboardDocumentListIcon,
  MoonIcon,
  SunIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'
import { ref } from 'vue'
import { useTheme } from '@/composables/useTheme'
import { useUIPreferences } from '@/composables/useUIPreferences'
import AppTooltip from '@/components/common/AppTooltip.vue'

const { isDark, setTheme } = useTheme()
const { sidebarCollapsed, toggleSidebarCollapsed } = useUIPreferences()
const themeMenuOpen = ref(false)

function chooseTheme(value) {
  setTheme(value)
  themeMenuOpen.value = false
}

defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['close'])

const navGroups = [
  {
    label: null,
    items: [{ label: 'Dashboard', to: '/dashboard', icon: HomeIcon }],
  },
  {
    label: 'Transaksi',
    items: [
      { label: 'Pemasukan', to: '/transactions/income', icon: ArrowDownTrayIcon },
      { label: 'Pengeluaran', to: '/transactions/expense', icon: ArrowUpTrayIcon },
      { label: 'Transfer', to: '/transactions/transfer', icon: ArrowsRightLeftIcon },
      { label: 'Rekonsiliasi', to: '/transactions/reconciliation', icon: ClipboardDocumentCheckIcon },
    ],
  },
  {
    label: 'Manajemen',
    items: [
      { label: 'Anggaran', to: '/management/budget', icon: BanknotesIcon },
      { label: 'Kategori', to: '/management/category', icon: TagIcon },
      { label: 'Akun & Rekening', to: '/management/accounts', icon: BuildingLibraryIcon },
      { label: 'Proyek', to: '/management/projects', icon: FolderIcon },
      { label: 'Pihak Ketiga', to: '/management/parties', icon: UserGroupIcon },
    ],
  },
  {
    label: 'Laporan',
    items: [
      { label: 'Laporan Keuangan', to: '/reports/financial', icon: DocumentChartBarIcon },
      { label: 'Arus Kas', to: '/reports/cash-flow', icon: ArrowTrendingUpIcon },
      { label: 'Laba Rugi', to: '/reports/profit-loss', icon: ChartBarIcon },
      { label: 'Neraca', to: '/reports/balance-sheet', icon: ScaleIcon },
      { label: 'Buku Besar', to: '/reports/ledger', icon: BookOpenIcon },
    ],
  },
  {
    label: 'Pengaturan',
    items: [
      { label: 'Pengaturan', to: '/settings', icon: Cog6ToothIcon },
      { label: 'Integrasi', to: '/settings/integrations', icon: PuzzlePieceIcon },
      { label: 'Pengguna & Peran', to: '/settings/users', icon: UsersIcon },
      { label: 'Audit Log', to: '/settings/audit-log', icon: ClipboardDocumentListIcon },
    ],
  },
]
</script>

<template>

  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black/60 z-40 lg:hidden"
    @click="emit('close')"
  ></div>

  
  <div v-if="themeMenuOpen" class="fixed inset-0 z-40" @click="themeMenuOpen = false"></div>

  <aside
    class="fixed lg:sticky top-0 left-0 h-screen w-64 flex flex-col z-50 transition-all duration-300 lg:translate-x-0"
    :class="[
      isOpen ? 'translate-x-0' : '-translate-x-full',
      sidebarCollapsed ? 'lg:w-20' : 'lg:w-64',
      isDark ? 'bg-[#0b0817]' : 'bg-white border-r border-gray-200',
    ]"
  >

    <div class="flex items-center justify-between px-5 py-5">
      <div class="flex items-center gap-2.5 min-w-0">
        <div class="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-400 via-purple-500 to-fuchsia-500 flex items-center justify-center flex-shrink-0">
          <span class="text-white font-bold text-sm">L</span>
        </div>
        <div v-if="!sidebarCollapsed" class="min-w-0">
          <p :class="isDark ? 'text-white' : 'text-gray-900'" class="font-semibold tracking-[0.15em] text-sm leading-none truncate">LUMINA</p>
          <p class="text-gray-500 text-[10px] tracking-[0.25em] mt-1">FINANCE</p>
        </div>
      </div>
      <button
        class="lg:hidden flex-shrink-0 transition"
        :class="isDark ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-gray-900'"
        @click="emit('close')"
      >
        <XMarkIcon class="w-5 h-5" />
      </button>
      <!-- Tombol collapse/expand, hanya tampil di layar besar -->
      <button
        class="hidden lg:flex flex-shrink-0 w-6 h-6 rounded-lg items-center justify-center transition"
        :class="isDark ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100'"
        @click="toggleSidebarCollapsed"
      >
        <ChevronLeftIcon v-if="!sidebarCollapsed" class="w-4 h-4" />
        <ChevronRightIcon v-else class="w-4 h-4" />
      </button>
    </div>

    <nav class="flex-1 overflow-y-auto px-3 py-4 space-y-6">
      <div v-for="(group, gIdx) in navGroups" :key="gIdx">
        <p v-if="group.label && !sidebarCollapsed" class="px-3 mb-2 text-[10px] font-semibold tracking-[0.15em] text-gray-500 uppercase">
          {{ group.label }}
        </p>
        <ul class="space-y-1">
          <li v-for="item in group.items" :key="item.to">
            <router-link v-slot="{ isExactActive, navigate, href }" :to="item.to" custom>
              <AppTooltip :text="sidebarCollapsed ? item.label : ''" position="right" class="w-full">
                <a
                  :href="href"
                  class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition cursor-pointer w-full"
                  :class="[
                    sidebarCollapsed ? 'lg:justify-center' : '',
                    isExactActive
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-purple-900/30'
                      : isDark
                        ? 'text-gray-400 hover:text-white hover:bg-white/5'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  ]"
                  @click="navigate($event); emit('close')"
                >
                  <component :is="item.icon" class="w-5 h-5 flex-shrink-0" />
                  <span class="truncate" :class="sidebarCollapsed ? 'lg:hidden' : ''">{{ item.label }}</span>
                </a>
              </AppTooltip>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>

    <div class="relative px-3 py-4">
      <!-- Popup pilihan tema -->
      <div
        v-if="themeMenuOpen"
        class="absolute bottom-full left-3 right-3 mb-2 rounded-xl border shadow-xl overflow-hidden"
        :class="isDark ? 'bg-[#181428] border-white/10' : 'bg-white border-gray-200'"
      >
        <button
          class="w-full flex items-center gap-3 px-3 py-2.5 text-sm transition"
          :class="!isDark ? 'text-indigo-400 font-medium' : 'text-gray-300 hover:bg-white/5'"
          @click="chooseTheme('light')"
        >
          <SunIcon class="w-5 h-5" />
          Light Mode
        </button>
        <button
          class="w-full flex items-center gap-3 px-3 py-2.5 text-sm transition"
          :class="isDark ? 'text-indigo-400 font-medium' : 'text-gray-600 hover:bg-gray-100'"
          @click="chooseTheme('dark')"
        >
          <MoonIcon class="w-5 h-5" />
          Dark Mode
        </button>
      </div>

      <button
        class="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition"
        :class="[isDark ? 'text-gray-300 hover:bg-white/5' : 'text-gray-600 hover:bg-gray-100', sidebarCollapsed ? 'lg:justify-center' : '']"
        @click="themeMenuOpen = !themeMenuOpen"
      >
        <span class="flex items-center gap-3">
          <component :is="isDark ? MoonIcon : SunIcon" class="w-5 h-5" />
          <span :class="sidebarCollapsed ? 'lg:hidden' : ''">{{ isDark ? 'Dark Mode' : 'Light Mode' }}</span>
        </span>
        <ChevronRightIcon
          v-if="!sidebarCollapsed"
          class="w-4 h-4 text-gray-500 transition-transform lg:block"
          :class="themeMenuOpen ? '-rotate-90' : ''"
        />
      </button>
    </div>
  </aside>
</template>

<style scoped>

nav {
  scrollbar-width: none;
  -ms-overflow-style: none; 
}
nav::-webkit-scrollbar {
  display: none; 
}
</style>