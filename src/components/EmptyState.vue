<template>
  <div class="text-center py-12">
    <p class="text-gray-500">{{ message }}</p>
  </div>
</template>

<script setup>
defineProps({
  message: { type: String, default: 'No data available' },
})
</script>
