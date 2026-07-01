import { ref } from 'vue'

export function useAuth() {
  const isLoading = ref(false)
  const errorMessage = ref('')

  async function login({ email, password, rememberMe }) {
    isLoading.value = true
    errorMessage.value = ''
    try {
      console.log('Login submitted:', { email, password, rememberMe })
    } catch (err) {
      errorMessage.value = err?.message || 'Gagal masuk. Silakan coba lagi.'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function register(payload) {
    isLoading.value = true
    errorMessage.value = ''
    try {
      console.log('Register submitted:', payload)
    } catch (err) {
      errorMessage.value = err?.message || 'Gagal mendaftar. Silakan coba lagi.'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function sendResetPasswordEmail({ email }) {
    isLoading.value = true
    errorMessage.value = ''
    try {
      console.log('Forgot password submitted:', { email })
    } catch (err) {
      errorMessage.value = err?.message || 'Gagal mengirim tautan reset. Silakan coba lagi.'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function changePassword({ currentPassword, newPassword, confirmNewPassword }) {
    isLoading.value = true
    errorMessage.value = ''
    try {
      console.log('Change password submitted:', { currentPassword, newPassword, confirmNewPassword })
    } catch (err) {
      errorMessage.value = err?.message || 'Gagal mengubah kata sandi. Silakan coba lagi.'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    errorMessage,
    login,
    register,
    sendResetPasswordEmail,
    changePassword,
  }
}