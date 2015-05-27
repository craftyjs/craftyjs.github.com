---
title: Mouse
layout: documentation
---

If you want an entity to interact with mouse events, add the [Mouse](/api/Mouse.html) component.  It will then be passed the standard DOM-style mouse events: "MouseDown", "Click", etc.  (Note the capitalization.)

- Entities in a DOM layer will directly use the native DOM events
- Crafty implements picking in other layers using the entity's MBR
- An entity with the collision component will use its hitbox instead of the MBR
- You can override these behaviors by providing a polygon specifying the clickable area; see [the documentation](/api/Mouse.html#-areaMap) for details

See also the [Draggable](/api/Draggable.html) component.

