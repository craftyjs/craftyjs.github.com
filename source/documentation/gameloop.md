---
title: Gameloop mechanics
layout: documentation
---

Crafty's game loop is implemented in [Crafty.timer.step](/api/Crafty-timer.html#Crafty-timer-step).  It uses global events to communicate with the rest of the engine.  The basic loop is driven by [`requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) if available, and consists of the following phases:

- One or more calls to "EnterFrame" which advance the game state
- A single call to "RenderScene" which triggers each layer to draw itself

Everything triggered by "EnterFrame" will resolve before the scene is rendered -- for instance, if you move an object several times in response to a single event, only its final position will be visible.

There are some other events which are used for benchmarks and fine grained control, but the above two are the most important.

## EnterFrame

Functions bound to this event are passed an object with several properties, only a couple of which are typically important:

```
data = {
	frame: frameNumber // the number of frames since Crafty.init()
	dt: ms // the time in ms which has passed since the last "EnterFrame" event
}

```

All game logic, i.e. anything that changes over time, is ultimately hooked into the "EnterFrame" event.  Many components (such as ["Tween"](/api/Tween.html)) exist to simplify this interaction, but to provide custom behavior you'll probably end up binding entities  directly to this event.  If you want to provide smooth behavior, you should use the `dt` property to determine how far the game state should advance.  As a simple example, here's a red square that will move to the right at 10 pixels per second:

```
Crafty.init(400, 400);
var square = Crafty.e('2D, Canvas, Color');
  .attr({x: 10, y: 10, w: 100, h: 100})
  .color('red')
  .bind("EnterFrame", function(eventData) {
    // Move to the right by 10 pixels per second
    this.x = this.x + 10 * (eventData.dt / 1000);
  });

```

## RenderScene

The rendering layers like "Canvas" and "DOM" listen to this event, making sure that what's visible on the screen matches  the game state as of the last "EnterFrame" event.  Generally, you'd never need to bind to this event yourself unless you're implementing a custom rendering layer.

## Crafty.timer.steptype

The [Crafty.timer.steptype](/api/Crafty-timer.html#Crafty-timer-steptype) function lets you control the exact way "EnterFrame" events consume game time.  This can be a pretty complex topic; for an in-depth discussion, see Glenn Fiedler's famous [Fix Your Timestep!](http://gafferongames.com/game-physics/fix-your-timestep/) article.

Crafty defaults to a fixed timestep with the possibility of using multiple "EnterFrame" events to combat slowdown, but this behavior is customizable.  See the method's documentation for details!







