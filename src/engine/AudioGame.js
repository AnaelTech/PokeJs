export class AudioGame {
    constructor(src) {
        this.audio = new window.Audio(src);
        this.audio.loop = true;
        this.audio.volume = 0.5;
    }

    play() {
        return this.audio.play();
    }

    pause() {
        this.audio.pause();
    }

    stop() {
        this.audio.pause();
        this.audio.currentTime = 0;
    }

    setLoop(loop) {
        this.audio.loop = !!loop;
    }

    draw(ctx){

    }

    drawChangeVolume(){
        
    }

}
