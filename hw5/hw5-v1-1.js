import * as THREE from "https://threejs.org/build/three.module.js";
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";
import { TeapotGeometry } from "https://threejs.org/examples/jsm/geometries/TeapotGeometry.js";

var scene, renderer, camera;
var mesh, pointLight;
var angle = 0;
var meshes = [] ;


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

    var gridXZ = new THREE.GridHelper(200, 20, 'red', 'white');
    scene.add(gridXZ);

    pointLight = new THREE.PointLight(0xffffff);
    scene.add (pointLight);
    scene.add (new THREE.PointLightHelper(pointLight, 5));

	var ambientLight = new THREE.AmbientLight(0x111111);
    scene.add(ambientLight);

 
    let meshMaterial = new THREE.ShaderMaterial({
        uniforms: {
        lightpos: {type: 'v3', value: new THREE.Vector3()}
        },
        vertexShader: document.getElementById('myVertexShader').textContent,
        fragmentShader: document.getElementById('myFragmentShader').textContent
    });

    
	var offsetX = 20;
	var offsetZ = 20;
    //var geometry = new THREE.TorusKnotGeometry(20, 5, 100, 16);
    for(let i=0 ;i<100;i++){
		var geometry = new TeapotGeometry (5);
		mesh = new THREE.Mesh(geometry, meshMaterial);
		meshes.push(mesh);
		scene.add(mesh);
		meshes[i].position.y += 5;
	}

	for(let i = 0 ; i < 100; i++){
		meshes[i].position.x += -90+(i%10)*offsetX;
	}

	for(let i=0 ;i < 100;i++){
		meshes[i].position.z += -90+Math.floor(i/10)*offsetZ;
	}

}

export function animate() {
    
    angle += 0.01;
    
    pointLight.position.set(50 * Math.cos(angle), 80, 50 * Math.sin(angle));    
    for(let i=0 ;i<100;i++){
	
		meshes[i].material.uniforms.lightpos.value.copy (pointLight.position);
		meshes[i].rotation.y = 1.3*angle;
		console.log(meshes[i].rotation.y);
	}
    requestAnimationFrame(animate);
    
	render();
}

function render() {
    renderer.render(scene, camera);
}
