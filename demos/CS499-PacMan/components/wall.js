/*global Crafty*/

(function () {
    "use strict";

    //this is a wall object
    Crafty.c("Wall", {

        create: function (x, y, pic) {

            this.requires("2D, Canvas, Collision," + pic)
                .attr({
                    x: x,
                    y: y
                });
        }
    });
}());