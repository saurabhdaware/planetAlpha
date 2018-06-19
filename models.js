class Models{
    constructor(){
        this.shootL = new THREEx.SpaceShips.Shoot(0xff9955);
        this.shootR = new THREEx.SpaceShips.Shoot(0xff9955);
        this.detonationL = new THREEx.SpaceShips.Detonation(0xff9955);
        this.detonationR = new THREEx.SpaceShips.Detonation(0xff9955);
        // console.log(this);
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
        // console.log(this);
        let detonationL = this.detonationL;
            let detonationR = this.detonationR;
            let shootL = this.shootL;
            let shootR = this.shootR;

        if(type==1){
            var url = 'models/SS1.dae';
            loader.load(url, function(object3d){
                mySpaceship = object3d.scene;
                mySpaceship.add(environment.sky);
                // var this.detonationR	= new THREEx.SpaceShips.Detonation(0xff9955)
                detonationR.position.x= -2.1;
                detonationR.position.z= 1.5;
                detonationR.position.y = 3;
                detonationR.scale.set(2,2,2);
                detonationR.rotation.y = 90*Math.PI/180;
                scene.add(detonationR);

                mySpaceship.add(detonationR); 
                // var this.shootR	= new THREEx.SpaceShips.Shoot(0xff9955)
                shootR.position.x= -2;
                shootR.position.z= 1.5;
                shootR.position.y = 3;
                shootR.rotation.y = 10*Math.PI/180;
                shootR.scale.set(4,4,4);
                scene.add(shootR);
                mySpaceship.add(shootR);
     
                // var this.detonationL	= new THREEx.SpaceShips.Detonation(0xff9955)
                detonationL.position.x= -2.1;
                detonationL.position.z= -1.5;
                detonationL.position.y = 3;
                detonationL.scale.set(2,2,2);
                detonationL.rotation.y = 90*Math.PI/180;
                scene.add(detonationL);
                mySpaceship.add(detonationL);
                // var this.shootL	= new THREEx.SpaceShips.Shoot(0xff9955)
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
            loader.load('models/SS6.glb',function(object3d){
                mySpaceship = object3d.scene;
                mySpaceship.add(environment.sky);
                scene.add(mySpaceship);
                mySpaceship.position.x = 3;
                camera.position.x = 2.6;
                mySpaceship.scale.set(0.35,0.35,0.35);
                // var this.detonationR	= new THREEx.SpaceShips.Detonation(0x0099ff)
                detonationR.position.x= -0.388;
                detonationR.position.z= 0.02;
                detonationR.position.y = -0.02;
                detonationR.scale.set(0.1,0.1,0.1);
                detonationR.rotation.y = 90*Math.PI/180;
                scene.add(detonationR);
                mySpaceship.add(detonationR);
                // var this.shootR	= new THREEx.SpaceShips.Shoot(0x0099ff)
                shootR.position.x= -0.4;
                shootR.position.z= 0.01;
                shootR.position.y = -0.02;
                shootR.rotation.y = 2*Math.PI/180;
                shootR.scale.set(0.3,0.2,0.5);
            
                scene.add(shootR);
                mySpaceship.add(shootR);
    
                // var this.detonationL	= new THREEx.SpaceShips.Detonation(0x0099ff)
                detonationL.position.x= -0.388;
                detonationL.position.z= -0.03;
                detonationL.position.y = -0.02;
                detonationL.scale.set(0.1,0.1,0.1);
                detonationL.rotation.y = 90*Math.PI/180;
                scene.add(detonationL);
                mySpaceship.add(detonationL);
                // var this.shootL	= new THREEx.SpaceShips.Shoot(0x0099ff)
                shootL.position.x= -0.4;
                shootL.position.z= -0.01;
                shootL.position.y = -0.02;
                shootL.rotation.y = -2*Math.PI/180;
                shootL.scale.set(0.3,0.2,0.5);
                scene.add(shootL);
                mySpaceship.add(shootL);

                for(let i=0;i<=3;i++){
                    shootR.children[i].material.color = {r:0,g:0.6,b:1}
                    shootL.children[i].material.color = {r:0,g:0.6,b:1}
                }
                detonationL.material.color = {r:0,g:0.6,b:1};
                detonationR.material.color = {r:0,g:0.6,b:1};
            });
        }

        if(type==3){
            loader.load('models/SS2.glb',function(object3d){
                mySpaceship = object3d.scene;
                mySpaceship.scale.set(0.3,0.3,0.3);
                camera.position.x = -0.2;
                scene.add(mySpaceship);
                mySpaceship.add(environment.sky);
            })
        }

        if(type == 4){
            loader.load('models/SS3.glb',function(object3d){ 
                mySpaceship = object3d.scene;
                mySpaceship.scale.set(0.15,0.15,0.15);
                scene.add(mySpaceship);
                mySpaceship.add(environment.sky);
                mySpaceship.position.y = 0.01;

                detonationR.position.x= -0.45;
                detonationR.position.z= 0.076;
                detonationR.position.y = 0;
                detonationR.scale.set(0.2,0.2,0.2);
                detonationR.rotation.y = 90*Math.PI/180;
                scene.add(detonationR);
                mySpaceship.add(detonationR);
                
                shootR.position.x= -0.5;
                shootR.position.z= 0.076;
                shootR.position.y = 0;
                shootR.rotation.y = 0*Math.PI/180;
                shootR.scale.set(0.3,0.3,0.3);
                scene.add(shootR);
                mySpaceship.add(shootR);
     
                detonationL.position.x= -0.45;
                detonationL.position.z= -0.076;
                detonationL.position.y = 0;               
                detonationL.scale.set(0.2,0.2,0.2);
                detonationL.rotation.y = 90*Math.PI/180;
                scene.add(detonationL);
                mySpaceship.add(detonationL);

                shootL.position.x= -0.5;
                shootL.position.z= -0.076;
                shootL.position.y = 0;
                shootL.rotation.y = -0*Math.PI/180;
                shootL.scale.set(0.3,0.3,0.3);
                scene.add(shootL);
                mySpaceship.add(shootL);

            })
        }

        if(type==5){
            loader.load('models/VS1.glb',function(object3d){
                mySpaceship = object3d.scene;
                mySpaceship.scale.set(0.3,0.3,0.3);
                scene.add(mySpaceship);
                mySpaceship.add(environment.sky);
            })
        }

        // console.log(this.shootL);

    }
   


}

class Shooter{
    constructor(){
        this.shootMesh = new THREEx.SpaceShips.Shoot(0xff9955);
    }

    createShoot(){
        this.shootMesh.position.x = mySpaceship.position.x + 0.1;
        this.shootMesh.position.y = mySpaceship.position.y;
        this.shootMesh.position.z = mySpaceship.position.z;

        shootAnimation();
        let shootAnimation = function(){
            this.shootMesh.position.x+=3;
            if(this.shootMesh.position.x < 7000){
                requestAnimationFrame(shootAnimation);
            }
        }
    }
}