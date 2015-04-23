/*global Crafty*/

//create the bullet component
Crafty.c("Bullet", {
    bullet: function (dir) {
        this.bind("EnterFrame", function () {
            this.move(dir, 8);
            if (this.x > Crafty.viewport._width || this.x < 0 ||
                this.y > Crafty.viewport._height || this.y < 0) {
                this.destroy();
            }
        }).onHit("Wall", function (e) {
            this.destroy()
        }).onHit("Ghost", function (ent) {
            if (ent[0].obj.isFrightened) {
                if (!ent[0].obj.wasEaten) {
                    Crafty.audio.play('ghost');
                    ent[0].obj.wasEaten = true;
                    ent[0].obj.speed *= 2;
                    ent[0].obj.reel('eyesGhost', 400, 13, 0, 2)
                        .animate('eyesGhost', -1);
                    Crafty("Pacman").incrGhostCount();
                    Crafty("Score").addPoints(200 * Crafty("Pacman").getGhostCount());
                }
            }
            this.destroy();
        });
        return this;
    }
});