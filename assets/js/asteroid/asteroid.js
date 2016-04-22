(function (window) {

	function Asteroid() {
		this.initialize();
	}

	var p = Asteroid.prototype = new createjs.Container();
        
        p.type = "asteroid";
        p.name = "asteroid";
        p.RADIUS = 160;
        p.HEX_RADIUS = 14;
        
        p.dX = 0.8;
        p.dY = 0.3;
        p.dR = 0.1;
    
        /*p.dX = 0;
        p.dY = 0;
        p.dR = 0;*/
        
// constructor:
	p.Container_initialize = p.initialize;	//unique to avoid overiding base class

	p.initialize = function () {
		this.Container_initialize();

                this.makeShape();
		
                this.mouseEnabled = true;
                this.cursor = 'pointer';
		/*this.shipFlame = new createjs.Shape();
		this.shipBody = new createjs.Shape();

		this.addChild(this.shipFlame);
		this.addChild(this.shipBody);

		this.makeShape();
		this.timeout = 0;
		this.thrust = 0;
		this.vX = 0;
		this.vY = 0;*/
	};

// public methods:
	p.makeShape = function () {
            
            /*var g = new createjs.Graphics();
            g.setStrChild(this.shipFlame);
		this.addokeStyle(1);
            g.beginStroke(createjs.Graphics.getRGB(0,0,0));
            g.beginFill(createjs.Graphics.getRGB(128,128,0));
            g.drawCircle(0,0,this.RADIUS);*/

            //var s = new createjs.Shape(g);
            //this.addChild(s);
            
            
            //var spacingX = Math.sqrt(Math.pow(this.HEX_RADIUS,2)-Math.pow(this.HEX_RADIUS/2,2));
            //var spacingY = this.HEX_RADIUS * 1.5;
            
            ////////////////////////////////////////////////////
            // this setting seemed to work quite well. needs to be dynamic though.
            //var spacingX = 12;
            //var spacingY = 24;
            ////////////////////////////////////////////////////
            var g = new createjs.Graphics();
            g.beginFill(createjs.Graphics.getRGB(128,128,0));                     
            g.drawCircle(0, 0, 10);
            var s = new createjs.Shape(g);
            this.addChild(s);
            
            var spacingX = this.HEX_RADIUS;
            var spacingY = this.HEX_RADIUS * 2;
            
            
            var countX = Math.floor( this.RADIUS / spacingX );
            var countY = Math.floor( this.RADIUS / (spacingY) );
            
            for (x=-countX; x<=countX; x++){
                for (y=-countY; y<=countY; y++){                    
                    if (this.computeDistance(x * spacingX, y * spacingY ) <= this.RADIUS ){
                    
                        var hex = new Hexagon(this.HEX_RADIUS);
                        //if ((Math.random()*10)<4){
                            this.addChild(hex);
                        //}
                        hex.x = x * spacingX;
                        hex.y = y * spacingY;
                    
                    }
                }    
            }
            
            for (x=-countX; x<countX; x++){
                for (y=-countY; y<countY; y++){                    
                    var _x = (x * spacingX) + (spacingX/2);
                    var _y = (y * spacingY) + (spacingY/2);
                    
                    if (this.computeDistance(_x, _y) <= this.RADIUS ){
                    
                        var hex = new Hexagon(this.HEX_RADIUS);
                        
                        //if ((Math.random()*10)<4){
                            this.addChild(hex);
                        //}
                        
                        hex.x = _x;
                        hex.y = _y;
                    
                    }
                }    
            }
            
            /*this.cache(
                -this.RADIUS - this.HEX_RADIUS,
                -this.RADIUS - this.HEX_RADIUS,
                this.RADIUS*2 + this.HEX_RADIUS*2,
                this.RADIUS*2 + this.HEX_RADIUS*2
            );*/
            
            //this.recache();
    
            this.setBounds(
                -this.RADIUS - this.HEX_RADIUS,
                -this.RADIUS - this.HEX_RADIUS,
                this.RADIUS*2 + this.HEX_RADIUS*2,
                this.RADIUS*2 + this.HEX_RADIUS*2
            );
            
            
            //canvas.update();
            //this.x = canvas.width / 2;
            //this.y = canvas.height / 2;
            
	};
        
        p.recache = function(){
            
            this.cache(
                -this.RADIUS - this.HEX_RADIUS,
                -this.RADIUS - this.HEX_RADIUS,
                this.RADIUS*2 + this.HEX_RADIUS*2,
                this.RADIUS*2 + this.HEX_RADIUS*2
            );
            
        };
        
        p.computeDistance = function(x,y){
            return Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
        };
        
        p.checkHit = function(bullet){
            //console.log(this.getBounds());
            //console.log(this);
            //console.log(this.x + " - " + this.y + " ---> " + bullet.x + " - " + bullet.y);
            //console.log(this.getBounds());
            //console.log(this.hitTest(bullet.x, bullet.y));
            //console.log(getObjectUnderPoint ( x  y ));
        };

	p.tick = function (event) {
            //move by velocity
            this.x += p.dX;
            this.y += p.dY;
            this.rotation += p.dR;
	};
        
        
        
        p.hitHexagon = function(tX, tY){
            
            for  (childIx in this.children){
                var hexChild = this.children[childIx];
                //var pt = child.localToGlobal(tX, tY);
                
                //console.log("HEX: %s,%s ---> tX,tY: %s,%s", child.x,  child.y, tX, tY);
                
                //var pt = child.localToGlobal(tX, tY);
                var pt = this.parent.localToLocal(tX, tY, hexChild);
                //console.log("HEX: %s,%s ---> tX,tY: %s,%s", child.x,  child.y, Math.round(pt.x), Math.round(pt.y));
                
                
                
                if (hexChild.hitTest(pt.x, pt.y)){
                    //console.log(hexChild);
                    if (hexChild.type=='hexagon' && hexChild.alive){
                        hexChild.destroy();
                        return true;
                    }
                    
                    //this.recache();
                    //console.log("HIT");
                }
            }
            
            return false;
            
        };
        
        
        p.hitPoint = function (tX, tY) {
            var blah = this.hitRadius(tX, tY, 0);
            
            //if (blah){
                //this.hitHexagon(tX, tY);
            //}
            
            return blah;
	}

	p.hitRadius = function (tX, tY, tHit) {
		//early returns speed it up
		if (tX - tHit > this.x + this.RADIUS) {
                    //console.log(1);
                    return;
		}
		if (tX + tHit < this.x - this.RADIUS) {
                    //console.log(2);
                    return;
		}

		if (tY - tHit > this.y + this.RADIUS) {
                    //console.log(3);
                    return;
		}

		if (tY + tHit < this.y - this.RADIUS) {
                    //console.log(4);
                    return;
		}

                //console.log(5);
                    

		//now do the circle distance test
		return this.RADIUS + tHit > Math.sqrt(Math.pow(Math.abs(this.x - tX), 2) + Math.pow(Math.abs(this.y - tY), 2));
	}
        
        

	window.Asteroid = Asteroid;

}(window));