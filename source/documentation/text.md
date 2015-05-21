---
title: Text
layout: documentation
---

It is very easy to add text to your game. Create an entity
which contains the component ["Text"](/api/Text.html):

```
var helloWorldText = Crafty.e('2D, DOM, Text')
  .attr({
    x: 10,
    y: 10
  });
```

A very simple text example looks like this:

```
helloWorldText.text('Hello World');
```

## Styling text

The "Text" component provides several methods for styling the text.

You can set the color by using the `.textColor()` method:

```
helloWorldText.textColor('red');
```

You can customize the text further by passing an object of styles to the ´.textFont()` method:

```
helloWorldText.textFont({
  size: '20px',
  weight: 'bold'
});
```

Possible keys are:
- type
- weight
- size
- family
- lineHeight
- variant

## 2D properties

Most of the standard [2D](/api/2D.html) properties and methods will function with text: you can move it, rotate it, attach it to follow other entities, and so on.  There are a couple of caveats:

- Text will work with [Canvas](/api/Canvas.html) and [DOM](/api/DOM.html) layers.   However, styling will work best with the DOM layer, since browsers are extremely good at displaying text!
- The height and width of the text entity will be set automatically when using Canvas, since the html canvas has no facilities for reflowing text.


