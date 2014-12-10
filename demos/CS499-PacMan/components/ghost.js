/*global Crafty, levelBitMap, PF, searchGrid*/

(function () {
    "use strict";

    //this serves as an enum for our directions
    var DIRECTIONS = {
            LEFT: 1,
            RIGHT: 2,
            UP: 3,
            DOWN: 4
        },
        initialX = 0,
        initialY = 0;

    //this is a ghost object
    Crafty.c("Ghost", {

        //this function is called when a ghost entity is created
        init: function () {

            //we have the ghost listen for powerups to be eaten
            //ghosts become frightened when a powerup is eaten
            this.bind("PowerUpEaten", this.makeFrightened);

            //we also have this ghost move each frame
            this.bind("EnterFrame", this.move);
        },

        //this function is called to place a ghost entity at an x,y coordinate
        //we also give the ghost a speed upon creation
        create: function (x, y, speed) {
            //all ghosts require 2D, canvas and collision
            this.requires("2D, Canvas, Collision")
                .attr({ //we give ghosts these attributes
                    x: x,
                    y: y,
                    z: 1,
                    speed: speed,
                    inHouse: true, //ghosts start out in the ghost house (blinky is an exception)
                    isChasing: true, //ghosts start in chase mode
                    powerUpCount: 0, //0 powerups have been used at the start
                    modeChanged: false, //this is used to tell a ghost when he must reverse direction
                    initialX: x, // the original x position
                    initialY: y // the original y position
                });

            //return the ghost entity
            return this;
        },

        resetLocation: function () {
            // Reset the location to the original location of the Ghost after PacMan has died
            Crafty("Ghost").each(
                function () {
                    this.attr({
                        x: this.initialX,
                        y: this.initialY
                    });
                }
            );
        },

        //this function is used to customize the ghost entity's behaviour
        setAI: function (ai) {

            //set the ai of this ghost
            this.addComponent(ai);

            //also set the animation for the ghost
            this.setAnimation();
        },

        //function to get the x coordinate of the ghost
        getXCoord: function () {
            return Math.round(this.x / this.w);
        },

        //function to get the y coordinate of the ghost
        getYCoord: function () {
            return Math.round(this.y / this.w);
        },

        //this function returns the location of the ghost
        getLocation: function () {
            return {
                x: this.getXCoord(),
                y: this.getYCoord()
            };
        },

        //this function is used to compare two locations
        locationsAreEquals: function (a, b) {
            return a.x === b.x && a.y === b.y;
        },


        //this function is used to make a ghost frightened (blue)
        //when a powerup is eaten
        makeFrightened: function () {

            //if the ghost is not already firghtened
            if (!this.isFrightened) {

                //update the animation to be a blue frightened ghost
                this.reel('blueGhost', 400, 8, 0, 2)
                    .animate('blueGhost', -1);
            }

            //set the ghost to frightened
            this.isFrightened = true;

            //ghost must reverse direction
            this.modeChanged = true;

            //increment powerup counter
            this.powerUpCount += 1;

            //after 8 seconds
            this.timeout(function () {

                //decrement the powerup counter
                this.powerUpCount -= 1;

                //if there are no more active powerups
                if (this.powerUpCount === 0) {

                    //we are no longer frightened
                    this.isFrightened = false;

                    //if we were not eaten
                    if (!this.wasEaten) {

                        //we set our animation back to normal
                        this.setAnimation();
                    }
                }
            }, 8000);
        },

        //ghosts have three modes (frightened, scatter, chase)
        //modes are described here:
        //http://home.comcast.net/~jpittman2/pacman/pacmandossier.html#CH2_Scatter_Chase_Repeat
        //in scatter mode, ghosts reverse direction and run to their designated corner
        //in chase mode, ghosts head towards their target tile
        //in frightened mode, ghosts move in random directions
        changeMode: function () {

            //ghosts stay in chase mode for 20 seconds
            this.timeout(function () {

                //then the ghost is no longer n chase mode
                this.isChasing = false;

                //the mode changes, so the ghost must change directions
                this.modeChanged = true;

                ///after 7 seconds of being in scatter mode
                this.timeout(function () {

                    //the ghost is chasing once again
                    this.isChasing = true;

                    //the ghost must change directions again
                    this.modeChanged = true;

                    //and we repeat this process
                    this.changeMode();
                }, 7000);
            }, 20000);
        },

        //this function is called every frame
        //it decides how a ghost should move
        move: function () {

            //this is a check to see if the ghost is in the center of a tile
            //if it is in the center, we need to decide what its next move is
            if (this.x % this.w === 0 && this.y % this.h === 0) {

                //if the ghost is at the gate (ghost house entrance)
                if (this.locationsAreEquals(new Crafty('Gate').getLocation(), this.getLocation())) {

                    //if the ghost is returning to the house because it was eaten
                    if (this.wasEaten) {

                        //it is no longer eaten
                        this.wasEaten = false;

                        //it is no longer frightened
                        this.isFrightened = false;

                        //it must change directions to exit the house
                        this.modeChanged = true;

                        //divide its speed by two
                        //(the speed gets mulitplied by 2 when it is eaten)
                        this.speed /= 2;

                        //set the animation back to normal
                        this.setAnimation();
                    } else {

                        //else flip the in house variable to be false
                        this.inHouse = false;

                        //then we call changeMode
                        this.changeMode();
                    }
                }

                //if the ghost is in the house
                if (this.inHouse) {

                    //if pacman has eaten enough dots for this ghost to leave the house
                    if (Crafty('Pacman').dotsEaten > this.whenToLeave) {

                        //set the direction to the gate
                        this.setDirectionTo(new Crafty('Gate').getLocation());

                        //if we are not ready to leave
                    } else {

                        //do nothing
                        return;
                    }

                    //if the mode has been changed
                } else if (this.modeChanged) {

                    //the ghost must reverse direction by returning to its previous location
                    this.setDirectionTo(this.previousLocation);

                    //set mode changed back to false
                    this.modeChanged = false;

                    //if the ghost was eaten
                } else if (this.wasEaten) {

                    //set its direction to the gate
                    this.setDirectionTo(new Crafty('Gate').getLocation());

                    //if the ghost is frightened
                } else if (this.isFrightened) {

                    //get the list of possible moves
                    var availableMoves = this.getAvailableTiles();

                    //choose a random one
                    this.setDirectionTo(availableMoves[Math.floor(Math.random() * availableMoves.length)]);

                    //if the ghost is chasing pacman
                } else if (this.isChasing) {

                    //set the direction to pacman
                    this.setDirectionTo(this.getTargetTile(new Crafty('Pacman')));
                } else {

                    //if we are doing nothing else, we must be in scatter mode
                    //when in scatter mode the ghost should go to its corner
                    this.setDirectionTo(this.corner);
                }
            }

            //if ghost goes off the left edge of the map
            if (this.x <= -this.w) {
                //put him on the right edge
                this.x += Crafty.viewport.width + this.w;

                //if ghost goes off the right edge of the map
            } else if (this.x >= Crafty.viewport.width + this.w) {
                //put him on the left edge
                this.x -= Crafty.viewport.width + 2 * this.w;
            }            

            //move in the direction that was set
            this.moveInCurrentDirection();
        },

        //this function is used to set the direction of the ghost
        setDirectionTo: function (tile) {

            //get the list of possible moves
            var possibleMoves = this.getAvailableTiles(),

                //get the move that is closest to the target by manhattan distance
                //(this is how the original AIs decide)
                bestMove = this.closestToTarget(possibleMoves, tile);

            //set the distance to go to our width
            this.distToGo = this.w;

            //our previouse location is set to our current location (we are about to move)
            this.previousLocation = this.getLocation();

            if (bestMove.x > this.getXCoord()) { //if our new x is greater

                //we should move right
                this.direction = DIRECTIONS.RIGHT;
            } else if (bestMove.x < this.getXCoord()) { //if our new x is less

                //we should move left
                this.direction = DIRECTIONS.LEFT;
            } else if (bestMove.y > this.getYCoord()) { //if our new y is greater

                //we should move down
                this.direction = DIRECTIONS.DOWN;
            } else { //if our new y is less

                //we should move up
                this.direction = DIRECTIONS.UP;
            }
        },

        //this function is used to get a list of possible moves a ghost can take
        getAvailableTiles: function () {

            //get the current coordinates of the ghost
            var x = this.getXCoord(),
                y = this.getYCoord(),

                //create a list of all touching tiles
                allMoves = [
                    //the tile above us
                    {
                        x: x,
                        y: y - 1
                    },
                    //the tile to the left of us
                    {
                        x: x - 1,
                        y: y
                    },
                    //the tile below us
                    {
                        x: x,
                        y: y + 1
                    },
                    //the tile to the right of us
                    {
                        x: x + 1,
                        y: y
                    }
                ],

                //we will put our available moves here
                availableMoves = [];

            //for each move
            for (var i in allMoves) {
                var move = allMoves[i];

                //if the move is not a wall (we also do a check for the gate for certain cases)
                if (levelBitMap[move.y][move.x] === 0 || ((this.inHouse || this.wasEaten) && levelBitMap[move.y][move.x] === 2)) {

                    //if there is a previous location and the mode was changed
                    if (typeof this.previousLocation !== 'undefined' && !this.modeChanged) {

                        //if our current location does not equal our previous location
                        //(this check is done for when we are in the middle of a move)
                        if (!(this.locationsAreEquals(move, this.previousLocation))) {

                            //this is an available move
                            availableMoves.push(move);
                        }
                    } else {
                        //this is an available move
                        availableMoves.push(move);
                    }
                }
            }

            //return the list of legal moves
            return availableMoves;
        },

        //returns the closest move to the target tile by manhattan distance
        closestToTarget: function (moves, target) {

            //variables for the closest tile so far and the distance
            var closest = Infinity,
                tile = {};

            //loop over each move
            for (var i = 0; i < moves.length; i++) {

                //get the current move
                var move = moves[i],

                    //calculate the distance of the current move from the target tile
                    dist = Math.sqrt(Math.pow(move.x - target.x, 2) + Math.pow(move.y - target.y, 2));

                //if the distance is shorter than the shortest one found so far
                if (dist < closest) {

                    //update our variables
                    closest = dist;
                    tile = move;
                }
            }

            //return the closest one found
            return tile;
        },

        //this function will move the ghost in its current set direction
        //i feel like this function can be rewritten to be much more concise
        moveInCurrentDirection: function () {

            //if we want to go left
            if (this.direction === DIRECTIONS.LEFT) {

                //if the distance to go is less than our speed
                if (this.distToGo < this.speed) {

                    //only add what is left before we reach the next tile
                    this.x = Math.round((this.x - this.speed) / this.w) * this.w;
                } else {

                    //just subtract our speed from our x
                    this.x -= this.speed;
                    this.distToGo -= this.speed;
                }

                //if we want to go right
            } else if (this.direction === DIRECTIONS.RIGHT) {

                //if the distance to go is less than our speed
                if (this.distToGo < this.speed) {

                    //only add what is left before we reach the next tile
                    this.x = Math.round((this.x + this.speed) / this.w) * this.w;
                } else {

                    //just add our speed to our x
                    this.x += this.speed;
                    this.distToGo -= this.speed;
                }
            } else if (this.direction === DIRECTIONS.UP) {

                //if the distance to go is less than our speed
                if (this.distToGo < this.speed) {

                    //only add what is left before we reach the next tile
                    this.y = Math.round((this.y - this.speed) / this.w) * this.w;
                } else {

                    //subtract our speed from our y
                    this.y -= this.speed;
                    this.distToGo -= this.speed;
                }
            } else {

                //if the distance to go is less than our speed
                if (this.distToGo < this.speed) {

                    //only add what is left before we reach the next tile
                    this.y = Math.round((this.y + this.speed) / this.w) * this.w;
                } else {

                    //add our speed to our y
                    this.y += this.speed;
                    this.distToGo -= this.speed;
                }
            }
        }
    });
}());
