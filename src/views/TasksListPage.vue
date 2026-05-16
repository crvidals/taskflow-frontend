<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Tasks</h1>
      <router-link
        to="/tasks/create"
        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Create Task
      </router-link>
    </div>

    <div v-if="tasksStore.loading" class="flex justify-center py-12">
      <LoadingSpinner />
    </div>

    <template v-else>
      <div v-if="tasksStore.tasks.length === 0" class="bg-white rounded-lg shadow">
        <EmptyState message="No tasks yet. Create your first task!" />
      </div>
      <div v-else class="space-y-4">
        <TaskCard
          v-for="task in tasksStore.tasks"
          :key="task.id"
          :task="task"
          @delete="handleDelete"
        />
      </div>
    </template>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useTasksStore } from '@/stores/tasks'
import TaskCard from '@/components/TaskCard.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import EmptyState from '@/components/EmptyState.vue'

const tasksStore = useTasksStore()

onMounted(() => {
  tasksStore.fetchTasks()
})

const handleDelete = async (id) => {
  await tasksStore.deleteTask(id)
}
</script>
