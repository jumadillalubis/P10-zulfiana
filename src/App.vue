<template>
  <div class="container">
    <header>
      <nav>
        <ul class="menu">
          <li @click="showTodos">Todos 📝</li> <br>
          <li @click="showPosts">Post 📤</li>
        </ul>
      </nav>
    </header>
    <h1 style="color: #CD5C5C;">Simple Todo App</h1>
    <div class="todo-input-container">
      <input v-if="isTodosVisible" type="text" v-model="newTodo" class="todo-input" @keyup.enter="addTodo">
      <button v-if="isTodosVisible" class="todo-button" @click="addTodo">Add</button>
    </div>

    <ul v-if="isTodosVisible">
      <li v-for="(todo, index) in todos" :key="index" class="todo-item" :data-index="index">
        <input type="checkbox" v-model="todo.completed" class="todo-checkbox">
        <span :class="{ 'completed': todo.completed }" class="todo-text" @click="toggleCompletion(todo)">
          {{ todo.text }}
        </span>
        <button class="todo-delete" @click="deleteTodo(index)">Delete</button>
      </li>
    </ul>

    <div v-if="isPostsVisible">
      <h2>Fitur Postingan Pengguna</h2>
      <select v-model="selectedUser" @change="fetchUserPosts">
        <option value="">Pilih User</option>
        <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
      </select>
      <div v-if="selectedUser">
        <h3>Postingan dari {{ selectedUserName }}</h3>
        <ul>
          <li v-for="post in userPosts" :key="post.id">
            <h4>{{ post.title }}</h4>
            <p>{{ post.body }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todos: [],
      newTodo: '',
      isTodosVisible: true,
      isPostsVisible: false,
      users: [],
      selectedUser: '',
      userPosts: [],
      selectedUserName: ''
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim() !== '') {
        this.todos.push({ text: this.newTodo, completed: false });
        this.newTodo = '';
      }
    },
    deleteTodo(index) {
      this.todos.splice(index, 1);
    },
    toggleCompletion(todo) {
      todo.completed = !todo.completed;
      const todoTextElement = document.querySelector('.todo-item[data-index="' + this.todos.indexOf(todo) + '"] .todo-text');
      if (todo.completed) {
        todoTextElement.classList.add('completed');
      } else {
        todoTextElement.classList.remove('completed');
      }
    },
    showTodos() {
      this.isTodosVisible = true;
      this.isPostsVisible = false;
    },
    showPosts() {
      this.isTodosVisible = false;
      this.isPostsVisible = true;
    },
    fetchUsers() {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => {
          this.users = data;
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    },
    fetchUserPosts() {
      fetch(`https://jsonplaceholder.typicode.com/posts?userId=${this.selectedUser}`)
        .then(response => response.json())
        .then(data => {
          this.userPosts = data;
          const selectedUser = this.users.find(user => user.id === parseInt(this.selectedUser));
          if (selectedUser) {
            this.selectedUserName = selectedUser.name;
          }
        })
        .catch(error => {
          console.error('Error fetching user posts:', error);
        });
    }
  }
};
</script>

<style>
/* Gaya CSS yang sama seperti sebelumnya */

header {
  background-color: #ffa9a9;
  padding: 10px 0;
}

nav ul {
  list-style-type: decimal;
  padding: 5px 10px;
}

nav ul li {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
  color: #000000;
  font-weight: bold;
  font-size: 18px; /* ukuran teks */
  transition: color 0.3s; /* efek transisi warna */
}

nav ul li:hover {
  text-decoration: underline;
}

button {
  padding: 8px 15px;
  background-color: #f16363;
  color: #000000;
  border: 5px;
  cursor: pointer;
}
</style>


