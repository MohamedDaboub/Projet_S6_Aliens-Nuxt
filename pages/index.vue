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

    <div class=" sticky top-0 z-10">
      <header class=" gradient-marron-f  ">
        <div class="flex flex-wrap justify-between items-center p-2">
          <RouterLink to="/" class="flex items-center">
            <img src='/img/Space_Logo.svg' class=" w-20 p-2" alt="Logo du site">
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
          <ul class="flex flex-col mt-4 z-10 font-medium justify-center text-white text-center my-10 bg-dark-blue">
            <li class="my-5">
              <router-link to="/aliens" class="nav-link">{{ isTranslated ? translateHex('486f6d65') : '486f6d65' }}</router-link>
            </li>
            <li class="my-5">
              <router-link to="/aliens" class="nav-link">{{ isTranslated ? translateHex('416c69656e73') : '416c69656e73' }}</router-link>
            </li>
            <li class="my-5">
              <router-link to="/aliens" class="nav-link">{{ isTranslated ? translateHex('416c69656e73') : '416c69656e73' }}</router-link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
    <Backtop />
    <section class="Hero text-white  text-center justify-center   ">
      <div class="md:max-w-3xl max-w-5xl pt-10 md:pt-32 lg:pt-52 m-auto pb-2 ">
        <h1 :class="{ 'hex-text': !isTranslated } " class="md:text-lg text-base py-2 mx-1 font-bold">{{ isTranslated ? translatedText : hexText }}</h1>
        <h3 :class="{ 'hex-text': !isTranslated } " class="md:text-lg text-base py-2 mx-1 font-bold">{{ isTranslated ? translateHex('576520636f6d6520696e2070656163652c2062757420796f7572207072657061726174696f6e20697320657373656e7469616c2e204372756369616c20696e666f726d6174696f6e2077696c6c20666f6c6c6f772e205072657061726520666f72206f7572206d656574696e67') : '576520636f6d6520696e2070656163652c2062757420796f7572207072657061726174696f6e20697320657373656e7469616c2e204372756369616c20696e666f726d6174696f6e2077696c6c20666f6c6c6f772e205072657061726520666f72206f7572206d656574696e67' }}</h3>
      </div>
      <div>
        <button :class="{ 'hex-text': !isTranslated } " @click="translateText" v-show="!isTranslated" class="text-xs my-3">5472616475697265206c65207465787465</button>
        <button v-show="isTranslated" class="text-xs my-3 font-bold">Savoir Dz</button>
      </div>
    </section>
    <section class="text-white text-center my-10 ">
      <h2 :class="{ 'hex-text': !isTranslated } " class="lg:text-2xl text-lg md:font-bold">{{ isTranslated ? translateHex('54696d65206265666f722077652061727269766520746f204561727468') : '54696d65206265666f722077652061727269766520746f204561727468' }}</h2>
      <div class="grid grid-cols-2 lg:grid-cols-4 text-center justify-center my-10 max-w-4xl m-auto">
        <div>
          <h3 :class="{ 'hex-text': !isTranslated } " class="lg:text-2xl text-lg my-2 md:font-bold">{{ isTranslated ? translateHex('44617973') : '44617973' }}</h3>
          <span class="lg:text-3xl text-base">{{ countdown.days }}</span>
        </div>
        <div>
          <h3 :class="{ 'hex-text': !isTranslated } " class="lg:text-2xl text-lg my-2 md:font-bold">{{ isTranslated ? translateHex('486f757273') : '486f757273' }}</h3>
          <span class="lg:text-3xl text-base">{{ countdown.hours }}</span>
        </div>
        <div>
          <h3 :class="{ 'hex-text': !isTranslated } " class="lg:text-2xl text-lg my-2 md:font-bold">{{ isTranslated ? translateHex('4d696e75746573') : '4d696e75746573' }}</h3>
          <span class="lg:text-3xl text-base">{{ countdown.minutes }}</span>
        </div>
        <div>
          <h3 :class="{ 'hex-text': !isTranslated } " class="lg:text-2xl text-lg my-2 md:font-bold">{{ isTranslated ? translateHex('5365636f6e6473') : '5365636f6e6473' }}</h3>
          <span class="lg:text-3xl text-base">{{ countdown.seconds }}</span>
        </div>
      </div>
    </section>
    <section class="grid grid-cols-2">
      <div>
        <PlanetCanvas />      
      </div>
      <div>
        <h2 :class="{ 'hex-text': !isTranslated } " class="lg:text-2xl text-lg md:font-bold text-white text-center my-10">{{ isTranslated ? translateHex('5468652070726f6a6563746564206c616e64696e67206f662074686520736869707d') : '5468652070726f6a6563746564206c616e64696e67206f662074686520736869707d' }}</h2>
        <router-link to="/aliens"  class="btn" type="button">
          <strong class="font-bold">see more  </strong>
          <div id="container-stars">
            <div id="stars"></div>
          </div>

          <div id="glow">
            <div class="circle"></div>
            <div class="circle"></div>
          </div>
        </router-link>
      </div>
    </section>

