export class InputHandler {
    constructor(game) {
        this.game = game;
        this.keys = [];
        window.addEventListener("keydown", (e) => {
            console.log(this.game.speed);
            if (keyBinds[e.key] && this.keys.indexOf(keyBinds[e.key]) === -1) {
                this.keys.push(keyBinds[e.key]);
            } else if (e.key === "i") this.game.debug = !this.game.debug;
        });
        window.addEventListener("keyup", (e) => {
            if (keyBinds[e.key]) {
                this.keys.splice(this.keys.indexOf(keyBinds[e.key]), 1);
            }
        });
    }
}

const keyBinds = {
    ArrowDown: "KeyDown",
    s: "KeyDown",
    ArrowUp: "KeyUp",
    w: "KeyUp",
    ArrowLeft: "KeyLeft",
    a: "KeyLeft",
    ArrowRight: "KeyRight",
    d: "KeyRight",
    Enter: "Enter",
};
