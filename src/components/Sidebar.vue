<template>
  <aside class="w-64 bg-gray-800 text-white min-h-screen p-6">
    <nav class="space-y-2">
      <router-link
        to="/"
        class="block px-4 py-2 rounded hover:bg-gray-700 transition"
        active-class="bg-gray-700"
      >
        Dashboard
      </router-link>
      <router-link
        to="/tasks"
        class="block px-4 py-2 rounded hover:bg-gray-700 transition"
        active-class="bg-gray-700"
      >
        Tasks
      </router-link>
      <router-link
        to="/tasks/create"
        class="block px-4 py-2 rounded hover:bg-gray-700 transition"
        active-class="bg-gray-700"
      >
        Create Task
      </router-link>
    </nav>
  </aside>
</template>
