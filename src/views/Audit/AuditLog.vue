<script setup>
import { ref, computed } from 'vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import AuditStatCard from '@/components/Audit/AuditStatCard.vue'
import AuditFilterBar from '@/components/Audit/AuditFilterBar.vue'
import AuditTable from '@/components/Audit/AuditTable.vue'
import ActivitySummaryDonut from '@/components/Audit/ActivitySummaryDonut.vue'
import AuditFilterSidebar from '@/components/Audit/AuditFilterSidebar.vue'
import AuditInfoCard from '@/components/Audit/AuditInfoCard.vue'
import ExportAuditButton from '@/components/Audit/ExportAuditButton.vue'
import { useAuditData } from '@/composables/useAuditData'
import { useTheme } from '@/composables/useTheme'

const {
  statCards,
  logs,
  userOptions,
  moduleOptions,
  actionOptions,
  statusOptions,
  dateRange,
  activitySummary,
  aboutAuditLog,
  pagination,
} = useAuditData()
const { isDark } = useTheme()

const search = ref('')
const activeUser = ref(userOptions[0])
const activeModule = ref(moduleOptions[0])
const activeAction = ref(actionOptions[0])
const activeStatus = ref(statusOptions[0])
const currentPage = ref(1)

const filteredLogs = computed(() => {
  return logs.filter((log) => {
    const matchesSearch = search.value.trim() === ''
      || log.description.toLowerCase().includes(search.value.trim().toLowerCase())
      || log.name.toLowerCase().includes(search.value.trim().toLowerCase())

    const matchesUser = activeUser.value === 'Semua Pengguna' || log.name === activeUser.value
    const matchesModule = activeModule.value === 'Semua Modul' || log.module === activeModule.value
    const matchesAction = activeAction.value === 'Semua Aksi' || log.action === activeAction.value
    const matchesStatus = activeStatus.value === 'Semua Status'
      || (activeStatus.value === 'Berhasil' && log.status === 'berhasil')
      || (activeStatus.value === 'Gagal' && log.status === 'gagal')

    return matchesSearch && matchesUser && matchesModule && matchesAction && matchesStatus
  })
})

function handleExport(format) {
  console.log('Export audit log sebagai', format)
}

function handleResetFilter() {
  activeUser.value = userOptions[0]
  activeModule.value = moduleOptions[0]
  activeAction.value = actionOptions[0]
  activeStatus.value = statusOptions[0]
  search.value = ''
}

function handleApplyFilter() {
  currentPage.value = 1
  console.log('Filter diterapkan')
}
</script>

<template>
  <DashboardLayout :unread-notifications="1">
    <div class="flex items-start justify-between mb-6 flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold" :class="isDark ? 'text-white' : 'text-gray-900'">Audit Log</h1>
        <p class="text-sm mt-1" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Lihat riwayat aktivitas pengguna dalam sistem untuk menjaga keamanan dan transparansi data.</p>
      </div>

      <ExportAuditButton @export="handleExport" />
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <AuditStatCard
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
        <AuditFilterBar
          v-model:search="search"
          v-model:active-user="activeUser"
          v-model:active-module="activeModule"
          v-model:active-action="activeAction"
          v-model:active-status="activeStatus"
          :date-range="dateRange"
          :user-options="userOptions"
          :module-options="moduleOptions"
          :action-options="actionOptions"
          :status-options="statusOptions"
        />

        <AuditTable
          :logs="filteredLogs"
          :current-page="currentPage"
          :per-page="pagination.perPage"
          :total-data="pagination.totalData"
          @update:current-page="currentPage = $event"
        />
      </div>

      <div class="space-y-4">
        <ActivitySummaryDonut
          :total="activitySummary.total"
          :period-label="activitySummary.periodLabel"
          :segments="activitySummary.segments"
        />

        <AuditFilterSidebar
          v-model:active-user="activeUser"
          v-model:active-module="activeModule"
          v-model:active-action="activeAction"
          v-model:active-status="activeStatus"
          :date-range="dateRange"
          :user-options="userOptions"
          :module-options="moduleOptions"
          :action-options="actionOptions"
          :status-options="statusOptions"
          @reset="handleResetFilter"
          @apply="handleApplyFilter"
        />

        <AuditInfoCard
          :title="aboutAuditLog.title"
          :text="aboutAuditLog.text"
          :link-text="aboutAuditLog.linkText"
        />
      </div>
    </div>
  </DashboardLayout>
</template>