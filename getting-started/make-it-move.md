---
layout: gettingstarted
title: Make it move
---

Now that we got something to show up on the screen, lets try making it move by using the keyboard arrows.

That can be done with the "Fourway" component.
{% highlight javascript %}
Crafty.e('2D, DOM, Color, Fourway')
  .attr({x: 0, y: 0, w: 100, h: 100})
  .color('#F00')
  .fourway(4);
{% endhighlight %}

Notice how we added the component to the string after Color. When we added the component some functions got accessible like the ".fourway" function. The number which is passed to the function determines the speed, so if the number is higher it will move even faster.

<iframe width="100%" height="300" src="http://jsfiddle.net/kevinsimper/9jCr7/embedded/result,js,html/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>