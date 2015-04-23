/*global Crafty*/

(function () {
    "use strict";

    //this is a ghost object
    Crafty.c("Blinky", {

        init: function () {
            this.requires("SpriteAnimation, blinky");
            this.whenToLeave = 0;
            this.inHouse = false;

            this.keyPressed = null;

            this.bind("KeyDown", function (e) {
                //when the user presses an arrow key, let's update the keyPressed variable

                //we only need to update the variable if the key is different from our current direction
                if (e.keyCode !== this.direction) {

                    //we only need to update the variable if the key is an arrow key
                    if (e.keyCode === Crafty.keys.A || e.keyCode === Crafty.keys.D || e.keyCode === Crafty.keys.W || e.keyCode === Crafty.keys.S) {

                        //update the variable
                        this.keyPressed = e.keyCode;
                    }
                }
            });

            this.corner = {
                x: (Crafty.viewport.width / 20) - 1,
                y: -3
            };
        },

        getTargetTile: function (pacman) {
            if (this.keyPressed === null) {
                return pacman.getLocation();
            } else {
                
                var xCoord = Math.round(this.x / 20),
                    yCoord = Math.round(this.y / 20);
                
                if (this.keyPressed === Crafty.keys.A) {
                    xCoord--;
                } else if (this.keyPressed === Crafty.keys.D) {
                    xCoord++;
                } else if (this.keyPressed === Crafty.keys.W) {
                    yCoord--;
                } else if (this.keyPressed === Crafty.keys.S) {
                    yCoord++;
                }
                
                return {
                    x: xCoord,
                    y: yCoord
                };
            }
        },

        setAnimation: function () {
            this.reel('blinkyRight', 400, 0, 0, 2)
                .animate('blinkyRight', -1);
        }
    });
}());