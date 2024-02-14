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
              <div v-if="message.translating">Currently in translation...</div>
            </div>
            <div v-else-if="message.from === 'alien'">
              <div class="flex items-center gap-4">
                <img src="/img/Space_Alien.webp" class="rounded-full w-12 h-12" alt="">
                <p class="font-bold text-base">Xylore</p>
              </div>
              <div v-if="message.translating">Currently in translation...</div>
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
            <button class="btn1" @click="sendMessage('Greetings, extraterrestrial being. I have reached a decision.')"><span class="p-4">Greetings, extraterrestrial being. I have reached a decision.</span></button>
          </div>
          <div v-if="!responseGiven && !conversationFinished && showResponseOptions && askedQuestion" class="flex gap-4 text-center justify-center py-6 flex-wrap">
            <button @click="respondOption1" class="text-start btn1 "> <span class="p-4">What is your motive for seeking to visit Earth?</span></button>
            <button @click="respondOption2" class="text-start btn1"><span class="p-4"> Could you elaborate on your reasons for desiring to journey to Earth?</span></button>
          </div>
          <div v-if="responseGiven && !conversationFinished" class="flex gap-4 text-center justify-center py-6 flex-wrap">
            <button @click="acceptOffer" class="text-start btn "> <span class="p-3">Let the aliens arrive in peace</span></button>
            <button @click="rejectOffer" class="text-start btn">Refuse offer</button>
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
let askedQuestion = false
const conversationDoneKey = 'conversationDone'
const responseGiven = ref(false); 

const checkConversationStatus = () => {
  if (localStorage.getItem(conversationDoneKey)) {
    conversationStarted.value = false
    conversationFinished.value = true
    finalMessage.value = localStorage.getItem('finalMessage')
  }
}

const startConversation = () => {
  conversationStarted.value = true
  localStorage.setItem(conversationDoneKey, true)
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
      showResponseOptions.value = true; 
    }
  }, 100)
}
function sendMessage(content) {
  const hexContent = stringToHex(content)
  messages.value.push({ content, hexContent, from: 'human', translating: true })

  setTimeout(() => {
    messages.value[messages.value.length - 1].translating = false
    if (content.includes('Greetings')) {
      receiveMessage("41682c2045617274686d616e2c204920617761697420796f7572206465636973696f6e207769746820616e74696369706174696f6e2e")
      showResponseOptions.value = true
    }
  }, 500)
}
function respondOption1() {
  sendMessage('What is your motive for seeking to visit Earth?');
  receiveMessage("5765206f627365727665207468617420706c616e657420456172746820697320746865206f6e6c79206b6e6f776e2063656c65737469616c20626f6479207768657265206c696665206578697374732e205468697320697320776879207765206861766520636f6d6520746f206578706c6f72652074686520706f73736962696c697479206f66206c696665206f6e2045617274682e");
  responseGiven.value = true;
}

function respondOption2() {
  sendMessage('Could you elaborate on your reasons for desiring to journey to Earth?');
  receiveMessage("546F206578706C6F72652C206C6561726E2C20616E6420666F73746572207065616365206265747765656E206F757220636976696C697A6174696F6E732E");
  responseGiven.value = true;
}
function acceptOffer() {
  sendMessage('We welcome you in peace, Xylore. You can settle on Earth.')
  receiveMessage("4f6b61792c207468616e6b20796f752c2045617274686c696e672c20666f7220616363657074696e67207573")
  conversationFinished.value = true
  setTimeout(() => {
  finalMessage.value = "The aliens have agreed to come to Earth in peace."
  localStorage.setItem(conversationDoneKey, true)
  localStorage.setItem('finalMessage', finalMessage.value) 
  }, 2000)
  
}

function rejectOffer() {
  sendMessage("We won't sell our planet. You can't come here.")
  receiveMessage("534f20495420574152")
  conversationFinished.value = true
  setTimeout(() => {
    finalMessage.value = "The aliens declared war after the offer was refused."
    localStorage.setItem(conversationDoneKey, true)
    localStorage.setItem('finalMessage', finalMessage.value) 
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
  </style>