window.onload = function() {
	Crafty.init();
	Crafty.canvas();
	
	Crafty.sprite(128, "sprite.png", {
		shape1: [0,0],
		shape2: [1,0]
	});
	
	
	
	shape1 = Crafty.e("2D, canvas, shape1, draggable")
		.attr("map", new Crafty.polygon([0,63], [24,18],[86,10],[127,76],[77,127]));
	
	shape1.attach(shape1.map);
	
	shape2 = Crafty.e("2D, canvas, shape2, draggable")
		.attr({vx: 2, vy: 2, map: new Crafty.polygon([2,42],[68,0],[127,51],[68,127])});
	shape2.attach(shape2.map);
	
};