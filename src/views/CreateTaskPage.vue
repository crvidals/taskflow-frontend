<template>
  <div>
    <h1 class="text-2xl font-bold text-gray-800 mb-6">Create Task</h1>
    <div class="bg-white rounded-lg shadow p-6 max-w-2xl">
      <TaskForm
        :loading="tasksStore.loading"
        button-text="Create Task"
        @submit="handleCreate"
        @cancel="$router.push('/tasks')"
      />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useTasksStore } from '@/stores/tasks'
import TaskForm from '@/components/TaskForm.vue'

const router = useRouter()
const tasksStore = useTasksStore()

const handleCreate = async (task) => {
  const success = await tasksStore.createTask(task)
  if (success) {
    router.push({ name: 'TasksList' })
  }
}
</script>
