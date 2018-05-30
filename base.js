var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
var mySpaceship;
let moveleft_keydown = false;
let moveright_keydown = false;
let moveup_keydown = false;
let movedown_keydown = false;
let touchend = false;
let from=0;
let to = 0;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

THREEx.WindowResize(renderer, camera);


// var controls = new THREE.OrbitControls( camera,renderer.domElement );
camera.position.set( -0.17, 0.05, 0 );
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

var sky	= THREEx.createSkymap('pisa');
scene.add( sky );	
// sky.add(camera);

//CLOUDS 

var textureClouds = THREE.ImageUtils.loadTexture( 'images/cloud10.png', null, animate );
textureClouds.magFilter = THREE.LinearMipMapLinearFilter;
textureClouds.minFilter = THREE.LinearMipMapLinearFilter;

var fog = new THREE.Fog( 0x4584b4, - 100, 3000 );
let geometryClouds = new THREE.PlaneGeometry(64,64);
materialClouds = new THREE.MeshPhongMaterial( {
    fogColor:fog.color,
    fogNear:fog.near,
    fogFar:fog.far,
    map:textureClouds,
    // vertexShader: document.getElementById( 'vs' ).textContent,
    // fragmentShader: document.getElementById( 'fs' ).textContent,
    depthWrite: false,
    // depthTest: false,
    transparent: true,
    opacity:0.5

} );
var cloudsHolderMesh = new THREE.Mesh(geometryClouds,materialClouds);
scene.add(cloudsHolderMesh);
function createClouds(){
    to = to + 800;
    from= to-800;
    for ( var i = from; i < to; i++ ) {
        var cloudsMesh = new THREE.Mesh(geometryClouds,materialClouds);
        cloudsMesh.position.x = i*2;
        cloudsMesh.position.y = - Math.random() * Math.random() * 200 - 100;
        cloudsMesh.position.z = Math.random() * 9000 - 5000;
        cloudsMesh.rotation.z = Math.random() * Math.PI;
        cloudsMesh.rotation.y = 270*Math.PI/180;
        cloudsMesh.scale.x = cloudsMesh.scale.y = Math.random() * Math.random() * 5 + 0.5;
        scene.add(cloudsMesh);
        cloudsHolderMesh.add(cloudsMesh);
    }
}

createClouds();






// var geometry = new THREE.PlaneGeometry( 10000,10000, 32 );
// var cloudMaterial = new THREE.MeshPhongMaterial( {color: 0xffffff, side: THREE.DoubleSide} );
// var cloudMesh = new THREE.Mesh( geometry, cloudMaterial );
// scene.add( cloudMesh );
// cloudMesh.rotation.x = 90*Math.PI/180;
// cloudMesh.position.y = -10;
// floorTexture = THREE.ImageUtils.loadTexture("images/cloud.png");
// floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
// floorTexture.repeat.set(100,100);
// cloudMaterial.map = floorTexture;
// cloudMaterial.transparent = true;
// cloudMaterial.opacity = 0.9;

THREEx.SpaceShips.loadShuttle01(function(object3d){
    scene.add(object3d)
    object3d.position.x = 400;
    object3d.rotation.y = 90*Math.PI/180;
})

var loadingManager = new THREE.LoadingManager( function() {
    scene.add( mySpaceship );

    // scene.add(cloudMesh);
} );

// var loader  = new THREEx.UniversalLoader()
var loader	= new THREE.ColladaLoader(loadingManager);

var url = 'models/SS1.dae';
loader.load(url, function(object3d){
    mySpaceship = object3d.scene;
    mySpaceship.add(sky);
    var detonationR	= new THREEx.SpaceShips.Detonation()
	detonationR.position.x= -2.1;
    detonationR.position.z= 1.5;
    detonationR.position.y = 3;
    detonationR.scale.set(2,2,2);
    detonationR.rotation.y = 90*Math.PI/180;
    scene.add(detonationR);
    mySpaceship.add(detonationR);
    var shootR	= new THREEx.SpaceShips.Shoot()
	shootR.position.x= -2;
    shootR.position.z= 1.5;
    shootR.position.y = 3;
    shootR.rotation.y = 10*Math.PI/180;
    shootR.scale.set(4,4,4);
    scene.add(shootR);
    mySpaceship.add(shootR);

    var detonationL	= new THREEx.SpaceShips.Detonation()
	detonationL.position.x= -2.1;
    detonationL.position.z= -1.5;
    detonationL.position.y = 3;
    detonationL.scale.set(2,2,2);
    detonationL.rotation.y = 90*Math.PI/180;
    scene.add(detonationL);
    mySpaceship.add(detonationL);
    var shootL	= new THREEx.SpaceShips.Shoot()
	shootL.position.x= -2;
    shootL.position.z= -1.5;
    shootL.position.y = 3;
    shootL.rotation.y = -10*Math.PI/180;
    shootL.scale.set(4,4,4);
    scene.add(shootL);
    mySpaceship.add(shootL);
})

var animate = function () {
    if(mySpaceship !== undefined){
        mySpaceship.position.x +=1;
        camera.position.x +=1;
        // if(mySpaceship.position.x%600 == 0){
        //     // cloudsHolderMesh.position.x = cloudsHolderMesh.position.x + 1600;
        //     // console.log(cloudsHolderMesh.position);
        // }

        if(mySpaceship.rotation.z > 0*Math.PI/180){// Up
            if(moveup_keydown == false){
                mySpaceship.rotation.z -=1*Math.PI/180;
            }
            mySpaceship.position.y +=(mySpaceship.rotation.z*180/Math.PI)/50;
            camera.position.y +=(mySpaceship.rotation.z*180/Math.PI)/50;
        }

        if(mySpaceship.rotation.z < 0*Math.PI/180){// Down
            if(movedown_keydown == false){
                mySpaceship.rotation.z +=1*Math.PI/180;
            }
            mySpaceship.position.y -=-1*(mySpaceship.rotation.z*180/Math.PI)/50;
            camera.position.y -=-1*(mySpaceship.rotation.z*180/Math.PI)/50;
        }

        if(mySpaceship.rotation.x < 0*Math.PI/180 ){ //Left
            if(moveleft_keydown == false){
                mySpaceship.rotation.x +=2*Math.PI/180;
            }
            mySpaceship.position.z -= -1*(mySpaceship.rotation.x*180/Math.PI)/50 ;
            camera.position.z -= -1*(mySpaceship.rotation.x*180/Math.PI)/50;
        }

        if(mySpaceship.rotation.x > 0*Math.PI/180){ //Right
            if(moveright_keydown == false){
                mySpaceship.rotation.x -=2*Math.PI/180;
            }
            mySpaceship.position.z += (mySpaceship.rotation.x*180/Math.PI)/50;
            camera.position.z += (mySpaceship.rotation.x*180/Math.PI)/50;
        }


    }
    requestAnimationFrame(animate);


    // controls.update();
    renderer.render(scene, camera);
};
// renderer.render(scene, camera);
animate();