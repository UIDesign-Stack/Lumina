import { ref, watch } from 'vue'

const TOOLTIP_KEY = 'lumina-show-tooltip'
const ANIMATION_KEY = 'lumina-page-animation'
const SIDEBAR_COLLAPSED_KEY = 'lumina-sidebar-collapsed'

function readBool(key, fallback) {
  if (typeof localStorage === 'undefined') return fallback
  const stored = localStorage.getItem(key)
  if (stored === null) return fallback
  return stored === 'true'
}

const tooltipsEnabled = ref(readBool(TOOLTIP_KEY, true))
const pageAnimationsEnabled = ref(readBool(ANIMATION_KEY, true))
const sidebarCollapsed = ref(readBool(SIDEBAR_COLLAPSED_KEY, false))

watch(tooltipsEnabled, (value) => {
  if (typeof localStorage !== 'undefined') localStorage.setItem(TOOLTIP_KEY, value)
})

watch(pageAnimationsEnabled, (value) => {
  if (typeof localStorage !== 'undefined') localStorage.setItem(ANIMATION_KEY, value)
})

watch(sidebarCollapsed, (value) => {
  if (typeof localStorage !== 'undefined') localStorage.setItem(SIDEBAR_COLLAPSED_KEY, value)
})

export function useUIPreferences() {
  function setTooltipsEnabled(value) {
    tooltipsEnabled.value = value
  }

  function setPageAnimationsEnabled(value) {
    pageAnimationsEnabled.value = value
  }

  function setSidebarCollapsed(value) {
    sidebarCollapsed.value = value
  }

  function toggleSidebarCollapsed() {
    sidebarCollapsed.value = !sidebarCollapsed.value
  }

  return {
    tooltipsEnabled,
    pageAnimationsEnabled,
    sidebarCollapsed,
    setTooltipsEnabled,
    setPageAnimationsEnabled,
    setSidebarCollapsed,
    toggleSidebarCollapsed,
  }
}