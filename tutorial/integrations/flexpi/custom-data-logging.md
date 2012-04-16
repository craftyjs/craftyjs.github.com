---
layout: tutorial
title: Custom data logging - Flexpi integration
---

# Custom data logging with FlexStats

* Define variables for FlexStats in your app (in dashboard)
* Place the following code in the place where you want login variable:

{% highlight javascript %}
	flex.stats('your defined app key', 'your value to log', function(res){
		// response with status and status message
	});
{% endhighlight %}

For example:

{% highlight javascript %}
entity
.onHit('ufo', function(e){
	flex.stats('ufo-crashed', 'Ufo was crashed at a height of '+entity.h+'.', function(res){
		// response with status and status message
	});
}
{% endhighlight %}