import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { createExtrudedArcGeometry } from "./create-arc";
import { createSkyboxTextureCube } from "./create-skybox";

const scene = new THREE.Scene();

const floorGeometry = new THREE.CircleGeometry(200);
const floorMaterial = new THREE.MeshBasicMaterial({
  color: 0xd6d0c8,
  side: THREE.DoubleSide,
});
const floor = new THREE.Mesh(floorGeometry, floorMaterial);

const floorOuterRingGeometry = new THREE.RingGeometry(190, 200, 200);
const floorOuterRingMaterial = new THREE.MeshBasicMaterial({
  color: 0xa5978b,
  side: THREE.DoubleSide,
});
const floorOuterRing = new THREE.Mesh(
  floorOuterRingGeometry,
  floorOuterRingMaterial
);

const baseGeometry = new THREE.CylinderGeometry(2, 4, 4, 32);
const baseMaterial = new THREE.MeshStandardMaterial({
  color: 0x444444,
  metalness: 0.2,
  roughness: 1,
});
const base = new THREE.Mesh(baseGeometry, baseMaterial);

const arc1Geometry = createExtrudedArcGeometry(
  10,
  11.5,
  4,
  0,
  Math.PI * 2 * 0.6,
  32
);

const arc2Geometry = createExtrudedArcGeometry(
  10.5,
  12,
  4,
  0,
  Math.PI * 2 * 0.95,
  32
);

const arc3Geometry = createExtrudedArcGeometry(
  10,
  11.5,
  4,
  0,
  Math.PI * 2 * 0.3,
  32
);

const arcMaterial = new THREE.MeshStandardMaterial({
  color: 0xb7410e,
  emissive: 0xb7410e,
  emissiveIntensity: 0.01,
  metalness: 1,
  roughness: 1,
});

const arc1 = new THREE.Mesh(arc1Geometry, arcMaterial);
const arc2 = new THREE.Mesh(arc2Geometry, arcMaterial);
const arc3 = new THREE.Mesh(arc3Geometry, arcMaterial);

scene.add(floor);
scene.add(floorOuterRing);
scene.add(base);
scene.add(arc1);
scene.add(arc2);
scene.add(arc3);

floor.rotation.x = -Math.PI / 2;
floor.position.y = -15;

floorOuterRing.rotation.x = -Math.PI / 2;
floorOuterRing.position.y = -14;

base.position.y = -13.5;

arc1.position.z = -2;
arc1.scale.setY(-1);
arc1.rotation.z = 35 * (Math.PI / 100);

arc2.position.y = 4.5;
arc2.position.x = -3.25;
arc2.rotation.x = Math.PI / 2;
arc2.rotation.z = -45 * (Math.PI / 100);
arc2.rotation.y = 25 * (Math.PI / 100);

arc3.rotation.order = "YXZ";
arc3.rotation.x = -25 * (Math.PI / 100);
arc3.rotation.z = -25 * (Math.PI / 100);
arc3.rotation.y = 50 * (Math.PI / 100);
arc3.position.y = 0.2;
arc3.position.x = -6.75;
arc3.position.z = 0.9;

const dimensions = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const camera = new THREE.PerspectiveCamera(
  75,
  dimensions.width / dimensions.height,
  0.1,
  1000
);
camera.position.z = 30;

const light = new THREE.PointLight(0xffffff, 100, 1000);
light.position.set(0, 5, 0);
scene.add(light);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(dimensions.width, dimensions.height);

const controls = new OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;
controls.autoRotateSpeed = 2;
controls.enablePan = false;
controls.minPolarAngle = Math.PI / 2;
controls.maxPolarAngle = Math.PI / 2;
controls.minDistance = 30;
controls.maxDistance = 30;
controls.enableZoom = false;

const skyboxTextureCube = createSkyboxTextureCube();
scene.background = skyboxTextureCube;
scene.backgroundBlurriness = 0.05;

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

let isPointerDown = false;
let startX = 0;
const movementThreshold = 10;

renderer.domElement.addEventListener("pointerdown", (event) => {
  isPointerDown = true;
  startX = event.clientX;

  renderer.domElement.style.cursor = "grabbing";
});

renderer.domElement.addEventListener("pointermove", (event) => {
  if (isPointerDown && !controls.enabled) {
    const deltaX = Math.abs(event.clientX - startX);

    if (deltaX > movementThreshold) {
      renderer.domElement.style.touchAction = "none";
    }
  }
});

renderer.domElement.addEventListener("pointerup", () => {
  isPointerDown = false;
  renderer.domElement.style.touchAction = "unset";
  renderer.domElement.style.cursor = "grab";
});

renderer.domElement.addEventListener("pointerout", () => {
  isPointerDown = false;
  renderer.domElement.style.touchAction = "unset";
  renderer.domElement.style.cursor = "grab";
});

animate();
renderer.domElement.style.touchAction = "unset";
document.body.appendChild(renderer.domElement);
