import * as THREE from "three";
import { Renderer } from "./components/Renderer";
import { Camera } from "./components/Camera";
import { DirectionalLight } from "./components/DirectionalLight";
import { player } from "./components/Player";
import { animatePlayer } from "./animatePlayer";
import { map, initializeMap } from "./components/Map";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import "./collectUserInput";
import "./style.css";
import { animateMob } from "./animateMobs";
import { mob1 } from "./components/creatures/Mob1";
import { mob2 } from "./components/creatures/Mob2";
// import GUI from 'lil-gui';

// const gui = new GUI();

const scene = new THREE.Scene();
scene.add(player);
scene.add(mob1);
scene.add(mob2);
scene.add(map);
scene.fog = new THREE.FogExp2("#1155aa", 0.0012);

const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

const rgbeLoader = new RGBELoader();
rgbeLoader.load("textures/qwantani_puresky_2k.hdr", (environmentMap) => {
  environmentMap.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = null;
  scene.environment = environmentMap;
  scene.backgroundIntensity = 1;
});

const dirLight = DirectionalLight();
dirLight.target = player;
player.add(dirLight);

const testSpotLight = new THREE.SpotLight( 0xffffff, 300, 0, Math.PI * 0.125, 0, 2 );
testSpotLight.intensity = 10000;
// testSpotLight.position.y = 50;
// gui.add( testSpotLight.position, 'x' ).min(-100).max(100).step(1);
// gui.add( testSpotLight.position, 'y' ).min(-100).max(100).step(1);
// gui.add( testSpotLight.position, 'z' ).min(-100).max(100).step(1);
// gui.add( testSpotLight.target.position, 'x' ).min(-100).max(100).step(1);
// gui.add( testSpotLight.target.position, 'y' ).min(-100).max(100).step(1);
// gui.add( testSpotLight.target.position, 'z' ).min(-100).max(100).step(1);
// testSpotLight.position.z = 30;
// testSpotLight.target.position.set = new THREE.Vector3(0, 0, 0);
// const testSpotLightHelper = new THREE.SpotLightHelper(testSpotLight, 0xFF0000);
// scene.add(testSpotLightHelper);

// scene.add(testSpotLight);

const camera = Camera();
player.add(camera);

initializeGame();

function initializeGame() {
  initializeMap();
}

const renderer = Renderer();
renderer.setAnimationLoop(animate);

function animate() {
  animatePlayer();
  animateMob();

  renderer.render(scene, camera);
}

const musicTrack1 = new Audio('./audio/LD57-1.mp3');
musicTrack1.loop = true;



const startScreen = document.querySelector('#start-screen');
startScreen.addEventListener('click', (e) => {
  e.target.style.opacity = 0;
  musicTrack1.play();
  e.target.style.pointerEvents = 'none';
  
})