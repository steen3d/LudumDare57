import * as THREE from "three";
import { minTileIndex, maxTileIndex } from "../constants";
import { position } from "../components/Player";

export function generateMobs(depth) {
  const mobList = [
    { x: 2, y: 1 },
    { x: 3, y: 2 },
  ];
  return mobList;
}
