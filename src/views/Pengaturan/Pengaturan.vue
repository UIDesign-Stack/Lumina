<script setup>
import { ref, watch } from 'vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import ReconciliationTabs from '@/components/Reconciliation/ReconciliationTabs.vue'
import GeneralPreferencesCard from '@/components/Settings/GeneralPreferencesCard.vue'
import ToggleSettingsCard from '@/components/Settings/ToggleSettingsCard.vue'
import CompanyProfileCard from '@/components/Settings/CompanyProfileCard.vue'
import AccountSettingsCard from '@/components/Settings/AccountSettingsCard.vue'
import AccountInfoCard from '@/components/Settings/AccountInfoCard.vue'
import AboutAppCard from '@/components/Settings/AboutAppCard.vue'
import QuickActionsCard from '@/components/Settings/QuickActionsCard.vue'
import SaveBar from '@/components/Settings/SaveBar.vue'
import { usePengaturanData } from '@/composables/usePengaturanData'
import { useTheme } from '@/composables/useTheme'
import { useUIPreferences } from '@/composables/useUIPreferences'

const {
  tabs,
  generalPreferences,
  displaySettings,
  notificationSettings,
  companyProfile,
  accountSettings,
  accountOptionsList,
  accountInfo,
  aboutApp,
  quickActions,
} = usePengaturanData()

const { isDark, setTheme } = useTheme()
const { setTooltipsEnabled, setPageAnimationsEnabled, tooltipsEnabled, pageAnimationsEnabled } = useUIPreferences()

const activeTab = ref(tabs[0])

// Simpan salinan default untuk kebutuhan reset pengaturan
const defaults = {
  generalPreferences: JSON.parse(JSON.stringify(generalPreferences.value)),
  displaySettings: JSON.parse(JSON.stringify(displaySettings.value)),
  notificationSettings: JSON.parse(JSON.stringify(notificationSettings.value)),
  companyProfile: JSON.parse(JSON.stringify(companyProfile.value)),
  accountSettings: JSON.parse(JSON.stringify(accountSettings.value)),
}

const feedback = ref(null) // { type: 'success' | 'error', message: string }
const showResetConfirm = ref(false)
const fileInputRef = ref(null)

// --- Sinkronisasi toggle "Mode Gelap" dengan tema global (useTheme) ---
const darkModeSetting = displaySettings.value.find((s) => s.key === 'darkMode')
if (darkModeSetting) darkModeSetting.enabled = isDark.value // sinkron awal saat halaman dibuka

// Saat toggle di halaman ini diubah -> ganti tema aplikasi
watch(
  () => displaySettings.value.find((s) => s.key === 'darkMode')?.enabled,
  (enabled) => {
    if (enabled === undefined) return
    setTheme(enabled ? 'dark' : 'light')
  }
)

// Saat tema diubah dari tempat lain (misal menu di Sidebar) -> sinkronkan toggle di sini
watch(isDark, (value) => {
  const setting = displaySettings.value.find((s) => s.key === 'darkMode')
  if (setting && setting.enabled !== value) setting.enabled = value
})

// --- Sinkronisasi toggle "Tampilkan Tooltip" ---
const tooltipSetting = displaySettings.value.find((s) => s.key === 'showTooltip')
if (tooltipSetting) tooltipSetting.enabled = tooltipsEnabled.value

watch(
  () => displaySettings.value.find((s) => s.key === 'showTooltip')?.enabled,
  (enabled) => {
    if (enabled === undefined) return
    setTooltipsEnabled(enabled)
  }
)

// --- Sinkronisasi toggle "Animasi Halaman" ---
const animationSetting = displaySettings.value.find((s) => s.key === 'pageAnimation')
if (animationSetting) animationSetting.enabled = pageAnimationsEnabled.value

watch(
  () => displaySettings.value.find((s) => s.key === 'pageAnimation')?.enabled,
  (enabled) => {
    if (enabled === undefined) return
    setPageAnimationsEnabled(enabled)
  }
)

function showFeedback(type, message) {
  feedback.value = { type, message }
  setTimeout(() => {
    feedback.value = null
  }, 4000)
}

function handleSave() {

  console.log('Simpan pengaturan:', {
    generalPreferences: generalPreferences.value,
    displaySettings: displaySettings.value,
    notificationSettings: notificationSettings.value,
    companyProfile: companyProfile.value,
    accountSettings: accountSettings.value,
  })
  // TODO: kirim ke API untuk menyimpan pengaturan
  showFeedback('success', 'Pengaturan berhasil disimpan.')
}

function handleQuickAction(key) {
  if (key === 'backup') return handleBackup()
  if (key === 'restore') return fileInputRef.value?.click()
  if (key === 'clearCache') return handleClearCache()
  if (key === 'reset') return (showResetConfirm.value = true)
}

function handleBackup() {
  const payload = {
    exportedAt: new Date().toISOString(),
    generalPreferences: generalPreferences.value,
    displaySettings: displaySettings.value,
    notificationSettings: notificationSettings.value,
  }
  // TODO: idealnya backup diproses & disimpan di server, ini hanya export sisi client
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `lumina-finance-backup-${new Date().toISOString().slice(0, 10)}.json`
  a.click()
  URL.revokeObjectURL(url)
  showFeedback('success', 'Data berhasil dicadangkan dan diunduh.')
}

