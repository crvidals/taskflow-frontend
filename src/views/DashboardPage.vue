<template>
  <div>
    <h1 class="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

    <div v-if="tasksStore.loading" class="flex justify-center py-12">
      <LoadingSpinner />
    </div>

    <template v-else>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-sm font-medium text-gray-500">Total Tasks</h3>
          <p class="text-3xl font-bold text-gray-800 mt-2">{{ tasksStore.tasks.length }}</p>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-sm font-medium text-gray-500">Pending</h3>
          <p class="text-3xl font-bold text-yellow-600 mt-2">{{ pendingCount }}</p>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-sm font-medium text-gray-500">Completed</h3>
          <p class="text-3xl font-bold text-green-600 mt-2">{{ completedCount }}</p>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">Recent Tasks</h2>
        <div v-if="tasksStore.tasks.length === 0" class="text-center py-8 text-gray-500">
          <EmptyState message="No tasks yet. Create your first task!" />
        </div>
        <div v-else class="space-y-3">
          <TaskCard
            v-for="task in tasksStore.tasks.slice(0, 5)"
            :key="task.id"
            :task="task"
            @delete="handleDelete"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useTasksStore } from '@/stores/tasks'
import TaskCard from '@/components/TaskCard.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import EmptyState from '@/components/EmptyState.vue'

const tasksStore = useTasksStore()

onMounted(() => {
  tasksStore.fetchTasks()
})

const pendingCount = computed(() =>
  tasksStore.tasks.filter((t) => t.status === 'Pending').length
)

const completedCount = computed(() =>
  tasksStore.tasks.filter((t) => t.status === 'Completed').length
)

const handleDelete = async (id) => {
  await tasksStore.deleteTask(id)
}
</script>
