---
layout: tutorial
title: Structure
---

# Introduction

What we will use in CraftyBoilerplate:

* Crafty (latest release)
* Modernizr (2.5.3)
* Backbone (0.9.2)
* Underscore (1.3.4)
* RequireJquery

To clean up the code and files, in this case we need to use backbone.js as wrapper for entities and require.js for loading files when requests. 

proposed structure tree:

```
-- src
---- components -> Crafty componets files
---- entities -> Files with entities
---- interfaces -> We keep here files with interface entities
---- levels -> Configuration files for levels
---- scenes -> Files with scenes declarations
---- windows -> Files with logic for interface windows
---- libs	 -> Other libraries files
-------- backbone
-------- jquery
--------
modernizr
-------- require-jquery
-------- underscore
---- baseEntity.js -> Base entity
---- config.js -> Game configuration
---- game.js -> Main file of the game
---- sprites.js -> Sprites definitions
-- index.html -> Game wrapper
``` 

You can find here (adres) a sample project that use CraftyBoilerplate.