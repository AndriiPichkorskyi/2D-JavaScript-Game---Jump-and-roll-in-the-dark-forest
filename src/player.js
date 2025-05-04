import { Sitting, Running, Jumping, Falling, Rolling, Diving, Hit } from "./playerStates.js";
import { CollisionAnimation } from "./collisionAnimation.js";
import { FloatingMessage } from "./floatingMessages.js";

export default class Player {
    constructor(game) {
        this.game = game;
        this.width = 100;
        this.height = 91.3;
        this.x = 0;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.vy = 0;
        this.weight = 1;
        this.image = document.getElementById("player");
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 5;
        this.fps = 20;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
        this.speed = 0;
        this.maxSpeed = 10;
        this.states = [new Sitting(this.game), new Running(this.game), new Jumping(this.game), new Falling(this.game), new Rolling(this.game), new Diving(this.game), new Hit(this.game)];
        this.currentState = null;
        this.power = 100;
        this.maxPower = 100;
        this.powerRecharge = 2; // per second
        this.powerCost = 8;
        this.minPower = 15; // min required power
        this.sound = new Audio();
        this.sound.src = "./assets/sounds/dog_run.ogg";
        this.sound.setAttribute("loop", true);
        this.sound.playbackRate = 0.75;
        // this.sound.play();
        // document.body.appendChild(this.sound)
    }
    /**
     *
     * @param {Array} input
     */
    update(input, deltaTime) {
        this.checkCollision();
        this.calculatePower(deltaTime);
        this.currentState.handlerInput(input);
        // horizontal movement
        this.x += this.speed;
        if (input.includes("KeyRight") && this.currentState !== this.states[6]) this.speed = this.maxSpeed;
        else if (input.includes("KeyLeft") && this.currentState !== this.states[6]) this.speed = -this.maxSpeed;
        else this.speed = 0;
        // horizontal boundaries
        if (this.x < 0) this.x = 0;
        if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;

        // verctical movement
        this.y += this.vy;
        if (!this.onGround()) this.vy += this.weight;
        else this.vy = 0;
        // vertical boundaries
        if (this.y > this.game.height - this.height - this.game.groundMargin) this.y = this.game.height - this.height - this.game.groundMargin;

        // sprite animation
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) this.frameX += 1;
            else this.frameX = 0;
        } else {
            this.frameTimer += deltaTime;
        }
    }
    /**
     *
     * @param {CanvasRenderingContext2D} context
     */
    draw(context) {
        if (this.game.debug) {
            context.strokeStyle = "tomato";
            context.strokeRect(this.x, this.y, this.width, this.height);
        }
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }
    onGround() {
        return this.y >= this.game.height - this.height - this.game.groundMargin;
    }
    setState(state, speed) {
        window.myLogs.add("State: " + state);
        this.currentState = this.states[state];
        this.game.speed = this.game.maxSpeed * speed;
        this.currentState.enter();
    }
    checkCollision() {
        this.game.enemies.forEach((enemy) => {
            if (enemy.x < this.x + this.width && enemy.x + enemy.width > this.x && enemy.y < this.y + this.height && enemy.y + enemy.height > this.y) {
                // collision detected
                enemy.markedForDeletion = true;
                this.game.collisions.push(new CollisionAnimation(this.game, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5, enemy.collisionSound));
                if (this.currentState === this.states[4] || this.currentState === this.states[5]) {
                    const score = this.currentState === this.states[4] ? 1 : 5;
                    this.game.score += score;
                    this.game.floatingMessages.push(new FloatingMessage("+" + score, enemy.x, enemy.y, 150, 50));
                    this.currentState === this.states[5] ? (this.power += 50) : (this.power += 1);
                } else {
                    this.setState(6, 0);
                    this.game.score -= 5;
                    this.game.lives -= 1;
                    if (this.game.lives <= 0) this.game.gameOver = true;
                }
            }
        });
    }
    calculatePower(deltaTime) {
        // power
        if (this.currentState === this.states[4] && this.power > 0) {
            this.power -= (this.powerCost * deltaTime) / 100;
        } else if (this.power < this.maxPower) {
            this.power += (this.powerRecharge * deltaTime) / 100;
        }

        if (this.power > this.maxPower) this.power = this.maxPower;
    }
    isEnoughPower() {
        return this.power > this.minPower;
    }
}
