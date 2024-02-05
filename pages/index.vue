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


const hexText = ref("4772656574696e67732c2045617274686d616e2e204920616d205a61726e616b2c2066726f6d2074686520706c616e65742058796c6f722e2057652077696c6c20736f6f6e20617272697665206f6e20456172746820746f2065737461626c69736820706561636566756c20636f6e746163742e");
const translatedText = ref(null);
const isTranslated = ref(false);

const translateText = () => {
  if (!isTranslated.value) {
    translatedText.value = translateHex(hexText.value);
    isTranslated.value = true;

    // Enregistrez l'état de traduction dans le localStorage
    localStorage.setItem('isTranslated', 'true');
  }
};

const translateHex = (hex) => {
  let str = '';
  for (let i = 0; i < hex.length; i += 2) {
    const char = String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    str += char;
  }
  return str;
};

onMounted(() => {
  // Vérifiez si la traduction a déjà eu lieu dans cette session
  const translationStatus = localStorage.getItem('isTranslated');
  if (translationStatus === 'true') {
    isTranslated.value = true;
    translatedText.value = translateHex(hexText.value);
  }
});

const menuOuvert = ref(false);

const toggleMobileMenu = () => {
  menuOuvert.value = !menuOuvert.value;
};

const closeMobileMenu = () => {
  menuOuvert.value = false;
};
</script>

