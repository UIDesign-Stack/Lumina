<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import ReconciliationTabs from '@/components/Reconciliation/ReconciliationTabs.vue'
import IntegrationStatCard from '@/components/Integration/IntegrationStatCard.vue'
import IntegrationSection from '@/components/Integration/IntegrationSection.vue'
import CategoryFilterList from '@/components/Integration/CategoryFilterList.vue'
import HelpCard from '@/components/Integration/HelpCard.vue'
import IntegrationActivityList from '@/components/Integration/IntegrationActivityList.vue'
import { useIntegrasiData } from '@/composables/useIntegrasiData'
import { useTheme } from '@/composables/useTheme'

const router = useRouter()

const {
  tabs,
  statCards,
  notConnected,
  categories,
  recentActivity,
} = useIntegrasiData()
const { isDark } = useTheme()

// Tab aktif untuk halaman ini
const activeTab = ref('Tersedia')
const activeCategory = ref(categories[0].key)

// Peta nama tab ke route, sesuaikan dengan nama route di router kamu
const TAB_ROUTES = {
  'Semua Integrasi': '/settings/integrations',
  'Terhubung': '/integrasi/terhubung',
  'Tersedia': '/integrasi/tersedia',
}

function handleTabChange(tab) {
  activeTab.value = tab
  const target = TAB_ROUTES[tab]
  if (target) router.push(target)
}

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
      <ReconciliationTabs :tabs="tabs" :active-tab="activeTab" @update:active-tab="handleTabChange" />
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
          title="Integrasi Tersedia"
          :items="notConnected"
          variant="disconnected"
          @primary-action="handlePrimaryAction"
        />

        <p v-if="notConnected.length === 0" class="text-sm text-center py-8" :class="isDark ? 'text-gray-500' : 'text-gray-400'">
          Semua integrasi yang tersedia sudah terhubung.
        </p>
      </div>

      <div class="space-y-4">
        <CategoryFilterList :categories="categories" v-model:active-category="activeCategory" />
        <HelpCard />
        <IntegrationActivityList :activities="recentActivity" />
      </div>
    </div>
  </DashboardLayout>
</template>