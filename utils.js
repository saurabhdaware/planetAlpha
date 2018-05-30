function toggleFullScreen() {
    if ((document.fullScreenElement && document.fullScreenElement !== null) ||    
    (!document.mozFullScreen && !document.webkitIsFullScreen)) {
        if (document.documentElement.requestFullScreen) {  
        document.documentElement.requestFullScreen();  
        } else if (document.documentElement.mozRequestFullScreen) {  
        document.documentElement.mozRequestFullScreen();  
        } else if (document.documentElement.webkitRequestFullScreen) {  
        document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);  
        }  
    } else {  
        if (document.cancelFullScreen) {  
        document.cancelFullScreen();  
        } else if (document.mozCancelFullScreen) {  
        document.mozCancelFullScreen();  
        } else if (document.webkitCancelFullScreen) {  
        document.webkitCancelFullScreen();  
        }  
    }  
  
}

// var texture = new THREE.Texture();
// var loader = new THREE.ImageLoader(loadingManager);
// loader.load('models/mountainTexture.png',function(image) {
//     texture.image = image;
//     texture.needsUpdate = true;
// });

// var loader = new THREE.OBJLoader(loadingManager);
// let mountainsURL = 'models/mountain.obj';
// loader.load(mountainsURL,function(mountainsObject){
//     mountainsObject.traverse(function(child) {
//         if (child instanceof THREE.Mesh) {
//             child.material.map = texture;
//             child.material.normalMap = THREE.ImageUtils.loadTexture('models/mountainNormal.png');
//             child.material.bumpMap = THREE.ImageUtils.loadTexture('models/mountainBump.tif');
//             child.material.bumpScale = 1.5;
//         }
//     });
//     mountainsObject.scale.set(50,50,50);
//     mountainsObject.position.x = 1300;
//     scene.add(mountainsObject);
// })
