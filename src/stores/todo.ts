import { defineStore } from 'pinia'
import {
  fetchTodos,
  addTodo as apiAddTodo,
  removeTodo as apiRemoveTodo,
  updateTodo as apiUpdateTodo,
  type Todo,
} from '../mockApi'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [] as Todo[],
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchTodos() {
      this.loading = true
      try {
        this.todos = [...(await fetchTodos())]
      } catch (error) {
        this.error = (error as Error).message
      } finally {
        this.loading = false
      }
    },
    async addTodo(text: string, date: Date) {
      this.loading = true
      try {
        const newTodo = await apiAddTodo(text, date)
        this.todos.push(newTodo)
      } catch (error) {
        this.error = (error as Error).message
      } finally {
        this.loading = false
      }
    },
    async removeTodo(id: number) {
      this.loading = true
      try {
        await apiRemoveTodo(id)
        this.todos = this.todos.filter((todo) => todo.id !== id)
      } catch (error) {
        this.error = (error as Error).message
      } finally {
        this.loading = false
      }
    },
    async updateTodo(id: number, updates: Partial<Todo>) {
      this.loading = true
      try {
        const updatedTodo = await apiUpdateTodo(id, updates)
        const index = this.todos.findIndex((todo) => todo.id === id)
        if (index !== -1) {
          this.todos[index] = updatedTodo
        }
      } catch (error) {
        this.error = (error as Error).message
      } finally {
        this.loading = false
      }
    },
  },
})
