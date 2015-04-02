---
layout: tutorial
title: How Crafty Works
---


# Introduction

Crafty is a JavaScript game library that can help you create games in a structured way...

Key Features: 

* Entities & Components - A clean and decoupled way to organize game elements. No inheritance needed!
* Canvas or DOM - Choose the technology to render your entities; it will look exactly the same.
* Eventbinding - Event system for custom events that can be triggered whenever, whatever and bound just as easily. 

Other Goodies:

* Thriving community - Help is readily available in the forum.
* Community modules - A constantly growing collection of user-generated code you can use.
* Pure JavaScript - No magic. Works in all major browsers and can be combined with your favorite js library.

# What does a Crafty game look like

Entities are the basic building blocks in Crafty. Everything in your game that needs to interact with the world is an entity. A player entity could look like this:

{% highlight javascript %}
Crafty.e("2D, DOM, Twoway").twoway(3);
{% endhighlight %}

This creates an entity that is positioned in the 2D world, is drawn to the stage using DOM elements and can be moved left and right using the arrow keys at a speed of 3 pixls pr frame.
If this seems a little magic to you it is because I haven't introduced you to components yet.

A component is a reusable piece of functionality that can be added to one or more entities. You can add components when the entity is created, as we did above, or at any later point. Components can even add more components to its host entity.
The following component moves its entity to a random place on the stage:

{% highlight javascript %}
Crafty.c("RandomPosition", {
	init: function() {
		this.attr({ x: Crafty.math.randomInt(50,350), y: Crafty.math.randomInt(50,350) });
	}
});

var myEnt = Crafty.e("2D, DOM, Twoway, RandomPosition, Color").twoway(3).color("red").attr({w: 50, h: 50});
{% endhighlight %}

I also changed the size of the entity and gave it a color so you can see it. You now have a fully runnable game - go ahead and add it to the skeleton from <a href='/tutorial/getting-started/download-and-setup'>Download and setup</a> to see for yourself!

Entities can react to events that occur in the game. Crafty provides a suite of build in events such as EnterFrame, Pause, SceneChange. Moving an entity one pixel to the left each frame is achieved by binding a function to the EnterFrame event

{% highlight javascript %}
myEnt.bind("EnterFrame", function() {
	this.x--;
})
{% endhighlight %}

# A simple game of pong

With these simple building blocks you can create a game of two player pong complete with paddles and scoreboard in some 50 lines of javascript!

{% highlight javascript %}
Crafty.init(600, 300);
Crafty.background('rgb(127,127,127)');

//Paddles
Crafty.e("Paddle, 2D, DOM, Color, Multiway")
	.color('rgb(255,0,0)')
	.attr({ x: 20, y: 100, w: 10, h: 100 })
	.multiway(4, { W: -90, S: 90 });
Crafty.e("Paddle, 2D, DOM, Color, Multiway")
	.color('rgb(0,255,0)')
	.attr({ x: 580, y: 100, w: 10, h: 100 })
	.multiway(4, { UP_ARROW: -90, DOWN_ARROW: 90 });

//Ball
Crafty.e("2D, DOM, Color, Collision")
	.color('rgb(0,0,255)')
	.attr({ x: 300, y: 150, w: 10, h: 10, 
			dX: Crafty.math.randomInt(2, 5), 
			dY: Crafty.math.randomInt(2, 5) })
	.bind('EnterFrame', function () {
		//hit floor or roof
		if (this.y <= 0 || this.y >= 290)
			this.dY *= -1;

		if (this.x > 600) {
			this.x = 300;
			Crafty("LeftPoints").each(function () { 
				this.text(++this.points + " Points") });
		}
		if (this.x < 10) {
			this.x = 300;
			Crafty("RightPoints").each(function () { 
				this.text(++this.points + " Points") });
		}

		this.x += this.dX;
		this.y += this.dY;
	})
	.onHit('Paddle', function () {
	this.dX *= -1;
})

//Score boards
Crafty.e("LeftPoints, DOM, 2D, Text")
	.attr({ x: 20, y: 20, w: 100, h: 20, points: 0 })
	.text("0 Points");
Crafty.e("RightPoints, DOM, 2D, Text")
	.attr({ x: 515, y: 20, w: 100, h: 20, points: 0 })
	.text("0 Points");
{% endhighlight %}

And the result

<iframe id="gameframe" width="600" height="300" src="/tutorial/games/pong/pong.html">
	This is an iframe. sorry.
</iframe>

<script type="text/javascript">
	//Prevent the game from scrolling main page
    if (frames['gameframe']!=undefined)
      frames['gameframe'].focus(); // Works in all browser, except Firefox
    else
      document.getElementById('gameframe').focus();  // Works in Firefox
</script>
