function Point(x, y) {

    this.type = "point";
    this.name = "point";
    this.vertices = new Array();

    this.x = x;
    this.y = y;

    this.addVertex = function(vertex){
        this.vertices.push(vertex);
    }

}
