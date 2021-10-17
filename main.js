import './style.css'

import * as THREE from 'three';

//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function build3Dbg(){
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
  
    const[x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(200)); // the distance from the ring will be 200
  
    star.position.set(x,y,z);
  
    scene.add( star );
  }
  
  Array(700).fill().forEach(addStar); // add 700 stars 
  
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
  const moonNormalTexture = new THREE.TextureLoader().load('images/normal.jpg');
  
  const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3,32,32),
    new THREE.MeshStandardMaterial({
      map:moonTexture,
      normalMap:moonNormalTexture
    })
  );
  scene.add(moon);

  // moving the moon
  moon.position.z = 30;
  moon.position.setX(-10);

  // adding Sun
  const sunTexture = new THREE.TextureLoader().load('images/sun.jpg');
  const sunNormalTexture = new THREE.TextureLoader().load('images/sunNormal.jpg');
  
  const sun = new THREE.Mesh(
    new THREE.SphereGeometry(3,32,32),
    new THREE.MeshStandardMaterial({
      map:sunTexture,
      normalMap:sunNormalTexture
    })
  );
  scene.add(sun);

  // moving the sun
  sun.position.z = 60;
  sun.position.setX(-10);


  
  gal.position.z = -5;
  gal.position.x = 2;
  
  function moveCamera(){
    const t = document.body.getBoundingClientRect().top; // will get how much we scrool from the top of the page
    moon.rotation.x += 0.05;
    moon.rotation.y += 0.075;
    moon.rotation.z += 0.05;

    sun.rotation.x += 0.05;
    sun.rotation.y += 0.075;
    sun.rotation.z += 0.05;
  
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
  
    sun.rotation.y += 0.005;

    renderer.render(scene,camera);
  }
  
  animate();
}

function fillContent(){

}

build3Dbg();


//abilites
  //adding Skills table with Satrs
  // var star = '<i class="fas fa-star"></i>';
  var star = '<ion-icon name="star-sharp" class="rating" ></ion-icon>';
  // var blank_star = '<i class="far fa-star"></i>';
  var blank_star = '<ion-icon name="star-outline" class="rating"></ion-icon>';


// the function will fill table with stars
let fillTable = function(data,id){
  for(let index in data ){
    let rating = data[index].rating;
    let name = data[index].name;
    let stars = star.repeat(rating) + blank_star.repeat(5-rating);
    document.getElementById(id).innerHTML +=
    `<tr ><td class="name">${name}</td><td class="stars">${stars}</td></tr>`;
  }
}
let fiilExperiences = function(data,id){
  for(let index in data){
    let school = data[index].school;
    let date = data[index].start_date + " - " + data[index].end_date;
    let subject = data[index].subject;
    let content = data[index].content;
    let location = data[index].location;

    document.getElementById(id).innerHTML +=
    `
      <div class="educationRow">
        <div class="title">
          <h4>${school}</h4>
          <h6>${date}</h6>
        </div>
        <div class = "content">
          <strong>${subject}</strong>
          <div class = "roleExplained">${content}</div>
          <span>${location}</span>
        </div>
      </div>
    `
  }
}

let fiilCareers = function(data,id){
  for(let index in data){
    let company = data[index].company;
    let date = data[index].start_date + " - " + data[index].end_date;
    let role = data[index].role;
    let content = data[index].content;
    let location = data[index].location;

    document.getElementById(id).innerHTML +=
    `
      <div class="educationRow">
        <div class="title">
          <h4>${company}</h4>
          <h6>${date}</h6>
        </div>
        <div class = "content">
          <strong>${role}</strong>
          <div class = "roleExplained">${content}</div>
          <span>${location}</span>
        </div>
      </div>
    `
  }
}
  //get the json Skills file 
  fetch('./jsonData/Skills.json')
  .then(results => results.json())
  .then(data => {
    fillTable(data.sort((firstRating, secondRating) => secondRating.rating - firstRating.rating),"skillsTable"); // fill SkillsTable
  });

  //get the json Languages file
  fetch('./jsonData/languages.json')
  .then(results => results.json())
  .then(data => {
    fillTable(data,"languagesTable"); // fill languagesTable
  });
  
  //get the json Tools & Software  file
  fetch('./jsonData/tools&software.json')
  .then(results => results.json())
  .then(data => {
    fillTable(data,"toolsTable"); // fill toolsTable
  });

  //get the json educationInfo  file
  fetch('./jsonData/educationInfo.json')
  .then(results => results.json())
  .then(data => {
    fiilExperiences(data,"educationTable"); // fill educationTable
  });

  //get the json educationInfo  file

  fetch('./jsonData/careersInfo.json')
  .then(results => results.json())
  .then(data => {
    fiilCareers(data,"careersTable"); // fill educationTable
  });

// adding carusela with the project I made
  //fill the carusela
  //desing the carusela
  