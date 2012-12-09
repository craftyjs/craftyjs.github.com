---
layout: tutorial
title: Download and Setup
---

# Download:

You can downlad Crafty from several locations:

* The home page (http://craftyjs.com) has the handy "Download Now" button, lots of demos, and other good links.
* CraftyComponents page (http://craftycomponents.com/components/single/8/crafty) has previous versions and development branches.
* Crafty source on Github (https://github.com/craftyjs/Crafty) with source code, the tutorial code, and other items for you to hack.
* A minified, perhaps slowly loading, copy of a recent release (http://cdn.craftycomponents.com/crafty-release.js) can be useful when first learning Crafty.

Use the right-click "Save As" to save Crafty.js to a file:  Javascript is just a single file of regular text.
The "normal" version of the JavaScript is indented and commented while the "minified" version has been compressed by shortening symbols and removing whitespace.  This makes the miniied version faster to download into a web page.

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