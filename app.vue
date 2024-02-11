<template>
  <div>
    <!-- Overlay avec le GIF de chargement -->
    <div v-if="isLoading" class="loading-overlay">
      <img src="/img/Space_Loading.gif" alt="Loading..." />
    </div>
    
    <!-- Contenu principal de la page -->
    <div v-if="!isLoading">
      <NuxtPage/>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isLoading = ref(true);

onMounted(() => {
  if (process.client) {
    const hasLoadingBeenShown = localStorage.getItem('hasLoadingBeenShown');
    if (!hasLoadingBeenShown) {
      setTimeout(() => {
        isLoading.value = false;
        localStorage.setItem('hasLoadingBeenShown', 'true');
      }, 2000);
    } else {
      isLoading.value = false;
    }
  } else {
    isLoading.value = false;
  }
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap');

body {
  font-family: 'Orbitron', sans-serif;
  position: relative;
  background-color: #070B1E;
  color: #fff;
  scroll-behavior: smooth;
}

body::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: url('img/Space_Background.webp'); 
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; 
  opacity: 0.15; 
  z-index: -100; 
}
.loading-overlay img {
  width: 100%;
  height: 100dvh;
}
</style>
