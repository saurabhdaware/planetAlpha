class Models{
    constructor(){
        
    }

    loadShuttle(type){
        switch(type){
            case 1:
            THREEx.SpaceShips.loadShuttle01(function(object3d){
                scene.add(object3d)
                object3d.position.x = 400;
                object3d.rotation.y = 90*Math.PI/180;
            })
            break;
            
        }
    }

    loadMyShuttle(loader,type){
        if(type==1){
            var url = 'models/SS1.dae';
            loader.load(url, function(object3d){
                mySpaceship = object3d.scene;
                mySpaceship.add(environment.sky);
                var detonationR	= new THREEx.SpaceShips.Detonation(0xff9955)
                detonationR.position.x= -2.1;
                detonationR.position.z= 1.5;
                detonationR.position.y = 3;
                detonationR.scale.set(2,2,2);
                detonationR.rotation.y = 90*Math.PI/180;
                scene.add(detonationR);
                mySpaceship.add(detonationR);
                var shootR	= new THREEx.SpaceShips.Shoot(0xff9955)
                shootR.position.x= -2;
                shootR.position.z= 1.5;
                shootR.position.y = 3;
                shootR.rotation.y = 10*Math.PI/180;
                shootR.scale.set(4,4,4);
                scene.add(shootR);
                mySpaceship.add(shootR);
    
                var detonationL	= new THREEx.SpaceShips.Detonation(0xff9955)
                detonationL.position.x= -2.1;
                detonationL.position.z= -1.5;
                detonationL.position.y = 3;
                detonationL.scale.set(2,2,2);
                detonationL.rotation.y = 90*Math.PI/180;
                scene.add(detonationL);
                mySpaceship.add(detonationL);
                var shootL	= new THREEx.SpaceShips.Shoot(0xff9955)
                shootL.position.x= -2;
                shootL.position.z= -1.5;
                shootL.position.y = 3;
                shootL.rotation.y = -10*Math.PI/180;
                shootL.scale.set(4,4,4);
                scene.add(shootL);
                mySpaceship.add(shootL);
            })
        }
        if(type == 2){
            gltfLoad.load('models/SS6.glb',function(object3d){
                mySpaceship = object3d.scene;
                mySpaceship.add(environment.sky);
                scene.add(mySpaceship);
                mySpaceship.position.x = 0.15;
                mySpaceship.scale.set(0.5,0.5,0.5);
                var detonationR	= new THREEx.SpaceShips.Detonation(0xff9955)
                detonationR.position.x= -0.20;
                detonationR.position.z= 0.09;
                detonationR.position.y = 0;
                detonationR.scale.set(0.1,0.1,0.1);
                detonationR.rotation.y = 90*Math.PI/180;
                scene.add(detonationR);
                mySpaceship.add(detonationR);
                var shootR	= new THREEx.SpaceShips.Shoot(0xff9955)
                shootR.position.x= -0.15;
                shootR.position.z= 0.09;
                shootR.position.y = 0;
                shootR.rotation.y = 2*Math.PI/180;
                shootR.scale.set(0.3,0.3,0.3);
                scene.add(shootR);
                mySpaceship.add(shootR);
    
                var detonationL	= new THREEx.SpaceShips.Detonation(0xff9955)
                detonationL.position.x= -0.20;
                detonationL.position.z= -0.09;
                detonationL.position.y = 0;
                detonationL.scale.set(0.1,0.1,0.1);
                detonationL.rotation.y = 90*Math.PI/180;
                scene.add(detonationL);
                mySpaceship.add(detonationL);
                var shootL	= new THREEx.SpaceShips.Shoot(0xff9955)
                shootL.position.x= -0.15;
                shootL.position.z= -0.09;
                shootL.position.y = 0;
                shootL.rotation.y = -2*Math.PI/180;
                shootL.scale.set(0.3,0.3,0.3);
                scene.add(shootL);
                mySpaceship.add(shootL);

                var detonationC	= new THREEx.SpaceShips.Detonation(0x0099ff)
                detonationC.position.x= -0.25;
                detonationC.position.z= 0.01;
                detonationC.position.y = 0.01;
                detonationC.scale.set(0.1,0.1,0.1);
                detonationC.rotation.y = 90*Math.PI/180;
                scene.add(detonationC);
                mySpaceship.add(detonationC);
                var shootC	= new THREEx.SpaceShips.Shoot(0x0099ff)
                shootC.position.x= -0.18;
                shootC.position.z= 0.005;
                shootC.position.y = 0.01;
                shootC.rotation.y = 0*Math.PI/180;
                shootC.scale.set(0.3,0.3,0.3);
                scene.add(shootC);
                mySpaceship.add(shootC);
            });
        }
    }
}