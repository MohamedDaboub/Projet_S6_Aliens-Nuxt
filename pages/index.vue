<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const countdown = ref({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
});

const arrivalDate = new Date('2024-02-20T12:00:00'); // Remplacez cette date par la date réelle d'arrivée

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


const hexText = ref("4772656574696e67732c2045617274686d616e2e205765206172652058796c6f72652e20576520636f6d6520696e20706561636520616e642077652077616e7420746f206275792074686973206c616e643a203237b020303020532c203133b020303020452e20456e666f7274756e6174656c792c2077652068617665206c6f7374206f757220706c616e65742058796c6f7220616e6420776520617265206f66666572696e672061206d696c6c696f6e205869786f20666f722069742e");
const translatedText = ref(null);
const isTranslated = ref(false);
const isLinkEnabled = ref(false);

const translateText = () => {
  if (!isTranslated.value) {
    translatedText.value = translateHex(hexText.value);
    isTranslated.value = true;
    localStorage.setItem('isTranslated', 'true');
    isLinkEnabled.value = true; // Activer le lien une fois que la traduction est terminée
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
  const translationStatus = localStorage.getItem('isTranslated');
  if (translationStatus === 'true') {
    isTranslated.value = true;
    translatedText.value = translateHex(hexText.value);
    isLinkEnabled.value = true; // Activer le lien si la traduction est déjà faite sur une page précédente
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
              <li class="my-5">
              <span v-if="isTranslated">
                  <router-link to="/" class="my-3 text-white   focus:ring-4 focus:ring-primary-300 font-bold rounded-lg text-base px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none">{{ isTranslated ? translateHex('486f6d65') : '486f6d65' }}</router-link>
              </span>
              <span v-else class=" my-3 text-white   focus:ring-4 focus:ring-primary-300 font-bold rounded-lg text-base px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none">{{ isTranslated ? translateHex('486f6d65') : '486f6d65' }}</span>
            </li>
            <li class="my-5">
              <span v-if="isTranslated">
                  <router-link to="/aliens" class=" my-3 text-white   focus:ring-4 focus:ring-primary-300 font-bold rounded-lg text-base px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none">{{ isTranslated ? translateHex('416c69656e73') : '416c69656e73' }}</router-link>
              </span>
              <span v-else class=" my-3 text-white   focus:ring-4 focus:ring-primary-300 font-bold rounded-lg text-base px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none">{{ isTranslated ? translateHex('416c69656e73') : '416c69656e73' }}</span>
            </li>
            <li class="my-5">
              <span v-if="isTranslated">
                  <router-link to="/Contact" class=" my-3 text-white   focus:ring-4 focus:ring-primary-300 font-bold rounded-lg text-base px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none">{{ isTranslated ? translateHex('436F6E74616374') : '436F6E74616374' }}</router-link>
              </span>
              <span v-else class=" my-3 text-white   focus:ring-4 focus:ring-primary-300 font-bold rounded-lg text-base px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none">{{ isTranslated ? translateHex('436F6E74616374') : '436F6E74616374' }}</span>
            </li>
            </ul>
          </nav>
          <div class="flex md:hidden items-center lg:order-2">
            <i v-directive:click-outside="closeMobileMenu" data-collapse-toggle="mobile-menu" type="button" class="" aria-controls="mobile-menu" aria-expanded="false" @click="toggleMobileMenu">
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
              <span v-if="isTranslated">
                  <router-link to="/" class="text-xs my-3 nav-link">{{ isTranslated ? translateHex('486f6d65') : '486f6d65' }}</router-link>
              </span>
              <span v-else class="text-xs my-3 nav-link">{{ isTranslated ? translateHex('486f6d65') : '486f6d65' }}</span>
            </li>
            <li class="my-5">
              <span v-if="isTranslated">
                  <router-link to="/aliens" class="text-xs my-3 nav-link">{{ isTranslated ? translateHex('416c69656e73') : '416c69656e73' }}</router-link>
              </span>
              <span v-else class="text-xs my-3 nav-link">{{ isTranslated ? translateHex('416c69656e73') : '416c69656e73' }}</span>
            </li>
            <li class="my-5">
              <span v-if="isTranslated">
                  <router-link to="/Contact" class="text-xs my-3 nav-link">{{ isTranslated ? translateHex('436F6E74616374') : '436F6E74616374' }}</router-link>
              </span>
              <span v-else class="text-xs my-3 nav-link">{{ isTranslated ? translateHex('436F6E74616374') : '436F6E74616374' }}</span>
            </li>
          </ul>
        </nav>
      </header>
    </div>
    <Backtop />
    <section class="Hero text-white  text-center justify-center   ">
      <div class="md:max-w-3xl max-w-5xl pt-6 md:pt-32 lg:pt-42 m-auto pb-2 ">
        <h1 :class="{ 'hex-Titre': !isTranslated } " class="md:text-lg text-base py-2 mx-1 font-bold">{{ isTranslated ? translatedText : hexText }}</h1>
        <h3 :class="{ 'hex-Titre': !isTranslated } " class="md:text-lg text-base py-2 mx-1 font-bold">{{ isTranslated ? translateHex('57652072652064657370657261746520616e6420646f6e27742068617665206d7563682074696d652e20496620796f7520646f6e277420726573706f6e6420717569636b6c792c20776527726c6c20676f20746f207761722e') : '57652072652064657370657261746520616e6420646f6e27742068617665206d7563682074696d652e20496620796f7520646f6e277420726573706f6e6420717569636b6c792c20776527726c6c20676f20746f207761722e' }}</h3>
      </div>
      <div>
        <button :class="{ 'hex-text': !isTranslated } " @click="translateText" v-show="!isTranslated" class="text-xs my-3">5472616475697265206c65207465787465</button>
        <button v-show="isTranslated" class="text-xs my-3 font-bold">
          <a href="#PlanetXylor">
            {{ isTranslated ? translateHex('506c616e65742058796c6f72') : '506c616e65742058796c6f72' }}
          </a>
        </button>
        
      </div>
    </section>
    <section class="text-white text-center my-10 ">
      <h2 :class="{ 'hex-Titre': !isTranslated } " class="lg:text-2xl text-lg md:font-bold">{{ isTranslated ? translateHex('54696d65206265666f722077652061727269766520746f204561727468') : '54696d65206265666f722077652061727269766520746f204561727468' }}</h2>
      <div class="grid grid-cols-2 lg:grid-cols-4 text-center justify-center my-10 max-w-4xl m-auto">
        <div>
          <h3 :class="{ 'hex-Titre': !isTranslated } " class="lg:text-2xl text-lg my-2 md:font-bold">{{ isTranslated ? translateHex('44617973') : '44617973' }}</h3>
          <span class="lg:text-3xl text-base">{{ countdown.days }}</span>
        </div>
        <div>
          <h3 :class="{ 'hex-Titre': !isTranslated } " class="lg:text-2xl text-lg my-2 md:font-bold">{{ isTranslated ? translateHex('486f757273') : '486f757273' }}</h3>
          <span class="lg:text-3xl text-base">{{ countdown.hours }}</span>
        </div>
        <div>
          <h3 :class="{ 'hex-Titre': !isTranslated } " class="lg:text-2xl text-lg my-2 md:font-bold">{{ isTranslated ? translateHex('4d696e75746573') : '4d696e75746573' }}</h3>
          <span class="lg:text-3xl text-base">{{ countdown.minutes }}</span>
        </div>
        <div>
          <h3 :class="{ 'hex-Titre': !isTranslated } " class="lg:text-2xl text-lg my-2 md:font-bold">{{ isTranslated ? translateHex('5365636f6e6473') : '5365636f6e6473' }}</h3>
          <span class="lg:text-3xl text-base">{{ countdown.seconds }}</span>
        </div>
      </div>
    </section>
    <section class="p-10" id="PlanetXylor">
      <h2 :class="{ 'hex-Titre': !isTranslated } " class="lg:text-2xl text-lg md:font-bold text-white text-center my-10">{{ isTranslated ? translateHex('4f757220506c616e65742058796c6f72') : '4f757220506c616e65742058796c6f72' }}</h2>
      <div class="grid lg:grid-cols-2 grid-cols-1">
        <div class=" lg:pt-2">
          <p :class="{ 'hex-text': !isTranslated } " class="my-6 mr-4">{{ isTranslated ? translateHex('58796c6f722c206f6e63652061207468726976696e6720776f726c64206272696d6d696e672077697468206c69666520616e6420776f6e6465722c206e6f77207374616e6473206f6e20746865206272696e6b206f66206578696e6374696f6e2e204d696c6c656e6e69612061676f2c206f757220706c616e657420736572766564206173206120626561636f6e206f66206861726d6f6e792c207769746820697473206c757368206c616e6473636170657320616e642076696272616e742065636f73797374656d73206e7572747572696e67206120636976696c697a6174696f6e207468617420666c6f7572697368656420696e20706561636520616e642070726f737065726974792e20486f77657665722c20747261676564792073747275636b207768656e2063617461636c7973696d6963206576656e74732072617661676564206f75722062656c6f76656420686f6d652c206c656176696e67206974207363617272656420616e64206465736f6c6174652e') : '58796c6f722c206f6e63652061207468726976696e6720776f726c64206272696d6d696e672077697468206c69666520616e6420776f6e6465722c206e6f77207374616e6473206f6e20746865206272696e6b206f66206578696e6374696f6e2e204d696c6c656e6e69612061676f2c206f757220706c616e657420736572766564206173206120626561636f6e206f66206861726d6f6e792c207769746820697473206c757368206c616e6473636170657320616e642076696272616e742065636f73797374656d73206e7572747572696e67206120636976696c697a6174696f6e207468617420666c6f7572697368656420696e20706561636520616e642070726f737065726974792e20486f77657665722c20747261676564792073747275636b207768656e2063617461636c7973696d6963206576656e74732072617661676564206f75722062656c6f76656420686f6d652c206c656176696e67206974207363617272656420616e64206465736f6c6174652e' }}</p>
          <p :class="{ 'hex-text': !isTranslated } " class="my-6 mr-4">{{ isTranslated ? translateHex('596f757220617373697374616e636520697320706172616d6f756e7420746f206f757220737572766976616c2e20427920616e73776572696e67206f75722063616c6c2c20796f752063616e2068656c7020736563757265206120627269676874657220746f6d6f72726f7720666f7220626f7468206f757220737065636965732e20546f6765746865722c206c657420757320656d6261726b206f6e2061206a6f75726e6579206f6620636f6f7065726174696f6e20616e64206d757475616c2062656e656669742c20656e737572696e672074686520707265736572766174696f6e206f66206c69666520616e642074686520616476616e63656d656e74206f66206f7572207368617265642064657374696e6965732e') : '596f757220617373697374616e636520697320706172616d6f756e7420746f206f757220737572766976616c2e20427920616e73776572696e67206f75722063616c6c2c20796f752063616e2068656c7020736563757265206120627269676874657220746f6d6f72726f7720666f7220626f7468206f757220737065636965732e20546f6765746865722c206c657420757320656d6261726b206f6e2061206a6f75726e6579206f6620636f6f7065726174696f6e20616e64206d757475616c2062656e656669742c20656e737572696e672074686520707265736572766174696f6e206f66206c69666520616e642074686520616476616e63656d656e74206f66206f7572207368617265642064657374696e6965732e' }}</p>
          <span href=""  class="btn" type="button">
            <strong class="font-bold" :class="{ 'hex-text': !isTranslated } " >
              <span v-if="isTranslated">
              <router-link to="/aliens" >
              {{ isTranslated ? translateHex('4578706c6f7265204d6f7265') : '4578706c6f7265204d6f7265' }}
              </router-link>
              </span>
              <span v-else class=" ">{{ isTranslated ? translateHex('4578706c6f7265204d6f7265') : '4578706c6f7265204d6f7265' }}</span>
            </strong>
            <div id="container-stars">
              <div id="stars"></div>
            </div>
            
            <div id="glow">
              <div class="circle"></div>
              <div class="circle"></div>
            </div>
          </span>
        </div>
        <div>
          <PlanetCanvas />      
        </div>
      </div>
    </section>
    <section class="p-5 pb-10" >
      <h2 :class="{ 'hex-Titre': !isTranslated } " class="lg:text-2xl text-lg md:font-bold text-white text-center my-10">{{ isTranslated ? translateHex('5468652058796c6f72652055464f') : '5468652058796c6f72652055464f' }}</h2>
      <div class="grid lg:grid-cols-2 grid-cols-1 gap-10">
        <div>
          <OvniCanvas />      
        </div>
        <div class=" lg:pt-2">
          <p :class="{ 'hex-text': !isTranslated } " class="my-6 mr-4">{{ isTranslated ? translateHex('5468652058796c6f72652055464f2c20616c736f206b6e6f776e20617320746865202258796c6f736869702c222069732061206d617276656c206f66206578747261746572726573747269616c20656e67696e656572696e672c20626f617374696e67206120736c65656b2c206d6574616c6c6963206578746572696f722061646f726e6564207769746820696e7472696361746520676c79680a616e642073796d626f6c7320746861742068696e742061742069747320636f736d6963206f726967696e732e20576974682069747320736d6f6f74682c207361756365722d7368617065642064657369676e20616e64207368696d6d6572696e67206c696768747320746861742064616e6365206163726f73732069747320737572766163652e') : '5468652058796c6f72652055464f2c20616c736f206b6e6f776e20617320746865202258796c6f736869702c222069732061206d617276656c206f66206578747261746572726573747269616c20656e67696e656572696e672c20626f617374696e67206120736c65656b2c206d6574616c6c6963206578746572696f722061646f726e6564207769746820696e7472696361746520676c79680a616e642073796d626f6c7320746861742068696e742061742069747320636f736d6963206f726967696e732e20576974682069747320736d6f6f74682c207361756365722d7368617065642064657369676e20616e64207368696d6d6572696e67206c696768747320746861742064616e6365206163726f73732069747320737572766163652e' }}</p>
          <p :class="{ 'hex-text': !isTranslated } " class="my-6 mr-4">{{ isTranslated ? translateHex('596f757220617373697374616e636520697320706172616d6f756e7420746f206f757220737572766976616c2e20427920616e73776572696e67206f75722063616c6c2c20796f752063616e2068656c7020736563757265206120627269676874657220746f6d6f72726f7720666f7220626f7468206f757220737065636965732e20546f6765746865722c206c657420757320656d6261726b206f6e2061206a6f75726e6579206f6620636f6f7065726174696f6e20616e64206d757475616c2062656e656669742c20656e737572696e672074686520707265736572766174696f6e206f66206c69666520616e642074686520616476616e63656d656e74206f66206f7572207368617265642064657374696e6965732e') : '596f757220617373697374616e636520697320706172616d6f756e7420746f206f757220737572766976616c2e20427920616e73776572696e67206f75722063616c6c2c20796f752063616e2068656c7020736563757265206120627269676874657220746f6d6f72726f7720666f7220626f7468206f757220737065636965732e20546f6765746865722c206c657420757320656d6261726b206f6e2061206a6f75726e6579206f6620636f6f7065726174696f6e20616e64206d757475616c2062656e656669742c20656e737572696e672074686520707265736572766174696f6e206f66206c69666520616e642074686520616476616e63656d656e74206f66206f7572207368617265642064657374696e6965732e' }}</p>
        </div>
      </div>
    </section>

</template>

<style  scoped>
template {
  scroll-behavior: smooth;
}
.hex-text {
  white-space: pre-line;
  word-break: break-all;
  font-size: 14px;
}
.hex-Titre {
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
.hex-Titre {
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

  background-size: 300% 300%;
  backdrop-filter: blur(1rem);
  border-radius: 5rem;
  transition: 0.5s;
  animation: gradient_301 5s ease infinite;
  border: double 4px transparent;
  background-image: linear-gradient(#212121, #212121),  linear-gradient(137.48deg, #A7347A 10%,#1043F8 45%, #A7347A 67%, #1043F8 87%);
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
  font-size: 12px;
  letter-spacing: 5px;
  color: #FFFFFF;
  text-shadow: 0 0 4px white;
  padding: 1rem;
}

#glow {
  position: absolute;
  display: flex;
  /* width: 12rem; */
}

.circle {
  width: 100%;
  /* height: 30px; */
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