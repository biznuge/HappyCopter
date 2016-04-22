
var TURN_FACTOR = 6;	//how far the ship turns per frame

var KEYCODE_ENTER = 13;	//usefull keycode
var KEYCODE_SPACE = 32;	//usefull keycode
var KEYCODE_DOWN = 40;	//usefull keycode
var KEYCODE_UP = 38;	//usefull keycode
var KEYCODE_LEFT = 37;	//usefull keycode
var KEYCODE_RIGHT = 39;	//usefull keycode
var KEYCODE_W = 87;	//usefull keycode
var KEYCODE_S = 83;	//usefull keycode
var KEYCODE_A = 65;	//usefull keycode
var KEYCODE_D = 68;	//usefull keycode

var shootHeld;	//is the user holding a shoot command
var lfHeld;	//is the user holding a turn left command
var rtHeld;	//is the user holding a turn right command
var fwdHeld;	//is the user holding a forward command
var bwdHeld;	//is the user holding a backward command

//var timeToRock;	//difficulty adjusted version of ROCK_TIME
//var nextRock;	//ticks left until a new space rock arrives
//var nextBullet;	//ticks left until the next shot is fired

//var rockBelt;	//space rock array
//var bulletStream;	//bullet array

var canvas;	//Main canvas
var stage;	//Main display stage

var ship;	//the actual ship
var shipEnemy;  //the enemy ship // togetherjs
var system;     //the system

var alive = true;	//wheter the player is alive

var messageField;	//Message display field
var scoreField;	//score Field

var loadingInterval = 0;

var _sin = 0;
var _sin_delta = 1.25;

var preload;

//register key func200tions
document.onkeydown = handleKeyDown;
document.onkeyup = handleKeyUp;

var preload;

function init() {
	
    canvas = document.getElementById("gameCanvas");
    
    window.onresize = resizeHandler;
    resizeHandler();
    
    
    stage = new createjs.Stage(canvas);
    
    stage.addChild(messageField);
    stage.update(); //update the stage to show text

    
	
    //hide anything on stage and show the score
    stage.removeAllChildren();

    system = new System();
    
    //console.log( this.backgroundContainer );            
            //console.log( this.backgroundContainer.getBounds() );
            
    //console.log(system.getBounds());
    //console.log(system.backgroundContainer.getBounds());
    
    
    system.x = canvas.width / 2;
    system.y = canvas.height / 2;

    ship = new Ship(system);
    
    //shipEnemy = new ShipEnemy(system);



    //asteroid = new Asteroid();
    //asteroid.x = 200;
    //asteroid.y = 50;
    
    
    /*asteroidPoly = new AsteroidPoly();
    asteroidPoly.x = -150;
    asteroidPoly.y = -50;*/
    
    asteroidLine = new AsteroidLine();
    asteroidLine.x = -150;
    asteroidLine.y = -50;
    

    stage.addChild(system);
    
    //stage.update(); //update the stage to show text

    
    //console.log(system);
    //console.log(system.backgroundContainer);
    //system.makeBackground();
    //////////////////////var bounds = system.backgroundShape.getBounds();            
    //console.log(system.children.length);
    //console.log(system);
    
    /////////////////////////console.log(" - - - - - ");
    /////////////////////////console.log(bounds);
    /////////////////////////console.log(" - - - - - ");
    
    //system.backgroundContainer.cache(bounds.x,bounds.y,bounds.width,bounds.height);
    
    
    system.addChild(ship);
    //system.addChild(shipEnemy);
    //system.addChild(asteroid);
    
    system.addChild(asteroidLine);


    //var bounds = ship.getBounds();            
    //console.log(bounds);
    
    //alert(1);
    
    //bounds = system.backgroundShape.getBounds();            
    //console.log(" - - - - - ");
    //console.log(bounds);
    //console.log(" - - - - - ");
    

    //system.scaleX = system.scaleY = 0.25;

    //createjs.Ticker.useRAF = true;
    createjs.Ticker.setFPS(40);
    
    //start game timer
    if (!createjs.Ticker.hasEventListener("tick")) {
        //creatship.thrustejs.Ticker.addEventListener("tick", tick);
        createjs.Ticker.addEventListener("tick", tick);
    }

}

/*function wrap(){
    if (ship.x<0){
        ship.x = canvas.width;
    }
    if (ship.x>canvas.width){
        ship.x = 0;
    }
    if (ship.y<0){
        ship.y = canvas.height;
    }
    if (ship.y>canvas.height){
        ship.y = 0;
    }
}*/

