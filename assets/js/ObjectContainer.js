//##############################################################################
// ObjectContainer.js
//##############################################################################

(function() {
	"use strict";


// constructor:
	/**
	 * an ObjectContainer is used to provide basic Collision methods for inheritance and distribution to 
	 * multiple differnet objects.
	 *
	 * @class ObjectContainer
	 * @extends Container
	 * @constructor
	 **/
	function ObjectContainer() {
		
		this.Container_constructor();
	
	}
	var p = createjs.extend(ObjectContainer, createjs.Container);
	
	p.initialize = ObjectContainer; // TODO: deprecated.
	
	createjs.ObjectContainer = createjs.promote(ObjectContainer, "Container");

}());