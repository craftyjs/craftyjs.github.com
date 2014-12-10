/*global Crafty*/

(function () {
    "use strict";

    //this is a ghost object
    Crafty.c("Clyde", {



        init: function () {
            this.requires("SpriteAnimation, clyde");
            this.corner = {
                x: 0,
                y: (Crafty.viewport.height / 20) + 1
            };
            this.whenToLeave = 40;
        },

        getTargetTile: function (pacman) {

            //get pacmans location
            var pacLoc = pacman.getLocation(),

                //get the distance from pacman
                dist = Math.sqrt(Math.pow(Math.round(this.x / 20) - pacLoc.x, 2) + Math.pow(Math.round(this.y / 20) - pacLoc.y, 2));

            //if we are over 4 tiles away from pacman
            if (dist > 4) {

                //target the bottom left corner
                return pacLoc;
            }
            return this.corner;
        },

        setAnimation: function () {
            this.reel('clydeRight', 400, 2, 0, 2)
                .animate('clydeRight', -1);
        }
    });
}());