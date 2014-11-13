---
title: Keyboard
layout: documentation
---

It is very easy to make the keyboard control something in your game. Crafty has three simple componenets that will get you started very quickly:

- Twoway
- Fourway
- Multiway

## Twoway

You want to use twoway if you want make a platform game like Mario. Here you can move you from either side and jump up and down.

```
Crafty.init();
Crafty.e('2D, Canvas, Twoway, Color')
  .attr({x: 10, y: 10, h: 30, w: 30})
  .color('red')
  .twoway()
```
