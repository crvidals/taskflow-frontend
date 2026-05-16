<template>
  <nav class="bg-white shadow-sm border-b">
    <div class="px-6 py-4 flex justify-between items-center">
      <h1 class="text-xl font-semibold text-gray-800">TaskFlow</h1>
      <button
        @click="handleLogout"
        class="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded transition"
      >
        Logout
      </button>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const handleLogout = () => {
  authStore.logout()
  router.push({ name: 'Login' })
}
</script>
