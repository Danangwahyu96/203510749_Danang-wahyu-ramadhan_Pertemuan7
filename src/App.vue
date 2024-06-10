<template>
  <div class="app">
    <h1>Todo List</h1>
    <form @submit.prevent="addTodo" class="todo-form">
      <input v-model="newTodo" placeholder="Add a new todo" />
      <button type="submit">Add</button>
    </form>
    <ul class="todo-list">
      <li v-for="todo in todos" :key="todo.id" class="todo-item">
        <div class="todo-content">
          <input type="checkbox" :checked="todo.completed" @change="toggleTodo(todo.id)" />
          <span :class="{ completed: todo.completed }">{{ todo.title }}</span>
        </div>
        <button class="delete-button" @click="removeTodo(todo.id)">Delete</button>
      </li>
    </ul>
    <p class="incomplete-count">Total incomplete todos: {{ incompleteTodosCount }}</p>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useTodoStore } from './stores/todoStore';

export default {
  setup() {
    const newTodo = ref('');
    const todoStore = useTodoStore();

    const addTodo = () => {
      if (newTodo.value.trim()) {
        todoStore.addTodo(newTodo.value);
        newTodo.value = '';
      }
    };

    const removeTodo = (id) => {
      todoStore.removeTodo(id);
    };

    const toggleTodo = (id) => {
      todoStore.toggleTodo(id);
    };

    const todos = computed(() => todoStore.todos);
    const incompleteTodosCount = computed(() => todoStore.incompleteTodosCount);

    return {
      newTodo,
      todos,
      addTodo,
      removeTodo,
      toggleTodo,
      incompleteTodosCount,
    };
  },
};
</script>

<style scoped>
body {
  font-family: 'Arial', sans-serif;
  background: #333;
  margin: 0;
  padding: 0;
}

.app {
  max-width: 800px;
  margin: 2em auto;
  padding: 3em;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
  font-size: 2em;
}

.todo-form {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1em;
}

.todo-form input {
  flex: 1;
  padding: 0.75em;
  margin-right: 0.5em;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1em;
}

.todo-form button {
  padding: 0.75em 1.5em;
  border: none;
  background: #42b983;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
}

.todo-form button:hover {
  background: #3a9a70;
}

.todo-list {
  list-style: none;
  padding: 0;
}

.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
  margin-bottom: 0.75em;
  background: #fafafa;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition: background 0.3s;
}

.todo-item:hover {
  background: #f1f1f1;
}

.todo-content {
  display: flex;
  align-items: center;
}

.todo-content input {
  margin-right: 0.75em;
}

.todo-content span.completed {
  text-decoration: line-through;
  color: #888;
}

.delete-button {
  background: none;
  border: none;
  color: #e74c3c;
  cursor: pointer;
  font-size: 1em;
}

.delete-button:hover {
  color: #c0392b;
}

.incomplete-count {
  text-align: center;
  color: #555;
  margin-top: 1.5em;
  font-size: 1.25em;
}
</style>
