---
layout: gettingstarted
title: Make it move
---

Lets try to make it look like a platform game, where the entity is impacted by gravity. That can be done with the "Gravity" component. 

But if we added the Gravity component now, the entity would just fall because there is nothing to stop it from falling. Therefore we are going to add a "Floor". Notice how we added the name Floor as a Component. That is because it is used to "group" entities so we can later select them.

The Gravity component should only be added to entities which should be falling, so we do not need to add it to the "Floor" entity.

{% highlight javascript %}
Crafty.e('Floor, 2D, Canvas, Color')
  .attr({x: 0, y: 250, w: 250, h: 10})
  .color('green');
{% endhighlight %}

Then we added the red box and can then add the Gravity component to that entity.

{% highlight javascript %}
Crafty.e('2D, Canvas, Color, Fourway, Gravity')
  .attr({x: 0, y: 0, w: 50, h: 50})
  .color('#F00')
  .fourway(4)
  .gravity('Floor');
{% endhighlight %}

You should notice that the ".gravity()" function has been called with the argument "Floor". That means that all entites which have the Floor component prevent the entity from falling further.

<iframe width="100%" height="300" src="http://jsfiddle.net/kevinsimper/2nBLb/2/embedded/result,js,html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>