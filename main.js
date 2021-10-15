import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


const scene = new THREE.Scene(); // container that hold the objects

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ // the object that we want to render
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene,camera); // draw

const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 ); // define the vector size
const material = new THREE.MeshStandardMaterial( { color: 0x474747, wireframe:false } ); // wrapping for the object
const torus = new THREE.Mesh( geometry, material );
scene.add( torus );

// define light on the ring
const pointLight = new THREE.PointLight(0xffffff); //light for shade
pointLight.position.set(5,5,5);

const ambientLight = new THREE.AmbientLight(0xffffff); //light for the shape of the ring
scene.add(pointLight,ambientLight);

// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200,50);
// scene.add(lightHelper);

// const controls = new OrbitControls(camera , renderer.domElement); // for moving the shape with toogle mouse 

// adding stars to the bg
function addStar(){
  const geometry = new THREE.SphereGeometry( 0.25, 24, 24 ); // size of the star
  const material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
  const star = new THREE.Mesh( geometry, material );

  const[x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100)); // the distance from the ring will be 200

  star.position.set(x,y,z);

  scene.add( star );
}

Array(200).fill().forEach(addStar); // add 200 stars 

// adding Background picture
const spaceTexture = new THREE.TextureLoader().load('images/space.jpg');
scene.background = spaceTexture;

// adding a box with my image
const galTexture = new THREE.TextureLoader().load('images/gal.png');
const gal = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map:galTexture})
);

scene.add(gal);

// adding Moon

const moonTexture = new THREE.TextureLoader().load('images/moon.jpg');
const normalTexture = new THREE.TextureLoader().load('images/normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({
    map:moonTexture,
    normalMap:normalTexture
  })
);
scene.add(moon);

// moving the moon
moon.position.z = 30;
moon.position.setX(-10);

gal.position.z = -5;
gal.position.x = 2;

function moveCamera(){
  const t = document.body.getBoundingClientRect().top; // will get how much we scrool from the top of the page
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  gal.rotation.y += 0.01;
  gal.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

function animate(){
  requestAnimationFrame( animate );
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  moon.rotation.x += 0.005;
  // controls.update(); // update the changes that need to reflected by the UI

  renderer.render(scene,camera);
}

animate();