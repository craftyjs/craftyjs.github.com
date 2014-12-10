/*global Crafty*/

(function () {
    "use strict";

    //this is a ghost object
    Crafty.c("Pinky", {

        init: function () {
            this.requires("SpriteAnimation, pinky");
            this.whenToLeave = 0;
            this.corner = {
                x: 1,
                y: -3
            };
        },

        getTargetTile: function (pacman) {

            var pacLoc = pacman.getLocation();

            if (pacman.direction === Crafty.keys.DOWN_ARROW) {
                return {
                    x: pacLoc.x,
                    y: pacLoc.y + 3
                };
            } else if (pacman.direction === Crafty.keys.UP_ARROW) {
                //there is a bug in the original pacman that causes pinky to target 3 up and 3 left when pacman is looking up
                return {
                    x: pacLoc.x - 3,
                    y: pacLoc.y - 3
                };
            } else if (pacman.direction === Crafty.keys.LEFT_ARROW) {
                return {
                    x: pacLoc.x - 3,
                    y: pacLoc.y
                };
            } else {
                return {
                    x: pacLoc.x + 3,
                    y: pacLoc.y
                };
            }
        },

        setAnimation: function () {
            this.reel('pinkyRight', 400, 4, 0, 2)
                .animate('pinkyRight', -1);
        }
    });
}());