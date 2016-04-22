(function (window) {

	function Bullet(ship) {
            this.ship = ship;
            this.initialize();
	}

	var p = Bullet.prototype = new createjs.Container();
        
        p.type = "bullet";
        p.damage = 50;       
        p.bulletShape = null;
        p.ship = null;
        p.RADIUS = 1;
        p.VELOCITY = 2;
        p.FIRING_ANGLE = 0;
        p.WEIGHT = 0.5;
        p.vX = 0;
        p.vY = 0;
        p.lifeSpan = 80;
        p.prevX = null;
        p.prevY = null;
        
// constructor:
	p.Container_initialize = p.initialize;	//unique to avoid overiding base class

	p.initialize = function () {
            this.Container_initialize();
            //this.computeVelocity();
            
            this.VELOCITY = this.ship.BULLET_VELOCITY;
            this.FIRING_ANGLE = this.ship.rotation + 90;
            this.x = this.ship.x;
            this.y = this.ship.y;
            //console.log(this.x + " - " + this.ship.x);
            var velocityObject = this.computeVelocity();
            this.vX = velocityObject.x;
            this.vY = velocityObject.y;
            
            this.prevX = this.ship.x - velocityObject.x;
            this.prevY = this.ship.y - velocityObject.y;
            
            //console.log("bullet init");
         

            this.bulletShape = new createjs.Shape();
            this.addChild(this.bulletShape);
            
            //console.log(this);
            
            this.makeShape();		
	}

// public methods:
	p.makeShape = function () {
            //console.log("makeShape");
            /*var g = new createjs.Graphics();
            this.addStrokeStyle(1);
            g.beginStroke(createjs.Graphics.getRGB(0,0,0));
            g.beginFill(createjs.Graphics.getRGB(128,128,0));
            g.drawCircle(0,0,this.RADIUS);*/
            
            var g = this.bulletShape.graphics;
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
            
            this.prevX = this.x;
            this.prevY = this.y;
            
            this.x += this.vX;
            this.y += this.vY; 
            this.lifeSpan--;
            
            
            var ass = this.parent.getChildByName('asteroidLine');
            //console.log(ass);
            if (ass != null){
                if(this.hitTest(ass.x, ass.y)){
                    console.log(" - V - - - - - - - - - - - - ");
                    console.log("hit");
                    console.log(this);
                    console.log(ass);
                    console.log(" - ^ - - - - - - - - - - - - ");

                }
            }
            
            if (this.lifeSpan<=0) this.destroy();
            
            //var par = this.parent;
            //console.log(par);
            
            //for (var i=0; i<this.parent.children.length; i++){
                //console.log(this.parent.children[i]);
            //}
            //console.log(ass);
            
            
            
	}
        
        p.destroy = function(){
            this.parent.removeChild(this);
            
        }
        
        //p.removeOutOfBounds = function (event){
            //this.parent.removeChild(this);
        //}

	window.Bullet = Bullet;

}(window));