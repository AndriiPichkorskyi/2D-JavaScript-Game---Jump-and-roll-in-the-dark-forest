export class CollisionAnimation {
    constructor(game, x, y, soundSrc = "./assets/sounds/death_default.wav"){
        this.game = game;
        this.image = document.getElementById("collisionAnimation")
        this.spriteWidth = 100;
        this.spriteHeight = 90;
        this.sizeModifier = Math.random() + 0.5;
        this.width = this.spriteWidth * this.sizeModifier;
        this.height = this.spriteHeight * this.sizeModifier;
        this.x = x - this.width * 0.5
        this.y = y - this.height * 0.5
        this.frameX = 0;
        this.maxFrame = 4;
        this.markedForDeletion = false;
        this.fps = Math.random() * 10 + 15;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
        this.sound = new Audio();
        this.sound.src = soundSrc;
        document.body.appendChild(this.sound).setAttribute("preload", "metadata");
        this.sound.addEventListener("ended", (event) => {
            event.target.remove();
        })

    }
    draw(context) {
        context.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
    }
    update(deltaTime){
        if(this.frameX === 0) {
            this.sound.play(); 
            this.firstUpdate = false;
        }
        this.x -= this.game.speed;
        if(this.frameTimer > this.frameInterval) {
            this.frameX += 1;
            this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime;
        }
        if(this.frameX > this.maxFrame) this.markedForDeletion = true;
    }
}