<script setup>
import { useRoute } from 'vue-router'
import { useUIPreferences } from '@/composables/useUIPreferences'

const route = useRoute()
const { pageAnimationsEnabled } = useUIPreferences()
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition :name="pageAnimationsEnabled ? 'page-fade' : ''" mode="out-in">
      <component :is="Component" :key="route.fullPath" />
    </transition>
  </router-view>
</template>

<style>
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}
.page-fade-enter-from {
  opacity: 0;
  transform: translateY(6px);
}
.page-fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

/* Cegah flash putih saat transisi: samakan background body dengan tema aktif */
html,
body,
#app {
  background-color: #0b0817;
}
html.light body,
html.light #app {
  background-color: #f9fafb;
}
</style>