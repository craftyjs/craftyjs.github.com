---
layout: tutorial
title: Creating your first Crafty game
---

So - let's get going!

First you need to grab the latest release of the "crafty":http://www.craftyjs.com engine. At the moment this is 0.4.6. It happens that new versions introduces breaking changes. Ask in the [forum](https://groups.google.com/forum/#!forum/craftyjs) if you run into problems. 

Put the crafty.js file in your working directory.
We will be working on an uncompressed version to make it easier to dig in and see what is going on. When the game is ready to be released we can replace it with a minified version that is much smaller.

The game and articles is a work in progress. You can download the latest sources for the game from the "github repo":https://github.com/sorenbs/bananabomber/blob/master/game.js

Now create the html file that will host the game:

{% highlight html %}
<!DOCTYPE html>
<head>
    <script type="text/javascript" src="crafty.js"></script>
    <script type="text/javascript" src="game.js"></script>
    <title>My Crafty Game</title>
    <style>
    body, html { margin:0; padding: 0; overflow:hidden; font-family:Arial; font-size:20px }
    #cr-stage { border:2px solid black; margin:5px auto; color:white }
    </style>
</head>
<body>
</body>
</html>
{% endhighlight %}

The game skeleton is pretty simple:

{% highlight javascript %}    
window.onload = function () {
    //start crafty
    Crafty.init(400, 336);
    //Crafty.canvas.init();
};
{% endhighlight %}

If you are familiar with javascript you will recognize this way of declaring a function that will get executed when the browser is done loading the page. In that way Crafty is no different from any other javascript you would write.
Crafty.init(with, height) is where Crafty does it's initialization stuff that is needed before the game can run.
We are going to create a tile-based game so the with and height is set to multiples of 16 which is the size of the tiles.

There are two ways of getting images onto the screen: 

* Using a canvas element that is like a big square of screen estate that you get to draw pixels on or 
* using normal dom elements that you can manipulate using css and javascript but is drawn to the screen by the browser. 

It turns out that the DOM method is fastest in most cases, but if you want to use canvas you need to call Crafty.canvas.init() first. As you will see later Crafty abstracts away most differences between DOM and canvas, so it is a matter of changing a single variable if you decide to change later.

## Scenes

To organize different parts of the game Crafty has a notion of scenes. Each level of a game would fit nicely in a scene as would the menu, high score lists etc. 
For our simple game we will just have a loading scene and a game scene:

    //the loading screen that will display while our assets load
    Crafty.scene("loading", function () {
        //load takes an array of assets and a callback when complete
        Crafty.load(["sprite.png"], function () {
            Crafty.scene("main"); //when everything is loaded, run the main scene
        });

        //black background with some loading text
        Crafty.background("#000");
        Crafty.e("2D, DOM, Text").attr({ w: 100, h: 20, x: 150, y: 120 })
                .text("Loading")
                .css({ "text-align": "center" });
    });

    //automatically play the loading scene
    Crafty.scene("loading");

Code outside of a function will execute as the interpreter gets to it, so the last line will invoke Crafty.scene("loading") which in turn invokes the method that we have just associated with that scene.

In this scene we do two things. We tell crafty to go fetch some assets that we will need (our sprite sheet) and then call a function when that is done. This function will unload the "loading" scene and load the "main" scene that will run our game. If you are not familiar with functional/dynamic languages this syntax of inlining functions might be new to you, but it is very common in javascript, so you better get used to it :-)

Next we define a nice background and text to display while loading. The main scene is defined in much the same way:

    Crafty.scene("main", function () {
        generateWorld();

    });

The first thing to do in the game scene is to populate the world with background, obstacles etc. But before we get to that, let me just briefly dwell on a central part of the Crafty design.

## Components

In programming it is quite usual to use an approach called Object Oriented Programming, OOP where code is organised in hierarchies of classes that can inherit functionality from ancestors while providing new functionality itself. Flash adopted this approach with AS3 released some years ago. This way of organizing code has some problems though and hence Crafty takes a different approach.

Crafty provides a system very similar to what is known as mixins, multiple inheritance or traits depending on the specific language. An easy way to think about this is that an entity (like say the player or an enemy) is composed of many reusable components that enhance the entity with some new functionality. One way to add components to an entity is to call Crafty.e(string) which will create a new entity with the functionality provided by the comma-separated list of components specified in the string parameter. 

So what we did in the loading scene to get the background is we created an entity with the components 2D, DOM and Text. 2D provides functionality around positioning in 2d space(x, y, etc.). DOM provides functionality that will automatically draw the entity to the screen using dom elements, and Text... i think you guessed it. These components are defined in the crafty.js file and you can go have a look if you are curious, but we will get back to how these components are created in a later article.



Next up is world generation in the article [Tiles, spritemap and animations](spritemap-tiles-and-animations)