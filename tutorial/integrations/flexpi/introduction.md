---
layout: tutorial
title: Introduction - Flexpi integration
---

# Introduction

Flexpi is a set of tools (services platform) for HTML5 games developers.

Flexpi currently consists of four services:

* FlexStats - log your own variables (in-game stats)
* FlexSocial - log in user with social media platforms (like facebook), or another authorization mechanisms (BrowserID)
* FlexPayment - Integration with payment systems (PayPal)
* FlexBadges - Manage and give your user special game badge. 

To use Flexpi services you need to register on flexpi.com (http://flexpi.com/register) and create first app (http://flexpi.com/dashboard/apps/add)

Each application has got "App id" - identification number.

# Instalation

* Add API into your application:

{% highlight html %}
<!doctype html>
<head>
  <meta charset="utf-8">
...
  <script src="http://flexpi.com/api/beta/flexpi.min.js"></script>
{% endhighlight %}

* Next initiate API in your game:

{% highlight javascript %}
	flex.connect({
        app_id : 00000 // Your application "App id"
    }, function(){
        // run code when connection is ready
    });
{% endhighlight %}

Thats all - your app is now connected with flexpi.com