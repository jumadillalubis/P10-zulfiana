<template>
  <div class="container">
    <h4>To-Do List 📝</h4>
    <h6>Let's notes!!!</h6>
    <div class="todo-form">
      <input type="text" v-model="newTodo" @keyup.enter="addOrUpdateTodo">
      <button @click="addOrUpdateTodo">{{ editingIndex === -1 ? 'Add' : 'Update' }}</button>
      <button @click="cancelEdit" v-if="editingIndex !== -1">Cancel</button>
    </div>
    <ul class="todo-list">
      <li v-for="(todo, index) in todos" :key="index" class="todo-item" :class="{ completed: todo.completed }">
        <span>{{ todo.text }}</span>
        <div>
          <button class="edit-button" @click="editTodo(index)">Edit</button>
          <button class="delete-button" @click="deleteTodo(index)">Delete</button>
          <button class="complete-button" @click="toggleComplete(index)">
            {{ todo.completed ? 'Undo' : 'Complete' }}
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'ToDoList',
  setup() {
    const todos = ref([
      
    ]);
    const newTodo = ref('');
    const editingIndex = ref(-1);

    const addOrUpdateTodo = () => {
      if (newTodo.value.trim() === '') return;

      if (editingIndex.value === -1) {
        todos.value.push({ text: newTodo.value.trim(), completed: false });
      } else {
        todos.value[editingIndex.value].text = newTodo.value.trim();
        editingIndex.value = -1;
      }
      newTodo.value = '';
    };

    const editTodo = (index) => {
      newTodo.value = todos.value[index].text;
      editingIndex.value = index;
    };

    const cancelEdit = () => {
      newTodo.value = '';
      editingIndex.value = -1;
    };

    const deleteTodo = (index) => {
      todos.value.splice(index, 1);
    };

    const toggleComplete = (index) => {
      todos.value[index].completed = !todos.value[index].completed;
    };

    return {
      todos,
      newTodo,
      editingIndex,
      addOrUpdateTodo,
      editTodo,
      cancelEdit,
      deleteTodo,
      toggleComplete
    };
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #FFFAFA; /* AliceBlue background */
  border: 1px solid #dcdcdc; /* Light grey border */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow */
}

h1 {
  text-align: center;
  color: #333; /* Dark grey text */
  font-family: 'Arial', sans-serif;
}

.todo-form {
  display: flex;
  margin-bottom: 10px;
}

.todo-form input[type="text"] {
  flex: 1;
  padding: 8px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.todo-form button {
  padding: 8px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.todo-list {
  list-style-type: none;
  padding: 0;
}

.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  margin-bottom: 5px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.todo-item.completed {
  background-color: #0aa6b1; /* Light grey background for completed todos */
}

.todo-item button {
  padding: 4px 8px;
  margin-left: 5px;
  cursor: pointer;
  border: none;
  border-radius: 3px;
}

.todo-item button.edit-button {
  background-color: #ffcc00; /* Yellow Edit button */
  color: #333;
}

.todo-item button.delete-button {
  background-color: #f44336; /* Red Delete button */
  color: white;
}

.todo-item button.complete-button {
  background-color: #22076e; /* Dark blue Complete button */
  color: white;
}
</style>
