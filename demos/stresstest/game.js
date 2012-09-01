window.onload = function() {
	
	Crafty.init();
	Crafty.dontPauseOnBlur = true;
	
	Crafty.sprite(64, "sprite.png", {
		ship: [0,0],
		rock: [1,0],
		mrock: [2,0],
		srock: [3,0]
	});
	
	
	for(var i = 0; i < 500; i++) {
		var fps = Crafty.timer.getFPS();
			
		Crafty.e('2D, DOM, ship').attr({
			x: Crafty.randRange(0, Crafty.viewport.width),
			y: Crafty.randRange(0, Crafty.viewport.height)
		}).origin("center").bind("enterframe", function() { this.rotation += 5; });
	}
};