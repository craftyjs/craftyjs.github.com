---
layout: tutorial
title: Login user with social - Flexpi integration
---

# Login user with social

* Skonfiguruj FlexSocial dla Facebook
* W miejscu w którym chcesz dokonać zalogowania użytkonika dodaj:

{% highlight javascript %}
flex.social.facebook.login(function(res){
    flex.social.facebook.getUser(function(userData){            
        console.log(userData);
    });
});
{% endhighlight %}

For example:

{% highlight javascript %}
entity
    .bind('Click', function(e){
        flex.social.facebook.login(function(res){
		    flex.social.facebook.getUser(function(userData){            
		        console.log(userData);
		        var userId = userData.id;
		    });
		});
    }
{% endhighlight %}