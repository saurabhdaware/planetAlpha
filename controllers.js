fakeKeydown = function(key){
    moveleft_keydown = false;
    moveright_keydown = false;
    moveup_keydown = false;
    movedown_keydown = false;
    touchinterval = setInterval(()=>{
        var e = new Event("keydown");
        e.key=key;    // just enter the char you want to send 
        e.keyCode=e.key.charCodeAt(0);
        e.which=e.keyCode;
        e.altKey=false;
        e.ctrlKey=true;
        e.shiftKey=false;
        e.metaKey=false;
        e.bubbles=true;
        document.getElementById('bodyy').dispatchEvent(e);
        if(touchend == true){
            clearInterval(touchinterval);
        }
    },30)

}

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
            mySpaceship.position.y +=(mySpaceship.rotation.z*180/Math.PI)/50;
            camera.position.y +=(mySpaceship.rotation.z*180/Math.PI)/50;
        }
    }
        
    if(movedown_keydown == true){
        if(mySpaceship.rotation.z > -90*Math.PI/180 ){
            mySpaceship.rotation.z -=2*Math.PI/180;
        }
        if(mySpaceship.rotation.z < 0*Math.PI/180){
            mySpaceship.position.y -=-1*(mySpaceship.rotation.z*180/Math.PI)/50;
            camera.position.y -=-1*(mySpaceship.rotation.z*180/Math.PI)/50;
        }
    }

}
