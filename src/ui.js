export class UI {
    constructor(game) {
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = "Creepster";
        this.livesImage = document.getElementById("lives");
    }
    /**
     *
     * @param {CanvasRenderingContext2D} context
     */
    draw(context) {
        context.save();
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = "white";
        context.shadowBlur = 0;
        context.font = this.fontSize + "px " + this.fontFamily;
        context.textAlign = "left";
        context.fillStyle = this.game.fontColor;
        // score
        context.fillText("Score: " + this.game.score, 20, 50);
        // timer
        context.font = this.fontSize * 0.8 + "px " + this.fontFamily;
        context.fillText("Time: " + (this.game.time * 0.001).toFixed(1), 20, 80);
        // lives
        for (let i = 0; i < this.game.lives; i += 1) {
            context.drawImage(this.livesImage, 25 * i + 25, 95, 25, 25);
        }
        // power
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.shadowColor = null;
        context.lineWidth = 4;
        context.lineJoin = "round";
        context.strokeStyle = "#000000";
        context.strokeRect(20, 128, 200, 40);
        const gradient = context.createLinearGradient(20, 128, 200, 128);
        gradient.addColorStop(0, "#ffffff");
        gradient.addColorStop(1, "#ffffff33");
        context.fillStyle = gradient;
        context.fillRect(22, 130, 196 / (this.game.player.maxPower / this.game.player.power), 36);
        // context.fillText("Power: " + Math.floor(this.game.player.power) + " / " + this.game.player.maxPower, 20, 150)

        // game over message
        if (this.game.gameOver) {
            this.game.player.sound.pause();
            context.shadowOffsetX = 2;
            context.shadowOffsetY = 2;
            context.shadowColor = "white";
            context.shadowBlur = 0;
            context.fillStyle = "#000000";

            context.textAlign = "center";
            context.font = this.fontSize * 2 + "px " + this.fontFamily;
            if (this.game.score > this.game.winningScore) {
                context.fillText("Boo-yah", this.game.width * 0.5, this.game.height * 0.5 - 20);
                context.font = this.fontSize * 0.7 + "px " + this.fontFamily;
                context.fillText("What are creatures of the night afraid of? YOU!!!", this.game.width * 0.5, this.game.height * 0.5 + 20);
            } else {
                context.fillText("Love at first bite?", this.game.width * 0.5, this.game.height * 0.5 - 20);
                context.font = this.fontSize * 0.7 + "px " + this.fontFamily;
                context.fillText("Nope. Better luck next time!", this.game.width * 0.5, this.game.height * 0.5 + 20);
            }
            // restart
            context.fillStyle = "#AA0000";
            context.font = this.fontSize * 1.2 + "px " + this.fontFamily;
            context.fillText(`Press "R" key to restart`, this.game.width * 0.5, this.game.height * 0.5 + 70);

            const eventFunction = (e) => {
                if (e.key === "r") {
                    this.game.reset();
                    window.removeEventListener("keydown", eventFunction);
                }
            };
            window.addEventListener("keydown", eventFunction);
        }

        context.restore();
    }
}
