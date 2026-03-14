// Your unique interactive cursor effect
// No license needed – 100% yours!

import * as THREE from 'https://cdn.skypack.dev/three@0.128.0';

// --- Setup Scene, Camera, Renderer ---
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0a0f1c); // Match your portfolio's dark theme

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 30;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// --- Lights (this is what makes colors pop) ---
const ambientLight = new THREE.AmbientLight(0x404060);
scene.add(ambientLight);

const light1 = new THREE.PointLight(0xff6b6b, 1, 50);
light1.position.set(10, 10, 10);
scene.add(light1);

const light2 = new THREE.PointLight(0x4ecdc4, 1, 50);
light2.position.set(-10, -5, 10);
scene.add(light2);

// --- Create Your Signature Element: A Galaxy of Particles ---
const particleCount = 1500;
const geometry = new THREE.BufferGeometry();

const positions = new Float32Array(particleCount * 3);
const colors = new Float32Array(particleCount * 3);

// Your unique color palette (inspired by your amber/violet theme)
const colorPalette = [
    new THREE.Color(0xf59e0b), // amber
    new THREE.Color(0x8b5cf6), // violet
    new THREE.Color(0xff6b6b), // coral
    new THREE.Color(0x4ecdc4)  // teal
];

for (let i = 0; i < particleCount; i++) {
    // Position particles in a sphere
    const radius = 15;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);
    
    positions[i*3] = Math.sin(phi) * Math.cos(theta) * radius;
    positions[i*3+1] = Math.sin(phi) * Math.sin(theta) * radius;
    positions[i*3+2] = Math.cos(phi) * radius;
    
    // Assign random colors from your palette
    const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    colors[i*3] = color.r;
    colors[i*3+1] = color.g;
    colors[i*3+2] = color.b;
}

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

// Create the particle material
const material = new THREE.PointsMaterial({
    size: 0.2,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    transparent: true,
    opacity: 0.8
});

const particles = new THREE.Points(geometry, material);
scene.add(particles);

// Add a few larger central spheres for depth
const sphereGeo = new THREE.SphereGeometry(0.5, 16, 16);
const sphereMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, emissive: 0x442200 });
const sphere1 = new THREE.Mesh(sphereGeo, sphereMat);
sphere1.position.set(2, 1, -2);
scene.add(sphere1);

const sphere2 = new THREE.Mesh(sphereGeo, sphereMat);
sphere2.material = sphereMat.clone();
sphere2.material.color.setHex(0x8b5cf6);
sphere2.position.set(-3, -1, 1);
scene.add(sphere2);

// --- Mouse Interaction Variables ---
let mouseX = 0;
let mouseY = 0;
let targetRotationX = 0;
let targetRotationY = 0;

document.addEventListener('mousemove', (event) => {
    // Map mouse position to rotation values (-1 to 1)
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    
    targetRotationY = mouseX * 0.5;
    targetRotationX = mouseY * 0.3;
});

// --- Animation Loop ---
function animate() {
    requestAnimationFrame(animate);
    
    // Smoothly rotate the scene based on mouse
    particles.rotation.y += (targetRotationY - particles.rotation.y) * 0.05;
    particles.rotation.x += (targetRotationX - particles.rotation.x) * 0.05;
    
    // Make spheres float slightly
    sphere1.position.x = 2 + Math.sin(Date.now() * 0.001) * 0.5;
    sphere2.position.x = -3 + Math.cos(Date.now() * 0.001) * 0.5;
    
    renderer.render(scene, camera);
}

animate();

// --- Handle Window Resize ---
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
