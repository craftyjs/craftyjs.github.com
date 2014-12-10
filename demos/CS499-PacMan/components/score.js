//global Crafty Score

(function () {
    "use strict";

    Crafty.c("Score", {

        init: function () {
            // The score is a text attribute
            this.requires("2D, DOM, Text, Score")
                .attr({
                    x: 0,
                    y: 2,
                    w: 90,
                    h: 20,
                    points: 0,
                    ptsLives: 0
                })
                .text("0 Points")
                .textColor('#FFFFFF')
                .textFont({
                    size: '13px',
                    weight: 'bold'
                });
        },
        
        setPoints: function(amt) {
            this.text((this.points += amt) + " Points");
        },

        addPoints: function (inc) {
            // Add points of the score
            Crafty("Score").each(function () {
                // Add a life for every 1000 pts
                this.ptsLives += inc;
                if (this.ptsLives > 1000) {
                    this.ptsLives -= 1000;
                    Crafty('Lives').addLife();
                }
                this.text((this.points += inc) + " Points");
            });
        },
        
        getScore: function() {
            return this.points;
        }
    });
}());