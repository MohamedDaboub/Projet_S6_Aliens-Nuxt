<template>
    <header class="gradient-marron-f text-white">
        <h1>Header</h1>
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
        </nav>
    </header>
    <router-link to="/aliens">ssssss</router-link>
</template>

<script setup>
</script>

<style scoped>
.gradient-marron-f {
    background: linear-gradient(to bottom, #000 7.6%, #09195a 100%);
    position: relative;
    z-index: 0;
}
.gradient-marron-f::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.3;
    background-image: url('/img/Spance_Header.webp');
    background-size: cover;
    background-position: center;
    z-index: -10;
}
</style>