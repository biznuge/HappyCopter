(function (window) {

	function Helicopter() {            
            this.initialize();
	}

	var p = Helicopter.prototype = new createjs.Container();
        
        p.type = "helicopter";
        p.damage = 50;       
        p.helicopterShape = null;
        p.ship = null;
        p.RADIUS = 20;
        p.VELOCITY = 2;
        p.FIRING_ANGLE = 0;
        p.WEIGHT = 0.5;
        p.vX = 0;
        p.vY = 0;
        p.lifeSpan = 80;
        p.prevX = null;
        p.prevY = null;
    
        p.thrustToggle = false;
        p.revToggle = false;
    
        p.deltaY = 0;
        p.GRAVITY = 9.81;
        p.THRUST_FORCE = 15;
        p.GRAVITY_INCREMENTAL = p.GRAVITY / 30;    
        p.THRUST_FORCE_INCREMENTAL = p.THRUST_FORCE / 30;
        
// constructor:
	p.Container_initialize = p.initialize;	//unique to avoid overiding base class

	p.initialize = function () {
            this.Container_initialize();
            //this.computeVelocity();
            
            /*this.VELOCITY = this.ship.BULLET_VELOCITY;
            this.FIRING_ANGLE = this.ship.rotation + 90;
            this.x = this.ship.x;
            this.y = this.ship.y;
            //console.log(this.x + " - " + this.ship.x);
            var velocityObject = this.computeVelocity();
            this.vX = velocityObject.x;
            this.vY = velocityObject.y;
            
            this.vX
            
            this.prevX = this.ship.x - velocityObject.x;
            this.prevY = this.ship.y - velocityObject.y;
            */
            //console.log("bullet init");
         
            this.x = 200;
            this.y = 200;

            this.helicopterShape = new createjs.Shape();
            
            this.addChild(this.helicopterShape);
            
            //console.log(this);
            
            this.makeShape();	
        
            console.log( "FPS: " + mainFPS);
        
	}

// public methods:
	p.makeShape = function () {
            //console.log("makeShape");
            /*var g = new createjs.Graphics();
            this.addStrokeStyle(1);
            g.beginStroke(createjs.Graphics.getRGB(0,0,0));
            g.beginFill(createjs.Graphics.getRGB(128,128,0));
            g.drawCircle(0,0,this.RADIUS);*/
            
            var g = this.helicopterShape.graphics;
            g.clear();
            g.beginFill("#FFFFFF")
            g.beginStroke("#FFFFFF");

            g.drawCircle(0,0,this.RADIUS);
            
	}
        
        p.computeVelocity = function(){
            
            var velocity = new Object();            
            
            var x = Math.cos(this.degToRad(this.FIRING_ANGLE))*this.VELOCITY + ship.vX;
            var y = Math.sin(this.degToRad(this.FIRING_ANGLE))*this.VELOCITY + ship.vY;
            
            velocity.x = x
            velocity.y = y
            
            return velocity;
        }
        
        p.degToRad = function(deg){
            return deg * (Math.PI/180)
        }
       
	p.tick = function (event) {
            //move by velocity
            
        //console.log("tick");
        
            /*this.prevX = this.x;
            this.prevY = this.y;
            
            this.x += this.vX;
            this.y += this.vY; 
            this.lifeSpan--;*/
        
            //this.x
            
            
        
            
            
            
            //var bounds = stage.getBounds();
            
        //console.log(stage);
        //console.log(bounds);
        
            var outsideBounds = false;
        
            var minY = 60;
            var maxY = stage.canvas.height - minY;
        
            if (fwdHeld ) {  
                if (this.deltaY < 0 && this.y < minY ){
                    this.deltaY /= 2;
                    outsideBounds = true;       
                }
            }
        
            if (!fwdHeld ) {  
                if (this.deltaY >= 0 && this.y > maxY ){
                    this.deltaY /= 2;
                    outsideBounds = true;
                }
            }
        
            if (outsideBounds){
                if (Math.pow(Math.sqrt(this.deltaY), 2) < 0.35 ){
                    this.deltaY = 0;
                }
            }else{
                
                if (fwdHeld ) {                
                    //this.accelerate(this.accel);  

                    //this.y -= this.THRUST_FORCE_INCREMENTAL;

                    this.deltaY -= this.THRUST_FORCE_INCREMENTAL;

                }else{            
                    /*this.shipFlameToggle = false;
                    this.shipFlame.alpha = 0;
                    this.shipRevFlameToggle = false;
                    this.shipRevFlame.alpha = 0;*/

                    //this.y += this.GRAVITY_INCREMENTAL;

                    this.deltaY += this.GRAVITY_INCREMENTAL;

                }
                
            }
        
            //if (){
                
            //}
        
            this.y += this.deltaY;
        
            
            //console.clear();
            //console.log(this.deltaY, this.y);
            
            
	}
        
        p.destroy = function(){
            this.parent.removeChild(this);
            
        }
        
        //p.removeOutOfBounds = function (event){
            //this.parent.removeChild(this);
        //}

	window.Helicopter = Helicopter;

}(window));