---
layout: tutorial
title: "Keyboard input and binding to events"
---

Events is how components in Crafty talk to each other. In this article we will bind to events from Craftys Keyboard component to make it possible for a player to control the main character.

The following code will create the player entity. The Ape component provides collision handling and some nice walking animations. We shall create this component in a moment. The LeftControls component will handle keyboard input and BombDropper will give out hero the ability to throw bombs. You may recall from the last article that we defined a sprite component called player:


{% highlight javascript %}
//create our player entity with some premade components
var player1 = Crafty.e("2D, DOM, Ape, player, LeftControls, BombDropper")
        .attr({ x: 16, y: 304, z: 1 })
        .leftControls(1)
        .Ape();
{% endhighlight %}


The entity is positioned in the bottom left corner and the constructors for two of the entities components are called. 

## Creating a component

Lets build the LeftControls component right away to get our player moving:

{% highlight javascript %}
Crafty.c("LeftControls", {
    init: function() {
        this.requires('Multiway');
    },
    
    leftControls: function(speed) {
        this.multiway(speed, {W: -90, S: 90, D: 0, A: 180})
        return this;
    }
    
});
{% endhighlight %}

As you can see it is pretty easy to define a component. The LeftControls component has two functions. 
These functions are added to new entities that are created with this component, like the player1 entity above. 
This means that the this keyword will point to the specific entity the function is called on. 
init is a magic function that is called by crafty right after a new entity has been created.

When you want to be able to change the behavior of the component in different entities you need some way to pass a parameter to the initialization code. For this purpose it is convention to create a constructor that must be called when a entity is created. In this case the variability point is the speed of the entity.

We take advantage of the Multiway component that is part of Crafty (0.4.3+). It is initialized by calling its constructor with two arguments: an integer specifying speed and an object with mappings from keyboard input to a direction. In this case we map W-A-S-D to up-left-down-right. The multiway component binds a function to the enterframe event and moves the entity as needed. It also triggers an event when direction changes. we will use this in the Ape component to animate the player when walking.

Notice how we return the entity object in the leftControls constructor. This convention enables us to chain component constructor calls as we did in the player1 entity: .leftControls(1).Ape();. This convention is followed throughout the crafty code base and i suggest you do as well.

Now for the Ape component that adds animations and collision detection:

{% highlight javascript %}
Crafty.c('Ape', {
    Ape: function() {
            //setup animations
            this.requires("SpriteAnimation, Collision, Grid")
            .animate("walk_left", 6, 3, 8)
            .animate("walk_right", 9, 3, 11)
            .animate("walk_up", 3, 3, 5)
            .animate("walk_down", 0, 3, 2)
{% endhighlight %}

We setup four animations in the same way the flower animation was set up in a previous article by specifying the position of first frame of the animation and the amount of frames.

## Binding to events

Remember that the MultiWay component triggers a NewDirection event when the entity changes direction. 
We use this to change the animation accordingly. You bind to an event by providing a function that should be called when the event is triggered. If the event ha any data associated to it, you can access it by adding a parameter to the function. In this case the direction parameter in our callback will be an object of the form {x, y} specifying current movement along x- and y-axes:


{% highlight javascript %}
//change direction when a direction change event is received
.bind("NewDirection",
    function (direction) {
        if (direction.x < 0) {
            if (!this.isPlaying("walk_left"))
                this.stop().animate("walk_left", 10, -1);
        }
        if (direction.x > 0) {
            if (!this.isPlaying("walk_right"))
                this.stop().animate("walk_right", 10, -1);
        }
        if (direction.y < 0) {
            if (!this.isPlaying("walk_up"))
                this.stop().animate("walk_up", 10, -1);
        }
        if (direction.y > 0) {
            if (!this.isPlaying("walk_down"))
                this.stop().animate("walk_down", 10, -1);
        }
        if(!direction.x && !direction.y) {
            this.stop();
        }
})
{% endhighlight %}

## Collision detection

The next part of the Ape component deals with collision detection to prevent the user from walking through solid tiles. You might recall that when generating the world we marked bushes and flowers with a fictive component called solid.

Craftys collision detection works on the level of components. You specify the name of a component, and whenever the entity collides with an entity with that component your callback is called.

{% highlight javascript %}
.onHit("solid", function () {
    //Move unit out of solid tile
})
{% endhighlight %}

The collision check is run on each enterframe. When collision is detected, the entity has already walked into a solid tile, so we have to move it out again to do this we have to know it's direction and speed. 
We can get this information from private variables provided by the LeftControls component, but that is a bit clumsy.
Also the above approach has the problem that the collision detection is done after the unit has moved in bot x- and -y direction. If a collision is detected we have no choice but to move the unit back to where it came from, even if movement along one of the axes would have been valid.

You probably guessed it - there is a better way to do it :-)

The MultiWay component triggers an event every time the unit has moved either on the x- or y-axis providing the coordinates the unit moved from:

{% highlight javascript %}
.bind('Moved', function(from) {
    if(this.hit('solid')){
        this.attr({x: from.x, y:from.y});
    }
})
{% endhighlight %}

In the next article we will build a bombDropper component. this last bit of the Ape component is a teaser for you:

{% highlight javascript %}
            .onHit("fire", function() {
                this.destroy();
  			// Subtract life and play scream sound :-)
            });
        return this;
    }
});
{% endhighlight %}


Let's put two players on the map by extendign the main scene a bit:

{% highlight javascript %}
Crafty.scene("main", function () {
    generateWorld();
    
    //create our player entity with some premade components
    var player1 = Crafty.e("2D, DOM, Ape, player, LeftControls, BombDropper")
            .attr({ x: 16, y: 304, z: 1 })
            .leftControls(1)
            .Ape();
    
    //create our player entity with some premade components
    var player2 = Crafty.e("2D, DOM, Ape, player, RightControls, BombDropper")
            .attr({ x: 368, y: 16, z: 1 })
            .rightControls(1)
            .bombDropper(Crafty.keys.ENTER)
            .Ape();
});
{% endhighlight %}

Building a RightControls component is left as an exercise...
