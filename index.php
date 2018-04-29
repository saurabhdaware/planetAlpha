<html>

<head>
	<title>My first three.js app</title>
	<style>
		body {
			margin: 0;
		}

		canvas {
			width: 100%;
			height: 100%
		}
	</style>
</head>

<body>
	<script src="js/three.js-master/build/three.js"></script>
	<script src="js/three.js-master/build/three.min.js"></script>
	<script src="js/three.js-master/examples/js/controls/OrbitControls.js"></script>
	<script src="js/three.js-master/examples/js/loaders/OBJLoader.js"></script>
	<script src="js/three.js-master/examples/js/loaders/MTLLoader.js"></script>
	<script src="js/three.js-master/examples/js/loaders/ColladaLoader.js"></script>
	<script src='js/threex.skymap/threex.skymap.js'></script>
	<script src='js/threex.skymap/threex.texturecube.js'></script>
	<script src='js/threex.skymap/threex.cubetexturehcross.js'></script>
	<script src='js/threex.universalloader/threex.universalloader.js'></script>
	<script src="js/threex.spaceships/threex.spaceships.js"></script>

	<script>
		var scene = new THREE.Scene();
		var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);


		var renderer = new THREE.WebGLRenderer();
		renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(renderer.domElement);

		var controls = new THREE.OrbitControls( camera,renderer.domElement );
		camera.position.set( 0, 20, 100 );
		controls.update();

		
		;(function(){
			var object3d	= new THREE.AmbientLight(0x101010*8)
			object3d.name	= 'Ambient light'
			scene.add(object3d)

			var object3d	= new THREE.DirectionalLight('white', 0.225)
			object3d.position.set(2.6,1,3)
			object3d.name	= 'Back light'
			scene.add(object3d)

			var object3d	= new THREE.DirectionalLight('white', 0.375)
			object3d.position.set(-2, -1, 0)
			object3d.name 	= 'Key light'
			scene.add(object3d)

			var object3d	= new THREE.DirectionalLight('white', 0.5*1)
			object3d.position.set(3, 3, 2)
			object3d.name	= 'Fill light'
			scene.add(object3d)		
		})()

		var mesh	= THREEx.createSkymap('skybox')
		scene.add( mesh )	

		var geometry = new THREE.PlaneGeometry( 1000,1000, 32 );
		var material = new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide} );
		var plane = new THREE.Mesh( geometry, material );
		scene.add( plane );
		plane.rotation.x = 90*Math.PI/180;
		plane.position.y = -10;
		floorTexture = THREE.ImageUtils.loadTexture("images/cloud.png");
		floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
		floorTexture.repeat.set(10,10);
		material.map = floorTexture;
		material.transparent = true;
		material.opacity = 0.5;

		THREEx.SpaceShips.loadShuttle01(function(object3d){
			scene.add(object3d)
			object3d.position.x = 10
		})

		var loader  = new THREEx.UniversalLoader()
		
		var url = 'models/SS1.dae';
		loader.load(url, function(object3d){
			scene.add(object3d)
			object3d.scale.multiplyScalar(10);
			object3d.add(camera)
		})

		var animate = function () {
			requestAnimationFrame(animate);
			controls.update();
			renderer.render(scene, camera);
		};

		animate();
	</script>
</body>

</html>