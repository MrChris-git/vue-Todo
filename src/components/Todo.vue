<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useTodoStore } from '../stores/todo'
import Datepicker from 'vue-datepicker-next'
import 'vue-datepicker-next/index.css'
import { useRouter } from 'vue-router'

const todoStore = useTodoStore()
const newTodo = ref('')
const todoDate = ref(new Date())
const searchDate = ref<Date | null>(null)
const router = useRouter()

onMounted(() => {
  todoStore.fetchTodos()
})

const addTodo = () => {
  if (newTodo.value.trim()) {
    todoStore.addTodo(newTodo.value, todoDate.value)
    newTodo.value = ''
  }
}

const goToAbout = () => {
  router.push('/about')
}

const clearSearch = () => {
  searchDate.value = null
}

const filteredTodos = computed(() => {
  if (!searchDate.value) {
    return todoStore.todos
  }
  return todoStore.todos.filter((todo) => {
    const todoDate = new Date(todo.date)
    return todoDate.toDateString() === searchDate.value?.toDateString()
  })
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="bg-white rounded-lg shadow-2xl p-8 m-4 w-full max-w-2xl">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-4xl font-extrabold text-center text-gray-800">My Todo List</h1>
        <button
          @click="goToAbout"
          class="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition-all"
        >
          About
        </button>
      </div>
      <div class="flex justify-between items-center gap-4 mb-4">
        <p>Search by date:</p>
        <div class="flex justify-center items-center gap-4">
          <Datepicker
            v-model:value="searchDate"
            placeholder="Search by date"
            class="border-2 border-gray-200 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <button
            v-if="searchDate"
            @click="clearSearch"
            class="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition-all"
          >
            Clear
          </button>
        </div>
      </div>
      <div v-if="todoStore.loading" class="text-center text-gray-500 mb-4">Loading...</div>
      <div
        v-if="todoStore.error"
        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
        role="alert"
      >
        <strong class="font-bold">Error:</strong>
        <span class="block sm:inline">{{ todoStore.error }}</span>
      </div>
      <form @submit.prevent="addTodo" class="flex gap-4 mb-8">
        <input
          v-model="newTodo"
          placeholder="What needs to be done?"
          class="flex-grow p-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
        <Datepicker
          v-model:value="todoDate"
          class="border-2 border-gray-200 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
        <button
          class="bg-blue-600 text-white font-bold py-4 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all"
          :disabled="todoStore.loading"
        >
          Add
        </button>
      </form>
      <div class="max-h-96 overflow-auto">
        <ul class="space-y-4">
          <li
            v-for="todo in filteredTodos"
            :key="todo.id"
            class="flex items-center justify-between bg-white p-5 rounded-lg shadow-md border-l-4 border-blue-500"
          >
            <span :class="{ 'line-through text-gray-400': todo.done }" class="text-lg text-gray-700"
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
    </div>
  </div>
</template>
