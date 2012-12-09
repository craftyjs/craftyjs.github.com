---
layout: tutorial
title: Creating your first Crafty game
---

So - let's get going!

First you need to [grab the latest release of the Crafty library](http://craftyjs.com/tutorial/getting-started/download-and-setup).  
You should probably bookmark the [Crafty forum at GoogleGroups](https://groups.google.com/forum/#!forum/craftyjs) for when run into problems.  Of course,
an amazing programmer like you might never run into a problem.   Also, make sure you have a handy HTML5 compliant browser such as [Chrome](https://chrome.google.com).
Programming for Crafty is programming, so you should know some JavaScript and some HTML and have a decent editor.   

Put the *crafty.js* file in your working directory.  Be sure to use the uncompressed version of the library so that you can see what is going on.  You will use the
minified version only when releasing the games and want the game's webpage to be smaller and faster to download.  You can grab the
latest copy of the completed game from the [Banana Bomber GitHub repository] (https://github.com/sorenbs/bananabomber/blob/master/game.js) or
type in the examples as you go.  It depends on how you learn quickest.

Your game will be in three parts:  an HTML file named *BananaBomber.html* to hosT the game, the *crafty.js* library you put in your working directory, and a *game.js* file that you will write.
Start by creating the html file.  You might name it *BananaBomber.html* though some just name it *g.html* because that is easier to type. 

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

So far, the HTML file is simple:  it loads two javascript libraries, sets the style to clip items that overflow a div (the overflow:hidden), and has an empty body.

Now start writing *game.js* using a basic game skeleton:

{% highlight javascript %}
window.onload = function () {
    //start crafty
    Crafty.init(400, 336);
    // Crafty.canvas.init();
    // Uncomment the canvas line if using HTML Canvas instead 
};
{% endhighlight %}

You probably recognize the javascript construct for declaring a function that will get executed when the browser is done loading the page. 
Crafty.init(width, height) is where Crafty does it's initialization stuff that is needed before the game can run.
You are writing a tile-based game using 16x16 tiles so the width and height are set to multiples of 16.

You get your choice of two ways of getting images onto the screen:

* Using an HTML canvas element that is like a big square of screen estate that you get to draw pixels on, or 
* using normal DOM elements that you can manipulate using css and javascript but is drawn to the screen by the browser. 

It turns out that the DOM method is fastest in most cases.  All you need do is call Crafty.canvas.init() first if you want to use the canvas option; Crafty abstracts away most differences between the DOM and canvas.

## Scenes

Crafty has a notion of scenes to organize different parts of the game.  A complicated game might have a different sceen for each
level of the game, each cut scene, the start menu, high score list, and achievements page.   For your simple game, you 
will just have a loading scene and a game scene in *game.js*:

{% highlight javascript %}
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
{% endhighlight %}

Code outside of a function will execute as the interpreter gets to it, so the last line will invoke Crafty.scene("loading") which in turn invokes the method that we have just associated with that scene.

In this scene we do two things. We tell crafty to go fetch some assets that we will need (our sprite sheet) and then call a function when that is done. This function will unload the "loading" scene and load the "main" scene that will run our game. If you are not familiar with functional/dynamic languages this syntax of inlining functions might be new to you, but it is very common in javascript, so you better get used to it :-)

Next we define a nice background and text to display while loading. The main scene is defined in much the same way:

{% highlight javascript %}
Crafty.scene("main", function () {
    generateWorld();

});
{% endhighlight %}

The first thing to do in the game scene is to populate the world with background, obstacles etc. But before we get to that, let me just briefly dwell on a central part of the Crafty design.

## Components

In programming it is quite usual to use an approach called Object-Oriented Programming, or OOP, where code is organised in hierarchies of classes that can inherit functionality from ancestors while providing new functionality itself. Flash adopted this approach with AS3 released some years ago. This way of organizing code has some problems though and hence Crafty takes a different approach.

Crafty provides a system very similar to what is known as mixins, multiple inheritance or traits depending on the specific language. An easy way to think about this is that an entity (like say the player or an enemy) is composed of many reusable components that enhance the entity with some new functionality. One way to add components to an entity is to call Crafty.e(string) which will create a new entity with the functionality provided by the comma-separated list of components specified in the string parameter. 

So what we did in the loading scene to get the background is we created an entity with the components 2D, DOM and Text. 2D provides functionality around positioning in 2d space(x, y, etc.). DOM provides functionality that will automatically draw the entity to the screen using dom elements, and Text... I think you guessed it. These components are defined in the crafty.js file and you can go have a look if you are curious, but we will get back to how these components are created in a later article.


Next up is world generation in the article [Tiles, spritemap and animations](graphics)
