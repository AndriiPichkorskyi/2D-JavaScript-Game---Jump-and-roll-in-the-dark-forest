export class Sound{
    constructor({url, loop = false, playbackPosition = 0}) {
        this.sound = new Audio();
        this.sound.src = url;
        this.loop = loop;
        this.sound.currentTime = playbackPosition
        this.sound.play();
    }

    destroyOnFinish() {
        this.sound.addEventListener("ended", this.destroy.bind(this))
    }

    destroy() {
        this.sound.pause();
        this.sound.currentTime = 0;
        this.sound = null;
    }
}