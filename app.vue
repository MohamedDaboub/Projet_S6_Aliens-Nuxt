<template>
  <div>
    <NuxtPage/>
  </div>
</template>
<style>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap');
body {
  font-family: 'Orbitron', sans-serif;
  position: relative;
  background-color: #070B1E;
}

body::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: url('img/Space_Background.webp'); /* Utilisez le chemin réel vers votre image de fond */
  background-size: cover; /* Ajustez la taille de l'image de fond pour couvrir tout le corps */
  background-position: center; /* Centrez l'image de fond */
  background-repeat: no-repeat; /* Assurez-vous que l'image de fond ne se répète pas */
  opacity: 0.15; /* Ajoutez une opacité de 20% à l'image de fond */
  z-index: -100; /* Placez l'image de fond derrière le contenu du corps */
}
</style>
