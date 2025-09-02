export class AudioGame {
    constructor(src) {
        this.audio = new window.Audio(src);
        this.audio.loop = true;
        this.audio.volume = 0.5;
        this.isPlaying = false; // État de lecture
    }

    /**
     * 
     * @returns 
     */
    play() {
        this.isPlaying = true;
        return this.audio.play();
    }
    /**
     * 
     */
    pause() {
        this.isPlaying = false;
        this.audio.pause();
    }

    /**
     * 
     */
    stop() {
        this.isPlaying = false;
        this.audio.pause();
        this.audio.currentTime = 0;
    }

    /**
     * Alterne entre lecture et pause
     */
    toggle() {
        try {
            if (this.isPlaying) {
                this.pause();
                //console.log("Audio mis en pause");
            } else {
                this.play().catch(() => {});
                //console.log("Audio relancé");
            }
        } catch (error) {
            console.error("Erreur lors du contrôle audio:", error);
        }
    }

    /**
     * 
     * @param {*} loop 
     */
    setLoop(loop) {
        this.audio.loop = !!loop;
    }
}
