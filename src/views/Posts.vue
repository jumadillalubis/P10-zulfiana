<!-- src/views/Posts.vue -->
<template>
  <div class="container">
    <h4>Posts 📤</h4>
    <div v-if="selectedUser" class="user-posts">
      <h3>Posts by {{ selectedUserName }}</h3>
      <ul>
        <li v-for="post in userPosts" :key="post.id" class="post-item">
          <h4>{{ post.title }}</h4>
          <p>{{ post.body }}</p>
        </li>
      </ul>
    </div>
    <div class="select-user">
      <select v-model="selectedUser" @change="fetchUserPosts">
        <option value="">Select User</option>
        <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
      </select>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const users = ref([]);
    const selectedUser = ref('');
    const userPosts = ref([]);
    const selectedUserName = ref('');

    onMounted(() => {
      fetchUsers();
    });

    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        users.value = response.data;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    const fetchUserPosts = async () => {
      if (selectedUser.value) {
        try {
          const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${selectedUser.value}`);
          userPosts.value = response.data;
          const user = users.value.find(user => user.id === parseInt(selectedUser.value));
          if (user) {
            selectedUserName.value = user.name;
          }
        } catch (error) {
          console.error('Error fetching user posts:', error);
        }
      } else {
        userPosts.value = [];
        selectedUserName.value = '';
      }
    };

    return {
      users,
      selectedUser,
      userPosts,
      selectedUserName,
      fetchUserPosts,
    };
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
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

.user-posts {
  margin-bottom: 20px;
}

.user-posts h3 {
  color: #666; /* Medium grey text */
  font-family: 'Arial', sans-serif;
}

ul {
  list-style-type: none;
  padding: 0;
}

.post-item {
  padding: 15px;
  border-bottom: 1px solid #dcdcdc; /* Light grey border */
}

.post-item h4 {
  margin: 0;
  color: #333; /* Dark grey text */
  font-family: 'Arial', sans-serif;
}

.post-item p {
  margin: 10px 0 0;
  color: #666; /* Medium grey text */
  font-family: 'Arial', sans-serif;
}

.select-user {
  display: flex;
  justify-content: center;
}

select {
  padding: 10px;
  border: 1px solid #dcdcdc; /* Light grey border */
  border-radius: 5px;
  font-family: 'Arial', sans-serif;
  background-color: #fff; /* White background */
}

select:focus {
  outline: none;
  border-color: #a0a0a0; /* Darker grey on focus */
}
</style>
