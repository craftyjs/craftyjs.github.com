//global Crafty Score

(function () {
    "use strict";

    Crafty.c("Levels", {

        init: function () {
            // The score is a text attribute
            this.requires("2D, DOM, Text, Levels")
                .attr({
                    x: 100,
                    y: 2,
                    w: 90,
                    h: 20,
                    levels: 1
                })
                .text("Level 1")
                .textColor('#FFFFFF')
                .textFont({
                    size: '13px',
                    weight: 'bold'
                });
        },
        
        setLevel: function(amt) {
            this.text("Level " + (this.levels = amt));
        },
        
        getLevels: function() {
            return this.levels;
        }
    });
}());