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
    <Backtop/>
    <section class="Hero text-white">
        <div>
            <p>Salutations, Terrien. Je suis Zarnak, de la planète Xylor. Nous arrivons bientôt sur Terre pour établir un contact pacifique.</p>
            <p>Salutations, Terrien. Je suis Zarnak, de la planète Xylor. Nous arrivons bientôt sur Terre pour établir un contact pacifique.</p>
            <p>Salutations, Terrien. Je suis Zarnak, de la planète Xylor. Nous arrivons bientôt sur Terre pour établir un contact pacifique.</p>
            <p>Salutations, Terrien. Je suis Zarnak, de la planète Xylor. Nous arrivons bientôt sur Terre pour établir un contact pacifique.</p>
            <p>Salutations, Terrien. Je suis Zarnak, de la planète Xylor. Nous arrivons bientôt sur Terre pour établir un contact pacifique.</p>
            <p>Salutations, Terrien. Je suis Zarnak, de la planète Xylor. Nous arrivons bientôt sur Terre pour établir un contact pacifique.</p>
        </div>
        <!-- <button class="text-base"> 547261647569726520746f7574206c652073697465</button> -->
    </section>
    <section class="text-white text-center my-10">
        <h2 class="lg:text-3xl text-lg">Time befor we arrive to Earth</h2>
        <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-0 text-center justify-center my-10">
            <div>
                <h3 class="lg:text-3xl text-lg my-2">Days</h3>
                <span class="lg:text-4xl text-base">{{ countdown.days }}</span>
            </div>
            <div>
                <h3 class="lg:text-3xl text-lg my-2">Hours</h3>
                <span class="lg:text-4xl text-base">{{ countdown.hours }}</span>
            </div>
            <div>
                <h3 class="lg:text-3xl text-lg my-2">Minutes</h3>
                <span class="lg:text-4xl text-base">{{ countdown.minutes }}</span>
            </div>
            <div>
                <h3 class="lg:text-3xl text-lg my-2">Seconds</h3>
                <span class="lg:text-4xl text-base">{{ countdown.seconds }}</span>
            </div>
        </div>
    </section>
</template>

<style  scoped>
.Hero{
    background-image: url('/img/Spance_Aliens.webp');
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 86vh;
}
/* Responsive Styles for Mobile Screens */
@media (max-width: 767px) {
    .Hero {
        height: auto;
        height: 100%;
    }
}
button {
  text-decoration: none;
  position: relative;
  border: none;
  font-size: 14px;
  font-family: inherit;
  cursor: pointer;
  color: #fff;
  /* width: 9em; */
  padding: 1rem;
  /* height: 3em; */
  line-height: 2em;
  text-align: center;
  background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
  background-size: 300%;
  border-radius: 30px;
  z-index: 1;
}

button:hover {
  animation: ani 8s linear infinite;
  border: none;
}

@keyframes ani {
  0% {
    background-position: 0%;
  }

  100% {
    background-position: 400%;
  }
}

button:before {
  content: "";
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  z-index: -1;
  background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
  background-size: 400%;
  border-radius: 35px;
  transition: 1s;
}

button:hover::before {
  filter: blur(20px);
}

button:active {
  background: linear-gradient(32deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
}

</style>