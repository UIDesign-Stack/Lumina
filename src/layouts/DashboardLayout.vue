<script setup>
import { ref } from 'vue'
import Sidebar from '@/components/Dashboard/Sidebar.vue'
import Topbar from '@/components/Dashboard/Topbar.vue'
import { useTheme } from '@/composables/useTheme'

const sidebarOpen = ref(false)
const { isDark } = useTheme()
</script>

<template>
  <div class="min-h-screen flex transition-colors duration-300" :class="isDark ? 'bg-[#07050f]' : 'bg-gray-50'">
    <Sidebar :is-open="sidebarOpen" @close="sidebarOpen = false" />

    <div class="flex-1 flex flex-col min-w-0">
      <Topbar :unread-notifications="8" @toggle-sidebar="sidebarOpen = true" />

      <main class="flex-1 px-4 sm:px-6 py-6">
        <slot />
      </main>
    </div>
  </div>
</template>