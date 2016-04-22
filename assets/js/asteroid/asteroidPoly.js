(function (window) {

	function AsteroidPoly() {
		this.initialize();
	}

	//var p = AsteroidPoly.prototype = new createjs.Shape();
        var p = AsteroidPoly.prototype = new createjs.Container();
        
        p.type = "asteroidPoly";
        p.name = "asteroidPoly";
        p.RADIUS = 160;
        p.HEX_RADIUS = 14;
        
        p.dX = -0.4;
        p.dY = 0.1;
        p.dR = -0.2;
    
        p.hull = null; 
    
        /*p.dX = 0;
        p.dY = 0;
        p.dR = 0;*/
        
// constructor:
	p.Container_initialize = p.initialize;	//unique to avoid overiding base class

	p.initialize = function () {
		this.Container_initialize();

                this.makeShape();
		
                this.mouseEnabled = true;
                this.cursor = 'crosshair';
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
        
        p.collision = function(object){
            
            var pt = object.localToLocal(0,0,this);
            //console.log("pt: %s, %s", pt.x, pt.y);
            
            var damageSplash = object.splashDamage;
            
            var damage = new createjs.Shape();
            
            this.addChild(damage);
            damage.x =  pt.x;
            damage.y = pt.y;
            damage.graphics.beginLinearGradientFill(["#000000", "rgba(0, 0, 0, 1)"], [0, 0], -damageSplash, -damageSplash, 2*damageSplash, 2*damageSplash)
            //damage.graphics.drawRect(0, 0, 100, 100);
            //damage.graphics.beginFill(createjs.Graphics.getRGB(128,128,0));                     
            damage.graphics.drawCircle(0, 0, damageSplash);
            
            
            
            //damage.cache(pt.x-damageSplash, pt.y-damageSplash, pt.x+damageSplash, pt.y+damageSplash);
            //damage.cache(-damageSplash, -damageSplash, 2*damageSplash, 2*damageSplash);


            //var this = new createjs.Bitmap("path/to/image.jpg");
            this.hull.filters = [
                new createjs.AlphaMaskFilter(damage.cacheCanvas)
            ];
            
            damage.mask = this.hull;
            
            //this.cache(-100, -100, 200, 200);
            
            //this.hull.graphics = this.cacheCanvas;
            
            //this.shape.graphics.beginBitmapFill( image ).s().p("AifCgIAAk/IE/AAIAAE/g");
            //getCacheDataURL
            
            /*var cacheSwap = this.cacheCanvas;
            
            console.log(cacheSwap);
            
            var cacheURL = this.getCacheDataURL();
            
            var gfx = new createjs.Shape(cacheURL);
            console.log(gfx);
            
            console.log("cacheURL: %s", cacheURL);
            
            this.uncache();*/
            
            
            
            //this.hull.graphics = 
            
            //cacheSwap.graphics = 
            object.destroy();
            
            
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
            
            //var g = new createjs.Graphics();
            
            this.hull = new createjs.Shape();
            this.addChild(this.hull);
            
            var g = this.hull.graphics;
            g.beginFill(createjs.Graphics.getRGB(128,128,0));                     
            g.drawCircle(0, 0, 100);
            
            
            
            

            /*var bmp = new createjs.Bitmap("path/to/image.jpg");
            bmp.filters = [
                new createjs.AlphaMaskFilter(box.cacheCanvas)
            ];
            bmp.cache(0, 0, 100, 100);*/
            
            
            
//poly = new createjs.Shape(g);
            //this.addChild(poly);
            
            
            
            /*this.cache(
                -this.RADIUS - this.HEX_RADIUS,
                -this.RADIUS - this.HEX_RADIUS,
                this.RADIUS*2 + this.HEX_RADIUS*2,
                this.RADIUS*2 + this.HEX_RADIUS*2
            );*/
            
            //this.recache();
    
            /*this.setBounds(
                -this.RADIUS - this.HEX_RADIUS,
                -this.RADIUS - this.HEX_RADIUS,
                this.RADIUS*2 + this.HEX_RADIUS*2,
                this.RADIUS*2 + this.HEX_RADIUS*2
            );*/
            
            
            //canvas.update();
            //this.x = canvas.width / 2;
            //this.y = canvas.height / 2;
            
	};

	p.tick = function (event) {
            //move by velocity
            this.x += p.dX;
            this.y += p.dY;
            this.rotation += p.dR;
	};       
        
        
        
        

	window.AsteroidPoly = AsteroidPoly;

}(window));