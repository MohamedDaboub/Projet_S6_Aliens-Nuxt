<template>
<div class=" sticky top-0 z-10">
      <header class=" gradient-marron-f  ">
        <div class="flex flex-wrap justify-between items-center p-2">
          <RouterLink to="/" class="flex items-center">
            <img src='/img/Space_Logo.svg' class=" w-20 p-2" alt="Logo du site">
          </RouterLink>
          <nav class="hidden md:flex items-center">
            <ul class="flex space-x-2">
              <li class="my-5">
                  <router-link to="/" class="my-3 text-white   focus:ring-4 focus:ring-primary-300 font-bold rounded-lg text-base px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none">Home</router-link>

            </li>
            <li class="my-5">
                  <router-link to="/aliens" class=" my-3 text-white   focus:ring-4 focus:ring-primary-300 font-bold rounded-lg text-base px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none">Aliens</router-link>

            </li>
            <li class="my-5">
                  <router-link to="/Contact" class=" my-3 text-white   focus:ring-4 focus:ring-primary-300 font-bold rounded-lg text-base px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none">Contact</router-link>
            </li>
            </ul>
          </nav>
          <div class="flex md:hidden items-center lg:order-2">
            <i
              v-directive:click-outside="closeMobileMenu"
              data-collapse-toggle="mobile-menu"
              type="button"
              class=""
              aria-controls="mobile-menu"
              aria-expanded="false"
              @click="toggleMobileMenu"
            >
              <span class="sr-only">Open main menu</span>
              <svg class="w-6 h-6" fill="#fff" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
              </svg>
              <svg v-if="menuOuvert" class="hidden w-6 h-6" fill="#fff" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
            </i>
          </div>
        </div>
        <nav v-if="menuOuvert" class="md:hidden   w-full h-full border-gray-200 px-4 py-2.5 transition-transform transform  ">
          <ul class="flex flex-col mt-4 z-10 font-medium justify-center text-white text-center my-10 ">
            <li class="my-5">
                  <router-link to="/" class="text-xs my-3 nav-link">Home</router-link>
             </li>
            <li class="my-5">
                  <router-link to="/aliens" class="text-xs my-3 nav-link">Aliens</router-link>
            </li>
            <li class="my-5">
                  <router-link to="/Contact" class="text-xs my-3 nav-link">Contact</router-link>
           </li>
          </ul>
        </nav>
      </header>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const menuOuvert = ref(false);

const toggleMobileMenu = () => {
  menuOuvert.value = !menuOuvert.value;
};

const closeMobileMenu = () => {
  menuOuvert.value = false;
};
</script>

<style scoped>
.gradient-marron-f {
    background: linear-gradient(to bottom, #000 7.6%, #09195a 100%);
    position: relative;
    z-index: 0;
    border-bottom: #070B1E 2px solid;
}
.gradient-marron-f::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.2;
    background-image: url('/img/Space_Header.webp');
    background-size: cover;
    background-position: center;
    z-index: -10;
}
</style>