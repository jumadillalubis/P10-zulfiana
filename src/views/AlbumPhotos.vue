<template>
  <div class="container">
    <h2>Foto dari Album {{ albumId }}</h2>
    <ul>
      <li v-for="foto in fotos" :key="foto.id">
        <img :src="foto.thumbnailUrl" @click="tampilkanFoto(foto.url)" alt="Foto thumbnail">
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const albumId = route.params.id;
    const fotos = ref([]);

    const ambilFotos = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
        fotos.value = await response.json();
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };

    const tampilkanFoto = (url) => {
      window.open(url, '_blank');
    };

    onMounted(ambilFotos);

    return {
      albumId,
      fotos,
      tampilkanFoto,
    };
  },
};
</script>

<style>
/* Tambahkan gaya CSS Anda di sini */
</style>
