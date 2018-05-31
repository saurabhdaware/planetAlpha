class Environment{
    constructor(mission){
        if(mission == 1){
            this.sky = THREEx.createSkymap('pisa');
            scene.add(this.sky);	
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
    
            //CLOUDS 
            var textureClouds = THREE.ImageUtils.loadTexture( 'images/cloud10.png', null, animate );
            textureClouds.magFilter = THREE.LinearMipMapLinearFilter;
            textureClouds.minFilter = THREE.LinearMipMapLinearFilter;
    
            var fog = new THREE.Fog( 0xbbbbbb, - 1, 3000 );
            let geometryClouds = new THREE.PlaneGeometry(64,64);
            let materialClouds = new THREE.ShaderMaterial( {
    
                uniforms: {
    
                    "map": { type: "t", value: textureClouds },
                    "fogColor" : { type: "c", value: fog.color },
                    "fogNear" : { type: "f", value: fog.near },
                    "fogFar" : { type: "f", value: fog.far },
    
                },
                vertexShader: document.getElementById( 'vs' ).textContent,
                fragmentShader: document.getElementById( 'fs' ).textContent,
                depthWrite: false,
                // depthTest: false,
                transparent: true,
            } );
    
            let geometry1 = new THREE.PlaneGeometry();
            this.cloudsHolderMesh = new THREE.Mesh(geometry1,materialClouds);
            scene.add(this.cloudsHolderMesh);
            for ( var i = 0; i < 8000; i++ ) {
                var cloudsMesh = new THREE.Mesh(geometryClouds,materialClouds);
                cloudsMesh.position.x = i*3;
                cloudsMesh.position.y = - Math.random() * Math.random() * 200 - 100;
                cloudsMesh.position.z = Math.random() * 9000 - 5000; 
                cloudsMesh.rotation.z = Math.random() * Math.PI;
                cloudsMesh.rotation.y = 270*Math.PI/180;
                cloudsMesh.scale.x = cloudsMesh.scale.y = Math.random() * Math.random() * 10 + 0.5;
                scene.add(cloudsMesh);
                this.cloudsHolderMesh.add(cloudsMesh);
            }
        }
        if(mission == 2){
            console.log('Mission 2 environment');
        }
    }
}