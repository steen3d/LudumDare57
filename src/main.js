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

const scene = new THREE.Scene();
scene.add(player);
scene.add(mob1);
scene.add(map);
scene.fog = new THREE.FogExp2("#1155aa", 0.0012);

const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

const rgbeLoader = new RGBELoader();
rgbeLoader.load("textures/qwantani_puresky_2k.hdr", (environmentMap) => {
  environmentMap.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = environmentMap;
  scene.environment = environmentMap;
  scene.backgroundIntensity = 0;
});

const dirLight = DirectionalLight();
dirLight.target = player;
player.add(dirLight);

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
