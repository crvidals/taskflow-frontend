<template>
  <div>
    <h1 class="text-2xl font-bold text-gray-800 mb-6">Edit Task</h1>
    <div class="bg-white rounded-lg shadow p-6 max-w-2xl">
      <div v-if="tasksStore.loading" class="flex justify-center py-8">
        <LoadingSpinner />
      </div>
      <TaskForm
        v-else-if="task"
        :task="task"
        :loading="tasksStore.loading"
        button-text="Update Task"
        @submit="handleUpdate"
        @cancel="$router.push('/tasks')"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTasksStore } from '@/stores/tasks'
import TaskForm from '@/components/TaskForm.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const route = useRoute()
const router = useRouter()
const tasksStore = useTasksStore()
const task = ref(null)

onMounted(async () => {
  if (tasksStore.tasks.length === 0) {
    await tasksStore.fetchTasks()
  }
  task.value = tasksStore.tasks.find((t) => t.id === route.params.id)
})

const handleUpdate = async (updatedTask) => {
  const success = await tasksStore.updateTask(route.params.id, updatedTask)
  if (success) {
    router.push({ name: 'TasksList' })
  }
}
</script>
