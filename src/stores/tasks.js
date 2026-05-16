import { defineStore } from 'pinia'
import api from '@/services/api'

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchTasks() {
      this.loading = true
      this.error = null
      try {
        const { data } = await api.get('/tasks/')
        this.tasks = data.results || data
      } catch (err) {
        this.error = err.response?.data || 'Failed to fetch tasks'
      } finally {
        this.loading = false
      }
    },

    async createTask(task) {
      this.loading = true
      this.error = null
      try {
        const { data } = await api.post('/tasks/', task)
        this.tasks.push(data)
        return true
      } catch (err) {
        this.error = err.response?.data || 'Failed to create task'
        return false
      } finally {
        this.loading = false
      }
    },

    async updateTask(id, task) {
      this.loading = true
      this.error = null
      try {
        const { data } = await api.put(`/tasks/${id}/`, task)
        const index = this.tasks.findIndex((t) => t.id === id)
        if (index !== -1) {
          this.tasks[index] = data
        }
        return true
      } catch (err) {
        this.error = err.response?.data || 'Failed to update task'
        return false
      } finally {
        this.loading = false
      }
    },

    async deleteTask(id) {
      this.loading = true
      this.error = null
      try {
        await api.delete(`/tasks/${id}/`)
        this.tasks = this.tasks.filter((t) => t.id !== id)
        return true
      } catch (err) {
        this.error = err.response?.data || 'Failed to delete task'
        return false
      } finally {
        this.loading = false
      }
    },
  },
})
