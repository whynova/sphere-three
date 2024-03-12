import * as THREE from 'three';
import './style.css'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {gsap} from 'gsap';

const scene = new THREE.Scene();

const geometry = new THREE.SphereGeometry(3,64,64);
const material = new THREE.MeshStandardMaterial({color:"#9a47ff",roughness:0.3,});


const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);


//sizes 
const size = {
  width:window.innerWidth,
  hieght: window.innerHeight,
}


//light
// const light = new THREE.PointLight(0xffffff,1,100);
// light.position.set(0,10,10);
// scene.add(light);

// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Ambient light
// scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Directional light
directionalLight.position.set(-10, 10, 10); // x y z 
directionalLight.intensity = 1.25;
scene.add(directionalLight);

// const lightHelper = new THREE.DirectionalLightHelper(directionalLight, 1); // Helper for visualizing light
// scene.add(lightHelper);



const camera = new THREE.PerspectiveCamera(45,size.width/size.hieght,0.1,100); //field of view , aspect ratio //cliping points 0.1 to 100
camera.position.z=20;
scene.add(camera);


//renderer
const canvas = document.querySelector(".webgl");

console.log(canvas);

const renderer = new THREE.WebGLRenderer({canvas});

renderer.setSize(size.width,size.hieght);
renderer.setPixelRatio(3);
renderer.render(scene,camera);//renders on screen 



//controls
const controls = new OrbitControls(camera,canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 4;


window.addEventListener('resize',()=>{
  size.hieght = window.innerHeight;
  size.width = window.innerWidth;

  camera.aspect = size.width/size.hieght;
  camera.updateProjectionMatrix();
  renderer.setSize(size.width,size.hieght);
})

const loop=()=>{
  // mesh.position.x+=0.1;
  controls.update();
  renderer.render(scene,camera);
  window.requestAnimationFrame(loop);
}
loop();


const t1 = gsap.timeline({default :{duration:2}});
t1.fromTo(mesh.scale,{z:0,x:0,y:0},{z:1,x:1,y:1});
t1.fromTo('nav',{y:"-100%"},{y:"0%"});
t1.fromTo("h1",{opacity:0},{opacity:1});

//colour
let rgb = []
let mouseDown = false;
window.addEventListener("mousedown",()=>(mouseDown=true));
window.addEventListener("mouseup",()=>(mouseDown=false));

window.addEventListener("mousemove",(e)=>{
  if(mouseDown){
    rgb = [
      Math.round((e.pageX/size.width)*255),
      Math.round,((e.pageY/size.hieght)*255),
      150,
    ]
    // console.log(rgb);
    let newColor = new THREE.Color(`rgb(${rgb.join(",")})`)
    console.log(newColor.r);
    gsap.to(mesh.material.color,{r:newColor.r,g:newColor.g,b:newColor.b})
  }
})