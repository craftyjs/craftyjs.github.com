---
title: Custom Components
layout: documentation
---

Crafty has a lot of built-in components, but creating your own is a good way to organize your game.

In several examples we've created colored squares, and we've repeated that code a *lot*.  For instance, the code below creates two squares:

```
var sq1 = Crafty.e("2D, Canvas, Color")
	.attr({x:10, y:10, w:30, h:30})
	.color("red");
var sq1 = Crafty.e("2D, Canvas, Color")
	.attr({x:150, y:100, w:30, h:30})
	.color("green");
```

Now, you could create a function that simply generates such a square, but the Crafty way is to use components.  Define a component by using [`Crafty.c`](/api/Crafty-c.html).

```
Crafty.c("Square", {
	// This function will be called when the component is added to an entity
	// So it sets up the things that both our entities had in common
	init: function() {
		this.addComponent("2D, Canvas, Color");
		this.w = 30;
		this.h = 30;
	},

	// This function will be called when the component is removed from an entity
	// or right before entity is destroyed.
	// Useful for doing custom cleanup.
	remove: function() {
		// This function serves for logging.
		// Once your game is release ready you can disable logging
		// by setting Crafty.loggingEnabled to false
		Crafty.log('Square was removed!');
	},

	// Our two entities had different positions, 
	// so we define a method for setting the position
	place: function(x, y) {
		this.x = x;
		this.y = y;

		// There's no magic to method chaining.
		// To allow it, we have to return the entity!
		return this;
	}
})
```

`Crafty.c` takes two arguments: the first is the name of the component, the second is an object which defines its methods and properties.  When the component is added to an entity, all the methods and properties are copied to the entity in question.  The `init` field is treated specially, and is called when the component is added to an entity. You can also define a `remove` function that will be run when the component is removed, or right before the entity is destroyed.

With the above definition, our original code could be rewritten as

```
var sq1 = Crafty.e("Square")
	.place(10, 10)
	.color("red");

var sq2 = Crafty.e("Square")
	.place(150, 100)
	.color("green");
```

We've taken everything that the two entities had in common, and put it in the `init` function of our component.  This is a very common way to reuse code between entities.  In some ways it's a bit like "Square" inherits the methods of the other components; by adding "Square" to an entity, we automatically get all the methods of "Color".

Keep in mind that the method chaining technique (calling `e.place().color()`) is only possible because we explicitly return `this` from our custom method.  Forgetting to do so can be a common source of errors, so keep that in mind if you get a hard-to-pin-down "method undefined" message.

## Shorthand for adding components

To quickly declare a list of additional components that need to be added to the entity before a custom component initializes, you can use the `required` field:

```
Crafty.c("Square", {
	// These components will be added to any entity with the "Square" component before it is initialized
	required: "2D, Canvas, Color"
});
```

## Shorthand for binding events

It's very common to bind events when a component initializes, unbinding those same events when the component is removed.  To simplify this, you can declare event handlers directly in the component object:

```
Crafty.c("Square", {
	required: "2D, Canvas, Color",

	// These handlers will be bound upon init, and unbound when the component is removed
	events: {
		// bind the given function to the blush event
		"Blush": function() {
			this.color("pink");
		},

		// Bind the named function to the "Blanch" event.
		"Blanch": "turnWhite"
	},

	turnWhite: function(){
		this.color("white");
	}
});
```

You can either use a function object, or the name of an existing function on the component.  (The latter style can be useful when you need to refer to the method in contexts other than a single event.)


## Shorthand for defining properties

It's also common to define properties. To reduce the needed boilerplate code you can add [property descriptors](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) directly into the component object. These properties will be defined when the component is added to an entity:

```
Crafty.c("Square", {
	required: "2D, Canvas, Color",

	init: function() {
		this.w = 30;
		this.h = 30;
	},

	// These properties will be defined upon init
	properties: {
		// public `area` property, used by external code not aware of the implementation
		area: {
			// setter for the `area` property
			set: function(value) {
				// set the entity's width and height to the square root of the new area
				var sqrt = Math.sqrt(value);
				this.w = sqrt;
				this.h = sqrt;
				// avoid "complex" area computations, by caching it for retrieval
				this._area = value;
			},

			// getter for the `area` property
			get: function() {
				// return the cached area value
				return this._area;
			},

			// make the property show up in property enumerations
			enumerable: true,
			// property shouldn't be deletable
			configurable: false
		},

		// private `_area` property, serves as a cached value for the area computation
		_area: {
			// set the initial value to this.w * this.h
			value: 30 * 30,
			// it's a mutable property
			writable: true,
			// hide the property from property enumerations
			enumerable:false,
			// property shouldn't be deletable
			configurable: false
		}
	}
});
```

The `area` property we defined above can be used in the following way, for example:
```
var sq = Crafty.e("Square");
Crafty.log('Initial area:', sq.area); // logs '900'
Crafty.log('Initial width:', sq.w); // logs '30'
Crafty.log('Initial height:', sq.h); // logs '30'

sq.area = 400;
Crafty.log('New area:', sq.area); // logs '400'
Crafty.log('New width:', sq.w); // logs '20'
Crafty.log('New height:', sq.h); // logs '20'
```

This example is a bit contrived and doesn't properly update the area when the entity's width or height are changed by another piece of code, but showcases some benefits of using properties to hide implementation details. Try to extend this code to properly account for external changes of the entity's dimensions (hint: listen for [`Resize` events](http://craftyjs.com/api/2D.html)).


## The nitty gritty

Sometimes you might need to know exactly how components are added to an entity.  (If the component has previously been added to an entity, it won't be further modified.)

- First a flag indicating the existence of the component is set, and the entity is added to a cached list of entities with that component.
- Then all simple properties and methods are copied over from the component's object.  If any already exist, they will be overwritten. This is a shallow copy: if a property is an object or array, it is copied by reference.
- If any setters, getters, or other special behavior are defined in the component's `properties` object, they are added by calling `defineProperty`
- If any handlers are defined in the component's `events` property, they are bound to the entity.
- The init function of the component object is called.
- Finally, the `"NewComponent"` event is triggered.
 
### The shared object trap

As mentioned above, objects and arrays are copied by reference.  This can cause unexpected behavior if you're not careful:

```
Crafty.c("MyComponent", {
	sharedObject: {a:1, b:2}
});
var e1 = Crafty.e("MyComponent");
var e2 = Crafty.e("MyComponent");
e1.sharedObject.a = 5;
console.log(e2.sharedObject.a); // Logs 5!
```

If you want a property to be an object, but *don't* want it shared between entities, the solution is to create a new object inside the init method:

```
Crafty.c("MyComponent", {
	init: function() {
		this.myObject = {a:1, b:2};
	}
});
var e1 = Crafty.e("MyComponent");
var e2 = Crafty.e("MyComponent");
e1.myObject.a = 5;
console.log(e2.myObject.a); // Logs the original value of 1
```

