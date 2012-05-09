---
layout: tutorial
title: Add badge for user - Flexpi integration
---

# Add badge for user

* Add badges into your application using dashboard
* Give user a badge
{% highlight javascript %}
// we have "userId" from FlexSocial integration.
// get badge_id from your badges config in dashboard
flex.badges.user.set(userId, badge_id, function(res){
    // do something with res
    // console.log(res);
});
{% endhighlight %}

* Get Data about a badge and give user that badge. 
{% highlight javascript %}
flex.badges.badge.get('badge_id', function(badgeData){
    // do something with badge data in res
    // you will have object with badge_id, name, desc and image (url)
    // console.log(badgeData)
});
{% endhighlight %}