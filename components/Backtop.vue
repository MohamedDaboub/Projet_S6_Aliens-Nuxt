<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const scrollY = ref(0);

const handleScroll = () => {
  scrollY.value = window.scrollY;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

const showButton = ref(false);

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

watch(scrollY, (newScrollY) => {
  showButton.value = newScrollY > 100; // Afficher le bouton lorsque le défilement dépasse 100 pixels
});
</script>

<template>
    <div class="back-to-top" @click="scrollToTop" v-if="showButton">
        <svg
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  class="w-6 h-6 relative"
  preserveAspectRatio="none"
>
  <path
    d="M12.4287 8.82861L21.6859 16.5429"
    stroke="white"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  ></path>
  <path
    d="M12.4287 8.82861L3.17163 16.5429"
    stroke="white"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  ></path>
</svg>
    </div>
  </template>

<style scoped>
.back-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
  background-color: #0E2373;
  padding: 10px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
}

.back-to-top:hover {
  background-color: #1E2373;
}

.back-to-top svg {
  fill: #fff;
}
</style>