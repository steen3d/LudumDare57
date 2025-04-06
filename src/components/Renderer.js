import * as THREE from "three";

export function Renderer() {
  const canvas = document.querySelector("canvas.game");
  if (!canvas) throw new Error("Canvas not found");

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    canvas: canvas,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor( 0xffffff, 0);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;

  return renderer;
}
