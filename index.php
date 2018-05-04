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

<body onkeydown="movement_keydown(event)" onkeyup="movement_keyup(event)">
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
		var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.001, 1000);
		var mySpaceship;
		let moveleft_keydown = false;
		let moveright_keydown = false;
		let moveup_keydown = false;
		let movedown_keydown = false;


		var renderer = new THREE.WebGLRenderer();
		renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(renderer.domElement);

		// var controls = new THREE.OrbitControls( camera,renderer.domElement );
		camera.position.set( -0.1, 0.05, 0 );
		camera.rotation.y = -90*Math.PI/180;
		// controls.update();

		
		(function(){
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

		var sky	= THREEx.createSkymap('skybox');
		scene.add( sky );	
		// sky.add(camera);

		var geometry = new THREE.PlaneGeometry( 1000,1000, 32 );
		var material = new THREE.MeshPhongMaterial( {color: 0xffffff, side: THREE.DoubleSide} );
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
			object3d.position.x = 100;
			object3d.rotation.y = 90*Math.PI/180;
		})

		var loadingManager = new THREE.LoadingManager( function() {
			scene.add( mySpaceship );
			// scene.add(plane);
		} );

		// var loader  = new THREEx.UniversalLoader()
		var loader	= new THREE.ColladaLoader(loadingManager);

		var url = 'models/SS1.dae';
		loader.load(url, function(object3d){
			mySpaceship = object3d.scene;
			mySpaceship.add(sky);
		})
		loader.onLoadComplete = function(){(console.log("TADA!"+object3d))}
		
		var animate = function () {
			if(mySpaceship !== undefined){
				mySpaceship.position.x +=0.5;
				camera.position.x +=0.5;
				if(mySpaceship.position.x >= 400){
					mySpaceship.position.x = 0;
					camera.position.x = -0.1;
				}

				if(moveleft_keydown == false){
					if(mySpaceship.rotation.x <0){
						mySpaceship.rotation.x +=3*Math.PI/180;
					}
				}

				if(moveright_keydown == false){
					if(mySpaceship.rotation.x >0){
						mySpaceship.rotation.x -=3*Math.PI/180;
					}
				}

				if(moveup_keydown == false){
					if(mySpaceship.rotation.z >0){
						mySpaceship.rotation.z -=3*Math.PI/180;
					}
				}
				
				if(movedown_keydown == false){
					if(mySpaceship.rotation.z <0){
						mySpaceship.rotation.z +=3*Math.PI/180;
					}
				}

			}
			requestAnimationFrame(animate);

	
			// controls.update();
			renderer.render(scene, camera);
		};
		// renderer.render(scene, camera);
		animate();

		movement_keydown = function(event){
			if(event.key == "ArrowLeft"){
				moveleft_keydown = true;
			}
			if(event.key == "ArrowRight"){
				moveright_keydown = true;
			}
			if(event.key == "ArrowUp"){
				moveup_keydown = true;
			}
			if(event.key == "ArrowDown"){
				movedown_keydown = true;
			}
			updateMovement();
		}

		movement_keyup = function(event){
			if(event.key == "ArrowLeft"){
				moveleft_keydown = false;
			}
			if(event.key == "ArrowRight"){
				moveright_keydown = false;
			}
			if(event.key == "ArrowUp"){
				moveup_keydown = false;
			}
			if(event.key == "ArrowDown"){
				movedown_keydown = false;
			}
			updateMovement();
		}

		updateMovement = function(){
			if(moveleft_keydown == true){
				if(mySpaceship.rotation.x > -90*Math.PI/180){
					mySpaceship.rotation.x -= 2*Math.PI/180;
				}
				if(mySpaceship.rotation.x < 0*Math.PI/180 ){
					mySpaceship.position.z -= -1*(mySpaceship.rotation.x*180/Math.PI)/50 ;
					camera.position.z -= -1*(mySpaceship.rotation.x*180/Math.PI)/50;
				}
			}
	

			if(moveright_keydown == true){
				if(mySpaceship.rotation.x < 90*Math.PI/180 ){
					mySpaceship.rotation.x +=2*Math.PI/180;
				}
				if(mySpaceship.rotation.x > 0*Math.PI/180){
					mySpaceship.position.z += (mySpaceship.rotation.x*180/Math.PI)/50;
					camera.position.z += (mySpaceship.rotation.x*180/Math.PI)/50;
				}
			}

			
			if(moveup_keydown == true){
				if(mySpaceship.rotation.z < 90*Math.PI/180 ){
					mySpaceship.rotation.z +=2*Math.PI/180;
				}
				if(mySpaceship.rotation.z > 0*Math.PI/180){
					mySpaceship.position.y +=2;
					camera.position.y +=2;
				}
			}
				
			if(movedown_keydown == true){
				if(mySpaceship.rotation.z > -90*Math.PI/180 ){
					mySpaceship.rotation.z -=2*Math.PI/180;
				}
				if(mySpaceship.rotation.z < 0*Math.PI/180){
					mySpaceship.position.y -=2;
					camera.position.y -=2;
				}
			}

		}
	</script>
</body>

</html>