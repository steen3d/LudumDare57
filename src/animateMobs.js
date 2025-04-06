import * as THREE from "three";
import {
  mob1,
  position,
  movesQueue,
  stepCompleted,
} from "./components/creatures/Mob1";
import { tileSize } from "./constants";

const moveClock = new THREE.Clock(false);

export function animateMob() {
  if (!movesQueue.length) return;

  if (!moveClock.running) moveClock.start();

  const stepTime = 0.4; // Seconds it takes to take a step
  const progress = Math.min(1, moveClock.getElapsedTime() / stepTime);

  setPosition(progress);
  setRotation(progress);

  // Once a step has ended
  if (progress >= 1) {
    stepCompleted();
    moveClock.stop();
  }
}

function setPosition(progress) {
  const startX = position.currentTile * tileSize;
  const startY = position.currentRow * tileSize;
  let endX = startX;
  let endY = startY;

  if (movesQueue[0] === "left") endX -= tileSize;
  if (movesQueue[0] === "right") endX += tileSize;
  if (movesQueue[0] === "forward") endY += tileSize;
  if (movesQueue[0] === "backward") endY -= tileSize;

  mob1.position.x = THREE.MathUtils.lerp(startX, endX, progress);
  mob1.position.y = THREE.MathUtils.lerp(startY, endY, progress);
  // mob1.position.z = Math.sin(progress * Math.PI) * 20; //controls the hop
}

function setRotation(progress) {
  let endRotation = 0;
  if (movesQueue[0] == "forward") endRotation = 0;
  if (movesQueue[0] == "left") endRotation = Math.PI / 2;
  if (movesQueue[0] == "right") endRotation = -Math.PI / 2;
  if (movesQueue[0] == "backward") endRotation = Math.PI;

  mob1.rotation.z = THREE.MathUtils.lerp(
    mob1.rotation.z,
    endRotation,
    progress
  );
}
