<script setup>
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader.js';
import { ref, onMounted, onBeforeUnmount,onUpdated } from 'vue';
import * as THREE from 'three';

const canvas = ref(null);
const Planet = ref(null);
var controls = null;
var clock = new THREE.Clock();
let scene = null;
let camera = null;
let renderer = null;
let animationId = null;
var height, width;
var loader

const initScene = () => {
    scene = new THREE.Scene();

    loader = new THREE.TextureLoader();
    const skyTexture = loader.load('/img/2k_stars_milky_way.jpg');
    scene.background = skyTexture;

    renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled=true; 
    renderer.shadowMap.type=THREE.PCFShadowMap;
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0); 
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    renderer.setClearColor(0x222222,1);
    window.addEventListener('resize', onWindowResize, false);

    var ambientLight = new THREE.AmbientLight(0xf0f0f0);
    scene.add(ambientLight);

    const fogColor = new THREE.Color(0x2f2f2f); 
    const fogNear = 0.3; 
    const fogFar = 0.1; 
    scene.fog = new THREE.Fog(fogColor, fogNear, fogFar);

    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 0.2;
    camera.position.y = 200;

    renderer = new THREE.WebGLRenderer({ canvas: canvas.value });
    updateRendererSize();
    renderer.setClearColor(0x222222, 1);
    renderer.shadowMap.enabled = true;

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.maxPolarAngle = Math.PI / 2;
    controls.minDistance = 2;
    controls.maxDistance = 3;

    var pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(1, 1, 0);
    pointLight.castShadow = true;
    scene.add(pointLight);

    clock.start();
    loader = new ColladaLoader();
    loader.load('/models/Planet.dae', onLoaded, onProgress, onError);
};

function onWindowResize(){
    camera.updateProjectionMatrix();
}

const updateRendererSize = () => {
    renderer.setSize(width, height);
};

const animate = () => {
    let dt = clock.getDelta();
    animationId = requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
};


function onLoaded(collada) {
    let objects = collada.scene;

    scene.add(objects,);
    let dt = clock.getElapsedTime();
    console.log("Loading completed after " + dt + " s.");
}

var onProgress = function (data) {
    if (data.lengthComputable) {
        var percentComplete = data.loaded / data.total * 100;
        console.log(Math.round(percentComplete, 2) + '% downloaded');
    }
};

var onError = function (data) {
    console.error(data);
};


const onResize = () => {
    width = Planet.value.clientWidth;
    height = Planet.value.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    updateRendererSize();
};

const saveCameraPosition = () => {
    const { x, y, z } = camera.position;
    localStorage.setItem('cameraPosition', JSON.stringify({ x, y, z }));
};

onMounted(() => {
    width = Planet.value.clientWidth;
    height = Planet.value.clientHeight;
    initScene();
    animate();
    window.addEventListener('resize', onResize);
    saveCameraPosition();
});

onUpdated(()=>{
    initScene();
})

onBeforeUnmount(() => {
    cancelAnimationFrame(animationId);
    window.removeEventListener('resize', onResize);
});
</script>
<template>
    <div ref="Planet"  class="canvas">
        <canvas class="canvas" ref="canvas" />
    </div>
</template>

<style scoped>
.canvas {
    width: 100%;
    height: 90%;
    border-radius: 2px;
}
</style>
