import { defineStore } from 'pinia'
import api from '@/services/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => !!localStorage.getItem('access'),
  },

  actions: {
    async login(email, password) {
      this.loading = true
      this.error = null
      try {
        const { data } = await api.post('/auth/login/', { email, password })
        localStorage.setItem('access', data.access)
        localStorage.setItem('refresh', data.refresh)
        return true
      } catch (err) {
        this.error = err.response?.data?.error || 'Login failed'
        return false
      } finally {
        this.loading = false
      }
    },

    async register(username, email, password) {
      this.loading = true
      this.error = null
      try {
        const { data } = await api.post('/auth/register/', { username, email, password })
        localStorage.setItem('access', data.access)
        localStorage.setItem('refresh', data.refresh)
        return true
      } catch (err) {
        this.error = err.response?.data || 'Registration failed'
        return false
      } finally {
        this.loading = false
      }
    },

    logout() {
      localStorage.removeItem('access')
      localStorage.removeItem('refresh')
      this.user = null
    },
  },
})
