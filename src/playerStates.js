import { Dust, Fire, Splash } from "./particle.js";
import { Sound } from "./sound.js";

const states = {
    SITTING: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3,
    ROLLING: 4,
    DIVING: 5,
    HIT: 6,
};

class State {
    constructor(state, game) {
        this.state = state;
        this.game = game;
    }
}

export class Sitting extends State {
    constructor(game) {
        super("SITTING", game);
    }
    enter() {
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 4;
        this.game.player.frameY = 5;
        // this.game.player.sound.pause();
        this.game.player.sound.src = "./assets/sounds/barking_01.ogg";
        this.game.player.sound.removeAttribute("loop");
        this.game.player.sound.play();
    }
    /**
     *
     * @param {Array} input
     */
    handlerInput(input) {
        if (input.includes("KeyLeft") || input.includes("KeyRight")) {
            this.game.player.setState(states.RUNNING, 1);
        } else if (input.includes("Enter") && this.game.player.isEnoughPower()) {
            this.game.player.setState(states.ROLLING, 2);
        }
    }
}

export class Running extends State {
    constructor(game) {
        super("RUNNING", game);
    }
    enter() {
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 8;
        this.game.player.frameY = 3;
        // this.game.player.sound.pause();
        this.game.player.sound.src = "./assets/sounds/dog_run.ogg";
        this.game.player.sound.setAttribute("loop", true);
        this.game.player.sound.play();
    }
    /**
     *
     * @param {Array} input
     */
    handlerInput(input) {
        this.game.particles.push(new Dust(this.game, this.game.player.x + this.game.player.width * 0.25, this.game.player.y + this.game.player.height));
        if (input.includes("KeyDown")) {
            this.game.player.setState(states.SITTING, 0);
        } else if (input.includes("KeyUp")) {
            this.game.player.setState(states.JUMPING, 1);
        } else if (input.includes("Enter") && this.game.player.isEnoughPower()) {
            this.game.player.setState(states.ROLLING, 2);
        }
    }
}

export class Jumping extends State {
    constructor(game) {
        super("JUMPING", game);
    }
    enter() {
        if (this.game.player.onGround()) this.game.player.vy -= 30;
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 6;
        this.game.player.frameY = 1;
        this.game.player.sound.src = "./assets/sounds/jump.ogg";
        this.game.player.sound.removeAttribute("loop");
        this.game.player.sound.play();
    }
    /**
     *
     * @param {Array} input
     */
    handlerInput(input) {
        if (this.game.player.vy > 0) {
            this.game.player.setState(states.FALLING, 1);
        } else if (input.includes("Enter") && this.game.player.isEnoughPower()) {
            this.game.player.setState(states.ROLLING, 2);
        } else if (input.includes("KeyDown")) {
            this.game.player.setState(states.DIVING, 0);
        }
    }
}

export class Falling extends State {
    constructor(game) {
        super("JUMPING", game);
    }
    enter() {
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 6;
        this.game.player.frameY = 2;
        this.game.player.sound.pause();
    }
    /**
     *
     * @param {Array} input
     */
    handlerInput(input) {
        if (this.game.player.onGround()) {
            this.game.player.setState(states.RUNNING, 1);
        } else if (input.includes("KeyDown")) {
            this.game.player.setState(states.DIVING, 0);
        }
    }
}

export class Rolling extends State {
    constructor(game) {
        super("ROLLING", game);
    }
    enter() {
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 6;
        this.game.player.frameY = 6;
        this.game.player.sound.src = "./assets/sounds/fireLoop.ogg";
        this.game.player.sound.loop = true;
        this.game.player.sound.play();
    }
    /**
     *
     * @param {Array} input
     */
    handlerInput(input) {
        this.game.particles.push(new Fire(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height * 0.5));
        if (this.game.player.power <= 0) {
            if (this.game.player.onGround()) {
                this.game.player.setState(states.RUNNING, 1);
            } else {
                this.game.player.setState(states.FALLING, 1);
            }
            return;
        }
        if (!input.includes("Enter") && this.game.player.onGround()) {
            this.game.player.setState(states.RUNNING, 1);
        } else if (!input.includes("Enter") && !this.game.player.onGround()) {
            this.game.player.setState(states.FALLING, 1);
        } else if (input.includes("Enter") && input.includes("KeyUp") && this.game.player.onGround()) {
            this.game.player.vy -= 27;
        } else if (input.includes("KeyDown") && !this.game.player.onGround()) {
            this.game.player.setState(states.DIVING, 0);
        }
    }
}

export class Diving extends State {
    constructor(game) {
        super("DIVING", game);
    }
    enter() {
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 6;
        this.game.player.frameY = 6;
        this.game.player.vy = 15;

        new Sound({
            url: "./assets/sounds/fire_impact.wav",
            loop: false,
            playbackPosition: 0,
        }).destroyOnFinish();
    }
    /**
     *
     * @param {Array} input
     */
    handlerInput(input) {
        this.game.particles.push(new Fire(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height * 0.5));
        if (this.game.player.onGround()) {
            for (let i = 0; i < 30; i++) {
                this.game.particles.push(new Splash(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height));
            }
            if (input.includes("Enter") && this.game.player.isEnoughPower()) this.game.player.setState(states.ROLLING, 2);
            else this.game.player.setState(states.RUNNING, 1);
        }
        // else if (input.includes("Enter") && !this.game.player.onGround() ) {
        //     this.game.player.setState(states.ROLLING, 2);
        // }
    }
}

export class Hit extends State {
    constructor(game) {
        super("HIT", game);
    }
    enter() {
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 10;
        this.game.player.frameY = 4;
        // this.game.player.sound.pause();
        this.game.player.sound.src = "./assets/sounds/hurt_03.ogg";
        this.game.player.sound.removeAttribute("loop");
        this.game.player.sound.play();
    }
    /**
     *
     * @param {Array} input
     */
    handlerInput(input) {
        if (this.game.player.frameX >= 10 && this.game.player.onGround()) {
            this.game.player.setState(states.RUNNING, 1);
        } else if (this.game.player.frameX >= 10 && !this.game.player.onGround()) {
            this.game.player.setState(states.FALLING, 1);
        }
    }
}
