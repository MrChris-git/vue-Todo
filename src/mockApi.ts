export interface Todo {
  id: number
  text: string
  done: boolean
  date: Date
}

let todos: Todo[] = []
let nextId = 1

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

export const fetchTodos = async (): Promise<Todo[]> => {
  await delay(500)
  return todos
}

export const addTodo = async (text: string, date: Date): Promise<Todo> => {
  await delay(500)
  const newTodo: Todo = { id: nextId++, text, done: false, date }
  todos.push(newTodo)
  return newTodo
}

export const removeTodo = async (id: number): Promise<void> => {
  await delay(500)
  todos = todos.filter((todo) => todo.id !== id)
}

export const updateTodo = async (id: number, updates: Partial<Todo>): Promise<Todo> => {
  await delay(500)
  const todoToUpdate = todos.find((todo) => todo.id === id)
  if (todoToUpdate) {
    Object.assign(todoToUpdate, updates)
    return todoToUpdate
  }
  throw new Error('Todo not found')
}
