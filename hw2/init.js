var renderer, scene, camera ,controls;
var keyboard = new KeyboardState();
var clock;

var car;
var pos = new THREE.Vector3();
var vel = new THREE.Vector3();
var force = new THREE.Vector3();
var power, angle;
var circles =[];

var cameraHUD, sceneHUD ,camera3rd;


(function() {
  Math.clamp = function(val,min,max){
    return Math.min(Math.max(val,min),max);
    
  }})();
  
function initHUD() {

	sceneHUD = new THREE.Scene();
	cameraHUD = new THREE.OrthographicCamera(-10.5, 10.5, 10.5, -10.5, -10, 10);
	cameraHUD.position.z = 5;

	let points = [];
	points.push(new THREE.Vector3(-10, -10, 0),
		new THREE.Vector3(10, -10, 0),
		new THREE.Vector3(10, 10, 0),
		new THREE.Vector3(-10, 10, 0),
		new THREE.Vector3(-10, -10, 0));
	var lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
	var line = new THREE.Line(lineGeometry,
		new THREE.LineBasicMaterial({
		color: 0xffffff
	}));
	sceneHUD.add(line);
	
}

function init() {
	
	clock = new THREE.Clock();
	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
	camera.position.set (0, 200, 250);
	
	camera3rd = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
	
	scene.add(camera);

	var gridXZ = new THREE.GridHelper(200, 20, 'red', 'white');
	scene.add(gridXZ);

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor(0x888888);

	controls = new THREE.OrbitControls(camera, renderer.domElement);
  
	// disable OrbitControl keys
	controls.enableKeys = false;
  
	document.body.appendChild(renderer.domElement);
	//////////////
	power = 5.0;
	angle = 0.0;
  	//////////////
	
	let circle1 = new THREE.Mesh (new THREE.CylinderGeometry( 10, 10, 5, 32 ), new THREE.MeshBasicMaterial());
	let circle2 = new THREE.Mesh (new THREE.CylinderGeometry( 10, 10, 5, 32 ), new THREE.MeshBasicMaterial());
	let circle3 = new THREE.Mesh (new THREE.CylinderGeometry( 10, 10, 5, 32 ), new THREE.MeshBasicMaterial());

	scene.add (circle1,circle2,circle3);
	//circle.rotation.x = -Math.PI/2; 
	circle1.position.set (20,0,10);
	circle2.position.set (-40,0,30);
	circle3.position.set (60,0,-20);

	circles.push(circle1,circle2,circle3);

	car = new THREE.Group();
	rect = new THREE.Mesh (new THREE.BoxGeometry(20, 10, 2), new THREE.MeshPhongMaterial({side: THREE.DoubleSide}));
	
	var mat = new THREE.MeshPhongMaterial();
	var body = new THREE.Mesh(new THREE.BoxGeometry(10, 2, 2), mat);
	body.position.x+=10 ;
	car.add(body);
	car.add (rect);
	rect.rotation.x = Math.PI/2;  //***
	scene.add (car);

	initHUD();
	renderer.autoClear = false;
	
	pointLight = new THREE.PointLight(0x404040,20,300);
	pointLight.position.set(100,50,100);
	scene.add(pointLight);

}

function onWindowResize() {
  
	var width = window.innerWidth;
	var height = window.innerHeight;
	camera.aspect = width / height;
	camera.updateProjectionMatrix();
	renderer.setSize(width, height);
	
}