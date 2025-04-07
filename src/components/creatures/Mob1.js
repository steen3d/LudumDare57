import * as THREE from "three";
import { endsUpInValidPosition } from "../../utilities/endsUpInValidPosition";
import { tilesPerRow, maxRowIndex, tileSize } from "../../constants";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";


export const position = {
  currentRow: Math.round(Math.random() * (maxRowIndex - 1)),
  currentTile: Math.round(Math.random() * tilesPerRow - tilesPerRow / 2),
};

export const mob1 = Mob1();

function Mob1() {
  const mob1 = new THREE.Group();
  mob1.position.x = position.currentTile * tileSize;
  mob1.position.y = position.currentRow * tileSize;

  const fish = new THREE.Mesh();
  const gltfLoader = new GLTFLoader();
    gltfLoader.load("./models/Fish_Normal.glb", (gltf) => {
      gltf.scene.children.forEach((mesh) => {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      });
  
      gltf.scene.position.z = 20;
      gltf.scene.scale.set(25, 25, 25);
      gltf.scene.rotateX(Math.PI / 2);
      gltf.scene.rotateY(Math.PI);
  
      // generateCollision(gltf.scene.children[0], lampBody);
  
      // importedMeshes.add(gltf.scene);
      fish.add(gltf.scene);
    });

  // const body = new THREE.Mesh(
  //   new THREE.BoxGeometry(10, 10, 5),
  //   new THREE.MeshLambertMaterial({
  //     color: "green",
  //     flatShading: true,
  //   })
  // );
  // body.position.z = 10;
  mob1.add(fish);

  return mob1;
}

export const movesQueue = [];

export function moveMob() {
  let direction = "";
  switch (Math.round(Math.random() * 5)) {
    case 1:
      direction = "forward";
      break;
    case 2:
      direction = "backward";
      break;
    case 3:
      direction = "left";
      break;
    case 4:
      direction = "right";
      break;
    default:
      break;
  }

  if (direction != "") {
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
}

export function stepCompleted() {
  const direction = movesQueue.shift();

  if (direction === "forward") position.currentRow += 1;
  if (direction === "backward") position.currentRow -= 1;
  if (direction === "left") position.currentTile -= 1;
  if (direction === "right") position.currentTile += 1;
}
