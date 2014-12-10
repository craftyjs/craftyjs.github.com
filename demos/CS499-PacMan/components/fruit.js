/*global Crafty*/

(function () {
    "use strict";

    //this is a fuit object
    Crafty.c("Fruit", {

        create: function (x, y) {
            var fruitList = ["cherry", "strawberry", "orange", "banana"],
                index = (Crafty("Levels").getLevels()-1)%4,
                fruit = fruitList[index];

            this.requires("2D, Canvas, Collision," + fruit)
                .attr({
                    x: x,
                    y: y
                });
        }
    });
}());