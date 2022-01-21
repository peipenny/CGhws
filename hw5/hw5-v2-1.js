import * as THREE from "https://threejs.org/build/three.module.js";
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";
import { TeapotGeometry } from "https://threejs.org/examples/jsm/geometries/TeapotGeometry.js";

var scene, renderer, camera;
var mesh, pointLight;
var turn = true;
var angle = 0;
var meshes = [] ;

var sceneRTT , renderTarget;
var quad;

export function init() {
    var width = window.innerWidth;
    var height = window.innerHeight;

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(width, height);
    document.body.appendChild(renderer.domElement);
    renderer.setClearColor(0x888888);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
    camera.position.y = 160;
    camera.position.z = 400;

    let controls = new OrbitControls(camera, renderer.domElement);


	//////////////////////////////
	
    sceneRTT = new THREE.Scene();
	pointLight = new THREE.PointLight(0xffffff);
	pointLight.position.set(0, 300, 200);
	sceneRTT.add(pointLight);
  
	renderTarget = new THREE.WebGLRenderTarget(
		1024, 1024, {
			minFilter: THREE.LinearFilter,
		magFilter: THREE.NearestFilter,
		format: THREE.RGBFormat
		}
	);
 
    let meshMaterial = new THREE.ShaderMaterial({
        uniforms: {
        lightpos: {type: 'v3', value: new THREE.Vector3()}
        },
        vertexShader: document.getElementById('myVertexShader2').textContent,
        fragmentShader: document.getElementById('myFragmentShader2').textContent
    });
    
	var offsetX = 20;
	var offsetZ = 20;
    //var geometry = new THREE.TorusKnotGeometry(20, 5, 100, 16);
    for(let i=0 ;i<100;i++){
		var geometry = new TeapotGeometry (5);
		mesh = new THREE.Mesh(geometry, meshMaterial);
		meshes.push(mesh);
		sceneRTT.add(mesh);
		meshes[i].position.y += 5;
	}

	for(let i = 0 ; i < 100; i++){
		meshes[i].position.x += -90+(i%10)*offsetX;
	}

	for(let i=0 ;i < 100;i++){
		meshes[i].position.z += -90+Math.floor(i/10)*offsetZ;
	}
	//sceneRTT.add(meshes);
	
	////////////////////
	
	let plane = new THREE.PlaneBufferGeometry(300, 300);
	
	let rttmaterial = new THREE.ShaderMaterial({
    uniforms: {
      mytex: {
        type: "t",
        value: renderTarget.texture
      }
    },
    vertexShader: document.getElementById('myVertexShader').textContent,
    fragmentShader: document.getElementById('myFragmentShader').textContent
	});
	quad = new THREE.Mesh(plane,
		rttmaterial);
	
	scene.add(quad);
	
	//scene.add (new THREE.AxesHelper (50));
	
}

export function animate() {
    
    angle += 0.01;
    
    //pointLight.position.set(50 * Math.cos(angle), 80, 50 * Math.sin(angle));    
	for(let i=0 ;i<100;i++){

		meshes[i].material.uniforms.lightpos.value.copy (pointLight.position);
		meshes[i].rotation.y = 1.3*angle;
	
	}
    requestAnimationFrame(animate);
    render();
}

function render() {
	renderer.setRenderTarget (renderTarget);
	renderer.setClearColor(0xffff00);
	renderer.render(sceneRTT, camera);
	// render texture to quad
	renderer.setRenderTarget(null);
	renderer.setClearColor(0x888888);
	renderer.render(scene, camera);
  
  
    renderer.render(scene, camera);
	quad.lookAt (camera.position);

}

