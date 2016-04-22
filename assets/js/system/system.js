(function (window) {

	function System() {
            
            this.xDimension = canvas.width;
            this.yDimension = canvas.height;
            
            //this.xDimension = 300;
            //this.yDimension = 200;
            
            this.xMin = -(this.xDimension/2);
            this.xMax = (this.xDimension/2);
            this.yMin = -(this.yDimension/2);
            this.yMax = (this.yDimension/2);
            
            //this.makeBackground();
            this.mouseEnabled = false;
            	
            this.initialize();
                       
	}

	var p = System.prototype = new createjs.Container();
        
        p.type = "system";
        p.name = "system";
        
        p.xDimension;
        p.yDimension;
        
        p.xMin;
        p.xMax;
        p.yMin;
        p.yMax;
        
        p.zoom = 1;
        
        p.backgroundShape;
        p.backgroundShape2;
        p.backgroundShape3;
        
        p.colourInt = 186;
        p.colour = createjs.Graphics.getRGB(p.colourInt,p.colourInt,p.colourInt);
        
        p.circleShape;
// constructor:
	p.Container_initialize = p.initialize;	//unique to avoid overiding base class

	p.initialize = function () {
            this.Container_initialize();
            this.makeBackground3(); 
            this.makeBackground2(); 
            
            //this.scaleX = this.scaleY = 2;
            
            this.makeBackground();            
	};
        
        p.makeBackground = function () {
            
            /* ******************************** */
            /* Largest space available is 4096 * 4096 = 16777216 */
            /* trial and error rules */
            var spacing = 256;  
            var amount = 16;
            /* ******************************** */
            
            //2048×1464
            
            
            this.backgroundShape = new createjs.Shape();
            this.backgroundShape.name = 'backgroundShape';
            this.addChild(this.backgroundShape);
            this.backgroundShape.alpha = 0.6;
            
            
            this.backgroundShape.setBounds(-amount*spacing, -amount*spacing, amount*2*spacing, amount*2*spacing );
            
            var g = this.backgroundShape.graphics;            
            g.clear();
                  
            for (var i=-amount; i<amount; i++){
                for (var j=-amount; j<amount; j++){
                    
                    //g.beginFill(createjs.Graphics.getRGB(192,0,60));            
                    //g.beginFill(createjs.Graphics.getRGB(128,128,128));            
                    //g.beginFill(createjs.Graphics.getRGB(255,0,0)); 
                    g.beginFill(this.colour); 
                    //g.drawCircle(i*spacing, j*spacing, 1);
                    g.drawCircle(i*( Math.random()* (spacing*2-spacing)), j*(Math.random()* (spacing*2-spacing)), 1);
                    
                    g.endFill();
            
                    
                }
            }
            
            
            this.backgroundShape.cache(
                -amount*spacing,
                -amount*spacing,
                amount*spacing*2,
                amount*spacing*2
            );
            
            
        };
        
        p.makeBackground2 = function () {
            
            var spacing = 128;  
            var amount = 20;
            
            this.backgroundShape2 = new createjs.Shape();
            this.backgroundShape2.name = 'backgroundShape2';
            this.addChild(this.backgroundShape2);
            this.backgroundShape2.alpha = 0.4;
            
            this.backgroundShape2.setBounds(-amount*spacing, -amount*spacing, amount*2*spacing, amount*2*spacing );
            //return;
            
            var g = this.backgroundShape2.graphics;            
            g.clear();
                  
            for (var i=-amount; i<amount; i++){
                for (var j=-amount; j<amount; j++){
                    
                    //g.beginFill(createjs.Graphics.getRGB(192,0,60));            
                    //g.beginFill(createjs.Graphics.getRGB(70,70,70));            
                    //g.beginFill(createjs.Graphics.getRGB(255,255,0)); 
                    g.beginFill(this.colour); 
                    
                    g.drawCircle(i*( Math.random()* (spacing*2-spacing)), j*(Math.random()* (spacing*2-spacing)), 1);
                    //g.alpha = 0.2;
                    g.endFill();  
                    
                    
                }
            }
            
            this.backgroundShape2.cache(
                -amount*spacing,
                -amount*spacing,
                amount*spacing*2,
                amount*spacing*2
            );
            
        };
        
        p.makeBackground3 = function () {
            
            var spacing = 100;  
            var amount = 14;
            
            this.backgroundShape3 = new createjs.Shape();
            this.backgroundShape3.name = 'backgroundShape3';
            this.addChild(this.backgroundShape3);
            this.backgroundShape3.alpha = 0.2;
            
            this.backgroundShape3.setBounds(-amount*spacing, -amount*spacing, amount*2*spacing, amount*2*spacing );
            
            var g = this.backgroundShape3.graphics;            
            g.clear();
                  
            for (var i=-amount; i<amount; i++){
                for (var j=-amount; j<amount; j++){
                    
                    //g.beginFill(createjs.Graphics.getRGB(192,0,60));            
                    //g.beginFill(createjs.Graphics.getRGB(30,30,30));            
                    //g.beginFill(createjs.Graphics.getRGB(0,255,0)); 
                    g.beginFill(this.colour); 
                    
                    //g.drawCircle(i*spacing, j*spacing, 1);
                    g.drawCircle(i*( Math.random()* (spacing*2-spacing)), j*(Math.random()* (spacing*2-spacing)), 1);
                    
                    g.endFill();
                    
                    
                }
            }
            
            this.backgroundShape3.cache(
                -amount*spacing,
                -amount*spacing,
                amount*spacing*2,
                amount*spacing*2
            );
            
        };
        
        p.makeShape = function () {
            
            circleShape = new createjs.Shape();		
            this.addChild(circleShape);
            
            circleShape.alpha = 0.2;
            
            var g = circleShape.graphics;
            g.clear();
            g.beginFill(createjs.Graphics.getRGB(192,0,60));

            g.moveTo(this.xMin, this.yMin);
            g.lineTo(this.xMax, this.yMin);
            g.lineTo(this.xMax, this.yMax);
            g.lineTo(this.xMin, this.yMax);
            g.lineTo(this.xMin, this.yMin);

        };
        
	p.tick = function (event) {
            
            /*hyp = ship.getVelocity();            
            //console.log(hyp);            
            this.zoom = (hyp /-10) + 3;            
            this.scaleX = this.scaleY = this.zoom;
            */
            
            
            var gutter = stage.canvas.width/2 ;
            
            var bounds = this.backgroundShape.getBounds();
            var w = bounds.width;
            var h = bounds.height;
            
                        
            var shipX = ship.x;
            if (shipX<=((-w/2)+gutter)){
                shipX = (-w/2)+gutter;
            }            
            if (shipX>=((w/2)-gutter)){
                shipX = (w/2)-gutter;
            }
            
            var shipY = ship.y;
            if (shipY<=((-h/2)+gutter)){
                shipY = (-h/2)+gutter;
            }            
            if (shipY>=((h/2)-gutter)){
                shipY = (h/2)-gutter;
            }
            
            this.x = - shipX + stage.canvas.width / 2; //* this.zoom
            this.y = - shipY + stage.canvas.height / 2 ;
            
            
            
            var bounds2 = this.backgroundShape2.getBounds();
            //var bounds2 = bounds;
            var w2 = bounds2.width;
            var h2 = bounds2.height;
            
            this.backgroundShape2.x = ship.x * ((w-w2) / w);
            this.backgroundShape2.y = ship.y * ((h-h2) / h);
            
            
            var bounds3 = this.backgroundShape3.getBounds();
            //var bounds3 = bounds;            
            var w3 = bounds3.width;
            var h3 = bounds3.height;
            
            this.backgroundShape3.x = ship.x * ((w-w3) / w);
            this.backgroundShape3.y = ship.y * ((h-h3) / h);
            
           
            /*console.clear();
            console.log(ship.x);
            console.log(this.backgroundShape2.width);
            console.log(this.backgroundShape.width);
            console.log(ship.x * (this.backgroundShape2.width / this.backgroundShape.width));*/
            
            
            for (var i = 0; i < this.children.length; i++){
        
                var o = this.children[i];        

                /*if (o.type){
                    if (o.type === 'bullet'){
                        //bullets.push(o);

                        //console.log( asteroid.getBounds() );



                        //var pt = myDisplayObject.globalToLocal(stage.mouseX, stage.mouseY);
                        //console.log(pt.x, pt.y);

                        //var pt = o.globalToLocal(stage.mouseX, stage.mouseY);



                        //var objects = system.getObjectsUnderPoint( o.x, o.y );
                        //console.log(objects);

                        //console.log(o);
                        //console.log(o.type);
                    }
                    //if (o.type === 'asteroid'){
                        //asteroids.push(o);
                    //}
                }*/

                if (o.tick){
                    if (!this.outOfBounds(o, this.backgroundShape)){
                        this.placeInBounds(o, this.backgroundShape);
                    }
                    o.tick(event);                        
                }

            }
            
            
            // zoom goes from 4 (max zoom at 0 speed) to 1 
            // which is the regular zoom we see at speed 20.
            //
            // calc to do this would be...
            // 
            /*3 - 1
            0 - 20
            zoom = 4;
            
            
            zoom - 3 = 0 - -2
            
            0 - -2
            0 - 20
            
            zoom * -10*/
            
            //(speed / -10) + 3 = zoom
            
            
	};
        
        p.outOfBounds = function(o, boundsObject) {
    
            //is it visibly off screen
            var inBounds = false;
            
            var bounds = boundsObject.getBounds();
            
            if (-bounds.width/2 < o.x ){
                if (-bounds.width/2 > o.x ){
                    if (-bounds.height/2 < o.y){
                        if (bounds.height/2 > o.y){
                            inBounds = true;
                        }
                    }
                }
            }
            
            return inBounds;

        };
        
        p.placeInBounds = function(o, boundsObject) {

            var bounds = boundsObject.getBounds();
            
            if (o.x < -bounds.width/2 ){
                o.x += bounds.width;
            }    
            if (o.x > bounds.width/2 ){
                o.x -= bounds.width;
            }    
            if (o.y < -bounds.height/2 ){
                o.y += bounds.height;
            }    
            if (o.y > bounds.height/2 ){
                o.y -= bounds.height;
            }

        };

	window.System = System;

}(window));
