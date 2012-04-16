---
layout: tutorial
title: Sell premium items in game - Flexpi integration
---

# Sell premium items in game

* Skonfiguruj FlexPayment dla PayPal w panelu aplikacji
* Zainicjuj obsługę FlexPayment
{% highlight javascript %}
    // we have "userId" from FlexSocial integration.
    flex.payment.init(function(){}, userId);
{% endhighlight %}

* Dodaj przedmiot premium do koszyka sprzedającego:
{% highlight javascript %}
flex.payment.cart.add('super item', 5.99, 1, function(item){
    // do something with just added item
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