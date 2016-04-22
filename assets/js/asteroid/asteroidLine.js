(function (window) {

	function AsteroidLine() {
		this.initialize();
	}

	//var p = AsteroidPoly.prototype = new createjs.Shape();
        var p = AsteroidLine.prototype = new createjs.ObjectContainer();
        
        p.type = "asteroidLine";
        p.name = "asteroidLine";
        p.RADIUS = 160;
        p.RADIUS_DIFF = 40;
        p.RADIAL_STEP = 12;
        p.dX = -0.4;
        p.dY = 0.1;
        p.dR = -0.2;
    
        p.hull = null; 
    
        p.points = new Array();
        p.vertices = new Array();
        /*p.dX = 0;
        p.dY = 0;
        p.dR = 0;*/
        
// constructor:
	p.Container_initialize = p.initialize;	//unique to avoid overiding base class

	p.initialize = function (points, initObject) {
		this.Container_initialize();

        this.hull = new createjs.Shape();
        this.addChild(this.hull);
            
        if (points!=null){

            console.log("initializing new asteroid");

            this.x = initObject.x;
            this.y = initObject.y;
            this.dX = -initObject.dX;
            this.dY = -initObject.dY;
            this.dR = -initObject.dR;
            
            this.points = points;
            this.buildVertices();            
            this.drawGeometry();

        }else{
            this.buildPillGeometry();
        } 

                
                //this.buildGeometry();
		
        this.mouseEnabled = true;
        this.cursor = 'crosshair';
                
	};
        
    p.collision = function(object){
        
        //console.clear();
        
        var pt = object.localToLocal(0,0,this);
        
        //console.log(" - - - > " + this.vertices.length + " < - - - ");
        
        var tmpX = object.x, 
        tmpY = object.y;

        object.x = object.prevX;
        object.y = object.prevY;
        
        var pt2 = object.localToLocal(0,0,this);
        
        object.x = tmpX;
        object.y = tmpY;
        
        //console.log(object);
        
        var point1 = new Point(pt.x, pt.y);
        var point2 = new Point(pt2.x, pt2.y);
        
        var objectMovementVertex = new Vertex(point1, point2);
        
        //console.log(objectMovementVertex);
        
        this.drawLine(
            objectMovementVertex.startPoint.x,
            objectMovementVertex.startPoint.y,
            objectMovementVertex.endPoint.x,
            objectMovementVertex.endPoint.y,
            "#CC0033"
        );
            
        
        var vertexCollidedWith = null;
        var vertexCollidedWithKey = null;
        //console.log(this.vertices);
        
        var currentVertexKey = null;
        
        var intersectionResult = null;
        
        for (vertexKey in this.vertices){
            
            currentVertexKey = vertexKey;
            
            //console.log(this.vertices);
            
            var vertex = this.vertices[vertexKey];
            
            /*this.drawLine(
                vertex.startPoint.x,
                vertex.startPoint.y,
                vertex.endPoint.x,
                vertex.endPoint.y,
                this.randomHex()
            );*/
            
            //console.log("V, vkey: %s, %s", vertex, vertexKey);
            
            // initial if detects whether the whole of the vertex is outside of the x coordinate 
            // (either higher or lower) than the other vertex. This rules out a lot of 
            // time required in more robust checking of the vertex intersection.s
            /*if (
                (vertex.loX>objectMovementVertex.hiX && vertex.loX>objectMovementVertex.loX ) ||
                (vertex.hiX<objectMovementVertex.hiX && vertex.hiX<objectMovementVertex.loX )
                
            ){
                console.log("COULDN't EVER HIT");
            }else{*/
                //console.log("NOPE");
                
                intersectionResult = objectMovementVertex.checkLineIntersection(vertex);
            
                //console.log("INTERSECTION: %s, %s", intersectionResult.onLine1, intersectionResult.onLine2);

                if (intersectionResult.onLine1 && intersectionResult.onLine2){
                    //console.log("WE HIT A VERTEX!!!!");
                    vertexCollidedWith = vertex;
                    vertexCollidedWithKey = vertexKey;
                    
                    //console.log("intersection result: %s, %s", intersectionResult.x, intersectionResult.y);
                    
                    break;
                //console.log("intersection result: %s, %s", intersectionResult.x, intersectionResult.y);
                }else{
                    //console.log("FOR SOME REASON WE MISSED A VERTEX!!!!");
                    //console.log("intersection result: %s, %s", intersectionResult.x, intersectionResult.y);
                }
                
            //////////////}
            
            //console.log(" - - - - - - - - - - - - - - - ");
            
            
            
            
            
            /*var distanceAway = Math.sqrt( Math.pow( pt.x-point.x ,2) + Math.pow( pt.y-point.y ,2) );
            if (distanceAway <= object.splashDamage){
                pointsCollidedWith.push(pointKey);
            }*/
            
        }
        



        
        
        var collisionPoint = new Point(intersectionResult.x, intersectionResult.y);
        
        //console.log(collisionPoint);
        

        // figure out which points will have been within the blast radius. 
        // we then use the boundaries (Point/NULL adjacencies) to figure out
        // where to cut vertices with additional new points.

        var pointsCollidedWith = new Array();
        var pointsNotCollidedWith = new Array();

        for (pointKey in this.points){
            
            var point = this.points[pointKey];
            var distanceAway = Math.sqrt( Math.pow( collisionPoint.x-point.x ,2) + Math.pow( collisionPoint.y-point.y ,2) );
            //console.log("distanceAway / object.damage: %s / %s", distanceAway, object.damage);
            if (distanceAway <= object.damage){
                pointsCollidedWith.push(point);
                pointsNotCollidedWith.push(null);
            }else{
                pointsCollidedWith.push(null);
                pointsNotCollidedWith.push(point);
            }
            
        }


        var prev = pointsNotCollidedWith[pointsNotCollidedWith.length-1];
        var prevCollided = pointsNotCollidedWith[pointsNotCollidedWith.length-1];
        var finalPointArray = new Array(); 

        for (i=0; i<pointsNotCollidedWith.length; i++){

            var curr = pointsNotCollidedWith[i];
            var currCollided = pointsCollidedWith[i];

            //console.log(curr);
            //console.log(prev);
            

            if (curr!=null && prev==null){

                finalPointArray.push(curr);
                var hitPoint = pointsCollidedWith[i];
                var intersect = getIntersections(
                    [curr.x, curr.y], 
                    [prevCollided.x, prevCollided.y],
                    [collisionPoint.x, collisionPoint.y, object.damage]
                );

                var intersectPoint = intersect.points.intersection1;
                var newPoint = new Point(intersectPoint.coords[0], intersectPoint.coords[1]);
                finalPointArray.push(newPoint);
                
            } else if (curr==null && prev!=null) {

                var hitPoint = pointsCollidedWith[i];
                var intersect = getIntersections(
                    [currCollided.x, currCollided.y], 
                    [prev.x, prev.y],
                    [collisionPoint.x, collisionPoint.y, object.damage]
                );

                var intersectPoint = intersect.points.intersection2;
                var newPoint = new Point(intersectPoint.coords[0], intersectPoint.coords[1]);
                finalPointArray.push(newPoint);

                //finalPointArray.push(curr);
                
            } else {

                //if (curr!=null ){

                    finalPointArray.push(curr);

                //}
                
            }

            prev = pointsNotCollidedWith[i];
            prevCollided = pointsCollidedWith[i];
        }


        //console.log("finalPointArray BEFORE: %s", finalPointArray);
        //console.log( finalPointArray);



        var lastNonNullIndex = null;
        var firstNonNullIndex = null;
        
        // determine the last null index. Once we have this we can start building 
        // sets of points to rebuild asteroid(s)...
        for ( i=finalPointArray.length-1; i>=0; i-- ){
            if (finalPointArray[i]!=null){
                lastNonNullIndex = i;                    
            }else{
                break;
            }
        }

        if (lastNonNullIndex==null){
            for ( i=0; i<=finalPointArray.length-1; i++ ){
                var point = finalPointArray[i];
                if (point!=null){
                    firstNonNullIndex = point;
                    break;
                }
            }

            removed = finalPointArray.splice(firstNonNullIndex, finalPointArray.length);
            finalPointArray = removed.concat(finalPointArray);

        }else{

            removed = finalPointArray.splice(lastNonNullIndex, finalPointArray.length);
            finalPointArray = removed.concat(finalPointArray);

        }


        //console.log("finalPointArray AFTER: %s");
        //console.log( finalPointArray);



        var individualPointSets = new Array();
        var pointSetKey = 0;
        for ( pointKey in finalPointArray ){
            
            var point = finalPointArray[pointKey];

            if (individualPointSets[pointSetKey]==null && point!=null){
                individualPointSets[pointSetKey] = new Array();
                //individualPointSets.push(pointSet); 
            }

            if (point!=null){
                individualPointSets[pointSetKey].push( point );
            }else{
                if (individualPointSets[pointSetKey]!=null){
                    pointSetKey++;
                }
            }
                                          
        }

        //console.log(individualPointSets);

        if (individualPointSets.length>0){

            this.points = individualPointSets[0];

            if (individualPointSets.length>1){
                //console.log(individualPointSets);
                /*for ( i=1; i<individualPointSets.length; i++ ){

                    console.log(individualPointSets[i]);

                    var initObject = new Object({
                        x: this.x,
                        y: this.y,
                        dX: -this.dX,
                        dY: -this.dY,
                        dR: -this.dR            
                    });
                    
                    var tempArray = individualPointSets[i];

                    //var asteroidLine = new AsteroidLine(tempArray, initObject);

                    //system.addChild(asteroidLine);



                }*/

                var initObject = new Object({
                    x: this.x,
                    y: this.y,
                    dX: -this.dX,
                    dY: -this.dY,
                    dR: -this.dR            
                });
                
                var tempArray = individualPointSets[1];

                var newAsteroidLine = new AsteroidLine(tempArray, initObject);

                system.addChild(newAsteroidLine);

            }

        }



        //this.points = finalPointArray;


        // a = [100, 200],          // start-point
        // b = [400, 200],          // end-point
        // c = [200, 150, 50],      // circle

        //function getIntersections(a, b, c) {

        // //////////////////////////////////////////////
        // http://bl.ocks.org/milkbread/11000965
        // could be useful in determining the
        // intersection of the circle and line
        // ////////////////////////////////////////////// 
        
        
        
        
        /*var vertexesInCollision = new Array();
        var tempVertexKey = 
        
        while (){
            
        }*/
        
        
        
        //for (i=currentVertexKey; i>){
            
        //}
        
        
        
        
        //console.log("vertexCollidedWith: %s", vertexCollidedWith);            
        //console.log("vertexCollidedWithKey: %s", vertexCollidedWithKey);
        
        
        
        //console.log("pointKeys HIT: %s", pointsCollidedWith);
        
        
        
        //console.log("pt: %s, %s", pt.x, pt.y);
        
        /*var damageSplash = object.splashDamage;
        
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
        
        damage.mask = this.hull;*/
        
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

        this.buildVertices();
        
        this.drawGeometry();

        //var g = this.hull.graphics;

        //g.clear();
        
        
    };

// public methods:

    p.randomHex = function(){
        
        return '#'+Math.floor(Math.random()*16777215).toString(16);
        
    }

    p.buildPillGeometry = function () {
            
            var point = new Point(-140, 0);
            this.points.push(point);
                        
            for (i=-120; i<=120; i+=20){
                point = new Point(i, 20);
                this.points.push(point);
            }
            
            point = new Point(140, 0);
            this.points.push(point);

            for (i=120; i>=-120; i-=20){
                point = new Point(i, -20);
                this.points.push(point);
            }

                
                        
            this.buildVertices();
            
            this.drawGeometry();
            
    };

	p.buildGeometry = function () {
            
            /*var g = new createjs.Graphics();
            g.setStrChild(this.shipFlame);
		this.addokeStyle(1);
            g.beginStroke(createjs.Graphics.getRGB(0,0,0));
            g.beginFill(createjs.Graphics.getRGB(128,128,0));
            g.drawCircle(0,0,this.RADIUS);*/

            //var s = new createjs.Shape(g);
            //this.addChild(s);
            
            var theta = 0;
            
            while (theta<360){
                
                
                var hyp = this.RADIUS - Math.round( Math.random() * this.RADIUS_DIFF );
        
                //console.log(hyp);
                
                //http://www.bbc.co.uk/schools/gcsebitesize/maths/geometry/trigonometryrev2.shtml
                
                // SOH
                var opp = Math.sin(Math.radians(theta)) * hyp;
                
                // CAH
                var adj = Math.cos(Math.radians(theta)) * hyp;
                
                //console.log("hyp | opp | adj: %s, %s, %s", hyp, opp, adj);
                
                var point = new Point(opp, adj);
                this.points.push(point);
                
                console.log(point);
                
                try{
                    theta += this.RADIAL_STEP;
                                        
                }catch(err){
                    console.error(err);
                }
                
                
                
            }
                        
            this.buildVertices();
            
            this.drawGeometry();
            
	};
        
    p.rebuildVertices = function(){
        
        this.vertices = null;
        this.buildVertices();
        
    }
    
    p.buildVertices = function(){
        
        var prevPoint = this.points[this.points.length-1];
        
        for (pointKey in this.points){
            
            var point = this.points[pointKey];                
            var vertex = new Vertex(prevPoint, point);
            this.vertices.push(vertex);
            prevPoint.addVertex(vertex);
            point.addVertex(vertex);
            prevPoint = point;
        }
        
    };
    
    p.drawLine = function(x1, y1, x2, y2, colour){
        
        //var g = new createjs.Graphics();
        var line = new createjs.Shape();
        this.addChild(line);
        
        var g = line.graphics;
        g.beginStroke(colour);
        g.setStrokeStyle(2,"round");
        //g.setStrokeStyle = new createjs.Graphics.StrokeStyle( 10 );
//          
//g.beginFill(createjs.Graphics.getRGB(128,128,0));                     
        //g.drawCircle(0, 0, 100);
        
        g.moveTo(x1, y1);
        g.lineTo(x2, y2);
        
        g.endStroke();
        
    };
    
    p.drawGeometry = function(){
        
        //var g = new createjs.Graphics();
        //this.hull = new createjs.Shape();
        //this.addChild(this.hull);
        
        var g = this.hull.graphics;

        g.clear();
        g.beginFill(createjs.Graphics.getRGB(0,128,0));                     
        //g.drawCircle(0, 0, 100);
        
        g.moveTo(this.points[0].x, this.points[0].y);
        g.drawCircle(this.points[0].x, this.points[0].y, 3);

        //console.log(this.points);
        
        for (pointKey in this.points){
            var point = this.points[pointKey];                
            //console.log(point);
            //g.lineTo(point.x, point.y); 
            g.drawCircle(point.x, point.y, 3);
           
        }
        
        g.endFill();
        
        
        /*g.setStrChild(this.shipFlame);
	this.addokeStyle(1);
        g.beginStroke(createjs.Graphics.getRGB(0,0,0));
        g.beginFill(createjs.Graphics.getRGB(128,128,0));
        g.drawCircle(0,0,this.RADIUS);*/

        
    }

    p.drawPoints = function(){
        
        //var g = new createjs.Graphics();
        
        for (pointKey in this.points){
            var point = this.points[pointKey];

        }

        var g = this.hull.graphics;

        g.clear();
        g.beginFill(createjs.Graphics.getRGB(0,128,0));                     
        //g.drawCircle(0, 0, 100);
        
        g.moveTo(this.points[0].x, this.points[0].y);
       
        //console.log(this.points);
        
        for (pointKey in this.points){
            var point = this.points[pointKey];                
            //console.log(point);
            g.lineTo(point.x, point.y);                
        }
        
        g.endFill();
        
        
        /*g.setStrChild(this.shipFlame);
    this.addokeStyle(1);
        g.beginStroke(createjs.Graphics.getRGB(0,0,0));
        g.beginFill(createjs.Graphics.getRGB(128,128,0));
        g.drawCircle(0,0,this.RADIUS);*/

        
    }

	p.tick = function (event) {
            //move by velocity
            this.x += p.dX;
            this.y += p.dY;
            this.rotation += p.dR;
	};       
        
        
        
        

	window.AsteroidLine = AsteroidLine;

}(window));



Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};
 
// Converts from radians to degrees.
Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
};