<template>
  <div>
    <div class=" sticky top-0">
      <header class="gradient-marron-f ">
        <div class="flex flex-wrap justify-between items-center p-2">
          <RouterLink to="/" class="flex items-center">
            <img src='/img/Logo.png' class=" w-24 p-2" alt="Logo du site">
          </RouterLink>
          <nav class="hidden md:flex items-center">
            <ul class="flex space-x-2">
              <li>
                <router-link to="/" class="text-white   focus:ring-4 focus:ring-primary-300 font-bold rounded-lg text-base px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none" aria-current="page">{{ isTranslated ? translateHex('486f6d65') : '486f6d65' }}</router-link>
              </li>
              <li>
                <router-link to="/aliens" class="text-white   focus:ring-4 focus:ring-primary-300 font-bold rounded-lg text-base px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none">{{ isTranslated ? translateHex('416c69656e73') : '416c69656e73' }}</router-link>
              </li>
              <li>
                <router-link to="/aliens" class="text-white   focus:ring-4 focus:ring-primary-300 font-bold rounded-lg text-base px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none">{{ isTranslated ? translateHex('416c69656e73') : '416c69656e73' }}</router-link>
              </li>
              <li>
                <router-link to="/aliens" class="text-white   focus:ring-4 focus:ring-primary-300 font-bold rounded-lg text-base px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none">{{ isTranslated ? translateHex('416c69656e73') : '416c69656e73' }}</router-link>
              </li>
            </ul>
          </nav>
          <div class="flex md:hidden items-center lg:order-2">
            <button
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
            </button>
          </div>
        </div>
        <nav v-if="menuOuvert" class="md:hidden z-10  w-full h-full border-gray-200 px-4 py-2.5 transition-transform transform">
          <ul class="flex flex-col mt-4 font-medium justify-center text-white text-center my-10 bg-dark-blue">
            <li class="my-5">
              <nuxt-link to="/" class="nav-link" aria-current="page">486f6d65</nuxt-link>
            </li>
            <li class="my-5">
              <router-link to="/aliens" class="nav-link">416c69656e73</router-link>
            </li>
            <li class="my-5">
              <router-link to="/aliens" class="nav-link">416c69656e73</router-link>
            </li>
            <li class="my-5">
              <router-link to="/aliens" class="nav-link">416c69656e73</router-link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
    <Backtop />
    <section class="Hero text-white">
      <div>
        <p class="hex-text">{{ isTranslated ? translatedText : hexText }}</p>
      </div>
      <button @click="translateText" v-show="!isTranslated" class="text-base">5472616475697265206c65207465787465</button>
    </section>
    <section class="text-white text-center my-10">
      <h2 class="lg:text-2xl text-lg">{{ isTranslated ? translateHex('54696d65206265666f722077652061727269766520746f204561727468') : '54696d65206265666f722077652061727269766520746f204561727468' }}</h2>
      <div class="grid grid-cols-2 lg:grid-cols-4 text-center justify-center my-10">
        <div>
          <h3 class="lg:text-2xl text-lg my-2">{{ isTranslated ? translateHex('44617973') : '44617973' }}</h3>
          <span class="lg:text-3xl text-base">{{ countdown.days }}</span>
        </div>
        <div>
          <h3 class="lg:text-2xl text-lg my-2">{{ isTranslated ? translateHex('486f757273') : '486f757273' }}</h3>
          <span class="lg:text-3xl text-base">{{ countdown.hours }}</span>
        </div>
        <div>
          <h3 class="lg:text-2xl text-lg my-2">{{ isTranslated ? translateHex('4d696e75746573') : '4d696e75746573' }}</h3>
          <span class="lg:text-3xl text-base">{{ countdown.minutes }}</span>
        </div>
        <div>
          <h3 class="lg:text-2xl text-lg my-2">{{ isTranslated ? translateHex('5365636f6e6473') : '5365636f6e6473' }}</h3>
          <span class="lg:text-3xl text-base">{{ countdown.seconds }}</span>
        </div>
      </div>
    </section>
    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et possimus sequi minima explicabo non officiis aliquam hic quia nesciunt odit, sapiente quisquam necessitatibus id quod repellat, praesentium odio voluptate consequuntur?</p>
    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et possimus sequi minima explicabo non officiis aliquam hic quia nesciunt odit, sapiente quisquam necessitatibus id quod repellat, praesentium odio voluptate consequuntur?</p>
    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et possimus sequi minima explicabo non officiis aliquam hic quia nesciunt odit, sapiente quisquam necessitatibus id quod repellat, praesentium odio voluptate consequuntur?</p>
    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et possimus sequi minima explicabo non officiis aliquam hic quia nesciunt odit, sapiente quisquam necessitatibus id quod repellat, praesentium odio voluptate consequuntur?</p>
    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et possimus sequi minima explicabo non officiis aliquam hic quia nesciunt odit, sapiente quisquam necessitatibus id quod repellat, praesentium odio voluptate consequuntur?</p>
    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et possimus sequi minima explicabo non officiis aliquam hic quia nesciunt odit, sapiente quisquam necessitatibus id quod repellat, praesentium odio voluptate consequuntur?</p>
    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et possimus sequi minima explicabo non officiis aliquam hic quia nesciunt odit, sapiente quisquam necessitatibus id quod repellat, praesentium odio voluptate consequuntur?</p>
    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et possimus sequi minima explicabo non officiis aliquam hic quia nesciunt odit, sapiente quisquam necessitatibus id quod repellat, praesentium odio voluptate consequuntur?</p>
    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et possimus sequi minima explicabo non officiis aliquam hic quia nesciunt odit, sapiente quisquam necessitatibus id quod repellat, praesentium odio voluptate consequuntur?</p>
    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et possimus sequi minima explicabo non officiis aliquam hic quia nesciunt odit, sapiente quisquam necessitatibus id quod repellat, praesentium odio voluptate consequuntur?</p>
    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et possimus sequi minima explicabo non officiis aliquam hic quia nesciunt odit, sapiente quisquam necessitatibus id quod repellat, praesentium odio voluptate consequuntur?</p>
    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et possimus sequi minima explicabo non officiis aliquam hic quia nesciunt odit, sapiente quisquam necessitatibus id quod repellat, praesentium odio voluptate consequuntur?</p>
    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et possimus sequi minima explicabo non officiis aliquam hic quia nesciunt odit, sapiente quisquam necessitatibus id quod repellat, praesentium odio voluptate consequuntur?</p>
    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et possimus sequi minima explicabo non officiis aliquam hic quia nesciunt odit, sapiente quisquam necessitatibus id quod repellat, praesentium odio voluptate consequuntur?</p>
    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et possimus sequi minima explicabo non officiis aliquam hic quia nesciunt odit, sapiente quisquam necessitatibus id quod repellat, praesentium odio voluptate consequuntur?</p>
    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et possimus sequi minima explicabo non officiis aliquam hic quia nesciunt odit, sapiente quisquam necessitatibus id quod repellat, praesentium odio voluptate consequuntur?</p>
  </div>
</template>

<style  scoped>
.hex-text {
  white-space: pre-line;
  word-break: break-all;
}
.Hero{
    background-image: url('/img/Space_Aliens.webp');
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 86vh;
}
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