
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

var externalInputToggle = false;
var externalInputValue = false;

var mainFPS = 40;

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

console.log("SGSFGSGF");

function init() {
	
    canvas = document.getElementById("gameCanvas");
    
    window.onresize = resizeHandler;
    resizeHandler();
    
    //console.log("here");
    stage = new createjs.Stage(canvas);
    
    helicopter = new Helicopter();
    stage.addChild(helicopter);
    stage.update();
    
    
    //console.log("here 2");
    
    //stage.addChild(messageField);
    //stage.update(); //update the stage to show text

    
	
    //hide anything on stage and show the score
    //stage.removeAllChildren();

    //system = new System();
    
    //console.log( this.backgroundContainer );            
            //console.log( this.backgroundContainer.getBounds() );
            
    //console.log(system.getBounds());
    //console.log(system.backgroundContainer.getBounds());
    
    
    //system.x = canvas.width / 2;
    //system.y = canvas.height / 2;

    //ship = new Ship(system);
    
    //shipEnemy = new ShipEnemy(system);



    //asteroid = new Asteroid();
    //asteroid.x = 200;
    //asteroid.y = 50;
    
    
    /*asteroidPoly = new AsteroidPoly();
    asteroidPoly.x = -150;
    asteroidPoly.y = -50;*/
    
    //asteroidLine = new AsteroidLine();
    //asteroidLine.x = -150;
    //asteroidLine.y = -50;
    

    //stage.addChild(system);
    
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
    
    
    //system.addChild(ship);
    //system.addChild(shipEnemy);
    //system.addChild(asteroid);
    
    //system.addChild(asteroidLine);


    //var bounds = ship.getBounds();            
    //console.log(bounds);
    
    //alert(1);
    
    //bounds = system.backgroundShape.getBounds();            
    //console.log(" - - - - - ");
    //console.log(bounds);
    //console.log(" - - - - - ");
    

    //system.scaleX = system.scaleY = 0.25;

    //createjs.Ticker.useRAF = true;
    createjs.Ticker.setFPS(mainFPS);
    if (!createjs.Ticker.hasEventListener("tick")) {
        createjs.Ticker.addEventListener("tick", tick);
    }

}


function tick(event) {
            
    for (var i = 0; i < stage.children.length; i++){

        var o = stage.children[i];        

        if (o.tick){            
            o.tick(event);                        
        }

    }


    if (externalInputToggle){
        fwdHeld = externalInputValue;            
    }


    stage.update(event);

}





//allow for WASD and arrow control scheme
function handleKeyDown(e) {
    //cross browser issues exist
    
    if (externalInputToggle){
        //externalInputToggle = false;
        //var externalInputValue = false;
        
        //if (externalInputValue){
            fwdHeld = externalInputValue;
        //}
        
    }else{
    
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
    
}

function handleKeyUp(e) {
    
    if (externalInputToggle){
        //externalInputToggle = false;
        //var externalInputValue = false;
        
        //if (externalInputValue){
            fwdHeld = externalInputValue;
        //}
        
    }else{
    
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




// /////////////////////////////////////