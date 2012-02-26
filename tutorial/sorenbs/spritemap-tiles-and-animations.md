---
layout: tutorial
title: "Tiles, spritemap and animations"
---

Take a look at our sprite sheet:

![bananabomber-sprites.png](bananabomber-sprites.png)

As our game is tile based, all the graphic elements have the same size: 16x16 pixels. Some of the sprites are single pictures and some (like the player) are part of an animation. In a flash game you would create animations by drawing images on consecutive frames in a movie clip, and as you will see shortly Crafty has a similar concept.

To be able to work with these sprites in Crafty we must cut them out of the sheet and give them names:

{% endhighlight %}
//turn the sprite map into usable components
Crafty.sprite(16, "sprite.png", {
    grass1: [0, 0],
    grass2: [1, 0],
    grass3: [2, 0],
    grass4: [3, 0],
    flower: [0, 1],
    bush1: [0, 2],
    bush2: [1, 2],
    player: [0, 3],
    enemy: [0, 3],
    banana: [4, 0],
    empty: [4, 0]
});
{% endhighlight %}

The tile size is specified once, so we can reference the tiles by row and column. This is convenient, but if you are working with sprites of different size you can specify the exact size like this:

{% endhighlight %}
name: [x, y, width, height]
{% endhighlight %}

I will step through the generateWorld method little by little as it shows several new concepts. The general idea is that we will divide the map into 16x16 pixel areas and for each decide what background and elements to put on it:

{% endhighlight %}
//method to generate the map
function generateWorld() {
    //loop through all tiles
    for (var i = 0; i < 25; i++) {
        for (var j = 0; j < 21; j++) {

            //place grass on all tiles
            grassType = Crafty.randRange(1, 4);
            Crafty.e("2D, DOM, grass" + grassType)
                .attr({ x: i * 16, y: j * 16, z:1 });
{% endhighlight %}

First we create some grass background. We use the 2D and DOM components to give the entity coordinates and the ability to draw itself to the stage. We also randomly assign it one of the grass1...4 sprite components we have just defined. Any component defined via Crafty.sprite() will automatically instruct either the DOM or the Canvas component to draw it on the stage. Finally we call the attr function on the new entity that will set x and y coordinates. As in flash, the z value specifies what element should be in front when two or more are overlapping. The one with highest z will be on the top, so we assign the background something low.

To provide a closed playing field for the game we add some bushes around the edges, much the same way as the grass:

{% endhighlight %}
//create a fence of bushes
if(i === 0 || i === 24 || j === 0 || j === 20)
    Crafty.e("2D, DOM, solid, bush" + Crafty.randRange(1, 2))
    .attr({ x: i * 16, y: j * 16, z: 2 });
{% endhighlight %}

Let's get some more interesting stuff on the stage. Like flowers dancing in the wind scattered over the map...
 
{% endhighlight %}
//generate some nice flowers within the boundaries of the outer bushes
if (i > 0 && i < 24 && j > 0 && j < 20
        && Crafty.randRange(0, 50) > 30
        && !(i === 1 && j >= 16)
        && !(i === 23 && j <= 4)) {
    var f = Crafty.e("2D, DOM, flower, solid, SpriteAnimation, explodable")
            .attr({ x: i * 16, y: j * 16, z: 1000 })
            .animate("wind", 0, 1, 3)
            .animate('wind', 80, -1)
            .bind('explode', function() {
                this.destroy();
            });
}
{% endhighlight %}


The flower component adds the flower sprite to the entity. The Animate component adds *surprise, surprise* animation capabilities to the flower. This is used by calling the animate() function on the entity. The first call creates an animation called wind that starts in column 0, row 1 (just as the flower sprite itself) and spans 3 columns. To learn about how to setup more advanced animations have a look in the documentation. 
The second call starts the animation, specifying that it should last 80 frames and play forever (replace -1 with a positive int to specify a number of times the animation should repeat before stopping).

explodable and solid are tagging components. That is they don't have an implementation and are simply used to mark an entity of a given kind. This works very well with Craftys collision functionality that can detect collision with entities that have a given component. We will have a look at that in a later article.

We will finish this article by adding a grid of bushes in true bomberman style:

{% endhighlight %}
            //grid of bushes
            if((i % 2 === 0) && (j % 2 === 0)) {
                Crafty.e("2D, DOM, solid, bush1")
                    .attr({x: i * 16, y: j * 16, z: 2000})
            }
        }
    }
}
{% endhighlight %}

Have a look at our wonderful garden:

![bananabomber-1.png](bananabomber-1.png)

Note: % is the modulo operator. It simply divides the left operand with the right operand and returns the remainder. Thus (i % 2 === 0) evaluates to true when i is even. 

If you wonder why i use === instead of just == here is an explanation.
The normal equality operator == does type coercion before checking for equality. This means that all the following expressions return true

{% endhighlight %}
('5' == 5)
(0 == '')
(0 == false)
(false == undefined)
("\r\n" == 0)
{% endhighlight %}

The first one is sort of okay, but the rest will come and bite you some day. That is why the father of javascript, Douglas Crockford recommends using the strict equality operator, === that will never say values of different types are equal.

In the next article we will add movement, collision detection and animation to our unit: [Keyboard input and binding to events](movement-bind-events-keyboard-controls)