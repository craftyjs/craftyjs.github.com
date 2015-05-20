---
title: Keyboard
layout: documentation
---

To have the keyboard control player movement, Crafty provides three simple componenets that will get you started very quickly:

- [Twoway](/api/Twoway.html)
- [Fourway](/api/Fourway.html)
- [Multiway](/api/Multiway.html)

## Fourway and Multiway

To use the Fourway component, you need to specify the rate of movement by calling the `fourway()` method with a speed.

```
Crafty.init();
Crafty.e('2D, Canvas, Fourway, Color')
  .attr({x: 10, y: 10, h: 30, w: 30})
  .color('red')
  .fourway(5)
```

This will create a red square that will move in response to both the arrow keys and WASD.  "Fourway" is really a wrapper about ["Multiway"](/api/Multiway.html), which you can use to define more complex movement.

## Twoway

You might want to use [Twoway](/api/Twoway.html) if you're making a simple platform game (like Mario). Here you can move you from either side and jump up and down.

```
Crafty.init();
Crafty.e('2D, Canvas, Twoway, Color')
  .attr({x: 10, y: 10, h: 30, w: 30})
  .color('red')
  .twoway()
```

In most cases, you'd want to include the [Gravity](/api/Gravity.html) component as well!

## The Keyboard component

You might well need more control than the above components provide.  To respond to specific keyboard events, give an entity the ["Keyboard"](/api/Keyboard.html) component.  In the example below, we create a red square that will turn blue when you press any key.

```
Crafty.init();
Crafty.e('2D, Canvas, Keyboard')
  .attr({x: 10, y: 10, h: 30, w: 30})
  .color('red')
  .bind("KeyDown", function() {
    this.color("blue");
  })
```

The various [keyboard events](/api/KeyboardEvent.html) will be passed information about the original DOM event, and Crafty provides a [dictionary of key codes](/api/Crafty-keys.html) for convenience.  In the following example, we create a square that can be moved by the arrow keys:

```
Crafty.e("2D, Canvas, Color")
  .attr({x: 10, y: 10, w: 30, h: 30})
  .color("red")
  .bind('KeyDown', function(e) {
    if(e.key == Crafty.keys.LEFT_ARROW) {
      this.x = this.x - 1;
    } else if (e.key == Crafty.keys.RIGHT_ARROW) {
      this.x = this.x + 1;
    } else if (e.key == Crafty.keys.UP_ARROW) {
      this.y = this.y - 1;
    } else if (e.key == Crafty.keys.DOWN_ARROW) {
      this.y = this.y + 1;
    }
  });

```
