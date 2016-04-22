function Vertex(startPoint, endPoint) {

    this.type = "vertex";
    this.name = "vertex";
    
    this.startPoint = startPoint;
    this.endPoint = endPoint;

    this.hiX = endPoint.x;
    this.loX = startPoint.x;
    this.hiY = endPoint.y;
    this.loY = startPoint.y;
    
    if (startPoint.x>=endPoint.x){
        hix = startPoint.x;
        lox = endPoint.x;
    }
    
    if (startPoint.y>=endPoint.y){
        hiy = startPoint.y;
        loy = endPoint.y;
    }

    // http://jsfiddle.net/justin_c_rounds/Gd2S2/
    this.checkLineIntersection = function (vertex2) {
        // if the lines intersect, the result contains the x and y of the intersection (treating the lines as infinite) and booleans for whether line segment 1 or line segment 2 contain the point
        var denominator, a, b, numerator1, numerator2, result = {
            x: null,
            y: null,
            onLine1: false,
            onLine2: false
        };
        
        var line1StartX = this.startPoint.x,
        line1StartY = this.startPoint.y,
        line1EndX = this.endPoint.x,
        line1EndY = this.endPoint.y;

        var line2StartX = vertex2.startPoint.x,
        line2StartY = vertex2.startPoint.y,
        line2EndX = vertex2.endPoint.x,
        line2EndY = vertex2.endPoint.y;


        
        denominator = ((line2EndY - line2StartY) * (line1EndX - line1StartX)) - ((line2EndX - line2StartX) * (line1EndY - line1StartY));
        if (denominator == 0) {
            return result;
        }
        a = line1StartY - line2StartY;
        b = line1StartX - line2StartX;
        numerator1 = ((line2EndX - line2StartX) * a) - ((line2EndY - line2StartY) * b);
        numerator2 = ((line1EndX - line1StartX) * a) - ((line1EndY - line1StartY) * b);
        a = numerator1 / denominator;
        b = numerator2 / denominator;

        // if we cast these lines infinitely in both directions, they intersect here:
        result.x = line1StartX + (a * (line1EndX - line1StartX));
        result.y = line1StartY + (a * (line1EndY - line1StartY));
    /*
            // it is worth noting that this should be the same as:
            x = line2StartX + (b * (line2EndX - line2StartX));
            y = line2StartX + (b * (line2EndY - line2StartY));
            */
        // if line1 is a segment and line2 is infinite, they intersect if:
        if (a > 0 && a < 1) {
            result.onLine1 = true;
        }
        // if line2 is a segment and line1 is infinite, they intersect if:
        if (b > 0 && b < 1) {
            result.onLine2 = true;
        }
        // if line1 and line2 are segments, they intersect if both of the above are true
        return result;
    };

}
