/*global Crafty*/

(function () {
    "use strict";

    //this is a pellet object
    Crafty.c("Gate", {

        create: function (x, y, pic) {

            this.requires("2D, Canvas," + pic)
                .attr({
                    x: x,
                    y: y
                });
        },

        //function to get the x coordinate of the gate
        getXCoord: function () {
            return Math.round(this.x / this.w);
        },

        //function to get the y coordinate of the gate
        getYCoord: function () {
            return Math.round(this.y / this.w);
        },

        getLocation: function () {
            return {
                x: this.getXCoord(),
                y: this.getYCoord()
            };
        }
    });
}());