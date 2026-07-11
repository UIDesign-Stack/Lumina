<script setup>
import { ref, computed } from 'vue'
import { UserPlusIcon, ShieldCheckIcon } from '@heroicons/vue/24/outline'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import ReconciliationTabs from '@/components/Reconciliation/ReconciliationTabs.vue'
import UserStatCard from '@/components/Pengguna/UserStatCard.vue'
import UserFilterBar from '@/components/Pengguna/UserFilterBar.vue'
import UserTable from '@/components/Pengguna/UserTable.vue'
import PopularRolesCard from '@/components/Pengguna/PopularRolesCard.vue'
import UserActivityList from '@/components/Pengguna/UserActivityList.vue'
import SecurityBanner from '@/components/Pengguna/SecurityBanner.vue'
import { usePenggunaData } from '@/composables/usePenggunaData'
import { useTheme } from '@/composables/useTheme'

const {
  tabs,
  statCards,
  users,
  roleOptions,
  statusOptions,
  popularRoles,
  recentActivity,
  securityBanner,
  pagination,
} = usePenggunaData()
const { isDark } = useTheme()

const activeTab = ref(tabs[0])
const search = ref('')
const activeRole = ref(roleOptions[0])
const activeStatus = ref(statusOptions[0])
const currentPage = ref(1)

const filteredUsers = computed(() => {
  return users.filter((user) => {
    const matchesSearch = search.value.trim() === ''
      || user.name.toLowerCase().includes(search.value.trim().toLowerCase())
      || user.email.toLowerCase().includes(search.value.trim().toLowerCase())

    const matchesRole = activeRole.value === 'Semua Peran' || user.role === activeRole.value

    const matchesStatus = activeStatus.value === 'Semua Status'
      || (activeStatus.value === 'Aktif' && user.status === 'aktif')
      || (activeStatus.value === 'Nonaktif' && user.status === 'nonaktif')

    return matchesSearch && matchesRole && matchesStatus
  })
})

function handleInviteUser() {
  console.log('Undang pengguna')
}

function handleManageRoles() {
  console.log('Kelola peran')
}

function handleRowMenu(user) {
  console.log('Aksi untuk pengguna:', user)
}
</script>

<template>
  <DashboardLayout :unread-notifications="1">
    <div class="flex items-start justify-between mb-6 flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold" :class="isDark ? 'text-white' : 'text-gray-900'">Pengguna & Peran</h1>
        <p class="text-sm mt-1" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Kelola pengguna aplikasi dan atur peran serta akses mereka.</p>
      </div>

      <div class="flex items-center gap-3">
        <button
          type="button"
          class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-medium transition"
          @click="handleInviteUser"
        >
          <UserPlusIcon class="w-4 h-4" />
          Undang Pengguna
        </button>
        <button
          type="button"
          class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition"
          :class="isDark ? 'border-white/15 text-white hover:bg-white/10' : 'border-gray-200 text-gray-700 hover:bg-gray-50'"
          @click="handleManageRoles"
        >
          <ShieldCheckIcon class="w-4 h-4" />
          Kelola Peran
        </button>
      </div>
    </div>

    <div class="mb-6">
      <ReconciliationTabs :tabs="tabs" v-model:active-tab="activeTab" />
    </div>

    <template v-if="activeTab === 'Pengguna'">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <UserStatCard
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
          <UserFilterBar
            v-model:search="search"
            v-model:active-role="activeRole"
            v-model:active-status="activeStatus"
            :role-options="roleOptions"
            :status-options="statusOptions"
          />

          <UserTable
            :users="filteredUsers"
            :current-page="currentPage"
            :per-page="pagination.perPage"
            @update:current-page="currentPage = $event"
            @row-menu="handleRowMenu"
          />

          <SecurityBanner
            :title="securityBanner.title"
            :text="securityBanner.text"
            :link-text="securityBanner.linkText"
          />
        </div>

        <div class="space-y-4">
          <PopularRolesCard :roles="popularRoles" @manage-roles="handleManageRoles" />
          <UserActivityList :activities="recentActivity" />
        </div>
      </div>
    </template>

    <template v-else>
      <div class="rounded-2xl border p-8 text-center" :class="isDark ? 'bg-[#100c1c]/80 border-white/10 text-gray-400' : 'bg-white border-gray-200 text-gray-500'">
        Tab "Peran" belum diimplementasikan.
      </div>
    </template>
  </DashboardLayout>
</template>