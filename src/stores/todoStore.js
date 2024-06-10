import { defineStore } from 'pinia';

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [],
  }),
  actions: {
    addTodo(title) {
      this.todos.push({
        id: Date.now(),
        title,
        completed: false,
      });
    },
    removeTodo(id) {
      this.todos = this.todos.filter(todo => todo.id !== id);
    },
    toggleTodo(id) {
      const todo = this.todos.find(todo => todo.id === id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
  getters: {
    incompleteTodosCount(state) {
      return state.todos.filter(todo => !todo.completed).length;
    },
  },
});
