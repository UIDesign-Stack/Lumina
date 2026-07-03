import { ref, computed, watch } from 'vue'

const STORAGE_KEY = 'lumina-theme' // value: 'dark' | 'light'

const stored = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null
const theme = ref(stored === 'light' ? 'light' : 'dark') // default: dark (tema semula)

function applyThemeClass(value) {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  root.classList.toggle('dark', value === 'dark')
  root.classList.toggle('light', value === 'light')
}


applyThemeClass(theme.value)

watch(theme, (value) => {
  applyThemeClass(value)
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, value)
  }
})

export function useTheme() {
  const isDark = computed(() => theme.value === 'dark')

  function toggleTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }

  function setTheme(value) {
    theme.value = value === 'light' ? 'light' : 'dark'
  }

  return { theme, isDark, toggleTheme, setTheme }
}