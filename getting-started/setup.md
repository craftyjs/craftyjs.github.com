--- 
layout: gettingstarted
title: Setup Crafty.js
---

It is easy to setup Crafty.js, just put it in a script tag and you are running:

{% highlight html %}
<html>
  <head></head>
  <body>
    <div id="game"></div>
    <script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/crafty/0.5.4/crafty-min.js"></script>
    <script>
      Crafty.init(500,350, document.getElementById('game'));
    </script>
  </body>
</html>
{% endhighlight %}

Now we will [make our first entity](/getting-started/first-entity.html)