import Player from "./player.js";
import { InputHandler } from "./input.js";
import { Background } from "./background.js";
import { FlyingEnemy, GroundEnemy, ClimbingEnemy, ZombieEnemy } from "./enemies.js";
import { UI } from "./ui.js";

window.myLogs = {
    logs: [],
    add: (log) => {
        window.myLogs.logs.push(log);
    },
};

window.addEventListener("load", function () {
    /**@type {HTMLCanvasElement} */
    const canvas = this.document.getElementById("canvas1");
    /**@type {CanvasRenderingContext2D} */
    const ctx = canvas.getContext("2d");
    // canvas.width = 1280;
    canvas.height = 500;

    window.addEventListener("resize", resizeCanvas);

    function resizeCanvas() {
        const width = window.innerWidth;

        canvas.width = width > 1280 ? 1280 : width;
    }

    resizeCanvas();

    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.groundMargin = 50;
            this.speed = 0;
            this.maxSpeed = 3;
            this.background = new Background(this);
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.UI = new UI(this);
            this.enemies = [];
            this.particles = [];
            this.collisions = [];
            this.floatingMessages = [];
            this.maxParticles = 50;
            this.enemyTimer = 0;
            this.enemyInterval = 1000;
            this.debug = false;
            this.score = 0;
            this.winningScore = 40;
            this.fontColor = "black";
            this.time = 0;
            this.maxTime = 30000;
            this.gameOver = false;
            this.lives = 5;
            this.player.currentState = this.player.states[0];
            this.player.currentState.enter();
        }
        update(deltaTime) {
            this.time += deltaTime;
            if (this.time > this.maxTime) this.gameOver = true;
            this.background.update();
            this.player.update(this.input.keys, deltaTime);
            // handleEnemies
            if (this.enemyTimer > this.enemyInterval) {
                this.addEnemy();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime;
            }
            this.enemies.forEach((enemy) => {
                enemy.update(deltaTime);
                if (enemy.markedForDeletion) this.enemies.splice(this.enemies.indexOf(enemy), 1);
            });
            // handle particles
            this.particles.forEach((particle, index) => {
                particle.update(deltaTime);
            });

            if (this.particles.length > this.maxParticles) {
                this.particles = this.particles.slice(this.particles.length - this.maxParticles, this.particles.length);
            }
            // handle collision sprites
            this.collisions.forEach((collision, index) => {
                collision.update(deltaTime);
            });

            this.floatingMessages.forEach((message, index) => {
                message.update(deltaTime);
            });

            this.particles = this.particles.filter((particle) => !particle.markedForDeletion);
            this.collisions = this.collisions.filter((collision) => !collision.markedForDeletion);
            this.floatingMessages = this.floatingMessages.filter((message) => !message.markedForDeletion);
        }
        /**
         *
         * @param {CanvasRenderingContext2D} context
         */
        draw(context) {
            this.background.draw(context);
            this.player.draw(context);
            this.enemies.forEach((enemy) => {
                enemy.draw(context);
            });
            this.particles.forEach((particle) => {
                particle.draw(context);
            });
            this.collisions.forEach((collision) => {
                collision.draw(context);
            });
            this.floatingMessages.forEach((message, index) => {
                message.draw(context);
            });
            this.UI.draw(context);
        }
        addEnemy() {
            const random = Math.random();
            if (this.speed > 0 && random < 0.2) this.enemies.push(new ZombieEnemy(this));
            else if (this.speed > 0 && Math.random() < 0.7) this.enemies.push(new GroundEnemy(this));
            else if (this.speed > 0) this.enemies.push(new ClimbingEnemy(this));

            this.enemies.push(new FlyingEnemy(this));
        }

        reset() {
            this.width = canvas.width;
            this.height = canvas.height;
            this.groundMargin = 50;
            this.speed = 0;
            this.maxSpeed = 3;
            // this.background = new Background(this)
            // this.player = new Player(this);
            // this.input = new InputHandler(this);
            // this.UI = new UI(this);
            this.enemies = [];
            this.particles = [];
            this.collisions = [];
            this.floatingMessages = [];
            this.maxParticles = 50;
            this.enemyTimer = 0;
            this.enemyInterval = 1000;
            this.debug = false;
            this.score = 0;
            this.winningScore = 40;
            this.fontColor = "black";
            this.time = 0;
            this.maxTime = 30000;
            this.gameOver = false;
            this.lives = 5;
            this.player.x = 0;
            this.player.y = this.height - this.player.height - this.groundMargin;
            this.player.currentState = this.player.states[0];
            this.player.currentState.enter();
            this.input.keys = [];

            lastTime = document.timeline.currentTime;
            animate(document.timeline.currentTime);
        }
    }

    const game = new Game(canvas.width, canvas.height);
    // game.draw(ctx)
    let lastTime = 0;

    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);

        if (!game.gameOver) requestAnimationFrame(animate);
    }

    animate(0);
});
