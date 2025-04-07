import * as THREE from "three";
import { endsUpInValidPosition } from "../utilities/endsUpInValidPosition";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { initializeMap } from "./Map";
import { moveMob } from "./creatures/Mob1";

export const player = Player();

function Player() {
  const player = new THREE.Group();
  const gltfLoader = new GLTFLoader();
  const rov = new THREE.Mesh();
  gltfLoader.load("./models/ROV.glb", (gltf) => {
    gltf.scene.children.forEach((mesh) => {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    });

    gltf.scene.position.z = 20;
    gltf.scene.scale.set(10, 10, 10);
    gltf.scene.rotateX(Math.PI / 2);
    gltf.scene.rotateY(Math.PI);

    // generateCollision(gltf.scene.children[0], lampBody);

    // importedMeshes.add(gltf.scene);
    rov.add(gltf.scene);
  });

  // const body = new THREE.Mesh(
  //   new THREE.BoxGeometry(15, 15, 15),
  //   new THREE.MeshLambertMaterial({
  //     color: "white",
  //     flatShading: true,
  //   })
  // );
  // body.position.z = 10;
  // body.castShadow = true;
  // body.receiveShadow = true;
  player.add(rov);

  const playerContainer = new THREE.Group();
  playerContainer.add(player);
  const playerLight = new THREE.SpotLight( 0xffffff );
  playerLight.intensity = 300;
  playerContainer.add(playerLight);

  return playerContainer;
}

export const position = {
  currentRow: 0,
  currentTile: 0,
  depth: 0,
};

export const movesQueue = [];

export function queueMove(direction) {
  moveMob();
  const isValidMove = endsUpInValidPosition(
    {
      rowIndex: position.currentRow,
      tileIndex: position.currentTile,
      z: position.depth,
    },
    [...movesQueue, direction]
  );

  if (!isValidMove) return;

  movesQueue.push(direction);
}

export function stepCompleted() {
  const direction = movesQueue.shift();

  if (direction === "forward") position.currentRow += 1;
  if (direction === "backward") position.currentRow -= 1;
  if (direction === "left") position.currentTile -= 1;
  if (direction === "right") position.currentTile += 1;
  if (direction === "dive") {
    position.depth += 1;
    initializeMap(position.depth);
    movesQueue.unshift("dive2");
  }

  const depthDOM = document.getElementById("depthValue");
  if (depthDOM) depthDOM.innerText = (position.depth * 100).toString();
}
