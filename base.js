var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.001, 10000);
var mySpaceship;
let moveleft_keydown = false;
let moveright_keydown = false;
let moveup_keydown = false;
let movedown_keydown = false;
let touchend = false;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

THREEx.WindowResize(renderer, camera);


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

var geometry = new THREE.PlaneGeometry( 10000,10000, 32 );
var material = new THREE.MeshPhongMaterial( {color: 0xffffff, side: THREE.DoubleSide} );
var plane = new THREE.Mesh( geometry, material );
scene.add( plane );
plane.rotation.x = 90*Math.PI/180;
plane.position.y = -10;
floorTexture = THREE.ImageUtils.loadTexture("images/cloud.png");
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
floorTexture.repeat.set(100,100);
material.map = floorTexture;
material.transparent = true;
material.opacity = 0.5;

THREEx.SpaceShips.loadShuttle01(function(object3d){
    scene.add(object3d)
    object3d.position.x = 400;
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
var texture = new THREE.Texture();
var loader = new THREE.ImageLoader(loadingManager);
loader.load('models/mountainTexture.png',function(image) {
    texture.image = image;
    texture.needsUpdate = true;
});

var loader = new THREE.OBJLoader(loadingManager);
let mountainsURL = 'models/mountain.obj';
loader.load(mountainsURL,function(mountainsObject){
    mountainsObject.traverse(function(child) {
        if (child instanceof THREE.Mesh) {
            child.material.map = texture;
            child.material.normalMap = THREE.ImageUtils.loadTexture('models/mountainNormal.png');
            child.material.bumpMap = THREE.ImageUtils.loadTexture('models/mountainBump.tif');
            child.material.bumpScale = 1.5;
        }
    });
    mountainsObject.scale.set(50,50,50);
    mountainsObject.position.x = 1300;
    scene.add(mountainsObject);
})

var animate = function () {
    if(mySpaceship !== undefined){
        mySpaceship.position.x +=1;
        camera.position.x +=1;
        if(mySpaceship.position.x%300 == 0){
            // mySpaceship.position.x = 0;
            // camera.position.x = -0.1;
            plane.position.x = plane.position.x + 300;
            console.log(plane.position.x);
        }

        if(mySpaceship.rotation.z > 0*Math.PI/180){// Up
            if(moveup_keydown == false){
                mySpaceship.rotation.z -=3*Math.PI/180;
            }
            mySpaceship.position.y +=(mySpaceship.rotation.z*180/Math.PI)/50;
            camera.position.y +=(mySpaceship.rotation.z*180/Math.PI)/50;
        }

        if(mySpaceship.rotation.z < 0*Math.PI/180){// Down
            if(movedown_keydown == false){
                mySpaceship.rotation.z +=3*Math.PI/180;
            }
            mySpaceship.position.y -=-1*(mySpaceship.rotation.z*180/Math.PI)/50;
            camera.position.y -=-1*(mySpaceship.rotation.z*180/Math.PI)/50;
        }

        if(mySpaceship.rotation.x < 0*Math.PI/180 ){ //Left
            if(moveleft_keydown == false){
                mySpaceship.rotation.x +=3*Math.PI/180;
            }
            mySpaceship.position.z -= -1*(mySpaceship.rotation.x*180/Math.PI)/50 ;
            camera.position.z -= -1*(mySpaceship.rotation.x*180/Math.PI)/50;
        }

        if(mySpaceship.rotation.x > 0*Math.PI/180){ //Right
            if(moveright_keydown == false){
                mySpaceship.rotation.x -=3*Math.PI/180;
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