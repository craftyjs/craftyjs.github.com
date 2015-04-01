---
title: Text
layout: documentation
---

It is very easy to add text to your game. You create a entity
which contains the component "Text".

```
var helloWorldText = Crafty.e('2D, Canvas, Text')
  .attr({
    x: 10,
    y: 10  
  });
```

A very simple text example looks like this:

```
helloWorldText.text('Hello World');
```

You can then change the color by using the `.textColor()`

```
helloWorldText.textColor('red');
```

You can customize the text further by using the ´.textFont()`

Possible keys are:
- type
- weight
- size
- family
- lineHeight
- variant

```
helloWorldText.textFont({
  size: '20px',
  weight: 'bold'
});
```
