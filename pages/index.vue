<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const countdown = ref({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
});

const arrivalDate = new Date('2024-02-15T12:00:00'); // Remplacez cette date par la date réelle d'arrivée

const updateCountdown = () => {
    const now = new Date();
    const difference = arrivalDate - now;

    countdown.value.days = Math.floor(difference / (1000 * 60 * 60 * 24));
    countdown.value.hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    countdown.value.minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    countdown.value.seconds = Math.floor((difference % (1000 * 60)) / 1000);
};

let countdownInterval;

onMounted(() => {
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
});

onBeforeUnmount(() => {
    clearInterval(countdownInterval);
});
</script>

<template>
    <Header/>
    <section class="Hero text-white">
        <div>
            <p>Salutations, Terrien. Je suis Zarnak, de la planète Xylor. Nous arrivons bientôt sur Terre pour établir un contact pacifique.</p>
        </div>
    </section>
    <section class="text-white text-center my-10">
        <h2>Time befor we arrive to earth </h2>
        <div class=" flex  text-center justify-center my-10 gap-20">
            <h3>Days: {{ countdown.days }}</h3>
            <h3>Hours: {{ countdown.hours }}</h3>
            <h3>Minutes: {{ countdown.minutes }}</h3>
            <h3>Seconds: {{ countdown.seconds }}</h3>
        </div>
    </section>
</template>

<style  scoped>
.Hero{
    background-image: url('/img/Spance_Aliens.webp');
    /* pas répété */
    background-size: cover;
    background-position: center;

    
    width: 100%;
    height: 650px;
}
</style>