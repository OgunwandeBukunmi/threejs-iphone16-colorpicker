import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/Addons.js";

let iphone;
let iphoneColor = 0xffffff;

//scene
const scene = new THREE.Scene();
scene.background = new THREE.Color("beige");

//camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 1, 5);

//renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

//orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.01;

//content
const loader = new GLTFLoader();
loader.load(
 "/iphone_16_-_free.glb",
  (gltf) => {
    iphone = gltf.scene; 
    iphone.scale.setScalar(0.3);
    scene.add(iphone);
  iphone.position.set(0, 0, 0);
  },
  undefined,
  (error) => {
    console.error("Error loading model:", error);
  }
);

function setIphoneColor(hexColor) {
  if (!iphone) return;

  iphone.traverse((child) => {
    if (child.isMesh && child.material) {
      child.material.color.set(hexColor);
    }
  });
}

//light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

const ambient = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambient);

// color input event
document.getElementById("color").addEventListener("input", (e) => {
  iphoneColor = e.target.value; 
  setIphoneColor(iphoneColor);
});

// resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

//loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  iphone.rotation.y +=0.01
  controls.update();
}
animate();



