// src/stores/todoStore.js
import { defineStore } from 'pinia';

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [],
    newTodo: '',
  }),
  actions: {
    // Menambah todo baru
    addTodo() {
      if (this.newTodo.trim() !== '') {
        this.todos.push({ text: this.newTodo, completed: false });
        this.newTodo = ''; // Reset input newTodo setelah todo ditambahkan
      }
    },
    // Menghapus todo berdasarkan index
    deleteTodo(index) {
      this.todos.splice(index, 1);
    },
    // Mengubah status completed todo
    toggleCompletion(todo) {
      todo.completed = !todo.completed;
    },
    // Mengedit todo berdasarkan index
    editTodo({ index, newText }) {
      if (newText.trim() !== '') {
        this.todos[index].text = newText.trim();
      }
    },
  },
});
