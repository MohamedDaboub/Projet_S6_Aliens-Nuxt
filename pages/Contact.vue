<template>
  <Header />
  <section class="full">
    <div>
      <h1 class="font-bold text-2xl text-center py-10">Conversation</h1>
      <p class="px-5 lg:mr-10">When you're ready to begin the conversation with the alien, simply click the button below. You'll have the opportunity to respond to the alien's message by clicking the same button. Remember, you have only one chance to reply to the alien's message. Additionally, it's important to understand that the fate of your planet rests in your hands.</p>
    </div>
    <div class="p-10 ">
      <div  v-if="showStartButton" :class="{ 'hidden': conversationStarted || conversationFinished }">
        <button v-if="!conversationStarted && !conversationFinished" @click="startConversation" class="btn1 text-center m-auto"> <span class="py-4 px-4">Commencer la conversation avec l'alien</span></button>
      </div>
      <div  v-else >
        <div class="">
          <p class="start text-lg font-bold py-4">You have already used your chance.</p>
          <p class="start text-lg font-bold py-4">The final decision has been made.</p>
          <h4 class="text-center font-bold md:text-xl text-base py-8">{{ finalMessage }}</h4>
        </div>
      </div>
      <div v-if="conversationStarted">
        <div class="border-2 p-8 rounded-md scroll-p-0.5 overflow-y-scroll taille">
          <div v-for="(message, index) in messages" :key="index">
            <div v-if="message.from === 'human'" class="py-8">
              <div class="flex items-center gap-4 py-4">
                <img src="/img/Space_Humain.webp" class="rounded-full w-12 h-12" alt="">
                <p class="font-bold text-base">Humain</p>
              </div>
              <div class="human-message">
                <p class="text-start">{{ message.content }}</p>
                <div v-if="message.hexContent" class="hex-content ">
                  <p class="hex-text text-start">{{ message.hexContent }}</p>
                </div>
              </div>
              <div v-if="message.translating">En cours de traduction...</div>
            </div>
            <div v-else-if="message.from === 'alien'">
              <div class="flex items-center gap-4">
                <img src="/img/Space_Alien.webp" class="rounded-full w-12 h-12" alt="">
                <p class="font-bold text-base">Xylore</p>
              </div>
              <div v-if="message.translating">En cours de traduction...</div>
              <div v-if="message.hexContent" class="hex-content">
                <div class="alien-message ">
                  <p class="hex-text">{{ message.hexContent }}</p>
                  <p>{{ message.content }}</p>
                </div>
                <div v-if="message.translation" class="translation">
                  <p>{{ message.translation }}</p>
                </div>
              </div>
            </div>
          </div>
          <div v-if="!conversationFinished && !showResponseOptions && !askedQuestion">
            <button class="btn1" @click="sendMessage('We are Xylore. We come in peace and we want to buy this land: 27° 00 S, 13° 00 E. Enfortunately, we have lost our planet Xylor and we are offering a million Xixo for it. We re desperate and don\'t have much time. If you don\'t respond quickly, we\'ll go to war.')"><span class="p-4">Hello Mister Alien i have make my dessison</span></button>
          </div>
          <div v-if="!responseGiven && !conversationFinished && showResponseOptions && askedQuestion" class="flex gap-4 text-center justify-center py-6 flex-wrap">
            <button @click="respondOption1" class="text-start btn1 "> <span class="p-4">Pourquoi voulez-vous venir sur Terre ?</span></button>
            <button @click="respondOption2" class="text-start btn1"><span class="p-4"> Vous voulez la Terre ?</span></button>
          </div>
          <div v-if="responseGiven && !conversationFinished" class="flex gap-4 text-center justify-center py-6 flex-wrap">
            <button @click="acceptOffer" class="text-start btn "> <span class="p-3">Laisser les aliens arriver en paix</span></button>
            <button @click="rejectOffer" class="text-start btn">Refuser l'offre</button>
          </div>
          <div v-if="conversationFinished" class="text-center font-bold md:text-xl text-base py-8 ">
            <p>{{ finalMessage }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
const conversationStarted = ref(false)
const conversationFinished = ref(false)
const showResponseOptions = ref(false)
const finalMessage = ref('')
const messages = ref([])
let askedQuestion = false // Variable pour suivre si la question a déjà été posée
const conversationDoneKey = 'conversationDone' // Clé pour stocker dans le localStorage
const responseGiven = ref(false); 

// Vérifie si la conversation a déjà été faite
const checkConversationStatus = () => {
  if (localStorage.getItem(conversationDoneKey)) {
    conversationStarted.value = false
    conversationFinished.value = true
    finalMessage.value = localStorage.getItem('finalMessage') // Charge le message final depuis le localStorage
  }
}

const startConversation = () => {
  conversationStarted.value = true
  localStorage.setItem(conversationDoneKey, true) // Enregistre dans le localStorage que la conversation est terminée
}

const showStartButton = ref(true)

onMounted(() => {
  checkConversationStatus()
  showStartButton.value = !conversationStarted.value && !conversationFinished.value
})

function receiveMessage(hexContent) {
  const content = hexToString(hexContent)
  setTimeout(() => {
    messages.value.push({ content, hexContent, from: 'alien', translating: false })
    if (!askedQuestion) {
      askedQuestion = true
    } else if (!showResponseOptions.value) {
      showResponseOptions.value = true; // Afficher les boutons acceptOffer et rejectOffer si l'utilisateur n'a pas encore choisi une option
    }
  }, 100)
}
function sendMessage(content) {
  const hexContent = stringToHex(content)
  messages.value.push({ content, hexContent, from: 'human', translating: true })

  setTimeout(() => {
    messages.value[messages.value.length - 1].translating = false
    if (content.includes('We are Xylore')) {
      receiveMessage("45")
      showResponseOptions.value = true
    }
  }, 500)
}
function respondOption1() {
  sendMessage('Je viens sur Terre.');
  receiveMessage("4f6b61792c207468616e6b20796f752c2045617274686c696e672c20666f7220616363657074696e67207573");
  responseGiven.value = true; // Définir responseGiven à true lorsque l'utilisateur répond
}

function respondOption2() {
  sendMessage('Je ne viens pas sur Terre.');
  receiveMessage("4f6b61792c207468616e2c20666f7220616363657074696e67207573");
  responseGiven.value = true; // Définir responseGiven à true lorsque l'utilisateur répond
}
function acceptOffer() {
  sendMessage('We welcome you in peace, Xylore. You can settle on Earth.')
  receiveMessage("4f6b61792c207468616e6b20796f752c2045617274686c696e672c20666f7220616363657074696e67207573")
  conversationFinished.value = true
  setTimeout(() => {
  finalMessage.value = "Les aliens ont accepté de venir en paix sur Terre."
  localStorage.setItem(conversationDoneKey, true) // Enregistre dans le localStorage que la conversation est terminée
  localStorage.setItem('finalMessage', finalMessage.value) // Enregistre le message final dans le localStorage
  }, 2000)
  
}

function rejectOffer() {
  sendMessage('Nous ne vendrons pas notre planète. Vous ne pouvez pas venir ici.')
  receiveMessage("534f20495420574152")
  conversationFinished.value = true
  setTimeout(() => {
    finalMessage.value = "Les aliens ont déclaré la guerre après le refus de l'offre."
    localStorage.setItem(conversationDoneKey, true) // Enregistre dans le localStorage que la conversation est terminée
    localStorage.setItem('finalMessage', finalMessage.value) // Enregistre le message final dans le localStorage
  }, 2000)
}

function stringToHex(str) {
  let hex = ''
  for (let i = 0; i < str.length; i++) {
    hex += str.charCodeAt(i).toString(16)
  }
  return hex
}

function hexToString(hex) {
  let str = ''
  for (let i = 0; i < hex.length; i += 2) {
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16))
  }
  return str
}
if (localStorage.getItem(conversationDoneKey)) {
  conversationStarted.value = false
}
</script>

