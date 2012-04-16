---
layout: tutorial
title: Log in a user with social - Flexpi integration
---

# Login user with social

* Configure FlexSocial for facebook 
* Place the following code in the place where you want log in a user:

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