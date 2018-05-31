var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 6000);
var mySpaceship;
let moveleft_keydown = false;
let moveright_keydown = false;
let moveup_keydown = false;
let movedown_keydown = false;
let touchend = false;
let indx = 0;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

THREEx.WindowResize(renderer, camera);

// var controls = new THREE.OrbitControls( camera,renderer.domElement );
camera.position.set( -0.17, 0.05, 0 );
camera.rotation.y = -90*Math.PI/180;


let environment = new Environment(1);

THREEx.SpaceShips.loadShuttle01(function(object3d){
    scene.add(object3d)
    object3d.position.x = 400;
    object3d.rotation.y = 90*Math.PI/180;
})

var loadingManager = new THREE.LoadingManager( function() {
    scene.add( mySpaceship );
} );

var loader	= new THREE.ColladaLoader(loadingManager);

var url = 'models/SS1.dae';
loader.load(url, function(object3d){
    mySpaceship = object3d.scene;
    mySpaceship.add(environment.sky);
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
        mySpaceship.position.x +=3;
        camera.position.x +=3;
        if(mySpaceship.position.x%3 ==0){
            indx++;
            environment.cloudsHolderMesh.children[indx].position.x = mySpaceship.position.x + 8000;
            if(indx >= 7990){
                indx = 0;
            }
        }

        if(mySpaceship.rotation.z > 0*Math.PI/180){// Up
            if(moveup_keydown == false){
                mySpaceship.rotation.z -=2*Math.PI/180;
            }
            mySpaceship.position.y +=3*(mySpaceship.rotation.z*180/Math.PI)/50;
            camera.position.y +=3*(mySpaceship.rotation.z*180/Math.PI)/50;
        }

        if(mySpaceship.rotation.z < 0*Math.PI/180){// Down
            if(movedown_keydown == false){
                mySpaceship.rotation.z +=2*Math.PI/180;
            }
            mySpaceship.position.y -=-3*(mySpaceship.rotation.z*180/Math.PI)/50;
            camera.position.y -=-3*(mySpaceship.rotation.z*180/Math.PI)/50;
        }

        if(mySpaceship.rotation.x < 0*Math.PI/180 ){ //Left
            if(moveleft_keydown == false){
                mySpaceship.rotation.x +=2*Math.PI/180;
            }
            mySpaceship.position.z -= -3*(mySpaceship.rotation.x*180/Math.PI)/50 ;
            camera.position.z -= -3*(mySpaceship.rotation.x*180/Math.PI)/50;
        }

        if(mySpaceship.rotation.x > 0*Math.PI/180){ //Right
            if(moveright_keydown == false){
                mySpaceship.rotation.x -=2*Math.PI/180;
            }
            mySpaceship.position.z += 3*(mySpaceship.rotation.x*180/Math.PI)/50;
            camera.position.z += 3*(mySpaceship.rotation.x*180/Math.PI)/50;
        }


    }
    requestAnimationFrame(animate);


    // controls.update();
    renderer.render(scene, camera);
};
// renderer.render(scene, camera);
animate();