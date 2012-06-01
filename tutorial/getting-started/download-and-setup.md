---
layout: tutorial
title: Download and Setup
---

# Download:

You can get crafty in several ways:

* Main page - http://craftyjs.com
* CraftyComponents page - http://craftycomponents.com/components/single/8/crafty
* Crafty source on Github - https://github.com/craftyjs/Crafty

# Setup

Getting started is as simple as adding a script tag to your html page. The following is a simple skeleton:

{% highlight html %}
<!DOCTYPE html>
<head>	
	<script type="text/javascript" src="http://cdn.craftycomponents.com/crafty-release.js"></script>
</head>
<body>
	<script type="text/javascript">
		Crafty.init(400, 400);

		// YOUR GAME CODE

	</script>
</body>
</html>


{% endhighlight %}