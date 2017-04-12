---
title: The Event System
layout: documentation
---

Crafty uses events for communication.

The basic idea is to bind functions to named events.  When that event is triggered, the function will then be called directly.  Here's a very simple example:

```
// Create a red square
var square = Crafty.e("2D, Canvas, Color")
		.attr({x:10,y:10, w:30, h:30})
		.color("blue");

// When a "Blush" event is triggered, turn pink
square.bind("Blush", function() {
	// the function will be called in the context of the entity
	this.color("pink")
});

// Trigger the event, causing the square to turn pink
square.trigger("Blush");
```

Above, we bind to an event on an entity and then immediately trigger it.  More typically, the event would be triggered elsewhere in the game logic.  You can bind multiple functions to the same event, but you generally shouldn't rely on them executing in a particular order.

Every entity automatically gets several methods which relate to events; these are documented under [Crafty Core](/api/Crafty Core.html).  We'll explore aspects of this in more detail below.	

## Passing data

Many events pass data to the bound function.  Let's make the above code a bit more generic by defining a "ChangeColor" event:

```
square.bind("ChangeColor", function(color) {
	this.color(color);
});

square.trigger("ChangeColor", "pink"); // Turn pink
```

When you trigger the event, a single paramter can be passed as the second argument.  This isn't too limiting, because you can always pass an object -- for instance, if we wanted `"ChangeColor"` to use rgb values instead of a single name:

```
// Assume that color is an object
square.bind("ChangeColor", function(color) {
	this.color(color.r, color,g, color.b);
})

// Specify the RGB values corresponding to pink
square.trigger("ChangeColor", {r:255, g:192, b:203});
```

## Unbinding events

To unbind an event, you need a reference to the bound function, so you typically can't use an anonymous one.  Modifying our initial example:

```
var turnPink = function() { 
	this.color("pink");
}

// Bind the function to an event
square.bind("Blush", turnPink);

// Immediately unbind it!
square.unbind("Blush", turnPink);
```

Very commonly, you might want a function to only be triggered once.  In that case, you can bind it with `.one()` instead of `.bind()`:

```
// Use the .one() method instead of .bind()
square.one("JumpRight", function() {
	// Move 10 px to the right
	this.x += 100;
});

// If we trigger the event twice, the bound function will be called only the first time
square.trigger("JumpRight");
square.trigger("JumpRight");
```

## Working with built-in events

Many of Crafty's built-in components will trigger events, and the more useful ones will be documented in the API reference.  For instance, the [`2D` component](/api/2D.html) tells us that it will trigger a "Move" event any time the object's position changes, and that the event will pass along an object containing the entity's old position.

```
// Bind a function to the "Move" event
// It will log the initial and new x position anytime the entity moves
square.bind("Move", function(oldPosition) {
	console.log(oldPosition._x, this.x);
});

square.x = 100; // Will print "10, 100"
```

As you explore Crafty's [API](/api/), you'll see such built-in events highlighted in green.

## Global events

All the events we've discussed so far have been local to one specific entity.  But events can be triggered globally as well -- they will then trigger on *every* entity.

```
// Define two entities at x=5 and x=10
var varrick = Crafty.e("2D").attr({x:5});
var xhuli = Crafty.e("2D").attr({x:10});

// Bind to an event called "Thing"
varrick.bind("Thing", function() { this.x += 20; });
xhuli.bind("Thing", function() { this.x += 10; });

// Do the thing!
// varrick and xhuli will *both* move to the right
Crafty.trigger("Thing");

// You can still trigger the same events directly on an entity
xhuli.trigger("Thing");
```

You can also bind to events directly on the Crafty object:

```
Crafty.bind("Thing", function() {
	console.log("Crafty does the thing.")
});
```

In such a globally bound function, the context will be the global Crafty object (`this === Crafty`).

`Crafty.unbind()` and `Crafty.one()` also exist, and act exactly as you'd expect!

One particularly important built-in global event is "UpdateFrame".  You can read more about it in the section on Crafty's [game loop](/documentation/gameloop.html)