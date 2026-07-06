<script setup>
import { ref } from 'vue'
import { QuestionMarkCircleIcon } from '@heroicons/vue/24/outline'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import FavoriteQuickSelect from '@/components/Transfer/FavoriteQuickSelect.vue'
import TransferForm from '@/components/Transfer/TransferForm.vue'
import MyAccountsCard from '@/components/Transfer/MyAccountsCard.vue'
import UpgradeLimitPromo from '@/components/Transfer/UpgradeLimitPromo.vue'
import SecurityInfoCard from '@/components/Transfer/SecurityInfoCard.vue'
import FavoritesSidebar from '@/components/Transfer/FavoritesSidebar.vue'
import RecentTransfersList from '@/components/Transfer/RecentTransfersList.vue'
import TransferTabs from '@/components/Transfer/TransferTabs.vue'
import { useTransferData } from '@/composables/useTransferData'
import { useTheme } from '@/composables/useTheme'

const { quickFavorites, myAccounts, allFavorites, recentTransfers, tabs, transferMethods } = useTransferData()
const { isDark } = useTheme()

const activeTab = ref(tabs[0])

const fromAccount = myAccounts[0]

function handleSubmitTransfer(payload) {

  console.log('Transfer submitted:', payload)
}
</script>

<template>
  <DashboardLayout :unread-notifications="8">

    <div class="flex flex-wrap items-start justify-between gap-4 mb-6">
      <div>
        <h1 class="text-2xl font-bold" :class="isDark ? 'text-white' : 'text-gray-900'">Transfer</h1>
        <p class="text-sm mt-1" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Kirim dan terima dana dengan mudah dan aman.</p>
      </div>

      <button
        class="flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition"
        :class="isDark ? 'border-white/10 text-gray-300 hover:bg-white/5' : 'border-gray-300 text-gray-700 hover:bg-gray-50'"
      >
        <QuestionMarkCircleIcon class="w-4 h-4" />
        Panduan Transfer
      </button>
    </div>

    <div class="mb-6">
      <TransferTabs :tabs="tabs" v-model:active-tab="activeTab" />
    </div>

    <div class="mb-6">
      <FavoriteQuickSelect :favorites="quickFavorites" />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-12 gap-4">
      <div class="xl:col-span-5">
        <TransferForm :from-account="fromAccount" :methods="transferMethods" @submit="handleSubmitTransfer" />
      </div>

      <div class="xl:col-span-4 space-y-4">
        <MyAccountsCard :accounts="myAccounts" />
        <UpgradeLimitPromo />
        <SecurityInfoCard />
      </div>

      <div class="xl:col-span-3 space-y-4">
        <FavoritesSidebar :favorites="allFavorites" />
        <RecentTransfersList :transfers="recentTransfers" />
      </div>
    </div>
  </DashboardLayout>
</template>