<style scoped>
.hidden {
  display: none;
}

.taille{
  height: 750px;
}
.hex-text {
white-space: pre-line;
word-break: break-all;
font-size: 14px;
}

/* mobile */
@media (max-width: 767px) {
  .hex-text {
  white-space: pre-line;
  word-break: break-all;
  font-size: 10px;
}
}
.alien-message {
  background-color: #070B1E;
  color: #fff;  
  padding: 5px;
  border-radius: 5px;
  margin-bottom: 10px;
  text-align: left;
}
.human-message {
  background-color: #070B1E;
  color: #fff;  
  padding: 5px;
  border-radius: 5px;
  margin-bottom: 10px;
  text-align: right;
}
.hex-content {
  margin-top: 5px;
}
.translation {
  margin-top: 5px;
}
/* ----------- */
.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 13rem;
  overflow: hidden;
  background-size: 300% 300%;
  border-radius: 5rem;
  transition: 0.5s;
  border: double 4px transparent;
  background-image: linear-gradient(#212121, #212121),  linear-gradient(137.48deg, #A7347A 10%,#1043F8 45%, #A7347A 67%, #1043F8 87%);
  background-origin: border-box;
  background-clip: content-box, border-box;
}
.btn1 {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-size: 300% 300%;
  border-radius: 5rem;
  transition: 0.5s;
  border: double 4px transparent;
  background-image: linear-gradient(#212121, #212121),  linear-gradient(137.48deg, #A7347A 10%,#1043F8 45%, #A7347A 67%, #1043F8 87%);
  background-origin: border-box;
  background-clip: content-box, border-box;
}

.btn:hover {
  z-index: 1;
  background-color: #212121;
}

.btn:hover {
  transform: scale(1.1)
}
.btn1:hover {
  z-index: 1;
  background-color: #212121;
}

.btn1:hover {
  transform: scale(1.1)
}


.btn:active {
    background: linear-gradient(75deg, #a7347a 0%,  #1043f8 360%);
}
.full{
  height: 90dvh;
  height: 100%;
}
body{
  font-family: 'Orbitron', sans-serif;
  position: relative;
  background-color: #070B1E;
  color: #fff;
  scroll-behavior: smooth;

}
body::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: url('../assets/Space_Background.webp'); 
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; 
  opacity: 0.25; 
  z-index: -900; 
}
  </style>