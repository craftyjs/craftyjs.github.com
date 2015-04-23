//global Crafty Score

(function () {
    "use strict";

    var life = 3; // The number of lives Pacman has

    Crafty.c("Lives", {

        init: function () {
            // The component will be a text
            this.requires("2D, DOM, Text")
                .attr({
                    x: 200,
                    y: 3,
                    w: 90,
                    h: 20,
                    points: 0
                })
                .text("Lives: ")
                .textColor('#FFFFFF')
                .textFont({
                    size: '13px'
                });

            var lifeX = 265, // The x location of the picture text
                lifeY = 1, // The y location of the picture text
                i;
            for (i = 1; i < life + 1; i += 1) {
                Crafty.e("DOM, 2D, life_" + i + ", lives")
                    .attr({
                        x: lifeX,
                        y: lifeY
                    }); // The location of lives attribute
                lifeX += 20; // Change location of the image
            }
            
            life = 3;
        },

        lifeTaken: function (lifeAmt) {
            // Remove a life if this is called
            Crafty("life_" + lifeAmt).each( // Remove the life at this position
                function () {
                    this.destroy();
                }
            );
            life -= 1; // decrease life
        },
        
        setLives: function(lifeAmt) {
            if (life != 5) { // Max of 5 lives
                life = lifeAmt; // increase life by 1
                var lifeX = 265, // The x location of the picture text
                    lifeY = 1, // The y location of the picture text
                    i;
                for (i = 1; i < life + 1; i += 1) {
                    Crafty.e("DOM, 2D, life_" + i + ", lives")
                        .attr({
                            x: lifeX,
                            y: lifeY
                        }); // The location of lives attribute
                    lifeX += 20; // Change location of the image
                }
            }
        },
        
        addLife: function() {
            if (life != 5) { // Max of 5 lives
                Crafty.audio.play('extralife',1,0.5);
                life += 1; // increase life by 1
                var lifeX = 265, // The x location of the picture text
                    lifeY = 1, // The y location of the picture text
                    i;
                for (i = 1; i < life + 1; i += 1) {
                    Crafty.e("DOM, 2D, life_" + i + ", lives")
                        .attr({
                            x: lifeX,
                            y: lifeY
                        }); // The location of lives attribute
                    lifeX += 20; // Change location of the image
                }
            }
        },

        getLives: function () {
            return life; // return the amount of lives
        }
    });
}());