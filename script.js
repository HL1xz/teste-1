// Cena
const scene = new THREE.Scene();

// Câmera
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 2, 5);

// Renderizador
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Controles (arrastar para girar)
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 3;
controls.maxDistance = 8;
controls.maxPolarAngle = Math.PI / 2; // não deixa virar de cabeça pra baixo

// Luz principal
const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
keyLight.position.set(5, 10, 5);
scene.add(keyLight);

// Luz ambiente suave
const ambient = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambient);

// Luz de preenchimento lateral
const fillLight = new THREE.DirectionalLight(0xffc0cb, 0.5);
fillLight.position.set(-5, 5, 5);
scene.add(fillLight);

// ======================
// MESA
// ======================
const tableGeometry = new THREE.CylinderGeometry(2.2, 2.2, 0.3, 64);
const tableMaterial = new THREE.MeshStandardMaterial({
  color: 0x3b2a1a,
  roughness: 0.6,
  metalness: 0.1
});
const table = new THREE.Mesh(tableGeometry, tableMaterial);
table.position.y = -1.2;
scene.add(table);

// ======================
// CARREGAR BOLO 3D
// ======================
const loader = new THREE.GLTFLoader();
let cake;

loader.load(
  "models/cake.glb",
  function (gltf) {
    cake = gltf.scene;

    cake.scale.set(1.5, 1.5, 1.5);
    cake.position.y = -0.9;

    scene.add(cake);
  },
  undefined,
  function (error) {
    console.error("Erro ao carregar o modelo 3D:", error);
  }
);

// ======================
// ANIMAÇÃO
// ======================
function animate() {
  requestAnimationFrame(animate);

  controls.update(); // suaviza o movimento

  renderer.render(scene, camera);
}
animate();

// ======================
// RESPONSIVO
// ======================
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
