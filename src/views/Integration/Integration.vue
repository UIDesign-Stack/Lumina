<script setup>
import { ref } from 'vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import ReconciliationTabs from '@/components/Reconciliation/ReconciliationTabs.vue'
import IntegrationStatCard from '@/components/Integration/IntegrationStatCard.vue'
import IntegrationSection from '@/components/Integration/IntegrationSection.vue'
import CategoryFilterList from '@/components/Integration/CategoryFilterList.vue'
import HelpCard from '@/components/Integration/HelpCard.vue'
import IntegrationActivityList from '@/components/Integration/IntegrationActivityList.vue'
import IntegrationInfoBanner from '@/components/Integration/IntegrationInfoBanner.vue'
import { useIntegrasiData } from '@/composables/useIntegrasiData'
import { useTheme } from '@/composables/useTheme'

const {
  tabs,
  statCards,
  connected,
  actionNeeded,
  notConnected,
  categories,
  recentActivity,
  infoBanner,
} = useIntegrasiData()
const { isDark } = useTheme()

const activeTab = ref(tabs[0])
const activeCategory = ref(categories[0].key)

function handlePrimaryAction(item) {

  console.log('Aksi integrasi:', item)
}
</script>

<template>
  <DashboardLayout :unread-notifications="1">

    <div class="mb-6">
      <h1 class="text-2xl font-bold" :class="isDark ? 'text-white' : 'text-gray-900'">Integrasi</h1>
      <p class="text-sm mt-1" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Hubungkan Lumina Finance dengan aplikasi dan layanan pihak ketiga.</p>
    </div>


    <div class="mb-6">
      <ReconciliationTabs :tabs="tabs" v-model:active-tab="activeTab" />
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <IntegrationStatCard
        v-for="card in statCards"
        :key="card.key"
        :label="card.label"
        :value="card.value"
        :note="card.note"
        :icon="card.icon"
        :color="card.color"
      />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div class="lg:col-span-2 space-y-4">
        <IntegrationSection
          title="Integrasi Terhubung"
          :items="connected"
          variant="connected"
          @primary-action="handlePrimaryAction"
        />

        <IntegrationSection
          title="Perlu Tindakan"
          :items="actionNeeded"
          variant="action"
          @primary-action="handlePrimaryAction"
        />

        <IntegrationSection
          title="Tidak Terhubung"
          :items="notConnected"
          variant="disconnected"
          @primary-action="handlePrimaryAction"
        />

        <IntegrationInfoBanner :text="infoBanner.text" :link-text="infoBanner.linkText" />
      </div>

      <div class="space-y-4">
        <CategoryFilterList :categories="categories" v-model:active-category="activeCategory" />
        <HelpCard />
        <IntegrationActivityList :activities="recentActivity" />
      </div>
    </div>
  </DashboardLayout>
</template>