/*global Crafty*/

(function () {
    "use strict";

    //this is a ghost object
    Crafty.c("Inky", {



        init: function () {
            this.requires("SpriteAnimation, inky");
            this.whenToLeave = 15;
            this.corner = {
                x: (Crafty.viewport.width / 20),
                y: (Crafty.viewport.height / 20) + 1
            };
        },

        getTargetTile: function (pacman) {

            //get pacmans location
            var pacLoc = pacman.getLocation(),
                blinky = new Crafty("Ghost blinky"),
                dx = pacLoc.x - Math.round(blinky.x / 20),
                dy = pacLoc.y - Math.round(blinky.y / 20),
                target = {
                    x: pacLoc.x + dx,
                    y: pacLoc.y + dy
                };

            return target;
        },

        setAnimation: function () {
            this.reel('inkyRight', 400, 6, 0, 2)
                .animate('inkyRight', -1);
        }
    });
}());