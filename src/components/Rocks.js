import * as THREE from "three";
import { tileSize } from "../constants";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export function Rock(tileIndex) {
  const rock = new THREE.Group();
  rock.position.x = tileIndex * tileSize;

  const gltfLoader = new GLTFLoader();
  gltfLoader.load("./models/Boulder_01.glb", (gltf) => {
    gltf.scene.children.forEach((mesh) => {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    });

    // gltf.scene.position.z = 20;
    gltf.scene.rotateX(Math.PI / 2);
    gltf.scene.rotateY(Math.PI);

    // generateCollision(gltf.scene.children[0], lampBody);

    // importedMeshes.add(gltf.scene);
     rock.add(gltf.scene);
  });
  // rock.rotation.y = Math.PI;
  // const base = new THREE.Mesh(
  //   new THREE.BoxGeometry(30, 30, 15),
  //   new THREE.MeshLambertMaterial({
  //     color: 0x4d2926,
  //     flatShading: true,
  //   })
  // );
  // base.position.z = 10;
  // base.castShadow = true;
  // base.receiveShadow = true;
  // rock.add(base);

  // const tip = new THREE.Mesh(
  //   new THREE.BoxGeometry(20, 20, 20),
  //   new THREE.MeshLambertMaterial({
  //     color: 0x4d2926,
  //     flatShading: true,
  //   })
  // );
  // tip.position.z = 15;
  // tip.castShadow = true;
  // tip.receiveShadow = true;
  // rock.add(tip);

  return rock;
}
