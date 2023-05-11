import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js";
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/loaders/OBJLoader.js";

// const w = window.innerWidth;
// const h = window.innerHeight;
const w = 500;
const h = 500;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(110, w / h, 0.1, 1000);
//1 - поворот по горизонтали, 2 - по вертикали, 3- отдаление
camera.position.set(0, 0, 850);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(480, 480);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

function init(geometry) {
    const material = new THREE.MeshMatcapMaterial({
        matcap: new THREE.TextureLoader().load('./3_obj/765_0.jpg')
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const sunlight = new THREE.DirectionalLight(0xffffff);
    sunlight.position.y = 2;
    scene.add(sunlight);

    const filllight = new THREE.DirectionalLight(0x88ccff);
    filllight.position.x = 1;
    filllight.position.y = -2;
    scene.add(filllight);

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();
}

const loader = new OBJLoader();
loader.load("./3_obj/765.obj", (obj) => init(obj.children[0].geometry));

function handleWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', handleWindowResize, false);