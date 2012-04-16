---
layout: tutorial
title: Add badge for user - Flexpi integration
---

# Add badge for user

* Dodaj odznaki do swojej aplikacji poprzez panel
* Daj odznake dla użytkownika 
{% highlight javascript %}
// we have "userId" from FlexSocial integration.
// get badge_id from your badges config in dashboard
flex.badges.user.set(userId, badge_id, function(res){
    // do something with res
    // console.log(res);
});
{% endhighlight %}

* Pobierz dane o odznace i wyświetl ją dla uzytkownkia
{% highlight javascript %}
flex.badges.badge.get('badge_id', function(badgeData){
    // do something with badge data in res
    // you will be have object with badge_id, name, desc and image (url)
    // console.log(badgeData)
});
{% endhighlight %}

* Wygeneruj formularz płatności i pozwól użytkownikowi kupić przedmiot
{% highlight javascript %}
flex.payment.paypal.createFormView('my-div-id', 'Pay with PayPal');
{% endhighlight %}

* Pobierz status transakcji i przekaż przedmiot dla gracza.
{% highlight javascript %}
var cartId = flex.payment.cart.getId;
flex.payment.transactions.get(cartId, function(transaction){
    // give super item for User.
})
{% endhighlight %}