(function (window) {

	function Hexagon(hex_radius) {
            
            this.hex_radius = hex_radius;
            this.initialize();
                //console.log("hexagon init");
	}

	var p = Hexagon.prototype = new createjs.Shape();
        
        p.type = "hexagon";
        
        p.hex_radius = 15;
        
        p.alive = true;

// constructor:
	p.Container_initialize = p.initialize;	//unique to avoid overiding base class

	p.initialize = function () {
		this.Container_initialize();

                //this.hexagonShape = new createjs.Shape();		
		//this.addChild(this.hexagonShape);
                  
                this.makeShape();         
                /*this.shipBody = new createjs.Shape();

		this.addChild(this.shipFlame);
		this.addChild(this.shipBody);

		this.makeShape();
		this.timeout = 0;
		this.thrust = 0;
		this.vX = 0;
		this.vY = 0;*/
            
           // this.alpha = 0.1;
            
	}

// public methods:
	p.makeShape = function () {
		//draw ship body
		var g = this.graphics;
		g.clear();
		//g.beginStroke("#FFFFFF");
                g.beginFill(createjs.Graphics.getRGB(255,255,255));
//console.log("hexagon makshape");

                /*g.moveTo(0, 30);
                g.lineTo(26, 15);
                g.lineTo(26, -15);
                g.lineTo(0, -30);
                g.lineTo(-26, -15);
                g.lineTo(-26, 15);
                g.lineTo(0, 30);*/
            
                g.moveTo(0, 7.5);
                g.lineTo(6.25, 3.25);
                g.lineTo(6.25, -3.25);
                g.lineTo(0, -7.5);
                g.lineTo(-6.25, -3.25);
                g.lineTo(-6.25, 3.25);
                g.lineTo(0, 7.5);
                
                //this.hexagonShape.scaleX = 0.5;
                //this.hexagonShape.scaleY = 0.5;
                
		//furthest visual element
		//this.bounds = 10;
		//this.hit = this.bounds;
	}
        
        
        p.destroy = function(){
            
            //this.parent.removeChild(this);
            this.alpha = 0.05;
            this.alive = false;
                        
        }
        
	window.Hexagon = Hexagon;

}(window));