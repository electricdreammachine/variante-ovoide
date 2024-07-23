import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { createExtrudedArcGeometry } from "./create-arc";
import nx from "./nx.jpg?url";
import ny from "./ny.jpg?url";
import nz from "./nz.jpg?url";
import px from "./px.jpg?url";
import py from "./py.jpg?url";
import pz from "./pz.jpg?url";

const scene = new THREE.Scene();

const arc1 = createExtrudedArcGeometry(10, 11.5, 4, 0, Math.PI * 2 * 0.6, 32);
const arc2 = createExtrudedArcGeometry(10.5, 12, 4, 0, Math.PI * 2 * 0.95, 32);
const arc3 = createExtrudedArcGeometry(10, 11.5, 4, 0, Math.PI * 2 * 0.3, 32);
const base = new THREE.CylinderGeometry(2, 4, 4, 32);
const floorGeometry = new THREE.CircleGeometry(200);

// Create a material for the floor
const floorMaterial = new THREE.MeshBasicMaterial({
  color: 0x999999,
  side: THREE.DoubleSide,
});

// Create a mesh by combining the geometry and material
const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);

const material = new THREE.MeshStandardMaterial({
  color: 0x00ff00,
  emissive: 0x00ff00,
  emissiveIntensity: 0.01,
  metalness: 1,
  roughness: 1,
});

const material2 = new THREE.MeshStandardMaterial({
  color: 0x444444,
  emissive: 0x444444,
  metalness: 0.2,
  roughness: 1,
});

const mesh1 = new THREE.Mesh(arc1, material);
const mesh2 = new THREE.Mesh(arc2, material);
const mesh3 = new THREE.Mesh(arc3, material);
const mesh4 = new THREE.Mesh(base, material2);

scene.add(mesh1);
scene.add(mesh2);
scene.add(mesh3);
scene.add(mesh4);
scene.add(floorMesh);

mesh1.position.z = -2;
mesh1.scale.setY(-1);
mesh1.rotation.z = 35 * (Math.PI / 100);

mesh2.material.color.set(0xff0000);

mesh2.position.y = 4.5;
mesh2.position.x = -3.25;
mesh2.rotation.x = Math.PI / 2;
mesh2.rotation.z = -45 * (Math.PI / 100);
mesh2.rotation.y = 25 * (Math.PI / 100);

// mesh3.rotation.z = 60 * (Math.PI / 100);
mesh3.rotation.order = "YXZ";
mesh3.rotation.x = -25 * (Math.PI / 100);
mesh3.rotation.z = -25 * (Math.PI / 100);
mesh3.rotation.y = 50 * (Math.PI / 100);

mesh3.position.y = 0.2;
mesh3.position.x = -6.75;
mesh3.position.z = 0.9;

mesh4.position.y = -13.5;

floorMesh.rotation.x = -Math.PI / 2;
floorMesh.position.y = -15;

const temp = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const camera = new THREE.PerspectiveCamera(
  75,
  temp.width / temp.height,
  0.1,
  1000
);

const light = new THREE.PointLight(0xffffff, 100, 1000);
light.position.set(1, 1, 0);
scene.add(light);

const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(temp.width, temp.height);
const controls = new OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;
controls.autoRotateSpeed = 2;

camera.position.z = 30;
controls.minPolarAngle = Math.PI / 2; // 90 degrees
controls.maxPolarAngle = Math.PI / 2; // 90 degrees
controls.minDistance = 30;
controls.maxDistance = 30;
controls.update();

function createSkybox() {
  const urls = [px, nx, py, ny, pz, nz];

  const textureCube = new THREE.CubeTextureLoader().load(urls);

  scene.background = textureCube;
  scene.backgroundBlurriness = 0.05;
}

// Call the function to create the skybox
createSkybox();

function animate() {
  requestAnimationFrame(animate);

  // required if controls.enableDamping or controls.autoRotate are set to true
  controls.update();

  renderer.render(scene, camera);
}

animate();
document.body.appendChild(renderer.domElement);
