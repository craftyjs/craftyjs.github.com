---
title: Working with entities
layout: documentation
---

An entity is some *thing* in your game.  If that sounds vague, it's because practically anything can be an entity -- the player, the enemies, a projectile, a high score counter, or a menu item.

Entities are made up of components, which you can think of as bundles of functionality.  Crafty provides several built-in components, and you can also define your own with [`Crafty.c()`](/api/Crafty-c.html).

## Creating entities

You create an entity with [`Crafty.e()`](/api/Craft-e.html).  In most cases you'll pass in a list of the components you want to start with:

```
var square = Crafty.e("2D, Canvas, Color");
```

Typically you'll need to write some more code to actually *do* something with the entity, but the above is all you need to create it.  In fact, you don't even need to assign the entity to a variable -- just calling `Crafty.e` is enough, and we'll learn later how to manipulate entities without a direct reference.

## Core properties and methods

There are certain properties and methods that every entity shares, even if no components have been added.  You'll find these documented under [Crafty Core](/api/Crafty Core.html).

### Component methods

You can [add](api/Crafty Core.html#-addComponent) and [remove](http://craftyjs.com/api/Crafty%20Core.html#-removeComponent) components to an entity after it has been created.  So instead of our previous code, we could have written:

```
var square = Crafty.e("2D, Canvas");
square.addComponent("Color");
```

If we no longer wanted our component to appear as a colored square, we could remove that component later:

```
square.removeComponent("Color", false)
```

We pass in `false` to `removeComponent()` because we want to actually remove all properties and methods associated with the component.

To learn whether an entity has a particular component, you can use the `has()` method.  For instance, perhaps we want to check if an entity might explode:

```
if (e.has("Explode"))
	e.explode();
```

### Setting properties

A component such as [2D](/api/api.html) might interact with certain properties of an entity.  You can set them directly, or use `attr` as a shorthand for setting several at once.  So this:
```
square.x = 5;
square.y = 10;
```
is equivalent to
```
square.attr({x:5, y:10})
```

### Events

Crafty uses both global and local events for communication amongst entities and components.  To create an event listener, you can use the `.bind()` method.  Let's make our previous square switch colors in response to an event.

```
// Bind a function to the event
square.bind("ChangeColor", function(eventData){
		// `this` refers to the entity
		this.color(eventData.color);
	})
// Trigger that event directly on the entity
square.trigger("ChangeColor", {color:"blue"});
```

In the above code, we directly trigger the effect on the entity.  You can also trigger an effect globally, which means *all* entities will receive it.  Events are often used for communication between components -- you can find information about such events in the component's documentation.

If a function should only be triggered once, you can bind with the `one()` method instead of `bind()`.  To remove a bound event, use `unbind()`.

See the section on [events](/documentation/events.html) for more discussion of the event system.

### Destruction

Calling the `destroy()` method of an entity will destroy it.


## Selecting entities

When an entity is created, it's given a unique ID.  To find this id, you can call the `getId()` method.

If you know the id of an entity, you can get a reference to it like this:
```
var secondEntity = Crafty(2);
```

[`Crafty`](/api/Crafty.html) is both an object and a function.  This might be familiar to you from working with jQuery.  And as in jQuery, you can select multiple entities at once, typically based on what components they have:

```
// Select all entities with the 2D components
Crafty("2D");
// select all entities with both 2D and DOM
Crafty("2D DOM");
// select entities with either DOM or Canvas
Crafty("DOM, Canvas");
// Select all entities
Crafty("*");
```

Once you have a selection, you can call event-related methods directly:

```
// Bind a function to *every* entity with the Keyboard component
Crafty("Keyboard").bind("KeyDown", function(){
	// Do something on keydown
});

// Explode all the things!
Crafty("*").trigger("Explode");
```

You can run a function in the context of every entity:
```
// Move every 2D entity 5 pixels to the right
Crafty("2D").each(function() {
	this.x += 5;
});
```

If you need to know how many entities are in the selection, you can check the `length` property.

You can use `get()` to either obtain an array containing every entity in the selection, or the entity at a particular index:

```
// Get the first Canvas entity
var first_entity = Crafty("Canvas").get(0);
// Get an array of all 2D entities
var array_of_entities = Crafty("2D").get();
// Convert to an array of ids, rather than entities
var array_of_ids = Crafty("2D").toArray();
```