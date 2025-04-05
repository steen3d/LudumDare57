import * as THREE from "three";
import { endsUpInValidPosition } from "../utilities/endsUpInValidPosition";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export const player = Player();

function Player() {
  const player = new THREE.Group();
  
  
  const gltfLoader = new GLTFLoader();
  const rov = new THREE.Mesh();
  gltfLoader.load(
      './models/ROV.glb',
      (gltf) =>
      {
      gltf.scene.children[0].castShadow = true;
      gltf.scene.children[0].receiveShadowShadow = true;
      gltf.scene.children[0].position.z = 20;
      gltf.scene.children[0].scale.set(5, 5, 5);
      gltf.scene.children[0].rotateX(Math.PI / 2);
      gltf.scene.children[0].rotateZ(Math.PI);
      
      // generateCollision(gltf.scene.children[0], lampBody);

      // importedMeshes.add(gltf.scene);
      rov.add(gltf.scene.children[0]);
      }
  )

  const body = new THREE.Mesh(
    new THREE.BoxGeometry(15, 15, 15),
    new THREE.MeshLambertMaterial({
      color: "white",
      flatShading: true,
    })
  );
  body.position.z = 10;
  body.castShadow = true;
  body.receiveShadow = true;
  player.add(rov);

  const playerContainer = new THREE.Group();
  playerContainer.add(player);

  return playerContainer;
}

export const position = {
  currentRow: 0,
  currentTile: 0,
};

export const movesQueue = [];

export function queueMove(direction) {
  const isValidMove = endsUpInValidPosition(
    {
      rowIndex: position.currentRow,
      tileIndex: position.currentTile,
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
}
