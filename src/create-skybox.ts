import * as THREE from "three";
import nx from "./nx.jpg?url";
import ny from "./ny.jpg?url";
import nz from "./nz.jpg?url";
import px from "./px.jpg?url";
import py from "./py.jpg?url";
import pz from "./pz.jpg?url";

export function createSkyboxTextureCube() {
  const urls = [px, nx, py, ny, pz, nz];

  const textureCube = new THREE.CubeTextureLoader().load(urls);

  return textureCube;
}
