var breakoutMax = 100;
var breakoutCnt = 0;

(function (window) {

	function Ship(system) {
            this.system = system;
            this.initialize();
	}

	var p = Ship.prototype = new createjs.Container();

        Ship.TOGGLE = 60;
	Ship.MAX_THRUST = 2;
	Ship.MAX_VELOCITY = 20;

        p.FWD_ACCEL = 1; 
        p.REV_ACCEL = 0.75; 

        p.uuid = '';

        p.type = "ship";
        p.name = "ship";
        // public properties:	
        p.system;

	p.shipFlame;
	p.shipRevFlame;
	p.shipBody;

	p.timeout;
	p.thrust = 1;
        p.thrustToggle = false;
        p.revToggle = false;

	p.vX;
	p.vY;

        p.accel = 0;

        p.shipFlameToggle = false;
        p.shipRevFlameToggle = false;
        
	p.bounds;
	p.hit;
        
        p.BULLET_VELOCITY = 15;
        p.BULLET_TICK = 6;
        p.bullet_tick_cnt = 0;

// constructor:
	p.Container_initialize = p.initialize;	//unique to avoid overiding base class

	p.initialize = function () {
            
            this.Container_initialize();

            //this.uuid = guid();

            this.shipFlame = new createjs.Shape();
            this.shipRevFlame = new createjs.Shape();
            this.shipBody = new createjs.Shape();

            this.addChild(this.shipFlame);
            this.addChild(this.shipRevFlame);
            this.addChild(this.shipBody);

            this.makeShape();
            this.timeout = 0;
            this.thrust = 0.5;
            this.vX = 0;
            this.vY = 0;
            
            
                
	};

        // public methods:
	p.makeShape = function () {
		
            //draw ship body
            var g = this.shipBody.graphics;
            g.clear();
            g.beginStroke("#FFFFFF");

            g.moveTo(0, 10);	//nose
            g.lineTo(5, -6);	//rfin
            g.lineTo(0, -2);	//notch
            g.lineTo(-5, -6);	//lfin
            g.closePath(); // nose

            
            this.shipBody.cache(
                -6,
                -7,
                12,
                18
            ); 
            
                
            //draw ship flame
            var o = this.shipFlame;
            o.scaleX = 0.5;
            o.scaleY = 0.5;
            o.y = -5;

            g = o.graphics;
            g.clear();
            g.beginStroke("#FFFFFF");

            g.moveTo(2, 0);		//ship
            g.lineTo(4, -3);	//rpoint
            g.lineTo(2, -2);	//rnotch
            g.lineTo(0, -5);	//tip
            g.lineTo(-2, -2);	//lnotch
            g.lineTo(-4, -3);	//lpoint
            g.lineTo(-2, -0);	//shipExt
            
           
            this.shipFlame.cache(
                -5,
                -6,
                10,
                7
            );
    
    
            //draw ship flame
            var or = this.shipRevFlame;
            or.scaleX = 0.5;
            or.scaleY = 0.5;
            or.y = -5;

            g = or.graphics;
            g.clear();
            g.beginStroke("#FFFFFF");

            g.moveTo(4, 16);		
            g.lineTo(7, 23);	
            g.lineTo(5, 14);	
            
            g.moveTo(-4, 16);		
            g.lineTo(-7, 23);	
            g.lineTo(-5, 14);
            
            /*
            g.lineTo(0, -5);	//tip
            g.lineTo(-2, -2);	//lnotch
            g.lineTo(-4, -3);	//lpoint
            g.lineTo(-2, -0);	//shipExt
            */
           
            /*this.shipFlame.cache(
                -5,
                -6,
                10,
                7
            );*/
    
	};

	p.tick = function (event) {
		            
            if (this.thrustToggle || this.revToggle ) {                
                this.accelerate(this.accel);                
            }else{            
                this.shipFlameToggle = false;
                this.shipFlame.alpha = 0;
                this.shipRevFlameToggle = false;
                this.shipRevFlame.alpha = 0;
            }
            
            this.x += this.vX;
            this.y += this.vY;

            var hyp = Math.sqrt(Math.pow(this.vX,2)+Math.pow(this.vY,2));
                
            if (this.bullet_tick_cnt>=0){
                this.bullet_tick_cnt--;
            }
            
	}

	p.accelerate = function (direction) {
	
            //console.log("direction: ", direction);
        
            if (this.thrustToggle){
                this.shipFlame.alpha = 100;
            }else{
                this.shipFlame.alpha = 0;
            }
            
            if (this.revToggle){
                this.shipRevFlame.alpha = 100;
            }else{
                this.shipRevFlame.alpha = 0;
            }
        
        
            var dX = Math.sin(this.rotation * (Math.PI / -180)) * this.thrust * direction;
            var dY = Math.cos(this.rotation * (Math.PI / -180)) * this.thrust * direction;
            
            this.vX += dX;
            this.vY += dY;
            
            hyp = this.getVelocity();
            
            if ( hyp > Ship.MAX_VELOCITY ){
                //console.log("LIMITING");
                var ratio = Ship.MAX_VELOCITY / hyp;
                this.vX *= ratio;
                this.vY *= ratio;
            }

	};
        
        p.getVelocity = function(){
            
            return hyp = Math.sqrt(Math.pow(this.vX, 2)+Math.pow(this.vY, 2));
            
        };
        
        p.fire = function(){
            
            if (this.bullet_tick_cnt<=0){
                this.bullet_tick_cnt = this.BULLET_TICK;
                var bullet = new Bullet(this);
                this.system.addChild(bullet);
            }            
            
        }

	window.Ship = Ship;

}(window));
