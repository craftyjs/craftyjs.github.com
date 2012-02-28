---
layout: tutorial
title: How Crafty Works
---

( This will be the front page of Tutorial section )

# Introduction

Crafty is a game javascript library that can help you create games in a structured way...

Key features: 

* Entities & Components - A clean and decoupled way to organize game elements. No inheritance needed!
* Canvas or DOM - Choose the technology to render your entities, it will look exactly the same.
* Eventbinding - Event system for custom events that can be triggered whenever, whatever and bound just as easy. 

Other goodies:

* Thriving community - Help is eradibly available in the forum.
* Community modules - A constantly growing collection of user generated code you can use.
* Pure javascript - No magic. Works in all major browsers and can be combined with your favorite js library

# What parts does a Crafty game consist of

Explain events, entities, sprites etc.



A simple game of pong

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

<iframe width="600" height="300" src="/tutorial/games/pong/pong.html">
	This is an iframe. sorry.
</iframe>