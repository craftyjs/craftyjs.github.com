---
layout: gettingstarted
title: Getting started - Building your first Game
---

Darren Torpey from buildnewgames.com have written this amazing guide to Crafty.js which he explains in details how you can get started with Crafty.js.

[http://buildnewgames.com/introduction-to-crafty/](http://buildnewgames.com/introduction-to-crafty/)

It is easy to setup Crafty.js, just put it in a script tag and you are running:

``` html
<html>
  <head></head>
  <body>
    <div id="game"></div>
    <script type="text/javascript" src="https://rawgithub.com/craftyjs/Crafty/release/dist/crafty-min.js"></script>
    <script>
      Crafty.init(500,350, document.getElementById('game'));
    </script>
  </body>
</html>
```

A Crafty.js game is build up by entities, that would be eg. your hero and the enemies. 

This is the simplest entity you can create which shows up on the game.
``` javascript
Crafty.e('2D, DOM, Color').attr({x: 0, y: 0, w: 100, h: 100}).color('#F00');
```

As you can see a string is passed to the e() function, these are the Crafty.js Components that entity would have avaiable. You can think of it a building blocks. Here we have said that our entity has the building block Color, but also the 2D components, which makes it possible to place it in the game.

You will learn more about Components later on.

The full code would look something like this now:

```html
<html>
  <head></head>
  <body>
    <div id="game"></div>
    <script type="text/javascript" src="https://rawgithub.com/craftyjs/Crafty/release/dist/crafty-min.js"></script>
    <script>
      Crafty.init(500,350, document.getElementById('game'));
      Crafty.e('2D, DOM, Color').attr({x: 0, y: 0, w: 100, h: 100}).color('#F00');
    </script>
  </body>
</html>
```

And when executed:

<iframe width="100%" height="300" src="http://jsfiddle.net/kevinsimper/pShLx/embedded/result,js,html/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

Now that we got something to show up on the screen, lets try making it move by using the keyboard arrows.

That can be done with the "Fourway" component.

``` javascript
Crafty.e('2D, DOM, Color, Fourway')
  .attr({x: 0, y: 0, w: 100, h: 100})
  .color('#F00')
  .fourway(4);
```

Notice how we added the component to the string after Color. When we added the component some functions got accessible like the ".fourway" function. The number which is passed to the function determines the speed, so if the number is higher it will move even faster.

<iframe width="100%" height="300" src="http://jsfiddle.net/kevinsimper/9jCr7/embedded/result,js,html/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

Lets try to make it look like a platform game, where the entity is impacted by gravity. That can be done with the "Gravity" component. 

But if we added the Gravity component now, the entity would just fall because there is nothing to stop it from falling. Therefore we are going to add a "Floor". Notice how we added the name Floor as a Component. That is because it is used to "group" entities so we can later select them.

The Gravity component should only be added to entities which should be falling, so we do not need to add it to the "Floor" entity.

``` javascript
Crafty.e('Floor, 2D, Canvas, Color')
  .attr({x: 0, y: 250, w: 250, h: 10})
  .color('green');
```

Then we added the red box and can then add the Gravity component to that entity.

``` js
Crafty.e('2D, Canvas, Color, Fourway, Gravity')
  .attr({x: 0, y: 0, w: 50, h: 50})
  .color('#F00')
  .fourway(4)
  .gravity('Floor');
```

You should notice that the ".gravity()" function has been called with the argument "Floor". That means that all entites which have the Floor component prevent the entity from falling further.

<iframe width="100%" height="300" src="http://jsfiddle.net/kevinsimper/2nBLb/2/embedded/result,js,html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
