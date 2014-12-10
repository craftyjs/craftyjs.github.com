/*global $, Crafty*/

var levelBitMap = [];

(function () {
    "use strict";

    //define a sprite size
    var spriteSize = 20,
        speed = 1.6;

    function initializeGame(width, height) {

        //initialize our game.  We give it width, height, and the html element to pput the game in
        Crafty.init(width * spriteSize, height * spriteSize, document.getElementById('game'));

        //set the background color to black
        Crafty.background("#000000");

        //load our sprites
        Crafty.sprite(spriteSize, "imgs/pacman20.png", {
            pacman: [12, 0],
            ghost: [0, 0],
            pellet: [14, 1],
            powerUp: [15, 0],
            blinky: [0, 0],
            inky: [6, 0],
            pinky: [4, 0],
            clyde: [2, 0],
            lives: [16, 0],
            cherry: [16, 0],
            strawberry: [16, 1],
            orange: [16, 2],
            banana: [16,3]
            
        });

        //load walls
        Crafty.sprite(spriteSize, "imgs/walls+gate.png", {
            wall: [14, 0], //self contained wall
            gate: [15, 0], //gate
            blCr: [12, 0], //bottom left corner
            regT: [4, 0], //a T intersection
            brCr: [13, 0], //bottom right corner
            lftT: [6, 0], //90 degree clockwise rotation
            ritT: [7, 0], //270 degree clockwise rotation
            tlCr: [10, 0], //top left corner
            invT: [5, 0], //180 degree clockwise rotation
            trCr: [11, 0], // top right corner
            bCap: [3, 0], //bottom cap
            tCap: [2, 0], //top cap
            horz: [9, 0], //horizontal
            late: [8, 0], //lateral
            lCap: [1, 0], //left cap
            rCap: [0, 0] //right cap
        });

        //load audio files
        Crafty.audio.add({
            munch: ['sounds/munch.wav'],
            life: ['sounds/life.wav'],
            begin: ['sounds/begin.wav'],
            fruit: ['sounds/fruit.wav'],
            death: ['sounds/death.wav'],
            ghost: ['sounds/ghost.wav'],
            extralife: ['sounds/extralife.wav'],
            siren: ['sounds/siren.wav'],
            laser: ['sounds/shortLaser.mp3']
        });
        //play the intro tune when game starts
        Crafty.audio.play('begin');

        // setTimeout(function(){Crafty.unpause();}, 1000);

    }

    function makeFruit() {
        setTimeout(function () {
            Crafty.e("Fruit").create(9 * spriteSize, 12 * spriteSize);
            makeFruit();
        }, 20000);
    }

    function loadMap(levelMap, currentScore, currentLives, level) {
        console.log("called");
        //split file into lines
        var lines = levelMap.split("\n");

        //call initializeGame
        initializeGame(lines[0].length, lines.length);

        //loop over each line
        $.each(lines, function (y, line) {

            var characters = line.split(""),
                bitmap = $.map(characters, function (char) {
                    if (['W', '1', '2', '3', '4', '6', '7', '8', '9', 'v', '^', '<', '>', '|', '-'].indexOf(char) > -1) {
                        return 1;
                    } else if (char === 'G') {
                        return 2;
                    }
                    return 0;
                });
            levelBitMap.push(bitmap);

            //split each line into characters and loop over each character
            $.each(characters, function (x, char) {

                //set the x and y coordinates for the current item
                var xCoord = x * spriteSize,
                    yCoord = y * spriteSize;

                //match and create the appropriate entity
                if (char === 'W') {
                    Crafty.e("Wall").create(xCoord, yCoord, "wall");
                } else if (char === 'Z') {
                    Crafty.e("Score");
                    Crafty("Score").setPoints(currentScore);
                } else if (char === 'X') {
                    Crafty.e("Lives");
                    Crafty("Lives").setLives(currentLives);
                } else if (char === 'V') {
                    Crafty.e("Levels");
                    Crafty("Levels").setLevel(level);
                } else if (char === 'p') {
                    Crafty.e("Pellet").create(xCoord, yCoord);
                } else if (char === 'S') {
                    Crafty.e("PowerUp").create(xCoord, yCoord);
                } else if (char === 'M') {
                    Crafty.e("Pacman").create(xCoord, yCoord);
                } else if (char === 'B') {
                    Crafty.e("Ghost").create(xCoord, yCoord, speed).setAI("Blinky");
                } else if (char === 'I') {
                    Crafty.e("Ghost").create(xCoord, yCoord, speed).setAI("Inky");
                } else if (char === 'P') {
                    Crafty.e("Ghost").create(xCoord, yCoord, speed).setAI("Pinky");
                } else if (char === 'C') {
                    Crafty.e("Ghost").create(xCoord, yCoord, speed).setAI("Clyde");
                } else if (char === 'G') { //gate
                    Crafty.e("Gate").create(xCoord, yCoord, "gate");
                } else if (char === '1') { //bottom left corner
                    Crafty.e("Wall").create(xCoord, yCoord, "blCr");
                } else if (char === '2') { //T
                    Crafty.e("Wall").create(xCoord, yCoord, "regT");
                } else if (char === '3') { //bottom right corner
                    Crafty.e("Wall").create(xCoord, yCoord, "brCr");
                } else if (char === '4') { //left T
                    Crafty.e("Wall").create(xCoord, yCoord, "lftT");
                } else if (char === '6') { //right T
                    Crafty.e("Wall").create(xCoord, yCoord, "ritT");
                } else if (char === '7') { //top left corner
                    Crafty.e("Wall").create(xCoord, yCoord, "tlCr");
                } else if (char === '8') { //inverted T
                    Crafty.e("Wall").create(xCoord, yCoord, "invT");
                } else if (char === '9') { //top right corner
                    Crafty.e("Wall").create(xCoord, yCoord, "trCr");
                } else if (char === 'v') { //bottom cap
                    Crafty.e("Wall").create(xCoord, yCoord, "bCap");
                } else if (char === '^') { //top cap
                    Crafty.e("Wall").create(xCoord, yCoord, "tCap");
                } else if (char === '-') { //horizontal
                    Crafty.e("Wall").create(xCoord, yCoord, "horz");
                } else if (char === '|') { //lateral
                    Crafty.e("Wall").create(xCoord, yCoord, "late");
                } else if (char === '<') { //left cap
                    Crafty.e("Wall").create(xCoord, yCoord, "lCap");
                } else if (char === '>') { //right cap
                    Crafty.e("Wall").create(xCoord, yCoord, "rCap");
                }
            });
        });
        makeFruit();
    }

    Crafty.defineScene("startScreen", function () {
        Crafty.init('385', '440', document.getElementById('game'));
        Crafty.background('#000000 url(imgs/startscreen.png) no-repeat center center');
        Crafty.e("2D, DOM, Text, Mouse")
            .attr({
                w: 300,
                h: 50,
                x: 40,
                y: 325
            })
            .text("START GAME")
            .css({
                "text-align": "center",
                'cursor': 'pointer'
            })
            .textFont({
                size: '30px',
                weight: 'bold'
            })
            .textColor("#FFFFFF")
            .bind('Click', function () {
                console.log("over");
                Crafty.enterScene("game", "maps/level+.map");
            });
    });

    //define our game scene
    Crafty.defineScene("game", function (mapFile) {
        //get the level map file
        $.get(mapFile, function (levelMap) {
            //load our level map
            loadMap(levelMap, 0, 3, 1);
        });
    });
    
    //define our new level scene
    Crafty.defineScene("level", function (levelObject) {
        //get the level map file
        $.get(levelObject.mapFile, function (levelMap) {
            //load our level map
            loadMap(levelMap, levelObject.currentScore, levelObject.currentLives, levelObject.level);
        });
    });

    // Start the start screen
    Crafty.scene("startScreen");

}());

function postScore(name, score) {
    $.get(
        "http://104.236.6.144/new_score/" + name + "/" + score,
        function (highScores) {
            updateHighScores(highScores.scores.splice(0, 10))
        }
    );
}

function getScores() {
    $.get(
        "http://104.236.6.144/highscores/" + 10,
        function (highScores) {
            updateHighScores(highScores.scores)
        }
    );
}

function updateHighScores(highScores) {

    var html = "<tr>l<th>#</th><th>Name</th><th>Score</th></tr>";

    for (var i = 0; i < highScores.length; i++) {
        html += "<tr>" +
            "<td>" + (i+1) + "</td>" +
            "<td>" + highScores[i].name + "</td>" +
            "<td>" + highScores[i].score + "</td>" +
            "</tr>";
    }
    $( "#scoreContainer" ).html(html);
    console.log(highScores);
}

getScores();