function tick(event) {

    //wrap();
    
    /*_sin += _sin_delta;
    if (_sin>=Math.PI*2){
        _sin = 0;
    }
    if (_sin<0){
        _sin-=Math.PI*2;
    }*/
    
    //var rads = (_sin / (180 / Math.PI))  ;
    
    //stage.scaleX = stage.scaleY = 1 + (Math.sin(rads)/5);
    
    //handle turnisudo /etc/init.d/apache2 restart.ng
    
    
    
    if(alive && lfHeld){
        ship.rotation -= TURN_FACTOR;
    } else if(alive && rtHeld) {
        ship.rotation += TURN_FACTOR;
    }
    
    //console.log(ship.rotation);

    //handle thrust
    if(alive && (fwdHeld || bwdHeld)){
        
        ship.accel = 0;
        if (fwdHeld){
            ship.thrustToggle = true;
            ship.accel = ship.FWD_ACCEL;
        }else{
            ship.thrustToggle = false;
        }
        
        if (bwdHeld){
            ship.revToggle = true;
            ship.accel -= ship.REV_ACCEL;   
        }else{
            ship.revToggle = false;
        }
        
        /*
        console.log("fwdHeld: ", fwdHeld);
        console.log("bwdHeld: ", bwdHeld);
        console.log("ship.accel: ", ship.accel);
        console.log("ship.thrustToggle: ", ship.thrustToggle);
        console.log("ship.revToggle: ", ship.revToggle);
        */  
       
    }else{
        ship.thrustToggle = false;
        ship.revToggle = false;
        ship.accel = 0;
    }
    
    if ( shootHeld ){
        ship.fire();
    }
             
   //asteroid.tick(event);
    system.tick(event);
    
    var bullets = new Array();
    var asteroids = new Array();
    
    for (var i = 0; i < system.children.length; i++){
        
        var o = system.children[i];        
        
        if (o.type){
            if (o.type === 'bullet'){
                bullets.push(o);
                
                //console.log( asteroid.getBounds() );
                
                
                
                //var pt = myDisplayObject.globalToLocal(stage.mouseX, stage.mouseY);
                //console.log(pt.x, pt.y);
                
                //var pt = o.globalToLocal(stage.mouseX, stage.mouseY);
                
                
                
                //var objects = system.getObjectsUnderPoint( o.x, o.y );
                //console.log(objects);
                
                //console.log(o);
                //console.log(o.type);
            }
            if (o.type === 'asteroidLine'){
                //console.log("Feckin Asteroid...");
                asteroids.push(o);
            }
        }
        
        /*if (o.tick){
            if (!this.outOfBounds(o, system)){
                //this.placeInBounds(o, system);
            }
            //o.tick(event);                        
        }*/
                
    }
    
    //console.log(bullets.length + " - " + asteroids.length);
    for (var i = 0; i < bullets.length; i++){
        //for (var j = 0; j < asteroids.length; j++){
            /////////////////////console.log("Bullet: ", i,  bullets[i].x, bullets[i].y );
            //var objects = system.getObjectsUnderPoint ( bullets[i].x, bullets[i].y );
            //console.log(objects.length);
                   
            /*for (var j = 0; j < objects.length; j++){
                if ( objects[j].type === 'asteroid' ){
                    ///console.log(objects[j]);
                }                
            }*/
            
            //console.log(asteroids[0].getBounds());
            /////////////////////console.log("Asteroid: ", 0,  asteroids[0].x, asteroids[0].y );
            
            /*if (asteroids[0].hitPoint(bullets[i].x, bullets[i].y)){
                //console.log("HIT ROCKER");
                
                if (asteroids[0].hitHexagon(bullets[i].x, bullets[i].y)){
                    bullets[i].destroy();
                }
                
                
                
            }*/
        
        
            /*if (asteroids[0].hitTest(bullets[i].x, bullets[i].y)){
                console.log("HIT POLY ROCKER");                
            }*/
        
            /*if(asteroids[0].hitTest(bullets[i].x, bullets[i].y)){
                console.log(" - V - - - - - - - - - - - - ");
                console.log("hit");
                console.log(bullets[i]);
                console.log(asteroids[0]);
                console.log(" - ^ - - - - - - - - - - - - ");
                
            }*/
        
            /*
            target.alpha = 0.2;
			var pt = arm.localToLocal(100,0,target);
			if (target.hitTest(pt.x, pt.y)) { target.alpha = 1; }
             */
        
            for (var j = 0; j < asteroids.length; j++){

                var asteroid = asteroids[j];

                var pt = bullets[i].localToLocal(0,0,asteroid);
                if (asteroid.hull.hitTest(pt.x, pt.y)){
                    //console.log("HIT");
                    asteroid.collision(bullets[i]);
                    
                    //initCheckCollisionWorker(asteroids[0], bullets[i]);
                    
                }

            }
            
            
            //
//asteroids[j].checkHit(bullets[i]);
            //console.log(bullets[i].hitTest(asteroids[j]));
        //}
    }
    
    stage.update(event);
	
}

