<template>
  <div class="bg-white rounded-lg shadow p-4 border-l-4" :class="priorityColor">
    <div class="flex justify-between items-start">
      <div>
        <h3 class="font-semibold text-gray-800">{{ task.title }}</h3>
        <p class="text-sm text-gray-500 mt-1">{{ task.description }}</p>
      </div>
      <div class="flex gap-2">
        <router-link
          :to="{ name: 'EditTask', params: { id: task.id } }"
          class="text-blue-600 hover:text-blue-800 text-sm"
        >
          Edit
        </router-link>
        <button
          @click="$emit('delete', task.id)"
          class="text-red-600 hover:text-red-800 text-sm"
        >
          Delete
        </button>
      </div>
    </div>
    <div class="mt-3 flex gap-2">
      <span class="text-xs px-2 py-1 rounded" :class="statusColor">
        {{ task.status }}
      </span>
      <span class="text-xs px-2 py-1 rounded bg-gray-200 text-gray-700">
        {{ task.priority }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  task: { type: Object, required: true },
})

defineEmits(['delete'])

const priorityColor = computed(() => {
  const colors = {
    Low: 'border-green-500',
    Medium: 'border-yellow-500',
    High: 'border-red-500',
  }
  return colors[props.task.priority] || 'border-gray-500'
})

const statusColor = computed(() => {
  const colors = {
    Pending: 'bg-yellow-100 text-yellow-800',
    'In Progress': 'bg-blue-100 text-blue-800',
    Completed: 'bg-green-100 text-green-800',
  }
  return colors[props.task.status] || 'bg-gray-100 text-gray-800'
})
</script>