</template>

<style  scoped>
.hex-text {
  white-space: pre-line;
  word-break: break-all;
}
/* mobile */
@media (max-width: 767px) {
  .hex-text {
  white-space: pre-line;
  word-break: break-all;
  font-size: 10px;
}
}
.Hero{
    background-image: url('/img/Space_Aliens.webp');
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 86dvh;
}
@media (max-width: 767px) {
    .Hero {
        height: auto;
        height: 45dvh;
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
  padding: 1rem;
  line-height: 2em;
  text-align: center;
  background: linear-gradient(45deg, #1043F8, #A7347A);
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
  /* background: linear-gradient(0deg, #1043F8, #A7347A); */
  background-size: 400%;
  border-radius: 35px;
  transition: 1s;
}

button:hover::before {
  filter: blur(20px);
}

button:active {
  background: linear-gradient(0deg, #1043F8, #A7347A);
  /* background: linear-gradient(32deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4); */
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

/* ----------------------------------------------------- */
.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 13rem;
  overflow: hidden;
  height: 3rem;
  background-size: 300% 300%;
  backdrop-filter: blur(1rem);
  border-radius: 5rem;
  transition: 0.5s;
  animation: gradient_301 5s ease infinite;
  border: double 4px transparent;
  background-image: linear-gradient(#212121, #212121),  linear-gradient(137.48deg, #ffdb3b 10%,#FE53BB 45%, #8F51EA 67%, #0044ff 87%);
  background-origin: border-box;
  background-clip: content-box, border-box;
}

#container-stars {
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  overflow: hidden;
  transition: 0.5s;
  backdrop-filter: blur(1rem);
  border-radius: 5rem;
}

strong {
  z-index: 2;
  font-family: 'Avalors Personal Use';
  font-size: 12px;
  letter-spacing: 5px;
  color: #FFFFFF;
  text-shadow: 0 0 4px white;
}

#glow {
  position: absolute;
  display: flex;
  width: 12rem;
}

.circle {
  width: 100%;
  height: 30px;
  filter: blur(2rem);
  animation: pulse_3011 4s infinite;
  z-index: -1;
}

.circle:nth-of-type(1) {
  background: rgba(254, 83, 186, 0.636);
}

.circle:nth-of-type(2) {
  background: rgba(142, 81, 234, 0.704);
}

.btn:hover #container-stars {
  z-index: 1;
  background-color: #212121;
}

.btn:hover {
  transform: scale(1.1)
}

.btn:active {
  border: double 4px #FE53BB;
  background-origin: border-box;
  background-clip: content-box, border-box;
  animation: none;
}

.btn:active .circle {
  background: #FE53BB;
}

#stars {
  position: relative;
  background: transparent;
  width: 200rem;
  height: 200rem;
}

#stars::after {
  content: "";
  position: absolute;
  top: -10rem;
  left: -100rem;
  width: 100%;
  height: 100%;
  animation: animStarRotate 90s linear infinite;
}

#stars::after {
  background-image: radial-gradient(#ffffff 1px, transparent 1%);
  background-size: 50px 50px;
}

#stars::before {
  content: "";
  position: absolute;
  top: 0;
  left: -50%;
  width: 170%;
  height: 500%;
  animation: animStar 60s linear infinite;
}

#stars::before {
  background-image: radial-gradient(#ffffff 1px, transparent 1%);
  background-size: 50px 50px;
  opacity: 0.5;
}

@keyframes animStar {
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(-135rem);
  }
}

@keyframes animStarRotate {
  from {
    transform: rotate(360deg);
  }

  to {
    transform: rotate(0);
  }
}

@keyframes gradient_301 {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

@keyframes pulse_3011 {
  0% {
    transform: scale(0.75);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
  }

  100% {
    transform: scale(0.75);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
}
</style>