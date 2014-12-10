/*global Crafty*/

(function () {
    "use strict";

    //this is a pacman object
    Crafty.c("Pacman", {

        ghostCount: 0,
        dotsEaten: 0,
        initialX: 180,
        initialY: 320,
        shoot: false,

        //pacmans speed
        speed: 2,

        //we will put pacman's current direction here
        direction: null,

        //this variable will save the last key pressed by the user
        //pacman starts a game by going left
        keyPressed: Crafty.keys.LEFT_ARROW,

        create: function (x, y) {

            this.requires("2D, Canvas, pacman, Collision, SpriteAnimation")
                .attr({
                    //set pacman x,y attributes
                    x: x,
                    y: y
                })
                .onHit("Pellet", function (ent) {

                    //when pacman hits a pellet, destroy it and play a munching sound                
                    if (Math.abs(ent[0].overlap) > 7) {
                        this.dotsEaten += 1;
                        ent[0].obj.destroy();
                        Crafty.audio.play('munch');
                        Crafty("Score").addPoints(10);
                        //when all of the pellets and power ups have been eaten you win
                        if (this.dotsEaten == 150) {
                            Crafty.e("2D, DOM, Text").attr({
                                x: 40,
                                y: 100,
                                w: 300
                            }).text("Next Level").textColor('#FFFFFF').textFont({
                                size: '100px',
                                weight: 'bold'
                            });

                            var levelObject = {
                                mapFile: "maps/level+.map",
                                currentScore: Crafty("Score").getScore(),
                                //currentScore: 1250,
                                currentLives: Crafty("Lives").getLives(),
                                level: Crafty("Levels").getLevels() + 1
                            };

                            console.log("starting next level scene");
                            Crafty.enterScene("level", levelObject);
                        }
                    }
                })
                .onHit("Fruit", function (ent) {
                    //when pacman hits a fruit, destroy it and play a fruit sound
                    if (Math.abs(ent[0].overlap) > 7) {
                        ent[0].obj.destroy();
                        Crafty.audio.play('fruit');
                        Crafty("Score").addPoints(100);
                    }
                })
                .onHit("Ghost", function (ent, type, overlap) {
                    //when pacman hits a Ghost, destroy it and play a dying sound
                    if (Math.abs(ent[0].overlap) > 7) {
                        if (ent[0].obj.isFrightened) {
                            if (!ent[0].obj.wasEaten) {
                                Crafty.audio.play('ghost');
                                ent[0].obj.wasEaten = true;
                                ent[0].obj.speed *= 2;
                                ent[0].obj.reel('eyesGhost', 400, 13, 0, 2)
                                    .animate('eyesGhost', -1);
                                this.ghostCount += 1;
                                Crafty("Score").addPoints(200 * this.ghostCount);
                            }

                        } else {
                            //play death sound when hit by ghost
                            Crafty.audio.play('death');
                            //some logic for losing a life will go here
                            if (Crafty("Lives").getLives() === 1) {
                                // If there is only one life left and Pacman is killed, 
                                //then gameover
                                this.destroy();
                                Crafty("Lives").lifeTaken(Crafty("Lives").getLives());
                                Crafty.e("2D, DOM, Text").attr({
                                    x: 40,
                                    y: 100,
                                    w: 300
                                }).text("GAME OVER").textColor('#FFFFFF').textFont({
                                    size: '100px',
                                    weight: 'bold'
                                });

                                var name = prompt("Please enter your name", "Player");
                                if (name != null) {
                                    postScore(name, Crafty("Score").getScore());
                                }

                                Crafty.pause();
                            } else {
                                // Else take life, reset pacman, and reset ghost location
                                Crafty("Lives").lifeTaken(Crafty("Lives").getLives());
                                Crafty('Pacman').resetLocation();
                                //reset ghost and remember original variables
                                Crafty('Ghost').resetLocation();
                                // Add a pause after death
                                Crafty.pause();
                                Crafty.e("Ready, 2D, DOM, Text").attr({
                                    x: 40,
                                    y: 242,
                                    w: 300
                                }).text("Ready...").textColor('#FFFF00').textFont({
                                    size: '15px',
                                    weight: 'bold'
                                });
                                setTimeout(function () {
                                    Crafty.pause();
                                    Crafty("Ready").destroy();
                                }, 1000);
                            }
                        }
                    }
                })
                .onHit("PowerUp", function (ent) {
                    if (Math.abs(ent[0].overlap) > 1) {
                        //when pacman hits a powerup, destroy it
                        ent[0].obj.destroy();
                        this.dotsEaten += 1;
                        this.ghostCount = 0;
                        Crafty.trigger("PowerUpEaten");
                        Crafty("Score").addPoints(50);
                        //when all of the pellets and power ups have been eaten you win
                        if (this.dotsEaten == 150) {
                            Crafty.e("2D, DOM, Text").attr({
                                x: 40,
                                y: 100,
                                w: 300
                            }).text("New Level").textColor('#FFFFFF').textFont({
                                size: '100px',
                                weight: 'bold'
                            });

                            var levelObject = {
                                mapFile: "maps/level+.map",
                                currentScore: Crafty("Score").getScore(),
                                //currentScore: 1250,
                                currentLives: Crafty("Lives").getLives(),
                                level: Crafty("Levels").getLevels() + 1
                            };
                            Crafty.enterScene("level", levelObject);

                            Crafty.pause();
                        }
                    }
                })
                .bind("KeyDown", function (e) {
                    //when the user presses an arrow key, 
                    //let's update the keyPressed variable

                    //we only need to update the variable if the 
                    //key is different from our current direction
                    if (e.keyCode !== this.direction) {

                        //we only need to update the variable if the key is an arrow key
                        if (e.keyCode === Crafty.keys.LEFT_ARROW ||
                            e.keyCode === Crafty.keys.RIGHT_ARROW ||
                            e.keyCode === Crafty.keys.UP_ARROW ||
                            e.keyCode === Crafty.keys.DOWN_ARROW) {

                            //update the variable
                            this.keyPressed = e.keyCode;
                        }

                        //this is where lasers come from.. the spacebar
                        if ((e.keyCode) === Crafty.keys.SPACE) {
                            var dir;
                            Crafty.audio.play('laser');

                            switch (this.direction) {
                            case Crafty.keys.LEFT_ARROW:
                                Crafty.e("2D, DOM, Color, Collision, Bullet").attr({
                                    x: this.x + 10,
                                    y: this.y + 10,
                                    w: 5,
                                    h: 5
                                }).color("red").bullet("w");
                                break;
                            case Crafty.keys.RIGHT_ARROW:
                                Crafty.e("2D, DOM, Color, Collision, Bullet").attr({
                                    x: this.x + 10,
                                    y: this.y + 10,
                                    w: 5,
                                    h: 5
                                }).color("red").bullet("e");
                                break;
                            case Crafty.keys.UP_ARROW:
                                Crafty.e("2D, DOM, Color, Collision, Bullet").attr({
                                    x: this.x + 10,
                                    y: this.y + 10,
                                    w: 5,
                                    h: 5
                                }).color("red").bullet("n");
                                break;
                            case Crafty.keys.DOWN_ARROW:
                                Crafty.e("2D, DOM, Color, Collision, Bullet").attr({
                                    x: this.x + 10,
                                    y: this.y + 10,
                                    w: 5,
                                    h: 5
                                }).color("red").bullet("s");
                                break;
                            }
                            //var old = this.pos();
                            //this.trigger("change", old);
                        }
                    }

                })
                .bind("EnterFrame", function () {
                    //make pacman move each frame

                    //a variable to track if we have moved or not
                    var moved = false;

                    //has a new direction key been pressed since the last from?
                    if (this.keyPressed !== null) {

                        //try to move in that direction
                        moved = this.tryMove(this.keyPressed);
                    }

                    //if we hit a wall
                    if (!moved) {

                        //try to move in the original direction
                        this.tryMove(this.direction);

                    } else {
                        //if we did not hit a wall, this is our new direction
                        this.direction = this.keyPressed;

                        //null out our keyPressed variable
                        this.keyPressed = null;

                        //also, update pacman's animation to match our new direction
                        this.updateAnimation();
                    }
                });
        },


        resetLocation: function () {
            this.x = this.initialX;
            this.y = this.initialY;
            this.keyPressed = Crafty.keys.LEFT_ARROW;
        },

        getXCoord: function () {
            return Math.round(this.x / 20);
        },

        getYCoord: function () {
            return Math.round(this.y / 20);
        },

        getLocation: function () {
            return {
                x: this.getXCoord(),
                y: this.getYCoord()
            };
        },

        getDirection: function () {
            return this.direction;
        },

        incrGhostCount: function () {
            this.ghostCount += 1;
        },

        getGhostCount: function () {
            return this.ghostCount;
        },

        updateAnimation: function () {
            if (this.direction === Crafty.keys.DOWN_ARROW) {
                this.reel('pacmanDown', 300, 11, 3, 2)
                    .animate('pacmanDown', -1);
            } else if (this.direction === Crafty.keys.UP_ARROW) {
                this.reel('pacmanUp', 300, 11, 2, 2)
                    .animate('pacmanUp', -1);
            } else if (this.direction === Crafty.keys.LEFT_ARROW) {
                this.reel('pacmanLeft', 300, 11, 0, 2)
                    .animate('pacmanLeft', -1);
            } else if (this.direction === Crafty.keys.RIGHT_ARROW) {
                this.reel('pacmanRight', 300, 11, 1, 2)
                    .animate('pacmanRight', -1);
            }
        },

        //this function will attempt to move pacman in the given direction
        //the function will return true if the move was successful
        tryMove: function (direction) {

            //save our original coordinates. this way we can move back if we hit a wall
            var originalX = this.x,
                originalY = this.y;

            //try to move in the given direction
            if (direction === Crafty.keys.DOWN_ARROW) {
                this.y += this.speed;
            } else if (direction === Crafty.keys.UP_ARROW) {
                this.y -= this.speed;
            } else if (direction === Crafty.keys.LEFT_ARROW) {
                this.x -= this.speed;
            } else if (direction === Crafty.keys.RIGHT_ARROW) {
                this.x += this.speed;
            }

            //if pacman goes off the left edge of the map
            if (this.x <= -this.w) {
                //put him on the right edge
                this.x += Crafty.viewport.width + this.w;

                //if pacman goes off the right edge of the map
            } else if (this.x >= Crafty.viewport.width + this.w) {
                //put him on the left edge
                this.x -= Crafty.viewport.width + 2 * this.w;
            }

            //if pacman goes off the top edge of the map
            if (this.y <= -this.h) {

                //put him on the bottom edge
                this.y += Crafty.viewport.height + this.h;

                //if pacman goes off the bottom edge of the map
            } else if (this.y >= Crafty.viewport.height + this.h) {

                //put him on the top edge
                this.y -= Crafty.viewport.height + 2 * this.h;
            }

            //if we hit a wall
            if (this.hit('Wall') || this.hit('Gate')) {

                //go back
                this.attr({
                    x: originalX,
                    y: originalY
                });

                return false;
            } else {
                return true;
            }
        }
    });
}());