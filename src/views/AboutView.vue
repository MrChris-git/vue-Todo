<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useTodoStore } from '../stores/todo'
import { onMounted } from 'vue'

const todoStore = useTodoStore()
const router = useRouter()

const goBack = () => {
  router.push('/')
}

onMounted(() => {
  todoStore.fetchTodos()
})
</script>

<template>
  <div class="about">
    <div class="container mx-auto p-8">
      <div class="flex justify-between">
        <h1 class="text-4xl font-bold mb-4">How It Works</h1>
        <button @click="goBack" class="text-lg text-blue-500 hover:underline">Go Back</button>
      </div>
      <div class="space-y-6">
        <section>
          <h2 class="text-2xl font-semibold mb-2">Overview</h2>
          <p class="text-lg">
            This is a simple Todo application built with Vue.js, TypeScript, and Tailwind CSS. It
            allows you to manage your tasks, set due dates, and track their completion status.
          </p>
        </section>
        <section>
          <h2 class="text-2xl font-semibold mb-2">Core Technologies</h2>
          <ul class="list-disc list-inside text-lg">
            <li>
              <strong>Vue.js:</strong> A progressive JavaScript framework for building user
              interfaces.
            </li>
            <li><strong>Pinia:</strong> The official state management library for Vue.js.</li>
            <li><strong>Vue Router:</strong> The official router for Vue.js.</li>
            <li>
              <strong>TypeScript:</strong> A typed superset of JavaScript that compiles to plain
              JavaScript.
            </li>
            <li>
              <strong>Tailwind CSS:</strong> A utility-first CSS framework for rapid UI development.
            </li>
            <li><strong>Vite:</strong> A fast build tool and development server.</li>
          </ul>
        </section>
        <section>
          <h2 class="text-2xl font-semibold mb-2">Application Structure</h2>
          <p class="text-lg">The application is structured as follows:</p>
          <ul class="list-disc list-inside text-lg">
            <li><code>src/main.ts</code>: The entry point of the application.</li>
            <li><code>src/App.vue</code>: The root component of the application.</li>
            <li><code>src/router/index.ts</code>: Defines the application's routes.</li>
            <li><code>src/views</code>: Contains the main pages of the application.</li>
            <li><code>src/components</code>: Contains reusable UI components.</li>
            <li><code>src/stores</code>: Contains the Pinia stores for state management.</li>
            <li><code>src/assets</code>: Contains static assets like CSS and images.</li>
            <li>
              <code>src/mockApi.ts</code>: Simulates a backend API for fetching and manipulating
              data.
            </li>
          </ul>
        </section>
        <section>
          <h2 class="text-2xl font-semibold mb-2">How Todos are Managed</h2>
          <p class="text-lg">
            The application uses a Pinia store (<code>useTodoStore</code>) to manage the state of
            the todos. The store handles all the logic for fetching, adding, removing, and updating
            todos. The <code>Todo.vue</code> component interacts with the store to display the todos
            and dispatch actions to modify them. The application uses a mock API to simulate
            asynchronous operations, making it feel like a real-world application.
          </p>
        </section>
        <section>
          <h2 class="text-2xl font-semibold mb-2">Todos Data Shared</h2>
          <p class="text-lg">
            The application uses a Pinia store (<code>useTodoStore</code>) to manage the state of
            the todos. The store handles all the logic for fetching, adding, removing, and updating
            todos. The <code>Todo.vue</code> component interacts with the store to display the todos
            and dispatch actions to modify them. The application uses a mock API to simulate
            asynchronous operations, making it feel like a real-world application.
          </p>
          <p class="text-lg">
            The todos data is shared between the <code>Todo.vue</code> component and the
            <code>AboutView.vue</code> component. The <code>Todo.vue</code> component uses the store
            to fetch the todos and the <code>AboutView.vue</code> component uses the store to
            display the todos.
          </p>

          <div class="mt-4 max-h-96 overflow-auto">
            <ul class="space-y-4">
              <li
                v-for="todo in todoStore.todos"
                :key="todo.id"
                class="flex items-center justify-between bg-white p-5 rounded-lg shadow-md border-l-4 border-blue-500"
              >
                <span
                  :class="{ 'line-through text-gray-400': todo.done }"
                  class="text-lg text-gray-700"
                  >{{ todo.text }} - {{ new Date(todo.date).toLocaleDateString() }}</span
                >
                <div class="flex items-center space-x-4">
                  <select
                    v-model="todo.done"
                    @change="todoStore.updateTodo(todo.id, { done: todo.done })"
                    class="border-2 border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option :value="true">Completed</option>
                    <option :value="false">Pending</option>
                  </select>
                  <button
                    @click="todoStore.removeTodo(todo.id)"
                    class="bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-all"
                    :disabled="todoStore.loading"
                  >
                    Delete
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