function outOfBounds(o, bounds) {
    
    //is it visibly off screen
    var inBounds = false;
    //console.log(bounds.xMin + " - " + o.x + " - " + bounds.xMax);
    //console.log(bounds.yMin + " - " + o.y + " - " + bounds.yMax);
    if (bounds.xMin < o.x ){
        if (bounds.xMax > o.x ){
            if (bounds.yMin < o.y){
                if (bounds.yMax > o.y){
                    inBounds = true;
                }
            }
        }
    }
    //console.log(inBounds);
    return inBounds;
    
}

function placeInBounds(o, bounds) {

    //if (o.removeOutOfBounds){
        //o.removeOutOfBounds();
    //}

    if (o.x < bounds.xMin ){
        o.x += bounds.xDimension;
    }    
    if (o.x > bounds.xMax ){
        o.x -= bounds.xDimension;
    }    
    if (o.y < bounds.yMin ){
        o.y += bounds.yDimension;
    }    
    if (o.y > bounds.yMax ){
        o.y -= bounds.yDimension;
    }
    
}



//allow for WASD and arrow control scheme
function handleKeyDown(e) {
    //cross browser issues exist
    if(!e){ var e = window.event; }
        switch(e.keyCode) {
            case KEYCODE_SPACE:	shootHeld = true; return false;
            case KEYCODE_A:
            case KEYCODE_LEFT:	lfHeld = true; return false;
            case KEYCODE_D:
            case KEYCODE_RIGHT: rtHeld = true; return false;
            case KEYCODE_W:
            case KEYCODE_UP:	fwdHeld = true; return false;
            case KEYCODE_S:
            case KEYCODE_DOWN:	bwdHeld = true; break;
            case KEYCODE_ENTER:	if(canvas.onclick === handleClick){ handleClick(); }return false;
    }
}

function handleKeyUp(e) {
    //cross browser issues exist
    if(!e){ var e = window.event; }
    //console.log("e.keyCode: ", e.keyCode);    
    switch(e.keyCode) {
            case KEYCODE_SPACE:	shootHeld = false; break;
            case KEYCODE_A:
            case KEYCODE_LEFT:	lfHeld = false; break;
            case KEYCODE_D:
            case KEYCODE_RIGHT: rtHeld = false; break;
            case KEYCODE_W:
            case KEYCODE_UP:	fwdHeld = false; break;
            case KEYCODE_S:
            case KEYCODE_DOWN:	bwdHeld = false; break;
    }
}


/*$(document).ready( function(){
		
	init();
    window.onresize = resizeHandler;
	resizeHandler();
								
});*/

function resizeHandler(e){		
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;		
}




// //////////////////////////////////////
// Webworkers implementation
// /////////////////////////////////////

function initCheckCollisionWorker(_object, _projectile) {
		
	console.log("initCheckCollisionWorker");
	
	workers['checkCollision'] = new Worker('/assets/js/workers/collisionWorker.js');
	
	workers['checkCollision'].addEventListener('message', function(e) {
		
		
            
		if (e.data.event == 'progress') {
			//counter++;
			console.log("progress");
			//obsolete
			//$('#counter').text(counter + " / " + counterMax);
			
                        var _object = e.data.object;
                        console.log(" - V - - - - - - - - - - - ");
                        console.log("Progress Handler");
                        console.log(e);
                        console.log(e.data);
                        console.log(e.data.object);
                        console.log(_object);
                        console.log(" - ^ - - - - - - - - - - - ");
                        
			//add all permutations to array -> use FIFO for output			
			//var path = e.data.msg + 'A';
			//$.game('setComputedNodes', path);    		
		}
		
		
		if ( e.data.event == 'complete' ) {	
						
			//$.game('setResult', counter, lowestPathDistance, lowestPathNames);

			//reset for next round
			//lowestPathDistance = null;
			//lowestPathNames = null;
			
                        console.log("complete");
			
                        
			//obsolete
			//$('#counter').css('color','green');	
			//$("#console2").console('statistics', 'Best Route: ' + lowestPathNames);					
			//var msg = "Lowest Path (" + lowestPathDistance + ") ---> " + lowestPathNames;									
			//$('#result').text(msg);
						
		} else {	
			
                        console.log("else");
			
                        
			/*if ( lowestPathDistance == null || distance <= lowestPathDistance ){
				lowestPathDistance = distance;
				lowestPathNames = e.data.msg + 'A';
			}*/
		}
				
	}, false);
	
        
        var object_json = JSON.stringify(_object);
        
	workers['checkCollision'].postMessage({'cmd': 'start', 'msg': 'start', '_object': object_json, 'projectile':"_projectile"});
}


var workers = new Array();


// /////////////////////////////////////