function handleRestoreFile(e) {
  const file = e.target.files?.[0]
  e.target.value = '' // reset input supaya bisa pilih file yang sama lagi
  if (!file) return

  const reader = new FileReader()
  reader.onload = () => {
    try {
      const parsed = JSON.parse(reader.result)
      if (parsed.generalPreferences) generalPreferences.value = parsed.generalPreferences
      if (parsed.displaySettings) displaySettings.value = parsed.displaySettings
      if (parsed.notificationSettings) notificationSettings.value = parsed.notificationSettings
      // TODO: kirim data yang dipulihkan ke API untuk disimpan permanen
      showFeedback('success', 'Data berhasil dipulihkan dari file cadangan.')
    } catch (err) {
      showFeedback('error', 'File cadangan tidak valid atau rusak.')
    }
  }
  reader.readAsText(file)
}

function handleClearCache() {
  // TODO: sesuaikan dengan mekanisme cache asli aplikasi (service worker, cached API response, dll)
  sessionStorage.clear()
  showFeedback('success', 'Cache berhasil dibersihkan.')
}

function confirmReset() {
  generalPreferences.value = JSON.parse(JSON.stringify(defaults.generalPreferences))
  displaySettings.value = JSON.parse(JSON.stringify(defaults.displaySettings))
  notificationSettings.value = JSON.parse(JSON.stringify(defaults.notificationSettings))
  companyProfile.value = JSON.parse(JSON.stringify(defaults.companyProfile))
  accountSettings.value = JSON.parse(JSON.stringify(defaults.accountSettings))
  // TODO: kirim reset ke API supaya tersimpan permanen, bukan hanya lokal
  showResetConfirm.value = false
  showFeedback('success', 'Pengaturan berhasil dikembalikan ke default.')
}
</script>

<template>
  <DashboardLayout :unread-notifications="3">

    <div
      v-if="feedback"
      class="mb-4 rounded-xl px-4 py-3 text-sm border"
      :class="feedback.type === 'success'
        ? (isDark ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-emerald-50 border-emerald-200 text-emerald-600')
        : (isDark ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' : 'bg-rose-50 border-rose-200 text-rose-600')"
    >
      {{ feedback.message }}
    </div>

    <div class="mb-6">
      <h1 class="text-2xl font-bold" :class="isDark ? 'text-white' : 'text-gray-900'">
        Pengaturan
      </h1>
      <p
        class="text-sm mt-1"
        :class="isDark ? 'text-gray-400' : 'text-gray-500'"
      >
        Kelola preferensi sistem, akun, dan konfigurasi aplikasi.
      </p>
    </div>

    <div class="mb-6">
      <ReconciliationTabs :tabs="tabs" v-model:active-tab="activeTab" />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div class="lg:col-span-2 space-y-4">
        <!-- Tab: Umum -->
        <template v-if="activeTab === 'Umum'">
          <GeneralPreferencesCard :preferences="generalPreferences" />

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ToggleSettingsCard
              title="Pengaturan Tampilan"
              :settings="displaySettings"
            />

            <ToggleSettingsCard
              title="Pengaturan Notifikasi"
              :settings="notificationSettings"
            />
          </div>
        </template>

        <!-- Tab: Perusahaan -->
        <template v-else-if="activeTab === 'Perusahaan'">
          <CompanyProfileCard :company="companyProfile" />
        </template>

        <!-- Tab: Akun & Rekening -->
        <template v-else-if="activeTab === 'Akun & Rekening'">
          <AccountSettingsCard :settings="accountSettings" :account-options="accountOptionsList" />
        </template>

        <!-- Tab lain: belum tersedia -->
        <template v-else>
          <div class="rounded-2xl border p-8 text-center" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
            <p class="text-sm" :class="isDark ? 'text-gray-400' : 'text-gray-500'">
              Pengaturan "{{ activeTab }}" sedang dalam pengembangan.
            </p>
          </div>
        </template>

        <SaveBar @save="handleSave" />
      </div>

      <div class="space-y-4">
        <AccountInfoCard :account="accountInfo" />
        <AboutAppCard :app="aboutApp" />
        <QuickActionsCard
          :actions="quickActions"
          @action="handleQuickAction"
        />
      </div>
    </div>

    <!-- Input file tersembunyi untuk Pulihkan Data -->
    <input
      ref="fileInputRef"
      type="file"
      accept="application/json"
      class="hidden"
      @change="handleRestoreFile"
    />

    <!-- Modal konfirmasi Reset Pengaturan -->
    <Teleport to="body">
      <div v-if="showResetConfirm" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showResetConfirm = false"></div>
        <div
          class="relative w-full max-w-sm rounded-2xl border shadow-2xl p-6"
          :class="isDark ? 'bg-[#100c1c] border-white/10' : 'bg-white border-gray-200'"
        >
          <p class="text-base font-semibold mb-2" :class="isDark ? 'text-white' : 'text-gray-900'">Reset semua pengaturan?</p>
          <p class="text-sm mb-5" :class="isDark ? 'text-gray-400' : 'text-gray-500'">
            Semua preferensi umum, tampilan, dan notifikasi akan dikembalikan ke nilai default. Tindakan ini tidak dapat dibatalkan.
          </p>
          <div class="flex items-center justify-end gap-3">
            <button
              type="button"
              class="px-4 py-2.5 rounded-xl text-sm font-medium transition"
              :class="isDark ? 'text-gray-300 hover:bg-white/5' : 'text-gray-600 hover:bg-gray-100'"
              @click="showResetConfirm = false"
            >
              Batal
            </button>
            <button
              type="button"
              class="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-sm font-medium transition"
              @click="confirmReset"
            >
              Ya, Reset
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </DashboardLayout>
</template>