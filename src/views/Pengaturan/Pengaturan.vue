<script setup>
import { ref } from 'vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import ReconciliationTabs from '@/components/Reconciliation/ReconciliationTabs.vue'
import GeneralPreferencesCard from '@/components/Settings/GeneralPreferencesCard.vue'
import ToggleSettingsCard from '@/components/Settings/ToggleSettingsCard.vue'
import AccountInfoCard from '@/components/Settings/AccountInfoCard.vue'
import AboutAppCard from '@/components/Settings/AboutAppCard.vue'
import QuickActionsCard from '@/components/Settings/QuickActionsCard.vue'
import SaveBar from '@/components/Settings/SaveBar.vue'
import { usePengaturanData } from '@/composables/usePengaturanData'
import { useTheme } from '@/composables/useTheme'

const {
  tabs,
  generalPreferences,
  displaySettings,
  notificationSettings,
  accountInfo,
  aboutApp,
  quickActions,
} = usePengaturanData()

const { isDark } = useTheme()

const activeTab = ref(tabs[0])

function handleSave() {

  console.log('Simpan pengaturan:', {
    generalPreferences: generalPreferences.value,
    displaySettings: displaySettings.value,
    notificationSettings: notificationSettings.value,
  })
}

function handleQuickAction(key) {

  console.log('Aksi cepat:', key)
}
</script>

<template>
  <DashboardLayout :unread-notifications="3">

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
  </DashboardLayout>
</template>