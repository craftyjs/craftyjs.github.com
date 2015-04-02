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

{% highlight html %}
-- src
---- components -> Crafty components files
---- entities -> Files with entities
-------- base
------------ baseEntity.js -> Base entity
---- interfaces -> We keep here files with interface entities
---- levels -> Configuration files for levels
---- scenes -> Files with scenes declarations
---- windows -> Files with logic for interface windows
---- libs -> Other libraries files
-------- backbone
-------- jquery
-------- modernizr
-------- require-jquery
-------- underscore
---- config.js -> Game configuration
---- game.js -> Main file of the game
---- sprites.js -> Sprites definitions
-- web
---- images
-- index.html -> Game wrapper
{% endhighlight %} 

You can find here (https://github.com/ahilles107/CraftyBoilerplate) a sample project that use CraftyBoilerplate.
