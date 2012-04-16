---
layout: tutorial
title: Sell premium items in game - Flexpi integration
---

# Sell premium items in game

* Configure FlexPayment for PayPal in dashboard
* Initiate support for FlexPayment
{% highlight javascript %}
// we have "userId" from FlexSocial integration.
flex.payment.init(function(){}, userId);
{% endhighlight %}

* Add the premium item into a users cart:
{% highlight javascript %}
flex.payment.cart.add('super item', 5.99, 1, function(item){
	// do something with added item
});
{% endhighlight %}

* Generate payment form, and let your user buy something
{% highlight javascript %}
flex.payment.paypal.createFormView('my-div-id', 'Pay with PayPal');
{% endhighlight %}

* Get the transaction status and give him an item.
{% highlight javascript %}
var cartId = flex.payment.cart.getId;
flex.payment.transactions.get(cartId, function(transaction){
	// give user an item
})
{% endhighlight %}