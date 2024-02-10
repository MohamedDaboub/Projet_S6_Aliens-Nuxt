<template>
  <Header />
  <section class="full">
    <div>
      <h1 class="font-bold text-2xl text-center py-10">Conversation</h1>
      <p class="px-5">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto, nihil? Reprehenderit accusamus corporis reiciendis doloremque repudiandae iure, aliquid repellendus pariatur. Corrupti libero quaerat dolores aspernatur fugiat mollitia voluptate praesentium itaque.</p>
    </div>
    <div class="p-10">
      <button v-if="!conversationStarted" @click="startConversation">Commencer la conversation avec l'alien</button>
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
                <p class="font-bold text-base">Alien</p>
              </div>
              <div v-if="message.translating">En cours de traduction...</div>
              <div v-if="message.hexContent" class="hex-content">
                <div class="alien-message ">
                  <p class="hex-text">{{ message.hexContent }}</p>
                  <p>en votre Langue</p>
                  <p>{{ message.content }}</p>
                </div>
                <div v-if="message.translation" class="translation">
                  <p>{{ message.translation }}</p>
                </div>
              </div>
            </div>
          </div>
          <div v-if="!conversationFinished && !showResponseOptions && !askedQuestion">
            <button @click="sendMessage('We are Xylore. We come in peace and we want to buy this land: 27° 00 S, 13° 00 E. Enfortunately, we have lost our planet Xylor and we are offering a million Xixo for it. We re desperate and don\'t have much time. If you don\'t respond quickly, we\'ll go to war.')">Répondre</button>
          </div>
          <div v-if="showResponseOptions && !conversationFinished && askedQuestion" class="flex gap-4 text-center justify-center py-6">
            <button @click="respondOption1" class="text-start btn "> <span class="p-3">Pourquoi voulez-vous venir sur Terre ?</span></button>
            <button @click="respondOption2" class="text-start btn">Vous voulez la Terre ?</button>
          </div>
          <div v-if="showResponseOptions && !conversationFinished && !askedQuestion" class="flex gap-4 text-center justify-center py-6">
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

function startConversation() {
  conversationStarted.value = true
}

function receiveMessage(hexContent) {
  const content = hexToString(hexContent)
  setTimeout(() => {
    messages.value.push({ content, hexContent, from: 'alien', translating: false })
    if (!askedQuestion) {
      askedQuestion = true
    }
  }, 500)
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
  sendMessage('Je viens sur Terre.')
  askedQuestion = false
}

function respondOption2() {
  sendMessage('Je ne viens pas sur Terre.')
  askedQuestion = false
}

function acceptOffer() {
  sendMessage('We welcome you in peace, Xylore. You can settle on Earth.')
  receiveMessage("506f736974697665")
  conversationFinished.value = true
  finalMessage.value = "Les aliens ont accepté de venir en paix sur Terre."
}

function rejectOffer() {
  sendMessage('Nous ne vendrons pas notre planète. Vous ne pouvez pas venir ici.')
  receiveMessage("416c6f72732c20616374756d2c206c61206775757272")
  conversationFinished.value = true
  setTimeout(() => {
    finalMessage.value = "Les aliens ont déclaré la guerre après le refus de l'offre."
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
</script>

<style scoped>
.full{
  height: 90dvh;
  height: 100%;
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

.btn:hover {
  z-index: 1;
  background-color: #212121;
}

.btn:hover {
  transform: scale(1.1)
}


.btn:active {
    background: linear-gradient(75deg, #a7347a 0%,  #1043f8 360%);
}


  </style>