// ======================
// CENA E CÂMERA
// ======================
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 2.2, 6);

// ======================
// RENDERIZADOR
// ======================
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// ======================
// CONTROLES (ARRASTAR PARA GIRAR)
// ======================
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 4;
controls.maxDistance = 10;
controls.maxPolarAngle = Math.PI / 2;

// ======================
// ILUMINAÇÃO CINEMATOGRÁFICA
// ======================
const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
keyLight.position.set(6, 10, 6);
scene.add(keyLight);

const fillLight = new THREE.DirectionalLight(0xffc0cb, 0.4);
fillLight.position.set(-6, 5, 4);
scene.add(fillLight);

const ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambient);

// ======================
// CÉU ESTRELADO (FUNDO CINEMATOGRÁFICO)
// ======================
const starsGeometry = new THREE.BufferGeometry();
const starCount = 1500;
const positions = [];

for (let i = 0; i < starCount; i++) {
  const x = (Math.random() - 0.5) * 200;
  const y = (Math.random() - 0.5) * 200;
  const z = -Math.random() * 200;
  positions.push(x, y, z);
}

starsGeometry.setAttribute(
  'position',
  new THREE.Float32BufferAttribute(positions, 3)
);

const starsMaterial = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.6,
  transparent: true,
  opacity: 0.8
});

const stars = new THREE.Points(starsGeometry, starsMaterial);
scene.add(stars);

// ======================
// MESA (GERADA NO CÓDIGO)
// ======================
const tableGeometry = new THREE.CylinderGeometry(2.5, 2.5, 0.4, 64);
const tableMaterial = new THREE.MeshStandardMaterial({
  color: 0x2b1b12,
  roughness: 0.5,
  metalness: 0.1
});
const table = new THREE.Mesh(tableGeometry, tableMaterial);
table.position.y = -1.4;
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
    cake.scale.set(1.6, 1.6, 1.6);
    cake.position.y = -1.0;
    scene.add(cake);
  },
  undefined,
  function (error) {
    console.error("Erro ao carregar o bolo:", error);
  }
);

// ======================
// ANIMAÇÃO
// ======================
function animate() {
  requestAnimationFrame(animate);

  controls.update();

  // movimento sutil das estrelas
  stars.rotation.y += 0.0003;

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
