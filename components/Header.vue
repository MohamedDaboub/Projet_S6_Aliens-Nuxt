<template>
    <header class="gradient-marron-f text-white sticky top-0">
        <a href="#content" class="sr-only focus:not-sr-only text-lg text-text"> Passez au contenu </a>
        <nav class=" lg:flex lg:justify-between items-center">
            <div class="flex justify-between items-center">
                <RouterLink to="/"><img src="./assets/icon_svg/logo-site.svg" class="w-32 p-4" alt="Logo du site"></RouterLink>
                <span class="text-3xl cursor-pointer lg:hidden block w-8 h-8 mx-4  ">
                    <MenuIcon class=" text-text"  aria-controls="menu"
                    :aria-expanded="menuOuvert"
                    @click="menuOuvert = !menuOuvert">
                    </MenuIcon>
                    <span class="sr-only ">Menu</span>
                </span>
            </div>
        </nav>
        <!-- <h1>Header</h1>
        <nav >
            <ul class="">
                <li class="">
                    <nuxt-link to="/" class="lien">Home</nuxt-link>
                </li>
                <li>
                    <router-link to="/aliens">Aliens</router-link>
                </li>
                <li>
                    <router-link to="/aliens">Aliens</router-link>
                </li>
                <li>
                    <router-link to="/aliens">Aliens</router-link>
                </li>
            </ul>
        </nav> -->
        <!-- fait moi mon header de type logo a gauche menu a droite -->

    </header>
    <!-- <router-link to="/aliens">ssssss</router-link> -->
</template>

<script setup>
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
    background-image: url('/img/Spance_Header.webp');
    background-size: cover;
    background-position: center;
    z-index: -10;
}
</style>