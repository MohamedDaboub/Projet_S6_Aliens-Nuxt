<script setup>

</script>

<template>
    <Header/>
    <section>
        <h1 class=" text-xl md:text-2xl text-center py-10 font-bold">Our Story: The Saga of the Xylores</h1>
    </section>
    <section>
        <p class="text-base px-6 py-7">Welcome to the captivating saga of the Xylores, a species whose journey traverses the cosmos and spans the annals of time. From the distant reaches of space to the heart of the universe, our story unfolds with tales of triumph, tragedy, and the enduring quest for survival.</p>
        <div class="grid lg:grid-cols-2 grid-cols-1 mx-4 gap-4">
            <div>
                <PlanetCanvas />   
            </div>
            <div class="mx-5 ">
                <p class="py-2  ">
                    <span class="font-bold">Name:</span> 
                    Xylor
                </p>
                <p class="py-2">
                    <span class="font-bold"> Diameter: </span>
                    Approximately 12,000 kilometers
                </p>
                <p class="py-2">
                    <span class="font-bold">Distance from Sun: </span>
                    100 million kilometers
                </p>
                <p class="py-2">
                    <span class="font-bold">Number of Moons: </span>
                    2 (Lunaris and Nocturna)
                </p>
                <p class="py-2">
                    <span class="font-bold">Population:</span> 
                    Varied throughout history, reaching its peak at 10 billion inhabitants before the cataclysmic events.
                </p>
                <p class="py-2"> 
                    <span class="font-bold">Atmosphere: </span>
                    Previously composed of a breathable mix of oxygen and nitrogen, now heavily polluted and toxic.
                </p>
                <p class="py-2">
                    <span class="font-bold">Climate:</span>
                    Once diverse with lush forests, vast oceans, and sprawling plains, now ravaged by extreme weather patterns and environmental degradation.
                </p>
            </div>
        </div>
        <div class="px-6 py-6">
            <h2 class="text-lg py-4 font-bold">Ancient Origins:</h2>
            <p>Millennia ago, the Xylores emerged on the distant planet of Xylor, a world teeming with life and boundless potential. Our ancestors flourished amidst the harmonious balance of nature, nurturing a civilization steeped in wisdom, innovation, and unity.</p>
        </div>
        <div class="px-6 py-6">
            <h2 class="text-lg py-4 font-bold">Catastrophe and Exodus:</h2>
            <p>Alas, our idyllic existence was shattered by cataclysmic upheavals that ravaged our homeworld, leaving it barren and inhospitable. Faced with extinction, the Xylores embarked on a perilous exodus across the cosmos in search of a new sanctuary to call home.</p>
        </div>
        <div class="px-6 py-6">
            <h2 class="text-lg py-4 font-bold">Encounters and Alliances:</h2>
            <p>Along our journey, we encountered myriad worlds and civilizations, forging alliances, and fostering friendships across the stars. From the luminous realms of the Luminaires to the mechanical marvels of the Mechanoids, we learned from each encounter and embraced the diversity of the cosmos.</p>
        </div>
        <div class="px-6 py-6">
            <h2 class="text-lg py-4 font-bold">The Quest for Redemption:</h2>
            <p>Despite the trials and tribulations that beset us, the Xylores remain steadfast in our quest for redemption. With each passing cycle of the cosmos, we strive to reclaim our legacy, rebuild our civilization, and restore the splendor of Xylor to its former glory.</p>
        </div>
        <div class="px-6 py-6">
            <h2 class="text-lg py-4 font-bold">Join Us in the Cosmic Odyssey:</h2>
            <p>Embark on a cosmic odyssey unlike any other as we unravel the mysteries of the universe and chart a course towards a brighter tomorrow. Together, let us forge new alliances, explore uncharted worlds, and write the next chapter in the epic saga of the Xylores.</p>
        </div>
    </section>
    <div class="text-center justify-center py-10">
        <h3  class="font-bold text-lg">If you believe you can provide us with an opportunity, please contact us.</h3>
        <router-link to="/Contact"  class="btn flex justify-center m-auto my-10" type="button">
            <strong class="font-bold" :class="{ 'hex-text': !isTranslated } " >
                Contact Us
            </strong>
            <div id="container-stars">
              <div id="stars"></div>
            </div>
            
            <div id="glow">
              <div class="circle"></div>
              <div class="circle"></div>
            </div>
          </router-link>
    </div>
   
</template>

<style  scoped>
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