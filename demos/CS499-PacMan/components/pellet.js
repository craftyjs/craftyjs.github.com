/*global Crafty*/

(function () {
    "use strict";

    //this is a pellet object (btw: there are 146 + 4 powerUps)
    Crafty.c("Pellet", {

        create: function (x, y) {

            this.requires("2D, Canvas, Collision, pellet")
                .attr({
                    x: x,
                    y: y
                });
        }
    });
}());