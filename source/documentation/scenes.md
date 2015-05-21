---
title: Scenes
layout: documentation
---

[Scenes](/api/Crafty-scene.html) are a way to organize your game.

A scene is defined by a name, a setupt function called when the scene starts, and (optionally) a function that's called when the scene ends.  When a new scene is started, the current scene is automatically ended.  Importantly, any entity with the `2D` component will be destroyed when this happens, providing a clean slate for the next scene.  Likewise, the viewport will be reset to its default values.

If an entity should not be destroyed by a new scene, you can give it  the `"Persist"` component.  (Persist doesn't provide any other functionality; you can use components to categorize and tag entities.)

You can pass in a single object as data to the setup function.  The general syntax is:

```
// Defining a new scene with an init function
Crafty.scene("SelectMenu", initMenu )

// This will call initMenu(menuData).
// (`menuData` can't be a function, though!)
Crafty.scene("SelectMenu", menuData)
```

There are also a couple of event hooks which are triggered on a scene change:

- When an existing scene ends, it triggers a "SceneDestroy" event before running the uninit function
- when a new scene starts, it triggers "SceneChange" before calling its init function

For more detailed information, see the [Crafty.scene](/api/Crafty-scene.html) documentation.

