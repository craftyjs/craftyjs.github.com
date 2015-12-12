---
layout: gettingstarted
title: Getting started - Building your first Game
---
This is a very quick guide to using Crafty.

For a more thorough but somewhat out-dated guide, check out [Darren Torpey's tutorial](http://buildnewgames.com/introduction-to-crafty/).  (As of 0.6.3, in addition to the changes Darren mentions at the end, you'll need to change the signature of [`Crafty.load`](/api/Crafty-loader.html))

## Setup

First let's setup our HTML file.  We're trying to get you up and running quickly, so we'll just directly link to the latest release version.  (Of course you can also [install it](craftyjs.com/#install) locally!)

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


A Crafty.js game is build up of entities -- the player character, enemies, and obstacles are all represented this way.

Lets start by creating a simple colored square:
``` javascript
Crafty.e('2D, DOM, Color').attr({x: 0, y: 0, w: 100, h: 100}).color('#F00');
```

There are a few things going on here:

- We first call [`Crafty.e`](/api/Crafty-e.html) with a list of components to add to the entity.  Components provide basic building blocks of functionality. In this case, we add [2D](/api/2D.html), [DOM](/api/DOM.html), and [Color](/api/Color.html).  You can learn more about those later!
- We then call two methods of our newly created entity: `attr()` and `color()`.  The `attr` method is one of [many](/api/Crafty%20Core.html) that all entities share, but `color()` is (unsuprisingly) provided by the "Color" component.  Most methods you call on an entity will return the entity itself, allowing method chaining as in the above example.


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

That can be done with the ["Fourway"](/api/Fourway.html) component.

``` javascript
Crafty.e('2D, DOM, Color, Fourway')
  .attr({x: 0, y: 0, w: 100, h: 100})
  .color('#F00')
  .fourway(4);
```

Notice how we added the name of this component to the string after Color. This adds new methods like the ".fourway" function. The number which is passed to the function determines the speed, so if the number is higher it will move even faster.

<iframe width="100%" height="300" src="http://jsfiddle.net/kevinsimper/9jCr7/embedded/result,js,html/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

Lets try to make it look like a platform game, where the entity is impacted by gravity. That can be done with the "Gravity" component. 

But if we added the Gravity component now, the entity would just fall because there is nothing to stop it from falling.  So lets add a long, thin green box which will provide a surface to fall upon:

``` javascript
Crafty.e('Floor, 2D, Canvas, Color')
  .attr({x: 0, y: 250, w: 250, h: 10})
  .color('green');
```

Notice how we added a new component called "Floor" to this entity.  You won't find this component in the api docs, and it doesn't add any new methods.  It's a name we just made up, and it serves to tag this entity.

The Gravity component should only be added to entities which should be falling, so we do not need to add it to our new entity.

Now we'll add the Gravity component to our previous red box:

``` js
Crafty.e('2D, Canvas, Color, Twoway, Gravity')
  .attr({x: 0, y: 0, w: 50, h: 50})
  .color('#F00')
  .twoway(4)
  .gravity('Floor');
```

You should notice that the ".gravity()" function has been called with the argument "Floor". That means that all entites which have the Floor component prevent the entity from falling further.

<iframe width="100%" height="300" src="http://jsfiddle.net/kevinsimper/2nBLb/2/embedded/result,js,html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

Well, that's not really a very good game, but its a start!  To learn more about how to use Crafty, you can explore both our [overview](/documentation) of common topics, and detailed [api documentation](/api/). 
