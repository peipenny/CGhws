import { Candle } from "./candle.js";


function init(){

	renderer = new THREE.WebGLRenderer({antialias:true});
	renderer.setSize (window.innerWidth,window.innerHeight);
	renderer.setClearColor(0x888888);
	document.body.appendChild(renderer.domElement);
	
	camera = new THREE.PerspectiveCamera(50,window.innerWidth/window.innerHeight,1,1000);
	camera.position.z = 50; // (0,0,50)

	var controls = new THREE.OrbitControls(camera, renderer.domElement);

	scene = new THREE.Scene();
	//var grid = new THREE.GridHelper(240,24,'red','white');
	//scene.add(grid);
	
	mesh = new THREE.Mesh(new THREE.PlaneGeometry(240, 240), 
		new THREE.MeshPhongMaterial({color:0x888888}));
	mesh.rotation.x = -Math.PI / 2;
	scene.add(mesh);
	
	///////////////////////////
	
	candles = new THREE.Group();
	window.addEventListener('resize', onWindowResize, false);
  
	for (let i = 0; i < 5; i++) {
		let candle = new Candle (randomPosZX(-100,100),makeCandle(),makeFlame2());
		scene.add(candle.light,candle.fire);
		candle.mesh.position.y +=10;
	}
	scene.add(candles);
	flameInterval = setInterval (textureAnimate, 100);
	console.log(candles);

	raycaster = new THREE.Raycaster();
	document.addEventListener('pointerdown', onDocumentMouseDown, false);

}

function animate(){
	renderer.render(scene,camera);
	requestAnimationFrame(animate);
	for (let i = 0; i < 5; i++) {
		meshes[i].lookAt (camera.position.x, 0, camera.position.z);
	}
}